# 4: Exploring the frontend

## Overview

Recall that a frontend canister is used to contain an application's user interface assets. In this tutorial, you will explore the frontend canister code to learn more.

## Exploring the `vite-motoko-react` frontend code

In this sample, there is a frontend canister that provides a UI using React code stored in the `src/App.tsx` file, CSS styling code stored in `src/App.css`, and an index page stored at `src/index.html`.

The `src/App.tsx` file by default contains the following content, which has been annotated to explain the code's functionality:

```typescript

// First, import packages from the 'react' library:
import { useEffect, useState } from 'react';

// Import the frontend CSS style file:
import './App.css';

// Import individual assets
import motokoLogo from './assets/motoko_moving.png';
import motokoShadowLogo from './assets/motoko_shadow.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';

// Import the service declarations for the backend canister in order to make calls to them
import { backend } from './declarations/backend';

// Create the frontend app function
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
    // Create the UI using HTML
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

The `src/App.css` file by default contains the following content, which is used to edit the styling of the page's UI assets:

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

You can learn more about CSS [here](https://www.w3schools.com/css/).

Then, the `src/index.html` file by default contains the following content, which imports and refers to the `src/main.tsx` file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./assets/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + Motoko</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.tsx"></script>
  </body>
</html>
```

Lastly, the `src/main.tsx` file contains the following content, which imports `App` from the `src/App.tsx` file:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

Together, these files enable the frontend canister's user interface, as seen in [2: Deploying your first fullstack dapp](./2-deploying-first-fullstack-dapp.md).

## Learning more about frontend canisters

To further understand and develop your own frontend canisters, let's review a few fundamental features, concepts, and workflows that pertain to frontend canisters.

### Agents

When a canister is deployed, locally or on the mainnet, there are two primary methods of interacting with that canister. You can use an API through an agent, or you can use the canister's HTTP interface. 

In this `vite-react-motoko` example, a JavaScript agent is used. An agent is a library that is used to make calls to the public interface of the Internet Computer. Agents are primarily responsible for:

- Structuring data: Agents are responsible for structuring the data made in a call into a format that can be processed by the canister.

- Managing authentication: Agents are responsible for attaching a cryptographic identity to the call. 

- Decoding data: Once a response has been returned from the canister on the mainnet, the agent takes the certificate from the call's payload and verifies it.

In addition to the JavaScript agent, DFINITY has developed and maintains a Rust agent, and the ICP community supports several agents for .NET, Go, Python, Ruby, and more.

In your `vite-react-motoko` example, the JavaScript agent file is scored at `src/declarations/frontend/index.js`. This file is generated as part of the `npm run setup` command, and contains the following content:

```javascript
import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./frontend.did.js";
export { idlFactory } from "./frontend.did.js";

/* CANISTER_ID is replaced by webpack based on node environment
 * Note: canister environment variable will be standardized as
 * process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
 * beginning in dfx 0.15.0
 */
export const canisterId =
  process.env.CANISTER_ID_FRONTEND ||
  process.env.FRONTEND_CANISTER_ID;

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

export const frontend = createActor(canisterId);
```

In this code, the constructor first creates an HTTPAgent which wraps the JavaScript API, then uses it to encode calls through the public API. If the deployment is on the mainnet, the root key of the replica is fetched. Then, an actor is created using the automatically generated Candid interface for the canister and is passed the canister ID and the HTTPAgent.

You can learn more about agents in the documentation [here](/docs/current/developer-docs/agents/).

### HTTPS interfaces

On ICP, canisters can communicate directly with external servers or other blockchains through the use of HTTPS outcalls. This is a unique feature of ICP, since traditionally, other blockchain networks are only able to communicate with external servers through blockchain oracles, or third-party entities that relay calls from the blockchain to an external server, then route the response back to the blockchain. 

HTTPS outcalls allow smart contract canisters on ICP to make calls directly to external HTTPS servers. Then, the response of these HTTPS calls can be used by the smart contract in a safe way that doesn't result in the a replica state divergence. 

HTTPS outcalls provide the ability for different use cases and have several advantages compared to using oracles to handle external requests. Some of these are HTTPS outcalls use a stronger trust model since there are no external intermediaries required for the canister to communicate with external servers. Using HTTPS outcalls for communicating with external servers makes using canisters feel much closer to a "traditional" programming workflow that may not use blockchains or oracles. Most real-world dapps have a need for accessing data stored in off-chain entities, since most digital data is still stored in traditional 'Web 2' services.

Currently, the ICP HTTPS outcalls feature supports the `GET`, `HEAD`, and `POST` methods for HTTPS requests. 

You can learn more about HTTPS outcalls in the documentation [here](developer-journey/level-3/3.2-https-outcalls.md).

## Next steps

- [5: Integrating with tokens](5-integrating-with-tokens.md).
