---
sidebar_position: 2
---
# Installing the IC SDK on Windows

There is no native support for `dfx` on Windows. However, by installing the Windows Subsystem for Linux (WSL), you can run `dfx` also on a Windows system as described below.

## Installing WSL

Follow Microsoft's instructions for installing the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install). Make sure you are running Windows 10 (version 2004 or higher) or Windows 11.

### Supported WSL Versions

Theoretically, WSL 1 and WSL 2 should both allow you to run `dfx`. However, we recommend WSL 2. [WSL Comparison](https://docs.microsoft.com/en-us/windows/wsl/compare-versions) explains the differences between WSL1 and WSL 2.

### Check your WSL version

Run the command `wsl –list –verbose (wsl -l -v)` to check the Linux distributions installed on your Windows machine. Below is an example output.

```
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

To learn more about the `wsl` command, check the [command reference for WSL](https://docs.microsoft.com/en-us/windows/wsl/basic-commands).

### Upgrade to WSL 2

If you have WSL 1 installed, follow the [upgrade instructions](https://docs.microsoft.com/en-us/windows/wsl/install#upgrade-version-from-wsl-1-to-wsl-2) to upgrade to WSL 2. Basically you need to:

- Install the [WSL 2 Linux kernel update package](https://docs.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package).
- Run the following command to set your Linux distributions to version 2.  
  `wsl --set-version <distribution name> 2`

## Running Linux

After you have WSL installed, you can launch the Linux distributions by name.

For example `Ubuntu.exe` is the command to start the `Ubuntu` distribution from the command line.

## Installing dfx

Once you have WSL installed, you can install `dfx` within your WSL Linux terminal as described in [Installing the SDK](/developer-docs/setup/install/index.mdx).

## Troubleshooting

### Node.js is not properly installed

WSL 2 has node.js `10.x.x` installed by default. But the latest `dfx` requires node.js `16.0.0` or higher, please check [0.3: Developer environment setup](/docs/tutorials/developer-journey/level-0/03-dev-env.md) developer journey tutorial for more information.

### Permission Denied when running `dfx start`

Projects created from the `dfx new` command need to be on the Linux filesystem instead of the Windows filesystem. Usually `cd ~` or `cd $HOME` in the WSL terminal will bring you to the home directory, and creating projects in there should work.

### No internet access on WSL

If you don't have internet access on WSL, for instance you cannot ping any server successfully, probably the nameserver on WSL is set to an internal WSL proxy nameserver. You can check the `/etc/resolv.conf` file to see if it's the case. If it's true, please follow the below steps to set to a valid nameserver:

- Create the `/etc/wsl.conf` file and add the below content to it, this will prevent WSL from regenerating the `/etc/resolv.conf` file after restarting.
  ```
  [network]
  generateResolvConf = false
  ```
- Modify the nameserver in the `/etc/resolv.conf` file to a valid one, for example the google nameserver `8.8.8.8`.
- On Windows, restart WSL to let this fix take effect.  
   `wsl.exe --shutdown`
