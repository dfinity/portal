# Add a stylesheet

Cascading stylesheets are an important part of any front-end user interface. The default starter is configured to import a `main.css` file that you can edit, but you may prefer to import your stylesheet into a JavaScript file, or to use an alternate format such as Syntactically Awesome Style Sheets, aka SCSS. This tutorial illustrates how to configure webpack to import a stylesheet by walking through building a contact dapp. If you already know how to add cascading stylesheets (CSS) to a webpack-based project, you can skip this tutorial.

This tutorial illustrates using the React framework to manage the Document Object Model (DOM) for your front-end. Because React has its own custom DOM syntax, you need to modify the webpack configuration to compile the front-end code, which is written in JSX. For more information about learning to use React and JSX, see [Getting started](https://reactjs.org/docs/getting-started.html) on the [React website](https://reactjs.org/).

## Before you begin

Before starting the tutorial, verify the following:

-   You have `node.js` installed for front-end development and can install packages using `npm install` in your project. For information about installing node for your local operating system and package manager, see the [Node](https://nodejs.org/en/) website.

-   You have downloaded and installed the {sdk-short-name} package as described in [Download and install](../../quickstart/local-quickstart.xml#download-and-install).

-   You have installed the Visual Studio Code plugin for Motoko as described in [Install the language editor plug-in](../../quickstart/local-quickstart.xml#install-vscode) if you are using Visual Studio Code as your IDE.

-   You have stopped any local canister execution environment processes running on the local computer.

This tutorial requires you to use the {sdk-short-name} version `0.8.0` or later.

## Create a new project

To create a new project directory for your custom front-end dapp:

1.  Open a terminal shell on your local computer, if you don’t already have one open.

2.  Change to the folder you are using for your Internet Computer projects, if you are using one.

3.  Verify that you have `node.js` installed locally, if necessary.

4.  Create a new project by running the following command:

        dfx new contacts

5.  Change to your project directory by running the following command:

        cd contacts

## Install the React framework

if you’ve never used React before, you might want to explore the [Intro to React](https://reactjs.org/tutorial/tutorial.html) tutorial or the [React website](https://reactjs.org/) before editing the front-end code.

To install required framework modules:

1.  Install the React module by running the following command:

        npm install --save react react-dom

2.  Install the required TypeScript language compiler loader by running the following command:

        npm install --save-dev typescript ts-loader

3.  Install the required style loaders by running the following command:

        npm install --save-dev style-loader css-loader

    If the `npm install` command reports a vulnerability, you might also want to run the `npm audit fix` command to attempt to fix the vulnerability reported before continuing.

    As an alternative to installing these modules, you can edit the default `package.json` file to add dependencies for your project.

        Unresolved directive in my-contacts.adoc - include::example$add-stylesheet-package.json[]

    The version of the JavaScript agent in this example `package.json` file is `0.10.0`. In most cases, however, you would want to use the latest version of the agent available. When you create a new project, the `dfx new` command automatically retrieves the latest version of the JavaScript agent for you. You can also manually retrieve the latest version after creating a project by running the `npm install --save @dfinity/agent` command.

## Modify the default program

For this tutorial, you are going to modify the main program to with code that allows you to store and look up contact information.

To modify the default program:

1.  Open the `src/contacts/main.mo` file in a text editor and delete the existing content.

2.  Copy and paste the following sample code into the file:

        Unresolved directive in my-contacts.adoc - include::example$mycontacts/contacts.mo[]

3.  Save your changes and close the `main.mo` file to continue.

## Modify the front-end files

You are now ready to create a new front-end for your program.

1.  Open the webpack configuration file (`webpack.config.js`) in a text editor.

2.  Modify the front-end entry to replace the default index.html with index.jsx.

        entry: {
          // The frontend.entrypoint points to the HTML file for this build, so we need
          // to replace the extension to `.js`.
          index: path.join(__dirname, asset_entry).replace(/\.html$/, ".jsx"),
        },

3.  Locate the commented example for the `module` key above the `plugins` section, then uncomment the following lines:

        module: {
          rules: [
            { test: /\.(js|ts)x?$/, loader: "ts-loader" },
            { test: /\.css$/, use: ['style-loader','css-loader'] }
          ]
        },

4.  These settings enable your program to use the `ts-loader` compiler and to import CSS files.

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

5.  Save your changes and close the `webpack.config.js` file to continue.

6.  Create a new file named `tsconfig.json` in the root directory for your project.

7.  Open the `tsconfig.json` file in a text editor, then copy and paste the following into the file:

        Unresolved directive in my-contacts.adoc - include::example$sample-tsconfig.json[]

8.  Save your changes and close the `tsconfig.json` file to continue.

## Add a stylesheet to your project

You are now ready to create a new cascading stylesheet and add it to your project.

To add a stylesheet:

1.  Change to the `src/contacts_assets/assets` directory.

        cd src/contacts_assets/assets/

2.  Open the `main.css` file in a text editor and delete the existing content.

3.  Define some style properties for the front-end.

    For example, copy and paste the following sample styles into the file:

        Unresolved directive in my-contacts.adoc - include::example$mycontacts/mycontacts.css[]

4.  Save your changes and close the `main.css` file to continue.

5.  Change to the `src/contacts_assets/src` directory.

        cd ../src

6.  Open the default `index.js` file in a text editor and delete the existing content.

7.  Copy and paste the following sample code into the `index.js` file:

        Unresolved directive in my-contacts.adoc - include::example$mycontacts/mod-index.jsx[]

8.  Rename the modified `index.js` file as `index.jsx` by running the following command:

        mv index.js index.jsx

9.  Open the default `src/contacts_assets/src/index.html` file in a text editor, then remove the `main.css` link and update the `body` contents with `<div id="contacts"></div>`.

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

10. Navigate back to the root of your project directory.

    For example:

        cd ../../..

## Start the local network

Before you can build the `contacts` project, you need to connect to the local canister execution environment.

To start the environment locally:

1.  Open a new terminal window or tab on your local computer.

2.  Start the local canister execution environment on your local computer by running the following command:

        dfx start --background

    After the environment completes its startup operations, you can continue to the next step.

## Register, build, and deploy the dapp

After you connect to the local canister execution environment in your development environment, you can register, build, and deploy your dapp for testing.

To deploy the dapp:

1.  Check that you are still in the root directory for your project, if needed.

2.  Register, build, and deploy your dapp by running the following command:

        dfx deploy

    The `dfx deploy` command output displays information about the operations it performs.

    Keep in mind that because you are running the canister execution environment locally, the identifiers displayed when you run the `dfx deploy` command are only valid on your machine.

    To deploy canisters on the {platform}, you must specify that you are deploying to the Internet Computer and not your local environment by using the `--network` command-line option:

        dfx deploy --network=ic

3.  Start the Webpack development server:

        npm start

## View the front-end

You can now access the front-end for the `contacts` dapp.

To view the front-end:

1.  Open a browser and navigate to the `http://localhost:8080`.

2.  Verify that you are prompted with a **My Contacts** form.

    For example:

    ![Sample front-end](../_attachments/mycontacts-form.png)

3.  Create one or more test records by entering text in the Name, Address, and Email input fields and a number in the Phone input field, then clicking **Add Contact**.

4.  Clear the form fields and type a contact name in the Lookup name field, then click **Lookup** to see the stored contact information.

    Keep in mind that the **Lookup name** you type must be an exact match for the name of a contact you added.

## Modify the stylesheet and test your changes

After viewing the Contacts dapp, you might want to make some changes.

To change stylesheet properties:

1.  Open the `src/contacts_assets/assets/mycontacts.css` file in a text editor and modify its style settings.

    For example, you might want to change the background color or style the input form.

    You should see the changes update immediately in your open browser window.

## Modify the front-end or back-end code

If you want to explore further, you might want to experiment with modifying the front-end or back-end code for this tutorial. For example, you might want try modifying the tutorial to do the following:

-   Change the front-end code to clear the input fields after adding a new contact, for example, as part of an `onClick` event.

-   Change the Motoko program functions to do partial instead of exact string matching on the `Name` field. (You will need to run `dfx deploy` to test your changes on the local environment)

-   Change the Motoko program to allow lookups based on a different field.

## Stop the local canister execution environment

After you finish experimenting with your program, you can stop the local environment so that it doesn’t continue running in the background.

To stop the local development environment:

1.  In the terminal that displays your webpack dev server, press Control-C to interrupt the development server.

2.  Stop the Internet Computer network by running the following command:

        dfx stop
