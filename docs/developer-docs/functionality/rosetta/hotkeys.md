# Hotkeys generation

This page will explain how to generate a hotkey for neuron management.
The recommended way to get hotkeys is to programmatically 
generate them using the same process used in the public `ic` repository.
However, it is possible to generate hotkeys manually as described
below.

## Manual process

The manual hotkey generation process consists in generating a PEM file then deriving some private and public keys.

### Generate PEM

To generate the keys, start with generating a private PEM file:

`openssl genpkey -algorithm ed25519 -outform PEM -out private.pem`

Then create the public PEM from it:

`openssl pkey -in private.pem -pubout > public.pem`

Create DER file:

`openssl pkey -inform pem -outform der -in private.pem -out private.der`

Get hex representation:

`xxd -c 48 -s 16 -p private.der`

Those resulting 32 bytes form the secret key.

Follow the same process for the public key.


## FAQ

- Why do I get *"Algorithm ed25519 not found"* while generating the PEM file?

The version of OpenSSL included in MacOS doesn't support ed25519 by default. 
You may have to install another version of OpenSSL, or run the command from a Linux machine.


