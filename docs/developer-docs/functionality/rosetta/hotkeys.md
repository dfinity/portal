# Hotkeys generation

This page will explain how to generate a hotkey for neuron management.
The recommended way to get hotkeys is to programmatically 
generate them using the same process used in the public `ic` repository.
However, it is possible to generate hotkeys manually as described
below.
This page is a step-by-step guide with some examples showing the data format to expect.

## Manual process

The manual hotkey generation process consists in generating a PEM file, then deriving the corresponding private and public keys.

### Generate PEM

To generate the keys, start with generating a private PEM file:

`openssl genpkey -algorithm ed25519 -outform PEM -out private.pem`

Example output:
```
-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIHAOt4HGrNdcIFhBy7N9p6iq3iRowd4NZjDZ8aaaDCcX
-----END PRIVATE KEY-----
```

Then create the public PEM from it:

`openssl pkey -in private.pem -pubout > public.pem`

Example output:
```
-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEA4JKtE2KNVUTo96cl202FgWv5ctwP7f1ds1O73PZ6+VE=
-----END PUBLIC KEY-----
```


## Generating hex key representation

Create the private DER file:

`openssl pkey -inform pem -outform der -in private.pem -out private.der`

Create the public DER file:

`openssl pkey -inform pem -outform der -in private.pem -out public.der -pubout`


### Hex representation

The generated DER files are in a binary format not intended to be readable by humans.
But we can get a hex representation of both keys:


### Private key

`xxd -p private.der`

Example output:

```
302e020100300506032b657004220420700eb781c6acd75c205841cbb37d
a7a8aade2468c1de0d6630d9f1a69a0c2717
```

### Public key

`xxd -p public.der`

```
302a300506032b6570032100e092ad13628d5544e8f7a725db4d85816bf9
72dc0fedfd5db353bbdcf67af951
```

We need to keep only the last 32 bytes of the public key:

`xxd -s 12 -c 32 -p public.der`

Example output:

```
e092ad13628d5544e8f7a725db4d85816bf972dc0fedfd5db353bbdcf67af951
```

This is the public key you can use in Rosetta operations to identify your hotkey!


---------

## FAQ

- Why do I get *"Algorithm ed25519 not found"* while generating the PEM file?

The version of OpenSSL included in MacOS doesn't support ed25519 by default. 
You may have to install another version of OpenSSL, or run the command from a Linux machine.


