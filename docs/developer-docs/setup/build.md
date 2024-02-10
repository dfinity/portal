# Build

## Overview

After you have written source code for your project, you need to compile it into a WebAssembly module before deploying it as a canister.

If you are only compiling your project for local debugging, you can generate a locally-defined identifier for your project.

To generate a locally-defined identifier:

- #### Step 1:  Create a project with the configuration settings and program logic to suit your needs.

- #### Step 2:  Start the local canister execution environment, if necessary.

    If you were compiling canisters to run on a remote execution environment, e.g. ICP blockchain, you would include the `--network` command-line option to perform tasks on the environment specified under this parameter.

- #### Step 3:  Generate hard-coded local identifiers for the canisters defined in the `dfx.json` by running the following command:

        dfx build --check

    Note that you must register unique canister identifiers to replace your locally-defined identifier before you can deploy the project on ICP blockchain.