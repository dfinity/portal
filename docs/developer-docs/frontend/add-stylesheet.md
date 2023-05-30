---
sidebar_position: 2
---

# Adding a stylesheet

## Overview

Cascading stylesheets are an important part of any frontend user interface. The default starter is configured to import a `main.css` file that you can edit, but you may prefer to import your stylesheet into a JavaScript file, or to use an alternate format such as Syntactically Awesome Style Sheets, aka SCSS. This guide illustrates how to configure webpack to import a stylesheet by walking through building a contact dapp. If you already know how to add cascading stylesheets (CSS) to a webpack-based project, you can skip this guide.

This guide illustrates using the React framework to manage the Document Object Model (DOM) for your frontend. Because React has its own custom DOM syntax, you need to modify the webpack configuration to compile the frontend code, which is written in JSX. For more information about learning to use React and JSX, see [getting started](https://react.dev/learn) on the [React website](https://reactjs.org/).

## Prerequisites

Before starting the guide, verify the following:

- [x]   You have `node.js` installed for frontend development and can install packages using `npm install` in your project. For information about installing node for your local operating system and package manager, see the [Node](https://nodejs.org/en/) website.

- [x]   You have downloaded and installed the IC SDK package as described in the [download and install](/developer-docs/setup/install/index.mdx) page.

:::info
This guide requires you to use the IC SDK version `0.8.0` or later.
:::

- [x]   You have installed the Visual Studio Code plugin for Motoko as described in [VS Code extensions for IC development](/developer-docs/setup/vs-code.md) if you are using Visual Studio Code as your IDE.

- [x]   You have stopped any local canister execution environment processes running on the local computer.


## Create a new project

To create a new project directory for your custom frontend dapp:

- #### Step 1:  Open a terminal shell on your local computer, if you don’t already have one open.

- #### Step 2:  Change to the folder you are using for your Internet Computer projects, if you are using one.

- #### Step 3:  Verify that you have `node.js` installed locally, if necessary.

- #### Step 4:  Create a new project by running the following command:

        dfx new contacts

- #### Step 5:  Change to your project directory by running the following command:

        cd contacts

## Install the React framework

If you’ve never used React before, you might want to explore the [intro to React](https://reactjs.org/tutorial/tutorial.html) tutorial or the [React website](https://reactjs.org/) before editing the frontend code.

To install required framework modules:

- #### Step 1:  Install the React module by running the following command:

        npm install --save react react-dom

- #### Step 2:  Install the required TypeScript language compiler loader by running the following command:

        npm install --save-dev typescript ts-loader

- #### Step 3:  Install the required style loaders by running the following command:

        npm install --save-dev style-loader css-loader

    If the `npm install` command reports a vulnerability, you might also want to run the `npm audit fix` command to attempt to fix the vulnerability reported before continuing.

    As an alternative to installing these modules, you can edit the default `package.json` file to add dependencies for your project like [this](_attachments/add-stylesheet-package.json).

    The version of the JavaScript agent in this example `package.json` file is `0.10.0`. In most cases, however, you would want to use the latest version of the agent available. When you create a new project, the `dfx new` command automatically retrieves the latest version of the JavaScript agent for you. You can also manually retrieve the latest version after creating a project by running the `npm install --save @dfinity/agent` command.

## Modify the default program

For this guide, you are going to modify the main program to with code that allows you to store and look up contact information.

To modify the default program:

- #### Step 1:  Open the `src/contacts/main.mo` file in a text editor and delete the existing content.

- #### Step 2:  Copy and paste [this code](_attachments/contacts.mo) into the file.

- #### Step 3:  Save your changes and close the `main.mo` file to continue.

## Modify the frontend files

You are now ready to create a new frontend for your program.

- #### Step 1:  Open the webpack configuration file (`webpack.config.js`) in a text editor.

- #### Step 2:  Modify the frontend entry to replace the default index.html with index.jsx.

        entry: {
          // The frontend.entrypoint points to the HTML file for this build, so we need
          // to replace the extension to `.js`.
          index: path.join(__dirname, asset_entry).replace(/\.html$/, ".jsx"),
        },

- #### Step 3:  Locate the commented example for the `module` key above the `plugins` section, then uncomment the following lines:

        module: {
          rules: [
            { test: /\.(js|ts)x?$/, loader: "ts-loader" },
            { test: /\.css$/, use: ['style-loader','css-loader'] }
          ]
        },

    These settings enable your program to use the `ts-loader` compiler and to import CSS files.

:::info
    Note: if you want to add support for `.scss` or `.sass` files, you should install `sass-loader` with:

        npm install --save react react-dom

    and then add this additional rule beneath the `css-loader` rule in `webpack.config.js`:

        module: {
          rules: [
            // ...
            {
              test: /\.s[ac]ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
              ],
            },
          ]
        },
:::

- #### Step 4:  Save your changes and close the `webpack.config.js` file to continue.

- #### Step 5:  Create a new file named `tsconfig.json` in the root directory for your project.

- #### Step 6:  Open the `tsconfig.json` file in a text editor, then copy and paste [this code](_attachments/sample-tsconfig.json) into the file.

- #### Step 7:  Save your changes and close the `tsconfig.json` file to continue.

## Add a stylesheet to your project

You are now ready to create a new cascading stylesheet and add it to your project.

To add a stylesheet:

- #### Step 1:  Change to the `src/contacts_assets/assets` directory.

        cd src/contacts_assets/assets/

- #### Step 2:  Open the `main.css` file in a text editor and delete the existing content.

- #### Step 3:  Define some style properties for the frontend.

    For example, copy and paste [these styles](_attachments/mycontacts.css) into the file.

- #### Step 4:  Save your changes and close the `main.css` file to continue.

- #### Step 5:  Change to the `src/contacts_assets/src` directory.

        cd ../src

- #### Step 6:  Open the default `index.js` file in a text editor and delete the existing content.

- #### Step 7:  Copy and paste [this code](_attachments/mod-index.jsx) into the `index.js` file.

- #### Step 8:  Rename the modified `index.js` file as `index.jsx` by running the following command:

        mv index.js index.jsx

- #### Step 9:  Open the default `src/contacts_assets/src/index.html` file in a text editor, then remove the `main.css` link and update the `body` contents with `<div id="contacts"></div>`.

    For example:

        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width" />
            <title>contacts</title>
            <base href="/" />
          </head>
          <body>
            <main>
              <div id="contacts"></div>
            </main>
          </body>
        </html>

- #### Step 10: Navigate back to the root of your project directory.

    For example:

        cd ../../..

## Start the local network

Before you can build the `contacts` project, you need to connect to the local canister execution environment.

To start the environment locally:

- #### Step 1:  Open a new terminal window or tab on your local computer.

- #### Step 2:  Start the local canister execution environment on your local computer by running the following command:

        dfx start --background

    After the environment completes its startup operations, you can continue to the next step.

## Register, build, and deploy the dapp

After you connect to the local canister execution environment in your development environment, you can register, build, and deploy your dapp for testing.

To deploy the dapp:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

- #### Step 2:  Register, build, and deploy your dapp by running the following command:

        dfx deploy

    The `dfx deploy` command output displays information about the operations it performs.

    Keep in mind that because you are running the canister execution environment locally, the identifiers displayed when you run the `dfx deploy` command are only valid on your machine.

    To deploy canisters on the IC, you must specify that you are deploying to the Internet Computer and not your local environment by using the `--network` command-line option:

        dfx deploy --network=ic

- #### Step 3:  Start the Webpack development server:

        npm start

## View the frontend

You can now access the frontend for the `contacts` dapp.

To view the frontend:

- #### Step 1:  Open a browser and navigate to the `http://localhost:8080`.

- #### Step 2:  Verify that you are prompted with a "My Contacts" form.

    For example:

    ![Sample frontend](_attachments/mycontacts-form.png)

- #### Step 3:  Create one or more test records by entering text in the Name, Address, and Email input fields and a number in the Phone input field, then clicking **Add Contact**.

- #### Step 4:  Clear the form fields and type a contact name in the Lookup name field, then click **Lookup** to see the stored contact information.

    Keep in mind that the **Lookup name** you type must be an exact match for the name of a contact you added.

## Modify the stylesheet and test your changes

After viewing the Contacts dapp, you might want to make some changes.

To change stylesheet properties:

- #### Step 1:  Open the `src/contacts_assets/assets/mycontacts.css` file in a text editor and modify its style settings.

    For example, you might want to change the background color or style the input form.

    You should see the changes update immediately in your open browser window.

## Modify the frontend or backend code

If you want to explore further, you might want to experiment with modifying the frontend or backend code for this guide. For example, you might want try modifying the guide to do the following:

-   Change the frontend code to clear the input fields after adding a new contact, for example, as part of an `onClick` event.

-   Change the Motoko program functions to do partial instead of exact string matching on the `Name` field. (You will need to run `dfx deploy` to test your changes on the local environment).

-   Change the Motoko program to allow lookups based on a different field.

## Stop the local canister execution environment

After you finish experimenting with your program, you can stop the local environment so that it doesn’t continue running in the background.

To stop the local development environment:

- #### Step 1:  In the terminal that displays your webpack dev server, press Control-C to interrupt the development server.

- #### Step 2:  Stop the Internet Computer network by running the following command:

        dfx stop
