# Installing DFX on Windows

There is no native Windows version of `dfx`, you need Windows Subsystem for Linux (AKA “WSL”) as the prerequisite.

## Installing WSL on Windows

Please follow the [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install) to  install WSL, make sure you’re running Windows 10 version 2004 and higher or Windows 11.

## WSL Supported Version

Theoretically, WSL 1 and WSL 2 should be both fine to run `dfx`. But we highly recommend you to upgrade to WSL 2, please check the [Difference between WSL 1 and WSL 2](https://docs.microsoft.com/en-us/windows/wsl/compare-versions).

### Check WSL version

You can run the command `wsl –list –verbose (wsl -l -v)` to check the Linux distributions installed on your Windows. Below is an example of the result after running the command.

```
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

To learn more about `wsl` command, please check the [Command reference for WSL](https://docs.microsoft.com/en-us/windows/wsl/basic-commands).


### Upgrade to WSL 2

If you have WSL 1 installed, please follow the [Upgrade instructions](https://docs.microsoft.com/en-us/windows/wsl/install#upgrade-version-from-wsl-1-to-wsl-2) to upgrade to WSL 2. Basically you need to: 

* Install the [WSL 2 Linux kernel update package](https://docs.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package).

* Run the following command to set your Linux distributions to version 2.  
  `wsl --set-version <distribution name> 2`

## Running Linux Distributions

After you have WSL installed, you can launch the Linux distributions by name.

For example `Ubuntu.exe` is the command to start the `Ubuntu` distribution from the command line.

## Installing DFX

Once you have WSL installed, please follow [Installing tools](hello20mins.md#installing-tools-5-min) to install `dfx`.

## Troubleshooting

### Node.js is not properly installed
WSL 2 has node.js `10.x.x` installed by default. But the latest `dfx` requires node.js `16.0.0` or higher, please check [Node.js](hello20mins.md#nodejs) for more information.

### Permission Denied when running `dfx start`
Projects created from `dfx` need to be on the Linux Filesystem instead of the Windows Filesystem. Usually `cd ~` or `cd $HOME` in the WSL terminal will bring you to the home directory, and creating projects in there should work.
