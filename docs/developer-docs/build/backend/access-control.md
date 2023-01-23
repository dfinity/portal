# Add access control with identities

Dapps often require role-based permissions to control the operations different users can perform.

To illustrate how to create and switch between user identities, this tutorial creates a simple dapp that displays a different greeting for users who are assigned to different roles.

In this example, there are three named roles—`owner`, `admin`, and `authorized`.

- Users who are assigned an `admin` role see a greeting that displays `You have a role with administrative privileges`.

- Users who are assigned an `authorized` role see a greeting that displays `Would you like to play a game?`.

- Users who are not assigned one of these roles see a greeting that displays `Nice to meet you!`.

In addition, only the user identity that initialized the canister is assigned the `owner` role and only the `owner` and `admin` roles can assign roles to other users.

At a high-level, each user has a public/private key pair. The public key combined with the canister identifier the user accesses forms a security principal that can then be used as a message caller to authenticate function calls made to the canister running on the Internet Computer blockchain. The following diagram provides a simplified view of how user identities authenticate message callers.

![principal identities](../_attachments/principal-identities.svg)

## Before you begin

Before starting the tutorial, verify the following:

- You have downloaded and installed the SDK package as described in [Download and install](/developer-docs/build/install-upgrade-remove.mdx).

- You have run at least one command that resulted in your `default` user identity being created. Your default user identity is stored globally for all projects in the `$HOME/.config/dfx/identity/` directory.

- You have installed the Visual Studio Code plugin for Motoko as described in [VS Code extensions for IC development](/developer-docs/setup/vs-code.md) if you are using Visual Studio Code as your IDE.

- You have stopped any local canister execution environment processes running on your computer.

## Create a new project

To create a new project directory for testing access control and switching user identities:

1.  Open a terminal shell on your local computer, if you don’t already have one open.

2.  Change to the folder you are using for your Internet Computer blockchain projects, if you are using one.

3.  Create a new project by running the following command:

        dfx new access_hello

4.  Change to your project directory by running the following command:

        cd access_hello

## Modify the default dapp

For this tutorial, you are going to replace the template source code file with a dapp that has functions for assigning and retrieving roles.

To modify the default dapp:

1.  Open the `src/access_hello/main.mo` file in a text editor and delete the existing content.

2.  Copy and paste [this code](../_attachments/access-control-main.mo) into the file.

    Let's take a look at a few key elements of this dapp:

    - You might notice that the `greet` function is a variation on the `greet` function you have seen in previous tutorials.

      In this dapp, however, the `greet` function uses a message caller to determine the permissions that should be applied and, based on the permissions associated with the caller, which greeting to display.

    - The dapp defines two custom types—one for `Roles` and one for `Permissions`.

    - The `assign_roles` function enables the message caller to assign a role to the principal associated with an identity.

    - The `callerPrincipal` function enables you to return the principal associated with an identity.

    - The `my_role` function enables you to return the role that is associated with an identity.

3.  Save your changes and close the `main.mo` file to continue.

## Start the local canister execution environment

Before you can build the `access_hello` project, you need to connect to the local canister execution environment running in your development environment or to the Internet Computer blockchain mainnet.

To start the local canister execution environment:

1.  Open a new terminal window or tab on your local computer.

2.  Navigate to the root directory for your project, if necessary.

3.  Start the local canister execution environment on your computer by running the following command:

        dfx start --background

    After the local canister execution environment completes its startup operations, you can continue to the next step.

## Register, build, and deploy the dapp

After you connect to the local canister execution environment running in your development environment, you can register, build, and deploy your dapp in a single step by running the [`dfx deploy`](/references/cli-reference/dfx-deploy.md) command. You can also perform each of these steps independently using separate [`dfx canister create`](/references/cli-reference/dfx-canister.md#dfx_canister_create), [`dfx build`](/references/cli-reference/dfx-build.md), and [`dfx canister install`](/references/cli-reference/dfx-canister.md#dfx_canister_install) commands.

To deploy the dapp locally:

1.  Check that you are still in the root directory for your project, if needed.

2.  Register, build, and deploy the `access_hello` backend dapp by running the following command:

        dfx deploy access_hello

        Creating a wallet canister on the local network.
        The wallet canister on the "local" network for user "default" is "rwlgt-iiaaa-aaaaa-aaaaa-cai"
        Deploying: access_hello
        Creating canisters...
        Creating canister "access_hello"...
        "access_hello" canister created with canister id: "rrkah-fqaaa-aaaaa-aaaaq-cai"
        Building canisters...
        Installing canisters...
        Installing code for canister access_hello, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai
        Deployed canisters.

## Check the current identity context

Before we create any additional identities, let’s review the principal identifiers associated with your `default` identity and the cycles wallet for your `default` identity. On the Internet Computer blockchain, a principal is the internal representative for a user, canister, node, or subnet. The textual representation for a principal is the external identifier you see displayed with working with the principal data type.

To review your current identity and principle:

1.  Verify the currently-active identity by running the following command:

        dfx identity whoami

    The command displays output similar to the following:

        default

2.  Check the principal for the `default` user identity by running the following command:

        dfx identity get-principal

    The command displays output similar to the following:

        zen7w-sjxmx-jcslx-ey4hf-rfxdq-l4soz-7ie3o-hti3o-nyoma-nrkwa-cqe

3.  Check the role associated with the `default` user identity by running the following command:

        dfx canister call access_hello my_role

    The command displays output similar to the following:

        (opt variant { owner })

## Create a new user identity

To begin testing the access controls in our dapp, let’s create some new user identities and assign those users to different roles.

To create a new user identity:

1.  Check that you are still in your project directory, if needed.

2.  Create a new administrative user identity by running the following command:

        dfx identity new ic_admin

    The command displays output similar to the following:

        Creating identity: "ic_admin".
        Created identity: "ic_admin".

3.  Call the `my_role` function to see that your new user identity has not been assigned to any role.

        dfx --identity ic_admin canister call access_hello my_role

    The command displays output similar to the following:

        Creating a wallet canister on the local network.
        The wallet canister on the "local" network for user "ic_admin" is "ryjl3-tyaaa-aaaaa-aaaba-cai"
        (null)

4.  Switch your currently-active identity context to use the new `ic_admin` user identity and display the principal associated with the `ic_admin` user by running the following command:

        dfx identity use ic_admin && dfx identity get-principal

    The command displays output similar to the following:

        Using identity: "ic_admin".
        c5wa6-3irl7-tuxuo-4vtyw-xsnhw-rv2a6-vcmdz-bzkca-vejmd-327zo-wae

5.  Check the principal used to call the `access_hello` canister by running the following command:

        dfx canister call access_hello callerPrincipal

    The command displays output similar to the following:

        (principal "ryjl3-tyaaa-aaaaa-aaaba-cai")

    By default, the cycles wallet identifier is the principal used to call the methods in the `access_hello` canister. To illustrate access control, however, we want to use the principal associated with the user context, not the cycles wallet. Before we get to that step, though, let’s assign a role to the `ic_admin` user. To do that, we need to switch to the `default` user identity that has the `owner` role.

## Assign a role to an identity

To assign the admin role to the IC_admin identity:

1.  Switch your currently-active identity context to use the `default` user identity by running the following command:

        dfx identity use default

2.  Assign the `ic_admin` principal the `admin` role by running a command similar to the following using Candid syntax:

        dfx canister call access_hello assign_role '((principal "c5wa6-3irl7-tuxuo-4vtyw-xsnhw-rv2a6-vcmdz-bzkca-vejmd-327zo-wae"),opt variant{admin})'

Be sure to replace the `principal` hash with the one returned by the `dfx identity get-principal` command for the `ic_admin` identity.

\+ Optionally, you can rerun the command to call the `my_role` function to verify the role assignment.

\+

    dfx --identity ic_admin canister call access_hello my_role

\+ The command displays output similar to the following:

\+

    (opt variant { admin })

1.  Call the `greet` function using the `ic_admin` user identity that you just assigned the `admin` role by running the following command:

        dfx --identity ic_admin canister call access_hello greet "Internet Computer Admin"

    The command displays output similar to the following:

        (
          "Hello, Internet Computer Admin. You have a role with administrative privileges.",
        )

## Add an authorized user identity

At this point, you have a `default` user identity with the `owner` role and an `ic_admin` user identity with the `admin` role. Let’s add another user identity and assign it to the `authorized` role. For this example, however, we’ll use an environment variable to store the user’s principal.

To add a new authorized user identity:

1.  Check that you are still in your project directory, if needed.

2.  Create a new authorized user identity by running the following command:

        dfx identity new alice_auth

    The command displays output similar to the following:

        Creating identity: "alice_auth".
        Created identity: "alice_auth".

3.  Switch your currently-active identity context to use the new `alice_auth` user identity by running the following command:

        dfx identity use alice_auth

4.  Store the principal for the `alice_auth` user in an environment variable by running the following command:

        ALICE_ID=$(dfx identity get-principal)

    You can verify the principal stored by running the following command:

        echo $ALICE_ID

    The command displays output similar to the following:

        b5quc-npdph-l6qp4-kur4u-oxljq-7uddl-vfdo6-x2uo5-6y4a6-4pt6v-7qe

5.  Use the `ic_admin` identity to assign the `authorized` role to `alice_auth` by running the following command:

        dfx --identity ic_admin canister call access_hello assign_role "(principal \"$ALICE_ID\", opt variant{authorized})"

6.  Call the `my_role` function to verify the role assignment.

        dfx --identity alice_auth canister call access_hello my_role

    The command displays output similar to the following:

        (opt variant { authorized })

7.  Call the `greet` function using the `alice_auth` user identity that you just assigned the `authorized` role by running the following command:

        dfx canister call access_hello greet "Alice"

    The command displays output similar to the following:

        (
          "Welcome, Alice. You have an authorized account. Would you like to play a game?",
        )

## Add an unauthorized user identity

You have now seen a simple example of creating users with specific roles and permissions. The next step is to create a user identity that is not assigned to a role or given any special permissions.

To add an unauthorized user identity:

1.  Check that you are still in your project directory, if needed.

2.  Check your currently-active identity, if needed, by running the following command:

        dfx identity whoami

3.  Create a new user identity by running the following command:

        dfx identity new bob_standard

    The command displays output similar to the following:

        Creating identity: "bob_standard".
        Created identity: "bob_standard".

4.  Store the principal for the `bob_standard` user in an environment variable by running the following command:

        BOB_ID=$(dfx --identity bob_standard identity get-principal)

5.  Attempt to use the `bob_standard` identity to assign a role.

        dfx --identity bob_standard canister call access_hello assign_role "(principal \"$BOB_ID\", opt variant{authorized})"

    This command returns an `unauthorized` error.

6.  Attempt to use the `default` user identity to assign `bob_standard` the `owner` role by running the following command:

        dfx --identity default canister call access_hello assign_role "(principal \"$BOB_ID\", opt variant{owner})"

    This command fails because users cannot be assigned the `owner` role.

7.  Call the `greet` function using the `bob_standard` user identity by running the following command:

        dfx --identity bob_standard canister call access_hello greet "Bob"

    The command displays output similar to the following:

        ("Greetings, Bob. Nice to meet you!")

## Set the user identity for multiple commands

So far, you have seen how to create and switch between user identities for individual commands. You can also specify a user identity you want to use, then run multiple commands in the context of that user identity.

To run multiple commands under one user identity:

1.  Check that you are still in your project directory, if needed.

2.  List the user identities currently available by running the following command:

        dfx identity list

    The command displays output similar to the following with an asterisk indicating the currently-active user identity.

        alice_auth
        bob_standard
        default *
        ic_admin

    In this example, the `default` user identity is used unless you explicitly select a different identity.

3.  Select a new user identity from the list and make it the active user context by running a command similar to the following:

        dfx identity use ic_admin

    \+ The command displays output similar to the following:

        Using identity: "ic_admin".

    If you rerun the `dfx identity list` command, the `ic_admin` user identity displays an asterisk to indicate it is the currently active user context.

    You can now run commands using the selected user identity without specifying `--identity` on the command-line.

## Stop the local canister execution environment

After you finish experimenting with the dapp and using identities, you can stop the local canister execution environment so that it doesn’t continue running in the background.

To stop the local canister execution environment:

1.  In the terminal that displays network operations, press Control-C to interrupt the local network process.

2.  Stop the local canister execution environment by running the following command:

        dfx stop

## Want to learn more?

If you are looking for more information about identity and authentication, check out the following related resources:

- [dfx identity (command reference)](/references/cli-reference/dfx-identity.md)

<!-- -   [Set an identity to own a canister (how-to)](../../working-with-canisters#set-owner) -->
