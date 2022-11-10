# Hosting a web game on the Internet Computer

This sample project demonstrates how to deploy a web game on the [Internet Computer](https://github.com/dfinity/ic) through [Unity](https://unity.com/) and [Godot](https://godotengine.org/) game engines. The sample DFX projects are available at the [examples](https://github.com/dfinity/examples/tree/master/hosting) repository.

Before you begin, make sure you have [DFX SDK](https://smartcontracts.org/docs/quickstart/local-quickstart.html#download-and-install) installed.

## Create a Web Game

Let’s create a web game by using Unity or Godot game engine.

### Unity
Make sure you have [Unity](https://unity.com/download) installed.
- Create a new Unity Project with `Universal Render Pipeline` template selected
- Switch to `WebGL` build target in the `Build Settings` window
- Under the `Settings for WebGL` tab in the `Player Settings` window
  - Set `Compression Format` to `Disabled` for now
  - Choose the `Minimal` WebGL template to reduce the number of files generated
- Build to WebGL in the `Build Settings` window

### Godot
Make sure you have [Godot](https://godotengine.org/download) installed.
- Create a new Godot project.
- Switch to `HTML5` preset in the `Export` window
- Export the project by `Export Project` button.

## Create a DFX project
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

You may find generating the DFX project manuanlly is tedious and error-prone, we provide a tool named [ic-gamekit](https://github.com/dfinity/ic-gamekit) to help you on this. The tool is still in development, let us know if you have any feedback.

## Deployment
The local network is started by running this command from the root of the DFX project:

```bash
$ dfx start --background
```

When the local network is up and running, run this command to deploy the canisters:

```bash
$ dfx deploy
```
