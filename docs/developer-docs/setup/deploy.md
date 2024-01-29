# Deploy

After you have compiled a program, you can install the compiled code in a canister running either on a local canister execution environment or on ICP blockchain.

The canister identifier that was created in advance or during the build process determines where your code is installed during deployment.

To deploy the code for the first time:

- #### Step 1:  Open a new terminal and navigate to your project directory.

- #### Step 2:  Start the local canister execution environment, if necessary.

    In most cases, this step is only necessary if you are running the canisters locally.

    If you were registering canisters to run on a remote execution environment, e.g. ICP blockchain, you would include the `--network` command-line option to perform tasks on the environment specified under this parameter.

- #### Step 3:  Verify you have canister identifiers for all of the canisters you want to deploy.

- #### Step 4:  Deploy all of the canisters by running the following command:

        dfx canister install --all
