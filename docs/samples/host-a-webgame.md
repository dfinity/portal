# Hosting a web game on the Internet Computer

This sample project demonstrates how to deploy a web game on the [Internet Computer](https://internetcomputer.org/) through [Unity](https://unity.com/) and [Godot](https://godotengine.org/) game engines.

Before you begin, make sure you have [dfx SDK](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) installed.

## Create a Web Game

Let’s create a web game by using Unity or Godot game engine.

### Unity
Make sure you have [Unity](https://unity.com/download) installed.
- Create a new Unity Project with `Universal Render Pipeline` template selected, or you can use you own game as well.
- Install the `IC GameKit` package by following [this instruction](https://github.com/dfinity/ic-gamekit/blob/main/unity/README.md).
- Follow the `IC GameKit` [document](https://github.com/dfinity/ic-gamekit/blob/main/unity/AssetStorePublisher/Assets/com.ic.gamekit/README.md) to enable `IC Connector`.
- Switch to `WebGL` build target in the `Build Settings` window.
- Under the `Settings for WebGL` tab in the `Player Settings` window.
  - Set `Compression Format` to `Disabled` if you are using dfx SDK with version before 0.12.0.  
    You can check [this document](https://github.com/dfinity/ic-gamekit/blob/main/unity/AssetStorePublisher/Assets/com.ic.gamekit/README.md#cant-load-the-game-successfully-with-compression-enabled-for-webgl) for more information.
  - Choose the `Minimal` WebGL template to reduce the number of files generated.
- Build to WebGL in the `Build Settings` window.  
  With `IC Connector` enabled in the previous step, a folder named `ic-project` will be generated under the WebGL build output folder.

### Godot
Make sure you have [Godot](https://godotengine.org/download) installed.
- Create a new Godot project.
- Install the IC GameKit plugin by following [this instruction](https://github.com/dfinity/ic-gamekit/blob/main/godot/README.md).
- Follow the IC GameKit [document](https://github.com/dfinity/ic-gamekit/blob/main/godot/README.md) to enable `IC Connector`.
- Switch to `HTML5` preset in the `Export` window
- Export the project by `Export Project` button.  
  With `IC Connector` enabled in the previous step, a folder named `ic-project` will be generated under the HTML5 export folder.

## Create a dfx project manually

**If you install the `IC GameKit` to generate the dfx project automatically in [Create a Web Game](#create-a-web-game), please skip this section and jump to the [Deployment](#deployment).**

Since there is no backend in this sample, there is not any benefit of using the `dfx new project_name` command to set up a template. The `dfx.json` file is all that is needed.

### Unity
- Create a folder named `unity-webgl-sample`
- Create a `dfx.json` under `unity-webgl-sample` folder
- Follow the [Unity WebGL sample](https://github.com/dfinity/examples/tree/master/hosting/unity-webgl-template) to  
    - Setup the `dfx.json` file
    - Copy the files in the Unity WebGL build to the right places under the `src` folder

### Godot
- Create a folder named `godot-html5-sample`
- Create a `dfx.json` under `godot-html5-sample` folder
- Follow the [Godot HTML5 sample](https://github.com/dfinity/examples/tree/master/hosting/godot-html5-template) to  
    - Setup the `dfx.json` file
    - Copy the files in the Godot HTML5 build to the right places under the `src` folder

You may find generating the DFX project manuanlly is tedious and error-prone, we highly recommend you to use [IC GameKit](https://github.com/dfinity/ic-gamekit) to do this automatically. The tool is still in development, let us know if you have any feedback.

## Deployment
The local network is started by running this command from the root of the DFX project:

```bash
$ dfx start --background
```

When the local network is up and running, run this command to deploy the canisters:

```bash
$ dfx deploy
```
