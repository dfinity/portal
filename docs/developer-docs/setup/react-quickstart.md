# Quick start for React developers

## Overview

On ICP, frontend UIs for decentralized applications can be hosted in a canister, often referred to as the dapp's frontend canister or asset canister. Frontend canisters host the code and assets for a dapp's user interface, which typically includes HTML, CSS, JavaScript, or React code. 

One key feature of ICP is its ability to serve canister assets directly in a web browser using the canister's mainnet URL. This means that when a frontend canister is deployed on the mainnet, users from around the world can access it using only the canister's URL, without requiring that the developer set up a domain name or other web service configuration.

When developing on ICP, the primary tool used by developers is the [IC SDK](./install/index.mdx). The IC SDK includes the tool `dfx`, which is a CLI tool used to create, manage, and deploy dapps. When a new project is created with `dfx`, by default the project includes a frontend and backend canister that creates a simple 'Hello, world!' dapp. You can learn more about `dfx` in the documentation [here](/docs/current/tutorials/developer-journey/level-0/intro-dfx).

## Creating a new ICP project  

To create your own dapp, you can either edit the default template created by `dfx` which provides a framework for a backend canister and frontend canister, use an example or boilerplate project repository, or create a project from scratch. 

To create a new project with `dfx`, first assure you have downloaded and installed the [IC SDK](./install/index.mdx). Then, you can run the command:

```
dfx new my_project
```

:::info
By default, this command creates a new project with a Motoko backend. To create a new project with a Rust backend, you can use the flag `--rust` in the command.
:::

This command will create a new project with the following structure:

```
my_project/
├── README.md      # Default project documentation
├── dfx.json       # Project configuration file
├── node_modules   # Libraries for frontend development
├── package-lock.json
├── package.json
├── src            # Source files directory
│   ├── my_project_backend  # The backend canister's files. 
│   │   └── main.mo
│   ├── my_project_frontend # The frontend canister's files.
│       ├── assets
│       │   ├── logo.png
│       │   ├── main.css
│       │   └── sample-asset.txt
│       └── src
│           ├── index.html
│           └── index.js
└── webpack.config.js
```

By default, the dapp's frontend assets are stored in the `src/my_project_frontend` subdirectory, which contains an `assets` directory used to store frontend assets and a `src` directory used to store the frontend code. To customize your dapp's frontend, you can make changes to the files in the `src/my_project_frontend/assets` and `src/my_project_frontend/src` subdirectories.

### Using `dfx`'s default frontend templates

By default, the frontend template `dfx` uses for new projects includes a template `index.js` file and `webpack.config.js` file. The `index.js` file is used to import an agent located in the `src/declarations/my_project_frontend` directory, which will be generated when the command `dfx deploy` is run. 

The generated code for this agent, stored in the `src/declarations/my_project_frontend/index.js` file, will use the following default content:

```javascript
import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./my_project_frontend.did.js";
export { idlFactory } from "./my_project_frontend.did.js";

/* CANISTER_ID is replaced by webpack based on node environment
 * Note: canister environment variable will be standardized as
 * process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
 * beginning in dfx 0.15.0
 */
export const canisterId =
  process.env.CANISTER_ID_my_project_frontend ||
  process.env.my_project_frontend_CANISTER_ID;

export const createActor = (canisterId, options = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Fetch root key for certificate validation during development
  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const my_project_frontend = createActor(canisterId);
```

Then, in the `src/my_project_frontend/src/index.js` file, you can see that the agent takes the generated actor and uses it to make a call to the backend canister’s `greet` method:

```
import { my_project_backend } from "../../declarations/my_project_backend";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const name = document.getElementById("name").value.toString();

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const greeting = await my_project_backend.greet(name);

  button.removeAttribute("disabled");

  document.getElementById("greeting").innerText = greeting;

  return false;
});
```

For many projects, the code stored in the `src/declarations/hello_frontend/index.js` file can be used without making any edits or changes. However, some projects may have additional requirements, which may require editing the default Webpack configuration. 

Webpack is a popular and highly-customizable module bundler for JavaScript applications. By default, new projects created with `dfx` have a default `webpack.config.js` file that makes it easy to add different modules, such as React or Markdown, that the project uses.

The default `webpack.config.js` file can be used without any modification, or you can modify it to add modules, plugins, or other custom configuration to suit the needs of your project. Changes made will depend on the frameworks and tools your project uses. 

For example, to add the React module to your project, you can modify the `webpack.config.js` file to include the following configuration:

```javascript
module: {
  rules: [
    { test: /\.(ts|tsx|jsx)$/, loader: "ts-loader" },
    { test: /\.css$/, use: ['style-loader','css-loader'] }
  ]
}
```

:::caution
Since `dfx` projects rely on Webpack to provide the default frontend configuration, you must have [Node.js](https://nodejs.org/en) installed in your development environment.
:::


## Creating custom frontend code and assets

When developing frontend UIs, there are several frontend frameworks that can be used, such as [JavaScript](https://internetcomputer.org/docs/current/developer-docs/frontend/javascript-frontend), [Svelte](https://internetcomputer.org/docs/current/developer-docs/frontend/svelte-frontend), and [Vue](https://internetcomputer.org/docs/current/developer-docs/frontend/vue-frontend).

Another popular choice is React. React is a library used for creating native or web user interfaces. It uses JavaScript functions to facilitate the creation of React components, which can be used to receive data from an app's backend and return the output to the frontend UI. React is designed to create a framework for seamlessly combining components written by all different people, organizations, or teams. It is a popular choice for building the frontend of dapps, as it is versatile and has a rich ecosystem of packages that can be utilized by developers.

On ICP, there are several boilerplate dapp templates that use React, such as the [React frontend example](/docs/current/developer-docs/frontend/react-frontend). In this guide, you will explore two other boilerplate templates that can be used for creating frontend UIs with React.

## Installing the React framework

To use React in your frontend canister, first you need to install the React framework with the command:

```
npm install --save react react-dom
```

Then, install the TypeScript language compiler with the command:

```
npm install --save-dev typescript ts-loader
```

Alternatively, you can edit your project's default `package.json` file to add dependencies to your project as seen [here](https://internetcomputer.org/assets/files/custom-frontend-package-bc1a4e8d2fe5016fe559f39aceec7a16.json). 


## Creating a React dapp with a button

In this example project, you will use the Motoko React TypeScript template to create a React frontend dapp on ICP that uses a simple `counter` method to increment a value when a button on the frontend UI is clicked. 

### Prerequisites

Before you start, verify the following:

- [x] You have an internet connection.

- [x] You have a command line interface (CLI) window open. This window is also referred to as the 'terminal' window.

- [x] You have downloaded and installed the IC SDK package as described in the [installing the IC SDK](./install/index.mdx) page.

- [x] You have a code editor installed. The [VSCode IDE](https://code.visualstudio.com/download) is a popular choice.

### Step 1: Download the Motoko React template.

:::info
This example uses Typescript. If you're looking for a JavaScript example, check out our documentation [here](/docs/current/developer-docs/frontend/custom-frontend).
:::

To download the Motoko React template project, first create a new, empty directory, then download the project template using the commands:

```
mkdir react-project
cd react-project
npx degit rvanasa/vite-react-motoko
```

You can view the template's GitHub repo [here](https://github.com/rvanasa/vite-react-motoko/tree/main/src).

In this project, there is a frontend canister that provides a UI using React code stored in the `src/App.tsx` file, CSS styling code stored in `src/App.css`, and an index page stored at `src/index.html`. This project also contains a backend canister with code stored in the `backend/Backend.mo` file, which the frontend canister interacts with.

The `src/App.tsx` file by default contains the following content:

```typescript
import { useEffect, useState } from 'react';
import './App.css';
import motokoLogo from './assets/motoko_moving.png';
import motokoShadowLogo from './assets/motoko_shadow.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { backend } from './declarations/backend';

function App() {
  const [count, setCount] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);

  // Get the current counter value
  const fetchCount = async () => {
    try {
      setLoading(true);
      const count = await backend.get();
      setCount(+count.toString()); // Convert BigInt to number
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const increment = async () => {
    if (loading) return; // Cancel if waiting for a new count
    try {
      setLoading(true);
      await backend.inc(); // Increment the count by 1
      await fetchCount(); // Fetch the new count
    } finally {
      setLoading(false);
    }
  };

  // Fetch the count on page load
  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a
          href="https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/"
          target="_blank"
        >
          <span className="logo-stack">
            <img
              src={motokoShadowLogo}
              className="logo motoko-shadow"
              alt="Motoko logo"
            />
            <img src={motokoLogo} className="logo motoko" alt="Motoko logo" />
          </span>
        </a>
      </div>
      <h1>Vite + React + Motoko</h1>
      <div className="card">
        <button onClick={increment} style={{ opacity: loading ? 0.5 : 1 }}>
          count is {count}
        </button>
        <p>
          Edit <code>backend/Backend.mo</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React, and Motoko logos to learn more
      </p>
    </div>
  );
}

export default App;
```

This frontend UI interacts with the backend canister to provide a UI button that increases a counter value when clicked. To provide the counter functionality, the frontend communicates with a simple counter program stored in the backend canister, which contains the following code:

```motoko
actor class Backend() {
  stable var counter = 0;

  // Get the current count
  public query func get() : async Nat {
    counter;
  };

  // Increment the count by one
  public func inc() : async () {
    counter += 1;
  };

  // Add `n` to the current count
  public func add(n : Nat) : async () {
    counter += n;
  };
};
```

### Step 2: Start a local replica.

Start a local replica with `dfx` using the command:

```
dfx start --clean --background
```

### Step 3: Setup the project using npm.

Next, run the following command to setup the project using npm:

```
npm run setup
```

In the background, this command runs the following processes:

```
npm i && dfx canister create backend && dfx generate backend && dfx deploy
```

The output of this command will return the local canister URLs for the frontend and backend canisters:

```
Deployed canisters.
URLs:
  Frontend canister via browser
    frontend: http://127.0.0.1:4943/?canisterId=a3shf-5eaaa-aaaaa-qaafa-cai
  Backend canister via Candid interface:
    backend: http://127.0.0.1:4943/?canisterId=a4tbr-q4aaa-aaaaa-qaafq-cai&id=asrmz-lmaaa-aaaaa-qaaeq-cai
```

### Step 4: Start the local development server.

Before interacting with the React interface running in the frontend canister, start the local development server with the command:

```
npm start
```

The output of this command will provide the local development URL, such as `http://127.0.0.1:3001/`:

```
VITE v4.3.9  ready in 206 ms

  ➜  Local:   http://127.0.0.1:3001/
  ➜  Network: use --host to expose
  ➜  press h to show help
11:09:24 AM [mo-dev] backend → http://127.0.0.1:4943?canisterId=a4tbr-q4aaa-aaaaa-qaafq-cai&id=asrmz-lmaaa-aaaaa-qaaeq-cai
11:09:25 AM [mo-dev] generate
11:09:26 AM [mo-dev] deploy backend
```

Navigate to this local URL in a web browser. You'll see the template Motoko React frontend interface:

![Motoko React template 1](./_attachments/motoko-react-1.png)

If you click on the 'count is 0' button, you can increase the counter value:

![Motoko React template 2](./_attachments/motoko-react-2.png)

For example, if you click the button 3 times, the count value will be `3`:

![Motoko React template 3](./_attachments/motoko-react-3.png)

### Creating a React `profile` component

Now that you've explored the sample React template, let's take a look at how to edit the project's `src/App.tsx` create different React components. 

First, to create a component that can be used to display a user's profile name and image, replace the `src.App.tsx` code with the following React component:

```typescript
import { useEffect, useState } from 'react';
import './App.css';

const user = {
  name: 'Motoko ghost',
  imageUrl: 'assets/motoko.png',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

### Reviewing the dapp's stylesheet

You will notice that the styling of the page has remained the same, despite the content changing. That's because the styling is defined in the `src/App.css` file, which is imported into the code with the line `import ./App.css`. To change the styling, open and edit the `.css` file which will contain the following stylistic definitions:

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .logo.react {
    animation: logo-spin infinite 60s linear;
  }
}

.logo.motoko:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

.logo-stack {
  display: inline-grid;
}

.logo-stack > * {
  grid-column: 1;
  grid-row: 1;
}

@keyframes logo-swim {
  from {
    transform: rotate(4deg) translateY(0);
  }
  50% {
    transform: rotate(-5deg) translateY(0);
  }
  to {
    transform: rotate(4deg) translateY(0);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .logo.motoko {
    animation: logo-swim 5s ease-in-out infinite;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
```

## Creating a React dapp with user input

In this project, you will use JavaScript to create a React frontend dapp on ICP that uses a simple `greet` method that takes a user's input and returns a greeting using that input.

:::info
You can find an expanded version of this section in the guide [here](/docs/current/developer-docs/frontend/custom-frontend).
:::

To create a new React dapp using JavaScript, you can create one from a clean working directory by following these steps:

### Step 1: Open a terminal shell and navigate into a working directory.

### Step 2: Create a new project by running the following command:

```
dfx new react_dapp
cd react_dapp
```

### Step 3: Review the project's default `dfx.json` file:

```json
  {
    "canisters": {
      ...

      "react_dapp_frontend": {
        "dependencies": [
          "react_dapp_backend"
        ],
        "frontend": {
          "entrypoint": "src/react_dapp_frontend/src/index.html"
        },
        "source": [
          "src/react_dapp_frontend/assets",
          "dist/react_dapp_frontend/"
        ],
        "type": "assets"
      }
    }
  }
  ```

In this file, you can see that the frontend canister is defined as `react_dapp_frontend`, and uses the assets stored at `src/react_dapp_frontend/assets`. In this guide, you will add React JavaScript in an `index.jsx` file, which doesn't require any changes to this `dfx.json` file. 

### Step 4: Modify the `webpack.config.js` file.

Open the `webpack.config.js` file in a text editor to replace the default `index.html` file with `index.jsx`, which will contain the React components. 

```javascript
    entry: {
      // The frontend.entrypoint points to the HTML file for this build, so you need
      // to replace the extension to `.js`.
      index: path.join(__dirname, asset_entry).replace(/\.html$/, ".jsx"),
    },
```

Then, add the following module key above the plugins section:

```javascript
    module: {
      rules: [
        { test: /\.(js|ts)x?$/, loader: "ts-loader" }
      ]
    },
```

This setting allows the project to use the `ts-loader` compiler for a React JavaScript file, `index.jsx`. 

When finished, your `webpack.config.js` file should contain the following content:

```javascript
require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

const frontendDirectory = "react_dapp_frontend";

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

### Step 5: Create a new file named `tsconfig.json` in the root directory for your project.

In a text editor, copy and paste the following code into the new `tsconfig.json` file:

```json
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

### Step 6: Open the `src/react_dapp_frontend/src/index.js` file and insert the following code:

```javascript
import * as React from "react";
import { render } from "react-dom";
import { react_dapp_backend } from "../../declarations/react_dapp_backend";

const MyHello = () => {
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');

  async function doGreet() {
    const greeting = await react_dapp_backend.greet(name);
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
        <span>{message}</span>"
      </div>
    </div>
  );
};

render(<MyHello />, document.getElementById("app"));
```

In this code, the frontend canister is configured to make a call to the backend canister to retrieve the `greet` function (`react_dapp_backend.greet(name);`), then display that greeting when a button in the frontend is clicked (`<button onClick={doGreet}>Get Greeting!</button>`).

Then, rename the modified `index.js` file as `index.jsx` by running the following command:

```
mv src/react_dapp_frontend/src/index.js src/react_dapp_frontend/src/index.jsx
```

### Step 7: Modify the entry point in `webpack.config.js`.

Open the `webpack.config.js` file and modify the entry point to reflect the following:

```javascript
entry: {
  // The frontend.entrypoint points to the HTML file for this build, so you need
  // to replace the extension to `.js`.
  index: path.join(__dirname, frontend_entry).replace(/\.html$/, ".jsx"),
},
```


### Step 8: Modify the default `src/react_dapp_frontend/src/index.html` file.

Open the file `src/react_dapp_frontend/src/index.html` in a text editor, then replace the file's contents with the following:

```html
  <!doctype html>
  <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width">
      <title>React dapp</title>
      <base href="/">
      <link type="text/css" rel="stylesheet" href="main.css" />
   </head>
   <body>
      <div id="app"></div>
   </body>
  </html>
```

### Step 9: Start a local replica.

Start a local replica with `dfx` using the command:

```
dfx start --clean --background
```

### Step 10: Deploy the project locally.

Now that the frontend code is ready to use, you can deploy the project locally with the command:

```
dfx deploy
```

Then, to start the local development server, run the command:

```
npm start
```

This command will return the local development server URL, such as `http://192.168.1.250:8080/`. Open this URL in a web browser. 

![React Javascript 1](./_attachments/react-js-1.png)

You will be prompted to type a name in the 'Get Greeting' box, which will then return a greeting using that name.

![React Javascript 2](./_attachments/react-js-2.png)

Then, select the 'Get Greeting' button to return the greeting using the inputted name:

![React Javascript 3](./_attachments/react-js-3.png)

## Using other modules with the React framework

To construct different UI components in your project, you might want to add additional React modules using the `npm install` command. For example, to add the `react-router` module, you can use the command:

```
npm install --save react react-router-dom
```

Then, this module can be used to construct a UI navigation component with code such as:

```javascript
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/myphotos">Remember</NavLink></li>
        <li><NavLink to="/myvids">Watch</NavLink></li>
        <li><NavLink to="/audio">Listen</NavLink></li>
        <li><NavLink to="/articles">Read</NavLink></li>
        <li><NavLink to="/contribute">Write</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
```

### Going further

To change the style of the frontend, such as the font family or font size, you can edit the `index.jsx` file such as:

```
  return (
    <div style={{ "fontFamily": "sans-serif" }}>
      <div style={{ "fontSize": "30px" }}>
```

Additionally, you can customize the frontend further by adding images, videos, or other React components. You can learn more about customizing the frontend in the documentation [here](/docs/current/developer-docs/frontend/custom-frontend).

## Resources

- [React documentation](https://react.dev/learn).

- [Intro to React](https://reactjs.org/tutorial/tutorial.html).

- [React website](https://react.dev/).

- [Frontend canisters](/docs/current/developer-docs/frontend).
