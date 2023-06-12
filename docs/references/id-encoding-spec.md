---
author: Timo Hanke
title: ID encoding specification
published: 2020-03-15
last-updated: 2020-08-04
---

# ID encoding specification

## Abstract

Identifiers (short: IDs) are a concept of the IC which is used to refer to multiple types of registered or unregistered entities including canisters, users, accounts (registered) or ephemeral keys (unregistered).
The reference can be made either to address the entity as a target or to identify the entity as the source of something.
Often, when identifiers are handled outside of the IC, and in particular when they are handled by humans or tools close to humans, a textual representation is required.

This specification encodes identifiers in the Base32 format (RFC 4648) after adding a 4-byte CRC32 check sequence.

## Introduction

The specification of IDs (a different document) and the specification of the textual representation of IDs (this document) are separate things. The former is about the IDs that are used inside the IC (it covers the internal structure of IDs as byte strings). The latter is about encoding those IDs for use outside of the IC (ignoring the internal structure and describing the encoding as a character string that can be handled by users).

This specification works on top of the specification of IDs. Therefore, we speak of the ID that is used inside the IC as the **underlying ID**. The encoding used outside of the IC is called **encoded ID** or simply **ID** throughout this document. Sometimes we also refer to the underlying ID as the **byte string** and to the encoded ID as the **character string**.

As far as this specification is concerned, the underlying IDs are considered as binary blobs in varying sizes (opaque). The allowed size of an underlying ID is up to 29 bytes.

It shall be pointed out that the two specifications are not entirely orthogonal. This specification is not meant to describe one of possibly many textual representations for an underlying ID. The reason is that IDs will be frequently compared for equality. For example, we do not want to have two different encoded IDs floating around on websites that point to the same underlying ID. If two different representations were in use for the same underlying ID this would defeat the purpose of having an ID in the first place. It would be a pointer, not an ID.

The definition of a URL scheme is not in the scope of this specification. We leave a URL scheme as something to be defined on top of this specification.

The outline of this document is as follows:
- The [assumptions and requirements](#assumptions-and-requirements) section presents the assumptions and requirements which guided the design process that led to this specification.
- The [specification](#specification) section provides the specification itself.
- The [reference implementations](#reference-implementations) section gives reference implementations for the entire encoding and decoding functions as well for their subfunctions.
- The [test vectors](#test-vectors) section provides test vectors.
- The [rationale](#rationale) section explains the reasons why the specification was chosen, given the assumptions and requirements from the section [assumptions and requirements](#assumptions-and-requirements).

## Assumptions and requirements

The specification was designed around the following:

-  **Requirement 1: security:** the accidental alteration of an ID can cause financial loss. The requirement is to minimize the loss occurring across the entire user base.
-  **Requirement 2: URL-compatibility:** the requirement is that IDs can appear in the hostname portion of a URL.
-  **Requirement 3: user experience:** the requirement is that the UI can detect the accidental alteration (with high enough probably) of an ID without having to connect to the IC. 
-  **Requirement 4: developer experience:** the requirement is that UIs can be written using widely-available libraries.

## Specification

### CRC32

Let `CRC32` denote the cyclic redundancy check function commonly known as the CRC-32 function used in the IEEE 802.3 (Ethernet) standard. 

Links describing our CRC32 function (resp. the polynomial used therein):

* Table entry “CRC-32” on [Wikipedia](https://en.wikipedia.org/wiki/Cyclic_redundancy_check).
* Row “IEEE 802.3; CRC-32” in [Koopman's database](https://users.ece.cmu.edu/~koopman/crc/crc32.html).
* Entry “CRC-32/ISO-HDLC” in the [CRC catalogue](http://reveng.sourceforge.net/crc-catalogue/all.htm).
* Row labeled “CRC-32” in this [online calculator](https://crccalc.com/).

Our CRC32 function is defined by the following parameters in the [CRC catalogue](http://reveng.sourceforge.net/crc-catalogue/all.htm) and [online calculator](https://crccalc.com/): 


```
width=32 poly=0x04c11db7 init=0xffffffff refin=true refout=true xorout=0xffffffff check=0xcbf43926 residue=0xdebb20e3
```

The `check` value is the output corresponding to the UTF-8 string “123456789” (8-bit ASCII) as input.

Our CRC32 function is the one implemented by the unix commands `crc32` and `cksum -o 3`.

### Base32

Let `Base32` denote the Base32 encoding function defined in [RFC4648](https://tools.ietf.org/html/rfc4648), but with the padding characters (`=`) removed. The alphabet is A-Z and 2-7.

The decoding is unambiguous without the padding characters.
However, padding bits may still be present in the last character of the encoded character string (even if all subsequent `=` characters are removed).
A decoder MUST reject a character string if the implicit padding bits are not all zero.
For example, while the base32 strings AA, AB, AC, AD differ only in the last 3 bits, only AA shall decode successfully whereas AB, AC, AD shall be rejected.

Without the above rule, the last character in the encoding is no longer unique.
There can be two different character strings, differing in the last character not only by case, which decode to the same underlying ID.

Our `Base32` encoding/decoding functions are the ones implemented by this [online encoder](https://cryptii.com/pipes/base32) when selecting “Base 32 (RFC 3548, RFC 4648)”.
However, the decode function in this online tool does not reject non-zero padding bits (it decodes AB, AC, AD successfully).

Our `Base32` encoding/decoding functions are the ones implemented by the coreutils command `base32`, except for the handling of padding characters.
The `base32` command prints padding characters when encoding and expects padding characters when decoding.
Moreover, the decode function of this command does not reject non-zero padding bits (it decodes AB, AC, AD successfully).

If the input string length is `b` then the output string length is `c = ceil(8b/5)`.
Conversely, `b = floor(5c/8)`. Thus, we have `b = n*5 + (b mod 5) ⇔ c = n*8 + (c mod 8)` where `b mod 5` and `c mod 8` have the following relation:

<table>
  <tr>
   <td>b mod 5</td>
   <td>0</td>
   <td>1</td>
   <td>2</td>
   <td>3</td>
   <td>4</td>
  </tr>
  <tr>
   <td>c mod 8</td>
   <td>0</td>
   <td>2</td>
   <td>4</td>
   <td>5</td>
   <td>7</td>
  </tr>
</table>

### Grouping

Let `Group` denote the function that takes an 8-bit ASCII string and inserts a dash after each group of 5 characters. If the last group has exactly 5 characters then the dash at the end is omitted.

The final group can consist of a single character. This occurs for the following lengths:

<table>
  <tr>
   <td>b-4</td>
   <td>6</td>
   <td>9</td>
   <td>12</td>
   <td>15</td>
   <td>18</td>
   <td>31</td>
   <td>&hellip;</td>
  </tr>
  <tr>
   <td>b</td>
   <td>10</td>
   <td>13</td>
   <td>16</td>
   <td>19</td>
   <td>22</td>
   <td>35</td>
   <td>&hellip;</td>
  </tr>
  <tr>
   <td>c</td>
   <td>16</td>
   <td>21</td>
   <td>26</td>
   <td>31</td>
   <td>36</td>
   <td>56</td>
   <td>&hellip;</td>
  </tr>
</table>

### Encoding

Let `data` be the underlying ID as a byte array. Then the encoded ID is defined as:

```
Encode(data) := Group(LowerCase(Base32(CRC32(data) || data)))
```

The allowed length of `data` is 0-29 bytes.
The CRC value is 4 bytes.
This means the output of `Base32` is between `ceil((0+4)*8/5)=7 `and `ceil((29+4)*8/5)=53` characters long.
This means the shortest encoding is 8 characters (5+2 characters with one dash in between).

The longest encoding is 63 characters (10*5+3 characters with ten dashes in between).

By definition, IDs are case insensitive. However, by default, the `Encode` function outputs lower case.

### Decoding

The function `decode` normalizes the input to all-lower-case and then applies the inverse of  `encode,` unless one the following errors occurs:

* Input is longer or shorter than 8-63 characters.
* The grouping is incorrect.
* Input contains non-base32 characters.
* The internal padding bits are not all zero.
* The check sequence is invalid.


## Reference implementations

### CRC32

* On the command line: `crc32`

#### Examples:
* `$ echo -n 123456789 | crc32 /dev/stdin`

  `cbf43926`
* On the command line: `cksum -o 3`

#### Examples: 
* ``$ printf "%x\n" `echo -n "123456789" | cksum -o 3 | cut -f 1 -d " "` ``

  `cbf43926`

### Base32

* On the command line (from [coreutils](https://www.gnu.org/s/coreutils/)): `base32`

#### Examples: 
- See bash implementation below.

### Grouping

* On the command line: `fold -w5 | paste -sd'-' -`

#### Examples:
* `$ echo abcdefghijk | fold -w5 | paste -sd'-' -`

  `abcde-fghij-k`

## Test vectors

### Encode

<table>
  <tr>
   <td>Input (hex string)</td>
   <td>Output (base32 string)</td>
  </tr>
  <tr>
   <td>000102030405060708</td>
   <td>xtqug-aqaae-bagba-faydq-q</td>
  </tr>
  <tr>
   <td>00</td>
   <td>2ibo7-dia</td>
  </tr>
  <tr>
   <td>(empty string)</td>
   <td>aaaaa-aa</td>
  </tr>
  <tr>
   <td>0102030405060708091011121314151617181920212223242526272829</td>
   <td>iineg-fibai-bqibi-ga4ea-searc-ijrif-iwc4m-bsibb-eirsi-jjge4-ucs</td>
  </tr>
  <tr>
   <td>0</td>
   <td rowspan="4" >Error E1: invalid input length
   </td>
  </tr>
  <tr>
   <td>000</td>
  </tr>
  <tr>
   <td>(empty string)</td>
  </tr>
  <tr>
   <td>010203040506070809101112131415161718192021222324252627282930</td>
  </tr>
  <tr>
   <td>0g</td>
   <td>Error E2: invalid input characters</td>
  </tr>
</table>

### Decode

<table>
  <tr>
   <td>Input (base32 string)</td>
   <td>Output (hex string)</td>
  </tr>
  <tr>
   <td>2ibo7-dia</td>
   <td>00</td>
  </tr>
  <tr>
   <td>2IBO7-DIA</td>
   <td>00</td>
  </tr>
  <tr>
   <td>2Ibo7-diA</td>
   <td>00</td>
  </tr>
  <tr>
   <td>a2345-67</td>
   <td rowspan="2" >Error D1: invalid input length</td>
  </tr>
  <tr>
   <td>aaaaa-aaaaa-bbbbb-bbbbb-22222-22222-33333-33333-44444-44444-5555</td>
  </tr>
  <tr>
   <td>aaaaa-aaaaa-bbbbb-bbbbb-22222-22222-33333-33333-44444-44444-555</td>
   <td>Error D3: invalid check sequence</td>
  </tr>
  <tr>
   <td>a2345-678</td>
   <td>Error D2: invalid input characters</td>
  </tr>
  <tr>
   <td>2ibo7-dib</td>
   <td>Error D3: invalid check sequence</td>
  </tr>
  <tr>
   <td>w3gef-eqbai</td>
   <td>0102</td>
  </tr>
  <tr>
   <td>w3gef-eqbaj</td>
   <td rowspan="3" >Error D4: non-zero padding bits</td>
  </tr>
  <tr>
   <td>w3gef-eqbak</td>
  </tr>
  <tr>
   <td>w3gef-eqbal</td>
  </tr>
  <tr>
   <td>w3gef-eqbam</td>
   <td>Error D3: invalid check sequence</td>
  </tr>
  <tr>
   <td>2ibo7dia</td>
   <td>Error D5: non-canonical grouping</td>
  </tr>
  <tr>
   <td>2ibo-7dia</td>
   <td>Error D5: non-canonical grouping</td>
  </tr>
  <tr>
   <td>2ibo7--dia</td>
   <td>Error D5: non-canonical grouping</td>
  </tr>
</table>

## Rationale

#### **Why is the character set not Base64?**

- We need case-insensitive IDs because we want to use them in the hostname (i.e. the authority part) of a URL (see **requirement 2: URL-compatibility**).

#### **Why is the character set not hex?**

- URLs limit the length of hostnames to 63 characters.
In hex this would allow to encode a maximum of 31 bytes.
This is not enough to fit our derived IDs into it.
A change to the ID specification could make it possible like this: 20 byte hash + 4 bytes freely chooseable + 4 bytes check sequence + 2 bytes version = 30 bytes.
However, it is nice to have overall shorter IDs and have more space available for future extensions (see **requirement 2: URL-compatibility**).

#### **Why a check sequence?**

- The purpose of the check sequence is to detect errors early, right in the user interface, before connecting to the IC, in fact, without necessity to connect to the IC at all (see **requirement 3: user experience**).

#### **Why is the check sequence 4 bytes and not shorter?**

- We expect that the protocol may accept unregistered (self-generated) IDs.
An accidental alteration could lead to financial loss.
To minimize the total loss incurred by all users combined it is important to reduce this probability as much as possible.
We think 1:10<sup>9</sup> or better is required.
If it was only to improve user experience and financial loss was not an issue then 2 bytes would have been enough as, e.g., in onion addresses (see **requirement 1: security**).

#### **Why is the check sequence calculated before encoding to a character string (i.e. based on binary data as input) and not after (i.e. based on a character string as input)?**

- Calculating the check sequence before encoding makes the check sequence part independent of the encoding part.
This may reduce code dependencies. 

#### **Doesn’t a check sequence based on characters provide better detection of errors that come from human typos?**

- Yes, but a) we do not design for IDs typed by humans and b) the improvement in detection rate is negligible because the non-detection rate is already so low at 1:2<sup>32</sup>.

#### **Why is the check sequence not based on a cryptographic hash?**

- A cryptographic hash shortened to 4 bytes is not “cryptographic” anymore, hence it is as good as our CRC function.

#### **Why is the check sequence not based on SHA256?**

- CRC is cheaper computation wise.
This may pay off when canister code handles encoded IDs.

#### **Why wasn’t a better polynomial chosen for the CRC than the standard one?**

- It is true that there are polynomials with a better Hamming distance.
At data length of up to 256 bits one can find Hamming distance 6 where our polynomial only has Hamming distance 4.
As said before, the difference is negligible because the non-detection rate is already so low at 1:2<sup>32</sup>.
The availability of libraries for the standard polynomial used in CRC32 is more important to us (see **requirement 4: developer experience**).

#### **Why is the check sequence not based on a BCH code over GF(32)?**

- The advantage of a BCH code would be that the check sequence can be made character-based to detect human typos.
We already answered above why we didn’t choose a character-based check sequence.

#### **But isn’t BCH shorter code than CRC32? It only requires 5 constants where CRC32 has a table of 256 constants?**

- Yes, but BCH would require custom code where CRC32 is widely available in libraries.
This is more important to us (see **requirement 4: developer experience**).

#### **Why don’t you use capitalization as an implicit check sequence like Ethereum does?**

- Three reasons: 
  * We want a case-insensitive encoding for use in hostnames (see **requirement 2: URL-compatibility**).
  * This would not provide sufficiently many check bits in all cases.
    Our IDs can be as short as 9 bytes which would be 15 characters without adding a check sequence.
    Capitalization cannot add more than 1 check bit per character but we wanted at least 30 bits total (see **requirement 1: security**).
  * This would mean highly custom code (see **requirement 4: developer experience**).
