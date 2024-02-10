# Customizing a frontend

## Overview

Now that you have a basic understanding of how to create, build, and deploy a simple dapp and are familiar with the default project files and sample frontend, you might want to start experimenting with different ways to customize the frontend user experience for your project.

This guide illustrates using the React framework to create a new frontend for the default sample dapp and guides you through some basic modifications to customize the interface displayed. Later guides expand on the techniques introduced here, but if you already know how to use CSS, HTML, JavaScript, and React or other frameworks to build your user interface, you can skip this guide.

This guide illustrates using the React framework to manage the Document Object Model (DOM) for your canister. Because React has its own custom DOM syntax, you need to modify the webpack configuration to compile the frontend code, which is written in JSX. For more information about learning to use React and JSX, see [getting started](https://react.dev/learn) on the [React website](https://reactjs.org/).

## Prerequisites

Before starting the guide, verify the following:

-  [x] You have `node.js` installed for frontend development and can install packages using `npm install` in your project. For information about installing node for your local operating system and package manager, see the [Node](https://nodejs.org/en/) website.

-  [x] You have downloaded and installed the IC SDK package as described in the [download and install](/docs/current/developer-docs/getting-started/install/) page.

:::info
This guide requires you to use the IC SDK version `0.8.0` or later.
:::

-  [x] You have installed the Visual Studio Code plugin for Motoko as described in [VS Code extensions for ICP development](/developer-docs/setup/vs-code.md) if you are using Visual Studio Code as your IDE.

-  [x] You have stopped any IC SDK processes running on the local computer.


## Create a new project

To create a new project directory for your custom frontend dapp:

- #### Step 1:  Open a terminal shell on your local computer, if you don’t already have one open.

- #### Step 2:  Change to the folder you are using for your Internet Computer projects, if you are using one.

- #### Step 3:  Check that you have `node.js` installed locally by running the following commands:

        which node
        which npm

    If you don’t have `node.js` installed, you should download and install it before continuing to the next step. For information about installing node for your local operating system and package manager, see the [Node](https://nodejs.org/en/) website.

- #### Step 4:  Create a new project by running the following command:

        dfx new custom_greeting

    The `dfx new custom_greeting` command creates a new `custom_greeting` project.

- #### Step 5:  Change to your project directory by running the following command:

        cd custom_greeting

## Install the React framework

If you’ve never used React before, you might want to explore the [intro to React](https://reactjs.org/tutorial/tutorial.html) tutorial or the [React website](https://reactjs.org/) before editing the frontend code.

To install required framework modules:

- #### Step 1:  Install the React module by running the following command:

        npm install --save react react-dom

- #### Step 2:  Install the required TypeScript language compiler loader by running the following command:

        npm install --save-dev typescript ts-loader

    As an alternative to installing these modules, you can edit the default `package.json` file to add dependencies for your project like [this](_attachments/custom-frontend-package.json).

## Review the default configuration

Before you make any changes to use React for this guide, let’s review the default frontend settings in the `dfx.json` configuration file for your project.

To review the default `dfx.json` configuration file:

- #### Step 1:  Open the `dfx.json` configuration file in a text editor.

- #### Step 2:  Notice that the `canisters` key includes settings for a `custom_greeting_frontend` canister.

        {
          "canisters": {
            ...

            "custom_greeting_frontend": {
              "dependencies": [
                "custom_greeting_backend"
              ],
              "frontend": {
                "entrypoint": "src/custom_greeting_frontend/src/index.html"
              },
              "source": [
                "src/custom_greeting_frontend/assets",
                "dist/custom_greeting_frontend/"
              ],
              "type": "assets"
            }
          }
        }

#### What this does
  Let’s take a look at the settings in this section.

  -   Frontend assets for your project are compiled into their own canister, in this case, a canister named `custom_greeting_frontend`.

  -   The assets canister has a default dependency on the main canister for the project.

  -   The `frontend.entrypoint` setting specifies the path to a file—in this case, the `index.html` file—to use as your dapp entry point. If you had a different starting point—for example, a custom `first-page.html` file—you would modify this setting.

  -   The `source` settings specify the path to your `src` and `dist` directories. The `src` setting specifies the directory to use for static assets that will be included in your assets canister when you build your project. If you have custom cascading stylesheet (CSS) or JavaScript files, you would include them in the folder specified by this path. After building the project, the project assets are served from the directory specified by the `dist` setting.

  -   The `type` setting specifies that the `custom_greeting_frontend` should use the [certified asset canister](https://github.com/dfinity/certified-assets), which comes with everything you need to host static assets on ICP.

  For this guide, you are going to add React JavaScript in an `index.jsx` file, but that won’t require any changes to the default settings in the `dfx.json` file.

- #### Step 3:  Close the `dfx.json` file to continue.

## Review the default frontend files

For this guide, you are going to make calls to the default `main.mo` canister through a custom frontend. Before you make any changes, though, let’s take a look at what’s in the default frontend files for a project.

To review the default frontend files:

- #### Step 1:  Open the `src/custom_greeting_frontend/src/index.html` file in a text editor.

    This template file is the default frontend entry point for the dapp as specified by the `frontend.entrypoint` setting in the `dfx.json` file.

    This file contains standard HTML with references to a CSS file and an image that are located in the `src/custom_greeting_frontend/assets` directory. The default `index.html` file also includes standard HTML syntax for displaying an input field for the `name` argument and a clickable button.

    This is the same default frontend in [Motoko default frontend example](/developer-docs/backend/motoko/explore-templates.md#default-frontend).

- #### Step 2:  Open the `src/custom_greeting_frontend/src/index.js` file in a text editor.

This file by default will contain the following piece of code:

        import { custom_greeting_backend } from "../../declarations/custom_greeting_backend";

        document.querySelector("form").addEventListener("submit", async (e) => {
                e.preventDefault();
                const button = e.target.querySelector("button");

                const name = document.getElementById("name").value.toString();

                button.setAttribute("disabled", true);

                // Interact with foo actor, calling the greet method
                const greeting = await custom_greeting_backend.greet(name);

                button.removeAttribute("disabled");

                document.getElementById("greeting").innerText = greeting;

                return false;
        });

#### What this does
- The `import` statement points to an actor that will allow us to make calls to our `custom_greeting_backend` canister from `"../declarations"`

-  The declarations haven’t been created yet, but this guide will come back to that.

- #### Step 3.  Close the `index.js` file to continue.

## Modify the frontend files

You are now ready to create a new frontend for the default dapp.

To prepare the frontend files:

- #### Step 1:  Open the webpack configuration file (`webpack.config.js`) in a text editor.

- #### Step 2:  Add the following `module` key above the `plugins` section:

:::caution
The following example is a **code snippet** that is part of a larger code file. This snippet may return an error if run on its own.
:::

        module: {
          rules: [
            { test: /\.(js|ts)x?$/, loader: "ts-loader" }
          ]
        },

This setting enables the project to use the `ts-loader` compiler for a React JavaScript `index.jsx` file. Note that there’s a commented section in the default `webpack.config.js` file that you can modify to add the `module` key.

When finished, your `webpack.config.js` file should contain the following content:

```
require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

const frontendDirectory = "custom_greeting_frontend";

const frontend_entry = path.join("src", frontendDirectory, "src", "index.html");

module.exports = {
  target: "web",
  mode: isDevelopment ? "development" : "production",
        entry: {
          // The frontend.entrypoint points to the HTML file for this build, so you need
          // to replace the extension to `.js`.
          index: path.join(__dirname, frontend_entry).replace(/\.html$/, ".jsx"),
        },
  devtool: isDevelopment ? "source-map" : false,
  optimization: {
    minimize: !isDevelopment,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    fallback: {
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      events: require.resolve("events/"),
      stream: require.resolve("stream-browserify/"),
      util: require.resolve("util/"),
    },
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist", frontendDirectory),
  },
  module: {
    rules: [
      { test: /\.(js|ts)x?$/, loader: "ts-loader" }
    ]
  },
  // Depending in the language or framework you are using for
  // front-end development, add module loaders to the default
  // webpack configuration. For example, if you are using React
  // modules and CSS as described in the "Adding a stylesheet"
  // tutorial, uncomment the following lines:
  // module: {
  //  rules: [
  //    { test: /\.(ts|tsx|jsx)$/, loader: "ts-loader" },
  //    { test: /\.css$/, use: ['style-loader','css-loader'] }
  //  ]
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, frontend_entry),
      cache: false,
    }),
    new webpack.EnvironmentPlugin([
      ...Object.keys(process.env).filter((key) => {
        if (key.includes("CANISTER")) return true;
        if (key.includes("DFX")) return true;
        return false;
      }),
    ]),
    new webpack.ProvidePlugin({
      Buffer: [require.resolve("buffer/"), "Buffer"],
      process: require.resolve("process/browser"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: `src/${frontendDirectory}/src/.ic-assets.json*`,
          to: ".ic-assets.json5",
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  // proxy /api to port 4943 during development.
  // if you edit dfx.json to define a project-specific local network, change the port to match.
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
    static: path.resolve(__dirname, "src", frontendDirectory, "assets"),
    hot: true,
    watchFiles: [path.resolve(__dirname, "src", frontendDirectory)],
    liveReload: true,
  },
};
```

- #### Step 3:  Create a new file named `tsconfig.json` in the root directory for your project.

- #### Step 4:  Open the `tsconfig.json` file in a text editor, then copy and paste this code into the file:

```
{
    "compilerOptions": {
      "target": "es2018",        /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
      "lib": ["ES2018", "DOM"],  /* Specify library files to be included in the compilation. */
      "allowJs": true,           /* Allow javascript files to be compiled. */
      "jsx": "react",            /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    },
    "include": ["src/**/*"],
}
```

- #### Step 5:  Save your changes and close the `tsconfig.json` file to continue.

- #### Step 6:  Open the default `src/custom_greeting_frontend/src/index.js` file in a text editor and delete everything in that file.

- #### Step 7:  Copy and paste this code into the `index.js` file.

```
import * as React from "react";
import { render } from "react-dom";
import { custom_greeting_backend } from "../../declarations/custom_greeting_backend";

const MyHello = () => {
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');

  async function doGreet() {
    const greeting = await custom_greeting_backend.greet(name);
    setMessage(greeting);
  }

  return (
    <div style={{ "fontSize": "30px" }}>
      <div style={{ "backgroundColor": "yellow" }}>
        <p>Greetings, from DFINITY!</p>
        <p>
          {" "}
          Type your message in the Name input field, then click{" "}
          <b> Get Greeting</b> to display the result.
        </p>
      </div>
      <div style={{ margin: "30px" }}>
        <input
          id="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        ></input>
        <button onClick={doGreet}>Get Greeting!</button>
      </div>
      <div>
        Greeting is: "
        <span style={{ color: "blue" }}>{message}</span>"
      </div>
    </div>
  );
};

render(<MyHello />, document.getElementById("app"));
```

- #### Step 8:  Rename the modified `index.js` file as `index.jsx` by running the following command:

        mv src/custom_greeting_frontend/src/index.js src/custom_greeting_frontend/src/index.jsx
    

- #### Step 9: Open the default `src/custom_greeting_frontend/src/index.html` file in a text editor, then replace the body contents with the following:

        <!doctype html>
        <html lang="en">
         <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width">
            <title>custom_greeting</title>
            <base href="/">
            <link type="text/css" rel="stylesheet" href="main.css" />
         </head>
         <body>
            <div id="app"></div>
         </body>
        </html>

## Start the local canister execution environment

Before you can build the `custom_greeting` project, you need to connect to either the live IC, or a canister execution environment running locally in your development environment.

To start the environment locally:

- #### Step 1:  Open a new terminal window or tab on your local computer.

- #### Step 2:  Navigate to the root directory for your project, if necessary.

- #### Step 3:  Start the local canister execution environment on your local computer by running the following command:

        dfx start --background

After the local canister execution environment completes its startup operations, you can continue to the next step.

## Register, build, and deploy the dapp

After you connect to the local canister execution environment, you can register, build, and deploy your dapp locally.

To deploy the dapp locally:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Register, build, and deploy your dapp by running the following command:

        dfx deploy

The `dfx deploy` command output displays information about the operations it performs.

## View the new frontend

You can now access the new frontend for the default dapp by entering the canister identifier for the assets canister in a browser.

To view the custom frontend:

- #### Step 1:  Open a new tab or window of your terminal and run:

        npm start

- #### Step 2:  Open a browser and navigate to `http://localhost:4943`.

- #### Step 3:  Verify that you are prompted to type a greeting.

    For example:

    ![Sample frontend](_attachments/react-greeting.png)

- #### Step 4:  Replace **Name** in the input field with the text you want to display, then click **Get Greeting** to see the result.

    For example:

    ![Greeting result](_attachments/greeting-response.png)

## Revise the frontend and test your changes

After viewing the frontend, you might want to make some changes.

To modify the frontend:

- #### Step 1:  Open the `index.jsx` file in a text editor and modify its style settings. 
For example, you might want to change the font family and use a placeholder for the input field by making changes similar to this:

```
import * as React from "react";
import { render } from "react-dom";
import { custom_greeting_backend } from "../../declarations/custom_greeting_backend/index.js";

const MyHello = () => {
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');

  async function doGreet() {
    const greeting = await custom_greeting_backend.greet(name);
    setMessage(greeting);
  }

  return (
    <div style={{ "fontFamily": "sans-serif" }}>
      <div style={{ "fontSize": "30px" }}>
        <p>Greetings, from DFINITY!</p>
        <p>
          {" "}
          Type your message in the Name input field, then click{" "}
          <b> Get Greeting</b> to display the result.
        </p>
      </div>
      <div style={{ margin: "30px" }}>
        <input
          id="name"
          placeholder="Type text here"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        ></input>
        <button onClick={doGreet}>Get Greeting!</button>
      </div>
      <div>
        Greeting is: "
        <span style={{ color: "green" }}>{message}</span>"
      </div>
    </div>
  );
};

render(<MyHello />, document.getElementById("app"));
```

- #### Step 2:  Save the file and view the updated page in your browser.

    For example:

    ![Modified styles on your entry page](_attachments/revised-greeting.png)

- #### Step 3:  Type a new message and see your new greeting. For example:

    ![Modified greeting result](_attachments/modified-result.png)

## Stop the local canister execution environment

After you finish experimenting with the frontend for your dapp, you can stop the local canister execution environment so that it doesn’t continue running in the background.

To stop the local network:

- #### Step 1:  In the terminal that displays the webpack development server, press Control-C to interrupt the dev-server.

- #### Step 2:  In the terminal that displays network operations, press Control-C to interrupt the local network process.

- #### Step 3:  Stop the local canister execution environment by running the following command:

        dfx stop
