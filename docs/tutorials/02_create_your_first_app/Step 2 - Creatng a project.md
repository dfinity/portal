# Step 2 - Creating a project

## Creating a project from a template

To create a project, open your terminal app and type:
```shell
$ dfx new poll
```

SDK will create an project from a template in a folder "poll":
![dfx new poll terminal image](__attachments/dfx%20new.png)

## Understanding the project structure

After your app is created you can examine the folder structure:

```
PROJECT ROOT           <-- App main folder
├── README.md
├── dfx.json           <-- configuration of your Internet Computer app
├── package-lock.json  <-- node.js packages config
├── package.json       <-- node.js packages config
├── src
│   ├── poll_backend   <-- source code of your backend app
│   │   └── main.mo    <-- WE WILL BE WORKING IN THIS FILE!
│   └── poll_frontend  <-- source code of your frontend app
│       └── ...
└── webpack.config.js  <-- web app bundler config
```

In this tutorial will be only working in one file `main.mo` that contains the code of our backend app in programming language Motoko.


