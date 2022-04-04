# Installing the SDK

As described in the [Quick start](../quickstart/quickstart-intro), you can download and install the latest version of the DFINITY Canister smart contract SDK package by running the command below in a terminal shell. The topics in this section provide additional information about installing, upgrading, and removing the SDK.

Command to install the SDK:

    $ sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"

## What gets installed

The SDK installation script installs several components in default locations on your local computer. The following table describes the development environment components that the installation script installs:

| Component    | Description                                                                                        | Default location                              |
|--------------|----------------------------------------------------------------------------------------------------|-----------------------------------------------|
| dfx          | DFINITY execution command-line interface (CLI)                                                     | `/usr/local/bin/dfx`                          |
| moc          | Motoko runtime compiler                                                                            | `~/.cache/dfinity/versions/<VERSION>/moc`     |
| replica      | Internet Computer local network binary                                                             | `~/.cache/dfinity/versions/<VERSION>/replica` |
| uninstall.sh | Script to remove the SDK and all of its components                                    | `~/.cache/dfinity/uninstall.sh`               |
| versions     | Cache directory that contains a subdirectory for each version of the SDK you install. | `~/.cache/dfinity/versions`                   |

### Core components in a versioned directory

The `~/.cache/dfinity/versions` directory stores one or more versioned subdirectories of the SDK. Each versioned subdirectory contains the all of the directories and files required for a specific version of the SDK. For example, if you list the contents of the `~/.cache/dfinity/versions/0.9.3` directory you would see the following core components:

    total 349192
    drwxr-xr-x  17 pubs  staff       544 Mar 15 11:55 .
    drwxr-xr-x   4 pubs  staff       128 Mar 25 14:36 ..
    drwxr-xr-x  49 pubs  staff      1568 Mar 15 11:55 base
    drwxr-xr-x  20 pubs  staff       640 Mar 15 11:55 bootstrap
    -r-x------   1 pubs  staff  66253292 Mar 15 11:55 dfx
    -r-x------   1 pubs  staff  10496256 Dec 31  1969 ic-ref
    -r-x------   1 pubs  staff   5663644 Dec 31  1969 ic-starter
    -r-x------   1 pubs  staff      9604 Dec 31  1969 libcharset.1.0.0.dylib
    -r-x------   1 pubs  staff     38220 Dec 31  1969 libffi.7.dylib
    -r-x------   1 pubs  staff    668300 Dec 31  1969 libgmp.10.dylib
    -r-x------   1 pubs  staff    958248 Dec 31  1969 libiconv.2.4.0.dylib
    -r-x------   1 pubs  staff      4200 Dec 31  1969 libiconv.dylib
    -r-x------   1 pubs  staff     96900 Dec 31  1969 libz.1.2.11.dylib
    -r-x------   1 pubs  staff  15417684 Dec 31  1969 mo-doc
    -r-x------   1 pubs  staff  14634020 Dec 31  1969 mo-ide
    -r-x------   1 pubs  staff  15111508 Dec 31  1969 moc
    -r-x------   1 pubs  staff  49404128 Dec 31  1969 replica

### Motoko base directory

The `base` directory in the versioned subdirectory of the SDK contains the Motoko base library modules that are compatible with that version of the SDK. Because the Motoko base library is evolving rapidly, you should only use the base modules that are packaged with the version of the SDK that you have installed.

### Bootstrap directory

The `bootstrap` directory contains web server code that is deprecated. Beginning with version 0.7.0, agents can call an HTTP middleware server instead of the `bootstrap` code. This change enables canisters to respond to HTTP requests directly and operate more like traditional web-based applications.

## Upgrading to the latest version

If a new version of the SDK is available for download after your initial installation, you should install the updated version at your earliest convenience to get the latest fixes and enhancements as soon as possible. You can use the `dfx upgrade` command to compare the version you have currently installed against the latest version available for download. If a newer version of `dfx` is available, the `dfx upgrade` command automatically downloads and installs the latest version.

Note that you don’t need to uninstall the software before installing the new version. However, if you want to perform a clean installation rather than an upgrade, you can first uninstall the software as described in [Removing the software](#remove), then re-run the download and installation command.

For information about the features and fixes in the latest release, see the [Release notes](release-notes:sdk-release-notes).

## Removing the software

When you install the SDK, the installation script puts the required binary files in a local directory and creates a cache. You can remove the SDK binaries and cache from your local computer by running the `uninstall` script located in the `.cache` folder.

For example:

``` bash
~/.cache/dfinity/uninstall.sh
```

If you are uninstalling because you want to immediately reinstall a clean version of `dfx`, you can run the following command:

``` bash
~/.cache/dfinity/uninstall.sh && sh -ci "$(curl -sSL https://sdk.dfinity.org/install.sh)"
```
