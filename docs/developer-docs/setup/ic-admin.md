# IC Admin

`ic-admin` is a tool used to create and submit NNS proposals.

## Installing 

### MacOS

1. Retrieve the file

```bash
$ curl "https://download.dfinity.systems/ic/7445081734e6d896d090295967d50710975c4f25/openssl-static-binaries/x86_64-darwin/ic-admin.gz" -o - | gunzip > ./ic-admin
$ chmod +x ./ic-admin
```

2. Verify the binary

```bash
$ diff <(shasum -a 256 ./ic-admin | cut -d' ' -f1) <(echo 3f75026d2f28f171068e332a42c82a2795c93fbf5ab351baef30b30eb901cdba) && echo "ic-admin checksum matches" || echo "***ERROR***: ic-admin checksum does not match"
```

### Linux

NOTE: The instructions below have been tested with the Ubuntu 20.04 release.

1. Retrieve the file

```bash
$ curl "https://download.dfinity.systems/ic/7445081734e6d896d090295967d50710975c4f25/openssl-static-binaries/x86_64-linux/ic-admin.gz" -o - | gunzip > ./ic-admin
$ chmod +x ./ic-admin
```

2. Verify the binary

```bash
$ diff <(shasum -a 256 ./ic-admin | cut -d' ' -f1) <(echo e29bb9cc462e800b8b960ad49c412e5f5fdbb5ae2ae9fde0c13058422ba32802) && echo "ic-admin checksum matches" || echo "***ERROR***: ic-admin checksum does not match"
```