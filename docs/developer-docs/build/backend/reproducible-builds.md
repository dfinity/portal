# Reproducible Canister Builds

Thanks to its consensus protocol, the Internet Computer always runs canisters' code correctly. But this doesn’t mean that it’s running the *correct* code for a canister. If you are using a canister somebody else developed, you may want to verify that the canister is indeed running some intended code before giving it control to make important decision for you, e.g., sending your ICP to a canister. Verifying this requires answering two questions:

1.  Which WebAssembly (Wasm) code is being executed for a canister?

2.  The canisters are normally written in a higher-level language, such as Motoko or Rust, and not directly in Wasm. The second question is then: is the Wasm that’s running really the result of compiling the purported source code?

The rest of the document answers these questions. For the first question, we will see how the Internet Computer provides information about canister code. To be able to answer the second question, canister authors should ensure trusted and [reproducible builds](https://reproducible-builds.org/docs/definition/) of the Wasm code from the source. Such builds allow anyone to follow the same steps as the canister authors and yield the exact same Wasm code, which can then be compared to the Wasm code executing in the canister on the Internet Computer.

The impatient reader who is familiar with the topic of reproducible builds can skip straight to the [summary](#repro-build-summary).

## Finding out which canister code the Internet Computer is executing

Internet Computer does not allow you to access the Wasm code of an arbitrary canister. This is a design decision, as developers might want to keep some code private. However, the Internet Computer does allow you to access the SHA-256 of the Wasm code of a canister.

To obtain this hash, you must first note the principal of the Internet Computer canister whose code you want to check. For example, assume we’re interested in the code of the Internet Identity canister, whose principal is `rdmx6-jaaaa-aaaaa-aaadq-cai`. Then, the easiest way to access this service is using the [`dfx`](https://dfinity.org/developers/) tool from the terminal. Open your terminal, and run:

    $ dfx canister --network ic info rdmx6-jaaaa-aaaaa-aaadq-cai
    Controller: r7inp-6aaaa-aaaaa-aaabq-cai
    Module hash: 0x92fc8c810afed3c9628dd20ef8d15984122e1197446281cf3035abb70ce75557

If you are running an older version of `dfx`, you will need to run this command from a directory that contains a valid `dfx.json` file. If you don’t have such a directory, you can create it using `dfx new`.

Here, the Internet Computer tells us that the hash of the Wasm module of the `rdmx6-jaaaa-aaaaa-aaadq-cai` canister (which happens to be the Internet Identity canister) is `0x92fc8c810afed3c9628dd20ef8d15984122e1197446281cf3035abb70ce75557`.

The check above provides you the *current* hash of the canister’s Wasm module, but the *controllers* of an Internet Computer canister may change the code at any time (e.g., to upgrade a canister). However, if the list of controllers is empty or the only controller is a [black-hole](https://github.com/ninegua/ic-blackhole) canister, you know that the canister is immutable since nobody has the power to change the code.

Armed with this hash, you can next check whether it corresponds to some given source code. This only works if the build process for the code is reproducible.

## Reproducible builds

As a canister author, there are a few things you have to provide to your users to allow them to reproduce your build:

-   The same source code that you used to create the Wasm module for the canister.

-   Instructions on how to recreate your build environment.

-   Instructions on how to repeat the process of building the Wasm from the source code. Crucially, the process must be deterministic, to ensure that it results in the exact same Wasm. It also has to be trusted, such that the user can be convinced that the Wasm is a faithful translation of the source code, and not an artifact of a malicious build tool. In particular, look for `.dfx`, `node_modules`, and `target` directories that could contain pre-built files.

We next look at each of these points in more detail.

### Providing source code

Typically, you will version your code in `git` or some other version control system, and your versioned code may be available in a public repository, e.g., GitHub. In this case, you should note the particular commit that you used when producing the code to be deployed to the Internet Computer, and communicate it to the users who are trying to verify your canister. Alternatively, you can also provide a package (e.g., a zip file or a tarball) containing the source code you used to build your canister.

### Reproducing build environments

Before building your code, you should document the build environment you are using in detail. In particular, for the languages supported by the Internet Computer SDK:

-   Note down the operating system and its version you are using to build your canister.

-   If you are using `dfx`, note the version used, as specified in `dfx.json`. You can install arbitrary versions of `dfx` using `dfx toolchain install <version>`, or by running the installation script with the `DFX_VERSION` environment variable set to the desired version.

-   If you are building Motoko code in a way other than `dfx build`, note the version of `moc` you are using.

-   If you are building Rust, note the version of `cargo` you are using.

-   If you are using Node.js and/or `webpack` for frontend development, note their versions.

-   If your build process depends on any environment variables (such as the time zone or locale), note them down.

You should communicate all of these to your user in the instructions. Ideally, do so by providing an executable recipe to recreate the build environment, using tools such as Docker or Nix. We recommend using Docker, as this allows you to also pinpoint the operating system used for building the software.

### Build environments using Docker

[Docker containers](https://docs.docker.com/) are a popular solution for providing build environments. For developers using OS X, we recommend installing Docker using [lima](https://github.com/lima-vm/lima), as it proved more stable than Docker Desktop or Docker Machine in our experience (in particular, it avoids some QEMU bugs on Apple M1 machines). After setting Docker up, you can use a `Dockerfile` such as the following to provide the user with a particular version of the operating system, as well as `dfx`, Node.js and the Rust toolchain.

    FROM ubuntu:22.04

    # Install a basic environment needed for our build tools
    RUN \
        apt -yq update && \
        apt -yqq install --no-install-recommends curl ca-certificates \
            build-essential pkg-config libssl-dev llvm-dev liblmdb-dev clang cmake

    # Install Node.js using nvm
    # Specify the Node version
    ENV NODE_VERSION=18.1.0
    RUN curl --fail -sSf https://raw.githubusercontent.com/creationix/nvm/v0.39.1/install.sh | bash
    ENV NVM_DIR=/root/.nvm
    RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
    RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
    RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
    ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

    # Install Rust and Cargo in /opt
    # Specify the Rust toolchain version
    ARG rust_version=1.60.0
    ENV RUSTUP_HOME=/opt/rustup \
        CARGO_HOME=/opt/cargo \
        PATH=/opt/cargo/bin:$PATH
    RUN curl --fail https://sh.rustup.rs -sSf \
            | sh -s -- -y --default-toolchain ${rust_version}-x86_64-unknown-linux-gnu --no-modify-path && \
        rustup default ${rust_version}-x86_64-unknown-linux-gnu && \
        rustup target add wasm32-unknown-unknown
    RUN cargo install ic-cdk-optimizer

    # Install dfx; the version is picked up from the DFX_VERSION environment variable
    ENV DFX_VERSION=0.10.0
    RUN sh -ci "$(curl -fsSL https://smartcontracts.org/install.sh)"

    COPY . /canister
    WORKDIR /canister

    RUN npm ci # if `package.json` and `package-lock.json` is available in your canister directory

There are a couple of things worth noting about this `Dockerfile`:

-   It starts from an official Docker image. Furthermore, all the installed tools are standard, and come from standard sources. This provides the user with confidence that the build environment hasn’t been tampered with, and thus that the build process using Docker can be trusted.

-   To ensure that specific versions of the build tools are installed, it installs them directly, rather than through `apt` (the package manager of Ubuntu, the Linux distribution running inside of the container). Such package managers usually don’t provide a way of pinning the build tools to specific versions.

To use this `Dockerfile`, get Docker [up and running](https://docs.docker.com), place the `Dockerfile` in the project directory of your canister, and create the Docker container by running:

    $ docker build -t mycanister .

This creates a Docker container image called `mycanister`, with Node.js, Rust and `dfx` installed in it, and your canister source code copied to `/canister` (recall that you should invoke `docker build` from the canister project directory). You can then enter an interactive shell inside of your container by running:

    docker run -it --rm mycanister

From here, you can experiment with the steps needed to build your canister. Once you are confident that the steps are deterministic, you can also put them in the `Dockerfile`, to allow the user to automatically reproduce your build when creating the canister. You can see an example in the [Dockerfile of the Internet Identity canister](https://github.com/dfinity/internet-identity/blob/397d0087a29855564c47f0fd3323f60b5b67a8fa/Dockerfile). Next, we will investigate what is necessary to make the build deterministic.

### Ensuring the determinism of the build process

For the build process to be deterministic:

1.  You will need to ensure that any dependencies of your canister are always resolved in the same way. Most build tools now support a way of pinning dependencies to a particular version.

    -   For `npm`, running `npm install` will create a `package-lock.json` file with some fixed versions of all (transitive) dependencies of your project that satisfy the requirements specified in your `package.json`. However, `npm install` will overwrite the `package-lock.json` file every time it is invoked. Thus, once you are ready to create the final version of your canister, run `npm install` only once. After that, commit `package-lock.json` to your version control system. Finally, when checking the build for reproducibility, use `npm ci` instead of `npm install`.

    -   For Rust code, Cargo will automatically generate a `Cargo.lock` file with the fixed versions of your (transitive) dependencies. Like with `package-lock.json`, you should commit this file to your version control system once you are ready to produce the final version of your canister. Furthermore, Cargo by default ignores the locked versions of dependencies. Pass the `--locked` flag to the `cargo` command to ensure that the locked dependencies are used.

    -   You have to allocate canister IDs in advance, as canisters refer to each other by their IDs.

2.  Your own build scripts must not introduce non-determinism. Obvious sources of non-determinism include randomness, timestamps, concurrency, or code obfuscators. Less obvious sources include locales, absolute file paths, order of files in a directory, and remote URLs whose content can change. Furthermore, relying on third-party build plug-ins exposes you to any non-determinism introduced by these.

3.  Given the same dependencies and deterministic build scripts, the build tools themselves (`moc` for Motoko, `cargo` for Rust, `webpack` by default for frontend development) must also be deterministic. The good news is that all of these tools aim to be deterministic. However, they are complicated pieces of software, and ensuring determinism is non-trivial. Thus, non-determinism bugs can and do occur. For Rust, see the [list of current potential non-determinism issues in Rust](https://github.com/rust-lang/rust/labels/A-reproducibility). Furthermore, we have observed differences between Rust code compiled to Wasm under Linux and MacOS, and thus recommend pinning the build platform and its version. For webpack, [deterministic naming of module and chunk IDs](https://webpack.js.org/configuration/optimization/) that you should use have been introduced since version 5. The Motoko compiler aims to be deterministic and reproducible; if you find reproducibility issues, please submit a [new issue](https://github.com/dfinity/motoko/issues/new/choose), and we will try to address them to the extent possible.

### Testing reproducibility

If reproducibility is vital for your code, you should test your builds to increase your confidence in their reproducibility. Such testing is non-trivial: we have seen real-world examples where non-determinism in a canister build took a month to show up! Fortunately, the Debian Reproducible Builds project created a tool called [reprotest](https://salsa.debian.org/reproducible-builds/reprotest), which can help you automate reproducibility tests. It tests your build by running it in two different environments that differ in characteristics such as paths, time, file order, and others, and comparing the results. To use it, you can add the following line to the `Dockerfile` in the root directory of your canister project:

    RUN apt -yqq install --no-install-recommends reprotest disorderfs faketime rsync sudo wabt webpack

Next, create a `canister_ids.json` file containing the IDs of your canisters on the Internet Computer, and put it in your project directory. An example `canister_ids.json` file looks as follows:

    {
      "greet": {
        "ic": "rrkah-fqaaa-aaaaa-aaaaq-cai"
      },
      "greet_assets": {
        "ic": "ryjl3-tyaaa-aaaaa-aaaba-cai"
      }
    }

Now, from the root directory of your canister project, you can test the reproducibility of your `dfx` builds as follows:

    $ docker build -t mycanister .
    ...
    $ docker run --rm --privileged -it mycanister
    root@6fe19d89f8f5:/canister# reprotest -vv --variations '+all,-time' "dfx build --network ic" '.dfx/ic/canisters/*/*.wasm'

The first command builds the Docker container using the `Dockerfile` provided earlier. The second one opens an interactive shell (hence the `-it` flags) in the canister. We run this in privileged mode (the `--privileged` flag), as `reprotest` uses kernel modules for some build environment variations. You can also run it in non-privileged mode by excluding some of the variations; see the [reprotest manual](https://manpages.debian.org/stretch/reprotest/reprotest.1.en.html). We exclude the `time` variation for Rust builds (we observed that Rust builds crashed upon the `time` variation and filed an [issue](https://github.com/wolfcw/libfaketime/issues/402) with `faketime`). For Motoko builds, you could omit `--variations '+all,-time'` and thereby trying out all supported variations. The `--rm` flag will destroy the canister after you close its shell. Finally, once inside of the canister, we launch `reprotest` in verbose mode (the `-vv` flags). You need to give it the build command you want to run as the first argument. Here, we assume that it’s `dfx build --network ic` - adjust it if you’re using a different build process. It will then run the build in two different environments. Finally, you need to tell `reprotest` which paths to compare at the end of the two builds. Here, we compare the Wasm code for all canisters, which is found in the `.dfx/ic` directory.

If the comparison doesn’t find any differences, you will see an output similar to this one:

    No differences in ./.dfx/ic/canisters/*/*.wasm
    502b1be69f7613f6e14924a1a07bc2e061fb13c0fbaa4ae6bbc887cba261103c  ./.dfx/ic/canisters/greet/greet.wasm
    e0df779f65fe44893d8991bef0f9af442bff019b79ec756eface2b58beec236f  ./.dfx/ic/canisters/greet_assets/assetstorage.wasm
    e0df779f65fe44893d8991bef0f9af442bff019b79ec756eface2b58beec236f  ./.dfx/ic/canisters/greet_assets/greet_assets.wasm

Congratulations - this is a good indicator that your build is not affected by your environment! Note that `reprotest` can’t check that your dependencies are pinned properly - use guidelines from the previous section for that. Moreover, we recommend you to run the container `reprotest` builds under several host operating systems and compare the results. If the comparison does find differences between the Wasm code produced in two builds, it will output a diff. You will then likely want to use the `--store-dir` flag of `reprotest` to store the outputs and the diff somewhere where you can analyze them. If you are struggling to achieve reproducibility, consider also using [DetTrace](https://github.com/dettrace/dettrace), which is a container abstraction that tries to make arbitrary builds deterministic.

Finally, even after you achieve reproducibility for your builds, there are still other things to consider for the long term.

### Long-term considerations

Reproducibility can be more demanding if you expect your canister canister code to stay around for years, and stay reproducible. The biggest challenges are to ensure that your:

1.  Build toolchain is still available in the future.

2.  Dependencies are avaiable.

3.  Toolchain still runs and still correctly builds your dependencies.

Distributions and package archives may drop old versions of packages, including both your toolchain and their dependencies. Web sites may go offline and URLs might stop working. Thus, it’s prudent to back up all of your toolchain and dependencies. You should consider getting involved in projects such as [Software Heritage](https://www.softwareheritage.org/), which do this on a large scale. At some later point in time, you might have to adjust your build process (e.g., by changing URLs) to ensure that your canister still builds. Even if the build changes, if it still yields the same result, your users can be confident that your canister is running the correct code. The trust argument is easier if your dependencies come from a trustworthy source, such as the Software Heritage project.

## Summary

Summarizing our recommendations for canister authors:

-   Ideally, when producing the final version of your container code, use Docker or a similar technology to conveniently set up the operating system and the build tools, and fix their versions for the user. If the build tools you are using don’t guarantee fully reproducible builds, Docker can also help by minimizing the differences in paths, environment variables etc.

-   The build tools and the base Docker image should be sourced from somewhere that the user can trust.

-   Rust and Motoko compilers aim to be deterministic, and thus to support reproducible builds. If you notice non-determinism, file bug reports.

-   When using NPM, ensure that you specify the exact versions of all your dependencies (commit `package_lock.json` to your git repo!). Invoke NPM using the `ci` command rather than `install` to reproduce the build. Similarly, for Rust packages commit `Cargo.lock` to your repository, and then use `cargo build --locked` when building the package.

-   Webpack builds should be deterministic, but obfuscators and similar tools may compromise reproducibility. Make sure you use deterministic chunk and module IDs.

-   Build tools aren’t perfect, and may fail to ensure reproducible builds. If reproducibility is critical for your canister (e.g., it holds other users' funds), test it. Reprotest is a useful tool for this purpose.

-   Ideally, you want to minimize the number of dependencies, as, in order to do a full audit, the user may have to (reproducibly) rebuild all of your dependencies too.

-   Achieving reproducibility is harder over longer time scales, primarily as you need to ensure that a trustworthy source of your dependencies and build tools stays available.

Finally, if your build is reproducible, you can compare the hash of the resulting Wasm code to the hash of the code that is running in a canister, which you retrieve as follows:

    $ dfx canister --network ic info <canister-id>

Beware that this hash might change if the controllers upgrade the canister code.
