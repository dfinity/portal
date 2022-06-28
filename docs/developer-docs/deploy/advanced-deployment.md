# Deployment

Once your dapp is ready to be deployed, there are a few options for deploying and testing your dapp.

1. If your dapp has a frontend, you can run your locally in the browser
2. You can deploy your full dapp (backend and frontend) to a local environment simulating the IC
3. You can deploy your IC mainnet

## Run your dapp's frontend on the browser

The most minimal version of running your dapp is to run its frontend in your local browser.

```bash
# install necessary components
npm install

# Starts a local version of the frontend only (visible on http://localhost:8080/)
npm start
```

Navigating to http://localhost:8080 displays a simple HTML page with a sample asset image file, an input field, and a button. For example:

\+ ![Sample HTML page](_attachments/frontend-prompt.png)

## Deploying a dapp to local environment 

As a best practice, this step requires you to have **two terminal shells** open, so that you can start and see canister execution operations in one terminal and manage your project in another.

### Terminal 1: Start the local environment 

Before you can build your first project, you need to connect to the local canister execution environment.

To prepare the local canister execution environment:

1.  Open a new second terminal window or tab on your local computer.

2.  Navigate to the root directory for your project, if necessary.

    You should now have **two terminals** open with your **project directory** as your **current working directory** in both terminals.

3.  Start the local canister execution environment on your computer in your second terminal by running the following command:

```bash
# start local execution environment
dfx start
```

Depending on your platform and local security settings, you might see a warning displayed. If you are prompted to allow or deny incoming network connections, click **Allow**.

4.  Leave the terminal window that displays canister execution operations open and switch your focus to the first terminal window where you created your new project.

You perform the remaining steps in the terminal that doesn’t display canister execution operations.

### Terminal 2: Register, build, and deploy the dapp locally

After you connect to the local canister execution environment you can register, build, and deploy your dapp locally.

To deploy your first dapp locally:

1.  Check that you are still in the root directory for your project, if needed.

2.  Ensure that `node` modules are available in your project directory, if needed, by running the following command:

```bash
npm install
```

For more information about this step, see [Ensuring node is available in a project](../build/frontend/webpack-config#troubleshoot-node).

3.  Register, build, and deploy your first dapp by running the following command:

```bash
dfx deploy
```

    The `dfx deploy` command output displays information about the operations it performs. For example, this step registers two identifiers—one for the `hello` main program and one for the `hello_assets` frontend user interface—and installation information similar to the following:

        Creating a wallet canister on the local network.
        The wallet canister on the "local" network for user "default" is "rwlgt-iiaaa-aaaaa-aaaaa-cai"
        Deploying all canisters.
        Creating canisters...
        Creating canister "hello"...
        "hello" canister created with canister id: "rrkah-fqaaa-aaaaa-aaaaq-cai"
        Creating canister "hello_assets"...
        "hello_assets" canister created with canister id: "ryjl3-tyaaa-aaaaa-aaaba-cai"
        Building canisters...
        Building frontend...
        Installing canisters...
        Creating UI canister on the local network.
        The UI canister on the "local" network is "r7inp-6aaaa-aaaaa-aaabq-cai"
        Installing code for canister hello, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai
        Installing code for canister hello_assets, with canister_id ryjl3-tyaaa-aaaaa-aaaba-cai
        Authorizing our identity (default) to the asset canister...
        Uploading assets to asset canister...
          /index.html 1/1 (573 bytes)
          /index.html (gzip) 1/1 (342 bytes)
          /index.js 1/1 (605692 bytes)
          /index.js (gzip) 1/1 (143882 bytes)
          /main.css 1/1 (484 bytes)
          /main.css (gzip) 1/1 (263 bytes)
          /sample-asset.txt 1/1 (24 bytes)
          /logo.png 1/1 (25397 bytes)
          /index.js.map 1/1 (649485 bytes)
          /index.js.map (gzip) 1/1 (149014 bytes)
        Deployed canisters.
        URLs:
        Frontend:
            hello_assets: http://127.0.0.1:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai
        Candid:
            hello: http://127.0.0.1:8000/?canisterId=r7inp-6aaaa-aaaaa-aaabq-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai

If you created a project with a different name, however, your canister names will match your project name instead of `hello` and `hello_assets`.

You should also note that the **first time you deploy**, `dfx` creates a `default` identity and a local cycle wallet controlled by your `default` identity. A cycles wallet is a special type of canister that enables you to transfer [cycles](../../concepts/tokens-cycles) to other canisters.

**To deploy this sample dapp locally**, you don’t need to know anything about your default developer identity, using a cycles wallet, or managing cycles. We’ll cover these topics later, but for now, just note that these are created for you automatically.

### Testing your dapp locally

#### Interacting with the frontend canister

Once you deploy your dapp, the SDK will return a URL where you can interact with your dapp locally.

```bash
URLs:
        Frontend:
            hello_assets: http://127.0.0.1:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai
```

#### Sending messages to the backend canister

You can test your dapp locally by sending messages to the canister or interacting with the fronted (if any).

```bash
dfx canister call $CANISTER_NAME $METHOD $INPUT
```

For example, in the `hello` canister and the predefined `greet` function by running the following command:

```bash
dfx canister call hello greet everyone
```

This will return:

```bash
$  ("Hello, everyone!")
```

Let’s take a closer look at this example command:

-   The `dfx canister call` command requires you to specify a canister name and a method—or function—to call.

-   `hello` specifies the name of the **canister** you want to call.

-   `greet` specifies the name of the **function** you want to call in the `hello` canister.

-   `everyone` is the text data type argument that you want to pass to the `greet` function.

Remember, however, that if you created a project with a different name, the canister name will match your project name and you’ll need to modify the command line to match the name you used instead of `hello`.

## Deploying a dapp to the IC mainnet



## Troubleshooting
