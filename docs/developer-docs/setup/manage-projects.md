# Managing projects

You can modify some key settings for individual projects by modifying each project’s `dfx.json` configuration file. You can use the `dfx config` command to change these settings programmatically or manually edit the `dfx.json` file directly.

## How to change the source directory

Before you compile source code for your project using the `dfx build` command, you might want to check the default location for storing the source code for your dapp. By default, the name you use to create a new project is the name used for one canister (`canister_name`) and one assets canister (`canister_name_assets`), and dapp source code is expected to be in the `src/canister_name` directory. Similarly, the default location for frontend source code is in the `src/canister_name_assets/src` directory and frontend output is located in the `dist/canister_name_assets` directory.

Depending on your dapp’s complexity and architecture, however, you might want to modify the default location for the dapp source code, the frontend source code, or frontend output.

For example, for a simple dapp, you might want to eliminate one directory level and place the source code in the `src` directory:

      "main": "src/main.mo",

For more complex dapps, you might want to use a multi-tiered directory structure:

    "canisters": {
      "profiles": {
        "main": "src/profiles/utils/main.mo"
      },
      "events": {
        "main": "src/events/calendar/main.mo"
      },
      "media": {
        "main": "src/events/reports/main.mo"
      }
    }

If you modify the default settings for a source code directory, be sure that the settings in the `dfx.json` configuration file match the directory location on the file system.

## How to change the main dapp filename

Before you compile source code for your project using the `dfx build` command, you should verify the location and file name used for your dapp’s source code.

For example, if you want to build a canister for the `factorial` dapp and the source code for the dapp is located in `src/math/factorial.mo`, you should be sure that you have the correct path specified for the `main` setting in the `canisters` section of the configuration file.

For example:

    "main": "src/math/factorial.mo",

Keep in mind that changing the configuration setting for the dapp file name only affects where the `dfx build` command looks for the source code to compile. Making changes in the configuration file does not rename any files or directories on the file system. If you change the path to the main dapp file or the name of the file itself, be sure to change the name and location within your project directory.

## How to change the location for serving the dapp frontend

You can change the default host name and port number for serving the dapp frontend by modifying the local network settings in the `dfx.json` configuration file.

For example, you can change the IP address for the local network by modifying the `bind` setting:

    "networks": {
      "local": {
        "bind": "192.168.47.1:8000",
        "type": "ephemeral"
      }
    }
