---
sidebar_position: 1
---
# At a glance

The [Quick start](/tutorials/deploy_sample_app.md) provides a fast path to deploying a simple default application without stopping to admire the scenery along the way. Individual tutorials in this section walk through specific scenarios, pointing out details about what you’re doing in each step.

If the quick start and tutorials are not quite your style, this at-a-glance cheat sheet summarizes the steps to follow for quick reference.

After you [install the SDK](../../setup/install/index.mdx), here’s all you need to know:

1.  Create a new project and change to the project directory.

        dfx new <project_name> && cd <project_name>>

2.  Edit the backend that defines your service or application.

3.  Edit the HTML, JavaScript, and CSS that provides the frontend for your service or application.

4.  Start the Internet Computer for local development or check your connection to the Internet Computer for network deployment.

5.  Register, build, and deploy locally or on mainnet (for mainnet, use:`--network ic`).

        dfx deploy --network <network>

6.  View your service or application in a browser.
