# Internet Computer developer documentation: style, format, and language guide

## Overview 

This guide outlines the format, language, and style that should be used when contributing pages to the Internet Computer developer documentation. This is designed to assist with standardizing the documentation to create a cohesive, uniform look and feel across all pages of documentation that have been contributed by multiple individuals and teams. 

This guide will outline the following:
- Page structure.
- Use of page headings.
- Use of capitalization.
- Documentation language, spelling, grammar, and word choice.
- Use of punctuation.
- Bulleted lists.
- Bold text.
- Italic text.
- Hints.
- Links and hyperlinks.
- Code snippets and code blocks.
- Command line syntax.
- FAQ sections.
- The difference between a tutorial and a guide.
- How to write a tutorial.
- How to write a guide.

## Page structure

The developers docs contain a wide variety of different document types, such as tutorials, guides, informational pages, and reference pages. For this reason, the page structure will vary based on what type of document the page is. 

The following page structure should be followed for informational pages and guides:

```
# Page title

## Overview

Text

## Prerequisites (Optional; only necessary for guides that require prerequisite conditions or parameters be met.)

- [x] Prerequisite 1.
- [x] Prerequisite 2.
- [x] Prerequisite 3.

## Topic 1

Text

### Subtopic 1

Text

### Subtopic 2

- Bullet 1.
- Bullet 2.
- Bullet 3.

## Topic 2

Text

### Subtopic 3

Text

- #### Step 1: Description of step for reader to take.
- #### Step 2: Description of step for reader to take.
- #### Step 3: Description of step for reader to take.

## Conclusion

Text

## Resources
- [Link](link.com)
```

The following page structure should be followed for tutorials:

```
# Page title

## Overview

Text

## Prerequisites 

- [x] Prerequisite 1.
- [x] Prerequisite 2.
- [x] Prerequisite 3.

## Step 1: Description of step

Text

## Step 2: Description of step

Text

## Step 3: Description of step

Text

## Conclusion

Text

## Resources
- [Link](link.example)
```

## Page headings

There are 4 types of headings used throughout the IC developer docs:

- Heading size 1: `#`
- Heading size 2: `##`
- Heading size 3: `###`
- Heading size 4: `####`

### Heading usage

| Heading size | Usage |
|--------------|-------|
| Heading 1    | Page title only; not used within the page's content.|
| Heading 2    | Used for primary topics amongst the page; used for consistent page headings such as 'Overview', 'Prerequisites', 'Conclusion' and 'References'.|
| Heading 3    | Used for subtopics under primary topics amongst the page or user steps within a tutorial. Note; there are some instances where using Heading 2 for a tutorial step is more fitting, such as when a step contains several different concepts or subtopics. Please refer to the writing a tutorial section below for further information.|
| Heading 4    | Used for listing steps a user should take within a guide document, where the guide document includes several different, separate walkthroughs for the user to follow; in this scenario, this heading should be used in conjunction with a bullet point. Heading 4 is also used for listing terms within the `glossary` document page and for subtopics under an already existing Heading 3 subtopic heading. |

### Heading usage example

The following is a sample guide document that showcases how the 4 types of headings should be used:

```
# File management

## Overview

This document describes basic file management workflows.

### Workflows covered

The following workflows are covered:
- Creating a file.
- Saving a file. 

## Prerequisites

- [x] Download and install a text editor program. 

## Creating a file

To create a new file:

- #### Step 1: Open the text editor program.
- #### Step 2: From the navigation bar, select **File** then **New File**.
- #### Step 3: Enter text into the new, blank file. 

## Saving a file

To save a file:

- #### Step 1: From the navigation bar, select **File** then **Save**.
- #### Step 2: Enter a file name to save your file under.
- #### Step 3: Confirm the file name and select **Save**.

## Conclusion
This document described basic file management workflows.

## Resources
- [Link](link.example)
```

## Prerequisites sections
For guides or tutorials that include a prerequisites section that contains tasks a reader must complete before starting to follow the guide or tutorial, the following format should be used:

## Prerequisites

- [x] Download and install a program. 
- [x] Download and install a package.
- [x] Download and install a framework.

## Capitalization

Capitalization within the developer documentation should follow these outlined standards:

- Only the first word of a title should be capitalized unless the title includes a proper noun.
    - Example: How to use the Internet Computer
    - Example: Using Internet Identity with a dapp
    - Example: Motoko reference guide
- Only the first word of a page heading should be capitalized unless the title includes a proper noun.
    - Example: Overview
    - Example: Register, build, and deploy the dapp
    - Example: Using Motoko canisters
- Titles of links to other documentation pages or external articles, such as blog posts, should not be capitalized except for the proper nouns within the title. 
    - Example: Check out the blog post on [how to use the Internet Computer](link).
    - Example: Reference the guide on [using the Internet Identity in a dapp](link).
- Any reference to specific GUI buttons or other visual aids that are capitalized within the referenced interface should be capitalized to match the format shown on the GUI.
    - Example: Open your account and navigate to **My Products**.
    - Example: Click on the **Save** button.
    - Example: Select **Add site** to save the configuration. 
- When a bullet point list begins with a sentence, the first word in the sentence should be capitalized:
    - Example: Step 1: First, you need to look up the IP addresses of the boundary nodes.
- When a bullet point list is used to define terms, the first word after the term should not be capitalized:
    - Example: **Term**: definition of the term.
- When a code-specific value, such as the name of a method, variable, integer, or data type, is being referenced, the capitalization used within the code or the language's reference documentation should be followed.
    - Example: ConstructionPayloadRequest
    - Example: ingress_start

### Proper nouns

The following proper nouns should always be capitalized:
- Blockchain Singularity
- Candid
- DFINITY Foundation
- Internet Computer
- Internet Computer Protocol
- Internet Identity
- JavaScript
- Motoko
- Network Nervous System
- NodeJS
- README
- Rust
- Service Nervous System
- TypeScript
- WebAssembly (Wasm)
- Wiki
- World Computer
- YouTube

This is not an exhaustive list, and other proper nouns such as tool names, company names, or project names should be capitalized. Examples of these are Unity, Godot, Namecheap, GoDaddy, and GitHub. 

### Abbreviations and acronyms  
The following is a list of common abbreviations that are capitalized within the developer docs:
- BTC
- CDK
- ckBTC
- DAO
- DeFi
- ECDSA
- HTTP/HTTPS
- IC
- ICP
- ICRC-1
- II
- IOS
- NFT
- NNS
- SDK
- SNS
- XDR

## Language
The following language and capitalization of certain terms and phrases should be used across the IC developer documentation:
- Big Tech
- Bitcoin integration
- Bitcoin network: should be used in place of "sending bitcoin". 
- Built on the Internet Computer
- canister
- canister smart contract
- dapp: should be used in place of any reference to an IC app, decentralized application, or 'dApp'. 
- DeFi
- Ethereum integration
- Ethereum: should be used in place of ETH or ETH token. 
- HTTP outcalls
- IC SDK: should be used in place of any reference to the IC's SDK.
- mainnet
    - In context: Deploying `to the mainnet` or `on the mainnet`. Note the use of the word `the`.
    - Other contextual usage:
        - `The Internet Computer mainnet network.`
        - `The dapp has been deployed to the IC mainnet.`
        - `Before deploying on to the Internet Computer mainnet...`
    Additionally, mentions of the Bitcoin mainnet should use the same structure (prefaced with the word `the`.)
- maturity
- Motoko playground
- neuron
- node provider
- open internet service
- reverse gas model
- Web3
- World Wide Web

### Spelling, grammar, and word choice
The following spelling, grammar, and word choice rules should be followed:
- Regarding spelling and grammar, American spelling and grammar should be used with the exception that all article titles follow British capitalization rules (see details in the Capitalization section.)
- Assure that the language in the document reads well for non-native English speakers, and avoid phrases or sayings that may be confusing, such as "Dig in."
- Avoid informal, personal thoughts or otherwise unnecessary language within the developer docs. A few examples of this might be:
    - Referring to the default configuration as the 'boring default configuration'.
    - Making a joke within the document, then using parentheses to acknowledge the joke such as "(Get it? heh)".
  
    - Avoid speaking directly to the reader, unless within a tutorial that is designed to be an interactive, onboarding experience. 
    
    For example, avoid the following:
    - "Get it? heh."
    - "Take a deep dive."
    - "Go down the rabbit hole."
    - "Dig in."
    
    Where as, the following are acceptable in certain contexts:
    - "Ready to get started? Let's go!"
    - "Here is a checklist of the things you will need to consider:"

## Numbers
Numbers should be formatted using the `'` character, and not any other character. For example:
- 44'760'000
- 54'000
- 1'000

## API methods

For API methods such as `GET`, `POST`, `PUT`, `DELETE`, `HEAD`, or any other API method requests, they should be formatted as such:

- In headings, they should be capitalized without additional formatting. 
    - Example: "Using HTTP GET calls."
    - Example: "Using HTTP PUT calls."
- In the body of documents, they should be formatted as in-line code, such as:
    - Example: "A minimal example to make a `GET` HTTPS request."
    - Example: "That is, the canister could define the quorum size to be 1 and have only 1 replica execute the `POST` request."


## Punctuation

The following punctuation standards should be followed:
- All sentences end in a period.
- Exclamation points can be used where appropriate, but should not be used excessively. 
- Question marks can be used where appropriate. 
- Semicolons (;) should be used to indicate a pause within a sentence. 
- Parentheses should be used to include additional context where appropriate. 
- All bullet point lists should be prefaced with introduction text followed by a colon.
- All items within a bullet point list should end in a period, regardless if the entry is a full sentence or not.
- All numbered lists should use the format `1.` for numbering each list entry. 
- All user steps for guides and tutorials should use the format `Step 1:` to preface each step's contents. 

## Bulleted lists

The following bullet point format and standards should be followed:

- Bullet point lists can be written using either the `-` character or the `*` character; they both display the same on the webpage. 
- Bullet point lists that define a term or technology should follow the format:
    - **Term**: definition of the term.
- Bullet point lists that are used to indicate user steps for a guide should use the format:
    - #### Step 1: Description of step
- Bullet point lists that contain subtopics or sub-points should use the format:
    - Bullet point 1.
        - Subtopic bullet point.
    - Bullet point 2.  

## Numbered lists
The following numbered list format and standards should be followed:
- Numbered lists should be used to outline architecture steps that describe what happens within the backend or frontend of a tool or service, where it does not describe steps that a user interacts with directly. 
    - For example, steps that detail how a service interacts with a client application should be explained using a numbered list, where as steps detailing how a user can interact with the client application should be listed as guide or tutorial steps that use the correct heading sizes and format. 
- Numbered lists should also be used when presenting a list of questions to the reader to provoke their thoughts. For example:
    1. Which WebAssembly (Wasm) code is being executed for a canister?
    2. The canisters are normally written in a higher-level language, such as Motoko or Rust, and not directly in Wasm. The second question is then: is the Wasm that’s running really the result of compiling the purported source code?

## Bold text

The following standards for bold text should be followed:

- Bullet point lists that are used to list and define terms should bold the term(s) being defined. 
    - **Term**: definition of the term.
- Terms that are important for the reader to understand, such as a term found in the IC glossary, should be bolded for emphasis.
- When describing steps for a user to follow in a guide or tutorial, if the user is expected to interact with a button or GUI interface, the button's name should be bolded and follow the capitalization format found on the GUI. 
    - Example: Click on the **Save** button.

## Italic text
Italic text is not used within the IC developer documentation. Bold text should be used to emphasis terms or phrases that are important. 

## Hints
The IC developer documentation uses two forms of hints provided by the Docusaurus framework:
- **Info**: the info hint is used to provide important information that the reader should be prompted to read. This hint can be used to provide additional context, resources, or add important notes that the reader should be aware of before continuing.
- **Caution**: the caution hint is used to provide a warning to readers about the consequences of certain steps or actions as indicated in the guide, doc, or tutorial. 

Hints can be used with the following markdown format:

:::info
Info hint
:::

:::caution
Caution hint
:::

## Links
Links that are referenced within the developer docs should use the following format and structure:
- Capitalization of link titles should follow the same format and rules as described in the previous capitalization section; only the first word and proper nouns are capitalized. For example:
    - [Read Roman’s blog post on effective Rust canisters](link.example).
    - [Demonstrating trust](link.example). 
- In-line links should not capitalize the title of the page or section that is being linked. For example:
    - The below section [demonstrating trust](#demonstrating-trust).
    - The Wiki [contains some ideas](https://wiki.internetcomputer.org/wiki/Dealing_with_cycles_limit_exceeded_errors) how one can work around the cycles limit.

## Code snippets and code blocks
The following format should be used for code snippets and code blocks:
- In-line code references to commands, language specific methods, or other code-related terms should be emphasized using in-line code expressions such as:
    - To install code in a canister, the `install_code` function of the Internet Computer is used.
    - For example, the function `canister_init` is the first function that gets called after the code is installed for the first time.
- When a code-specific value, such as the name of a method, variable, integer, or data type, is being referenced, the capitalization used within the code or the language's reference documentation should be followed.
    - Example: `ConstructionPayloadRequest`
    - Example: `ingress_start`
- Command-line commands that should be run by the user should be listed in their own line using code formatting, such as:
    - #### Step 1:  Install the React module by running the following command:
  ```
            npm install --save react react-dom
  ```
- Code blocks should be prefaced with the language used within the code block where applicable. For example:

```bash
cd motoko/threshold_ecdsa
dfx start --background
npm install
dfx deploy
```

## Command line syntax

For all CLI command examples for `dfx`, flags should always be at the end of the command, such as:

```
dfx wallet balance --network ic
```

Additional examples:

```
dfx deploy --background
```

```
dfx identity new Alice --disable-encryption
````

```
dfx deploy internet_identity --argument '(null)'
```

## FAQ sections

Frequently asked question (FAQ) sections should use the following structure and format:

```
## Frequently asked questions

- #### Question 1?
Answer 

- #### Question 2?
Answer
```

## Difference between tutorials and guides

Tutorials should be stand-alone projects that a user can follow A-Z that may build off of an example code, may use a variety of different concepts, tools, or assets, and ultimately results in a working example project. 

In contrast, guides should be more focused on individual concepts or workflows and then building off of those. For example, the guides for building a smart contract backend with Motoko each focus and build upon individual concepts within Motoko, such as using integers in calculator functions or querying using an actor.

### Writing a tutorial
When contributing a tutorial, the following general format and structure should be used. It is important to note that the content of tutorials will vary, and this format can be expanded and elaborated on to include more detailed workflows or content. 

```
# Page title

## Overview

Text

## Prerequisites 

- [x] Prerequisite 1.
- [x] Prerequisite 2.
- [x] Prerequisite 3.

## Step 1: Description of step

Text

### Subtopic 1

Text

## Step 2: Description of step

Text

### Subtopic 2

Text

## Step 3: Description of step

Text

## Conclusion

Text

## Resources
- [Link](link.example)
```

### Writing a guide
When contributing a guide, the following general format and structure should be used. It is important to note that the content of guides will vary, and this format can be expanded and elaborated on to include more detailed workflows or content. 

```
# Page title

## Overview

Text

## Prerequisites (Optional; only necessary for guides that require prerequisite conditions or parameters be met.)

- [x] Prerequisite 1.
- [x] Prerequisite 2.
- [x] Prerequisite 3.

## Topic 1

Text

### Subtopic 1

Text

- #### Step 1: Description of step for reader to take.
- #### Step 2: Description of step for reader to take.
- #### Step 3: Description of step for reader to take.

### Subtopic 2

Text

- #### Step 1: Description of step for reader to take.
- #### Step 2: Description of step for reader to take.
- #### Step 3: Description of step for reader to take.

## Topic 2

Text

### Subtopic 3

Text

- #### Step 1: Description of step for reader to take.
- #### Step 2: Description of step for reader to take.
- #### Step 3: Description of step for reader to take.

## Conclusion
Text

## Resources
- [Link](link.example)
```
