# Hosting a Unity WebGL build on the Internet Computer

This sample project demonstrates how to deploy a simple [Unity](https://unity.com/) WebGL build on the [Internet Computer](https://github.com/dfinity/ic). A simple sample code is available at the [examples](https://github.com/dfinity/examples/tree/master/hosting/unity-webgl-template) repository.

## Deploy a Unity WebGL build to IC

Let’s create a Unity WebGL build, and set it up to deploy with dfx. Before you begin, make sure you have [DFX SDK](https://smartcontracts.org/docs/quickstart/local-quickstart.html#download-and-install), [Unity](https://unity.com/download) installed.

### Create a Unity WebGL build
- Create a new Unity Project with `Universal Render Pipeline` template selected
- Switch to `WebGL` build target in the `Build Settings` window
- Under the `Settings for WebGL` tab in the `Player Settings` window
  - Set `Compression Format` to `Disabled` for now
  - Choose the `Minimal` WebGL template to reduce the number of files generated
- Build to WebGL in the `Build Settings` window

### Create a DFX project
Since there is no backend in this sample, there is not any benefit of using the `dfx new project_name` command to set up a template. The `dfx.json` file is all that is needed.
- Create a folder named `unity-webgl-sample`
- Create a `dfx.json` under `unity-webgl-sample` folder
- Follow the [Unity WebGL sample](https://github.com/dfinity/examples/tree/master/hosting/unity-webgl-template) to  
    - Setup the `dfx.json` file
    - Deploy the Unity WebGL build you generate in previous step

### Deployment
The local network is started by running this command from the root of the DFX project:

```bash
$ dfx start --background
```

When the local network is up and running, run this command to deploy the canisters:

```bash
$ dfx deploy
```
