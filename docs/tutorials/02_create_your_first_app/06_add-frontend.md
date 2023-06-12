---
sidebar_position: 6
title: '6: Adding the frontend'
---

# 6: Adding the frontend

We will use vanilla JavaScript for our dapp in order to keep things as simple as possible.

## Update `index.html` in the frontend canister

Navigate to `/src/poll_frontend/src/index.html` and replace the content of `index.html` with this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple poll dapp hosted on an ICP canister smart contract</title>

    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        position: relative;
      }

      .title-container {
        border: 2px solid #007bff;
        background-color: #f0f0f0;
        padding: 20px;
        border-radius: 5px;
      }

      h1 {
        font-size: 32px;
        margin-bottom: 20px;
        text-align: center;
        margin-top: 0;
      }

      h2 {
        font-size: 24px;
        margin-bottom: 10px;
        text-align: center;
      }

      form {
        margin-bottom: 20px;
        border: 2px solid #8bc34a;
        padding: 20px;
        border-radius: 5px;
      }

      label {
        display: block;
        margin-bottom: 10px;
        font-size: 18px;
        text-align: left;
      }

      input[type="radio"] {
        margin-right: 5px;
      }

      button {
        padding: 10px 20px;
        background-color: #007bff;
        border: none;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        border-radius: 5px;
      }

      button#reset {
        background-color: #dc3545;
        position: absolute;
        bottom: 20px;
        left: 20px;
        margin: 10px 0; /* Add margin */
      }

      button:hover {
        background-color: #0056b3;
      }

      #results {
        margin-top: 20px;
        font-size: 18px;
        border: 2px solid #8bc34a;
        padding: 20px;
        border-radius: 5px;
        position: relative;
      }
    </style>
</head>
<body>
    <div class="container">
      <div class="title-container">
        <h1>Simple Voting Poll</h1>
      </div>
      <h2 id="question">Sample Question</h2>

      <!-- Form where users vote -->
      <div class="form-container">
        <form id="radioForm">
            <label>
                <input type="radio" name="option" value="Rust"> Rust
            </label><br>
            <label>
                <input type="radio" name="option" value="Motoko"> Motoko
            </label><br>
            <label>
                <input type="radio" name="option" value="TypeScript"> TypeScript
            </label><br>
            <label>
                <input type="radio" name="option" value="Python"> Python
            </label><br>
            <button type="submit">Vote</button>
        </form>
      </div>

      <!-- Poll results appear here-->
      <h2 id="results-title">Results</h2>
      <div id="results"></div>
    </div>
    <button id="reset">Reset Poll</button>


</body>
</html>
```

### What this does
- The HTML above is just a simple form with options, nothing ICP or Web3 special about it.
- The `<head>` tag includes some basic CSS for styling.
- To learn more about adding a stylesheet, see: [add a stylesheet](../../developer-docs/frontend/add-stylesheet.md).


:::info
You may have noticed the file path above has two directories named `src`. That is because when you created the project `poll` via `dfx new poll`, the project actually created **two** canister smart contracts (that talk to each other):
* `src/poll_backend` which is a smart contract that serves as the backend of this dapp.
* `src/poll_frontend` which is a smart contract that serves as the frontend of this dapp.
:::

## Update `index.js` in the frontend canister

In order for the frontend to talk to the backend and have it reflected in the HTML, we need to update the `index.js` file. Navigate to `/src/poll_frontend/src/index.js` and replace the content of `index.js` with this:


```javascript
const pollForm = document.getElementById("radioForm");
const resultsDiv = document.getElementById('results');
const resetButton = document.getElementById('reset');

//Note we will use "poll_backend" in this JavaScript code a few times to call the backend
import { poll_backend } from "../../declarations/poll_backend";

//1. LOCAL DATA
const pollResults = {
    "Rust": 0,
    "Motoko": 0,
    "TypeScript": 0,
    "Python": 0
};

//2. EVENT LISTENERS

//Load the Simple Poll's question from the backend when the app loads
document.addEventListener('DOMContentLoaded', async (e) => {
   //note that this is at beginning of the submit callback, this is deliberate
  //This is so the default behavior is set BEFORE the awaits are called below
  e.preventDefault();
 
  // Query the question from the backend
  const question = await poll_backend.getQuestion();
  document.getElementById("question").innerText = question;

  //Query the vote counts for each option
  // Example JSON that the frontend will get using the values above
  // [["Motoko","0"],["Python","0"],["Rust","0"],["TypeScript","0"]]
  const voteCounts = await poll_backend.getVotes();
  updateLocalVoteCounts(voteCounts);
  displayResults();
  return false;
}, false);

//Event listener that listens for when the form is submitted.
//When the form is submitted with an option, it calls the backend canister
//via "await poll_backend.vote(selectedOption)"
pollForm.addEventListener('submit', async (e) => {
  //note that this is at beginning of the submit callback, this is deliberate
  //This is so the default behavior is set BEFORE the awaits are called below
  e.preventDefault(); 

  const formData = new FormData(pollForm);
  const checkedValue = formData.get("option");

  const updatedVoteCounts = await poll_backend.vote(checkedValue);
  console.log("Returning from await...")
  console.log(updatedVoteCounts);
  updateLocalVoteCounts(updatedVoteCounts);
  displayResults();
  return false;
}, false);

resetButton.addEventListener('click', async (e) => {

    e.preventDefault();
    
    //Reset the options in the backend
    await poll_backend.resetVotes();
    const voteCounts = await poll_backend.getVotes();
    updateLocalVoteCounts(voteCounts);

    //re-render the results once the votes are reset in the backend
    displayResults();
    return false;
}, false);

//3. HELPER FUNCTIONS

//Helper vanilla JS function to create the HTML to render the results of the poll
function displayResults() {
  let resultHTML = '<ul>';
  for (let key in pollResults) {
      resultHTML += '<li><strong>' + key + '</strong>: ' + pollResults[key] + '</li>';
  }
  resultHTML += '</ul>';
  resultsDiv.innerHTML = resultHTML;
};

//This helper updates the local JS object that teh browser holds
// Example JSON that the frontend will get using the values above
  // [["Motoko","0"],["Python","0"],["Rust","0"],["TypeScript","0"]]
function updateLocalVoteCounts(arrayOfVoteArrays){

  for (let voteArray of arrayOfVoteArrays) {
    //Example voteArray -> ["Motoko","0"]
    let voteOption = voteArray[0];
    let voteCount = voteArray[1];
    pollResults[voteOption] = voteCount;
  }

};
```
### What this does
- Line 4: `import { poll_backend } from "../../declarations/poll_backend";`: this is an important line that is what allows the frontend to import an interface for the backend canister and seamlessly send it via messages (using Candid). This line is directly related to the following lines where the frontend JS talks to the backend:
  - Line 19: `const question = await poll_backend.getQuestion();`
  - Line 25: `const voteCounts = await poll_backend.getVotes();`
  - Line 40: `const updatedVoteCounts = await poll_backend.vote(selectedOption);`
- `displayResults()` and `updateLocalVoteCount()` are just helper functions created for convenience.
- These lines collectively show how the frontend can use the `getQuestion()`, `getVotes()`, `vote()` methods we created in earlier sections.

## Deploy the dapp locally

Re-deploy the dapp locally with the command:

```bash
dfx deploy
```

Now, when the terminal's output displays the following, open the `poll_frontend` URL in a web browser:

```
  Frontend canister via browser
    poll_frontend: http://127.0.0.1:4943/?canisterId=avqkn-guaaa-aaaaa-qaaea-cai
  Backend canister via Candid interface:
    poll_backend: http://127.0.0.1:4943/?canisterId=asrmz-lmaaa-aaaaa-qaaeq-cai&id=by6od-j4aaa-aaaaa-qaadq-cai
```

**🎉 Congrats! 🎉**

Your poll dapp is complete! 
![picture 1](./_attachments/simple_voting_app.png)  


## Next steps

[Conclusion](07_wrapup.md)
