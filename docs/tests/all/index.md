---
title: All UI Tests
sidebar_position: 0
description: Tests for Markdown pages can be found here
# ensure draft is set to true so that this page is only shown during local development
draft: true
---

# UI Tests

If you would like to test UI elements, add a new Markdown file to the `tests`
directory. Each new test file will appear in the sidebar automatically.

Ensure that `draft: true` is included in the frontmatter to exclude the test from production deployments.

An example test is shown below

```mdxjs
---
title: Tooltip Test
description: Testing integration of the Tooltip component in a markdown document
# ensure draft is set to true so that this page is only shown during local development
draft: true
---

import { Tooltip } from "/src/components/Tooltip/Tooltip";

Hello, I'm a markdown page. And

<Tooltip text="You hovered over me! Great">I'm</Tooltip> a tooltip.
```