---
sidebar_position: 6
title: Step 6 - Adding the frontend
---

# Step 6 - Adding the frontend

We will use vanilla JavaScript for our dapp in order to keep things as simple as possible.

## Update `index.html` in the frontend canister

Navigate to `/src/poll_frontend/src/index.html` and replace the content of `index.html` with this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Poll Hosted on an ICP Canister Smart Contract</title>
</head>
<body>
    <h1>Simple Voting Poll</h1>
    <h2 id="question">Sample Question</h2>
    <form id="poll-form">
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
    <div id="results"></div>
    <button id="reset">Reset Poll</button>
</body>
</html>
```
- The HTML above is just a simple form with options, nothing ICP or Web3 special about it


:::note
You may have noticed the file path above has two directories named `src`. That is because when you created the project `poll` via `dfx new poll`, the project actually created TWO canister smart contracts (that talk to each other):
* `src/poll_backend` which is a smart contract that serves as the backend of this dapp
* `src/poll_frontend` which is a smart contract that serves as the frontend of this dapp
:::

## Update `index.js` in the frontend canister

In order for the frontend to talk to the backend and have it reflected in the HTML, we need to update the `index.js` file. Navigate to `/src/poll_frontend/src/index.js` and replace the content of `index.js` with this


```javascript
const pollForm = document.getElementById('poll-form');
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
  // Query the question from the backend
  const question = await poll_backend.getQuestion();
  document.getElementById("question").innerText = question;

  //Query the vote counts for each option
  // Example JSON that the frontend will get using the values above
  // [["Motoko","0"],["Python","0"],["Rust","0"],["TypeScript","0"]]
  const voteCounts = await poll_backend.getVotes();
  updateLocalVoteCounts(voteCounts);

  return false;
});


pollForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    //Get the value selected from the list
    const selectedOptionHTML = document.querySelector('input[name="option"]:checked');
    const selectedOption = selectedOptionHTML.value;
    console.log(selectedOption);

    const updatedVoteCounts = await poll_backend.vote(selectedOption);
    updateLocalVoteCounts(updatedVoteCounts);
    displayResults();
});

resetButton.addEventListener('click', async (e) => {
    
    //Reset the options in the backend
    await poll_backend.resetVotes();
    const voteCounts = await poll_backend.getVotes();
    updateLocalVoteCounts(voteCounts);
    
    //re-render the results once the votes are reset in the backend
    displayResults();
});


//3. HELPER FUNCTIONS

//Helper vanilla JS function to create the HTML to render the results of the poll
function displayResults() {
  let resultHTML = '<ul>';
  for (let key in pollResults) {
      resultHTML += '<li>' + key + ': ' + pollResults[key] + '</li>';
  }
  resultHTML += '</ul>';
  resultsDiv.innerHTML = resultHTML;
}

// Example JSON that the frontend will get using the values above
  // [["Motoko","0"],["Python","0"],["Rust","0"],["TypeScript","0"]]
function updateLocalVoteCounts(arrayOfVoteArrays){

  for (let voteArray of arrayOfVoteArrays) {
    //Example voteArray -> ["Motoko","0"]
    let voteOption = voteArray[0];
    let voteCount = voteArray[1];
    pollResults[voteOption] = voteCount;
  }

}
```

- Line #4 `import { poll_backend } from "../../declarations/poll_backend";` is important. This line is what allows the frontend to import an interface for the backend canister and seamlessly send it via messages (via Candid). This line is directly related to the following lines where the frontend JS talks to the backend:
* Line 19: `const question = await poll_backend.getQuestion();`
* Line 25: `const voteCounts = await poll_backend.getVotes();`
* Line 40: `const updatedVoteCounts = await poll_backend.vote(selectedOption);`
- `displayResults()` and `updateLocalVoteCount()` are just helper functions created for convenience.

These lines show how the frontend can use the `getQuestion()`, `getVotes()`, `vote()` methods we created in earlier sections.

## Deploy the dapp locally

Re-deploy the dapp locally and you are done!

 **🎉 Congrats! 🎉**


```bash
dfx deploy
```

You application should look like this (with different numbers):
![picture 1](./_attachments/simple_voting_app.png)  



