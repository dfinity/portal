
# Local deployment

When developing canisters and projects, it is recommended to first deploy your project to the local development environment. This is so you can fabricate cycles in your local development environment, which you cannot do on the mainnet. Cycles are charged for the resources used by your canister. You can learn more about cycles [here](/docs/developer-docs/gas-cost.md).

Deploying to your local development environment is similar to deploying to a testnet. ICP does not have a testnet available for developers to deploy to. Instead, the IC SDK runs a local version of the ICP node software known as the **replica** and provides a single-node environment on your local machine for you to deploy canisters to. 

## Prerequisites

Before you create your first canister, verify the following:

-   [x] You have an internet connection and access to a shell terminal on your local computer.

-   [x] You have `node.js` installed if you want to include the default template files for frontend development in your project.

-   [x] You have downloaded and installed the IC SDK package as described in the [installing the IC SDK](../setup/install/index.mdx) page.

## Start the local deployment

Before you can build your first project, you need to connect to the local replica. As a best practice, this step requires you to have **two terminal shells** open, so that you can start and see canister execution operations in one terminal and manage your project in another.

To prepare the local replica:

- #### Step 1:  Open a new second terminal window or tab on your local computer.

- #### Step 2:  Navigate to the root directory for your project, if necessary.

    You should now have **two terminals** open with your **project directory** as your **current working directory** in both terminals.

- #### Step 3:  Start the local replica on your computer in your second terminal by running the following command:

        dfx start

    Depending on your platform and local security settings, you might see a warning displayed. If you are prompted to allow or deny incoming network connections, click **Allow**.

- #### Step 4:  Leave the terminal window that displays canister execution operations open and switch your focus to the first terminal window where you created your new project.

    You should perform the remaining steps in the terminal that doesn’t display canister execution operations.

## Register, build, and deploy the application

After you connect to the local canister execution environment you can register, build, and deploy your dapp locally.

To deploy your first canister locally:

- #### Step 1:  Check that you are still in the root directory for your project, if needed.

It is recommended to follow the [creating your first canister](./first-canister) guide to have a simple 'Hello, world!' canister ready to deploy. 

- #### Step 2:  Ensure that `node` modules are available in your project directory, if needed, by running the following command:

        npm install

    For more information about this step, see [ensuring node is available in a project](/developer-docs/frontend/index.md#troubleshoot-node).

- #### Step 3:  Register, build, and deploy your first dapp by running the following command:

        dfx deploy

    The `dfx deploy` command output displays information about the operations it performs. For example, this step registers two identifiers. One is for the `hello_backend` main program and the other one for the `hello_frontend` frontend user interface and installation information similar to the following:

        Creating a wallet canister on the local network.
        The wallet canister on the "local" network for user "mainnet" is "rwlgt-iiaaa-aaaaa-aaaaa-cai"
        Deploying all canisters.
        Creating canisters...
        Creating canister hello_backend...
        hello_backend canister created with canister id: rrkah-fqaaa-aaaaa-aaaaq-cai
        Creating canister hello_frontend...
        hello_frontend canister created with canister id: ryjl3-tyaaa-aaaaa-aaaba-cai
        Building canisters...
        Building frontend...
        Installing canisters...
        Creating UI canister on the local network.
        The UI canister on the "local" network is "r7inp-6aaaa-aaaaa-aaabq-cai"
        Installing code for canister hello_backend, with canister ID rrkah-fqaaa-aaaaa-aaaaq-cai
        Installing code for canister hello_frontend, with canister ID ryjl3-tyaaa-aaaaa-aaaba-cai
        Uploading assets to asset canister...
        Starting batch.
        Staging contents of new and changed assets:
          /sample-asset.txt 1/1 (24 bytes)
          /logo2.svg 1/1 (15139 bytes)
          /index.js.map 1/1 (681670 bytes)
          /index.js.map (gzip) 1/1 (156940 bytes)
          /favicon.ico 1/1 (15406 bytes)
          /main.css 1/1 (537 bytes)
          /main.css (gzip) 1/1 (297 bytes)
          /index.html 1/1 (690 bytes)
          /index.html (gzip) 1/1 (386 bytes)
          /index.js (gzip) 1/1 (152884 bytes)
          /index.js 1/1 (637230 bytes)
        Committing batch.
        Deployed canisters.
        URLs:
          Frontend canister via browser
            hello_frontend: http://127.0.0.1:4943/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai
          Backend canister via Candid interface:
            hello_backend: http://127.0.0.1:4943/?canisterId=r7inp-6aaaa-aaaaa-aaabq-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai

    If you created a project with a different name, however, your canister names will match your project name instead of `hello_backend` and `hello_frontend`.

- #### Step 4:  Call the `hello_backend` canister and the predefined `greet` function by running the following command:

        dfx canister call hello_backend greet everyone

    Let’s take a closer look at this example command:

    -   The `dfx canister call` command requires you to specify a canister name and a method or function to call.

    -   `hello_backend` specifies the name of the **canister** you want to call.

    -   `greet` specifies the name of the **function** you want to call in the `hello` canister.

    -   `everyone` is the text data type argument that you want to pass to the `greet` function.

    Remember, however, that if you created a project with a different name, the canister name will match your project name and you’ll need to modify the command line to match the name you used instead of `hello_backend`. If you were to choose `test` as the projects name, your backend canister would be called `test_backend` and the frontend canister `test_frontend`.

- #### Step 5:  Verify the command displays the return value of the `greet` function.

    For example:

        ("Hello, everyone!")

## Test the dapp frontend

Now that you have verified that your dapp has been deployed and tested its operation using the command line, let’s verify that you can access the frontend using your web browser.

- #### Step 1:  Open a browser.

- #### Step 2:  Navigate to the URL output by the `dfx deploy` command in the previous step. 

Use the URL after `Frontend canister via browser`; in our case that's `http://127.0.0.1:4943/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai`.

Navigating to this URL displays a basic HTML page with a sample asset image file, an input field, and a button. For example:

![Sample HTML page](_attachments/frontend-prompt.png)

- #### Step 3:  Type a greeting, then click **Click Me** button to return the greeting.

    For example:

    ![Hello](_attachments/frontend-result.png)

## Stop the local canister execution environment

After testing the application in the browser, you can stop the local canister execution environment so that it doesn’t continue running in the background.

To stop the local deployment:

- #### Step 1:  In the terminal that displays the development server, press Control-C to interrupt the development server process.

- #### Step 2:  In the terminal that displays canister execution operations, press Control-C to interrupt the local network process.

- #### Step 3:  Stop the local canister execution environment running on your local computer by running the following command:

        dfx stop

## Next steps

Next, you can deploy your canister on the mainnet.

- [Mainnet deployment](deploy-mainnet.md)


