---
title: SEV-SNP protected Boundary Node VM
links:
  Forum Link: https://forum.dfinity.org/t/long-term-r-d-boundary-nodes-proposal/9401
  Proposal: https://dashboard.internetcomputer.org/proposal/35671
eta:
is_community: false
---

This feature targets secure the boundary node VM using trusted execution via AMD SEV-SNP. This includes the following steps:

- Evaluate the current system support of SEV-SNP
  - Initial evaluation steps have already shown that the kernel support is not in mainline of the kernel and there is currently very limited libvirt support. Issues in relation to these facts have to be determined.
  - The evaluation will be performed in two steps:
    - Boot a vanilla SEV-SNP virtual machine
    - Evaluate the [AMDESE / sev-guest](https://github.com/AMDESE/sev-guest) demo and determine the shortcomings of this approach.
- Transform the structure of the boundary node VM so it can be booted as a SEV-SNP secured VM
- Determine the necessary steps to enable remote attestation
  - Remote attestation should be performed during deployment and update of a boundary node VM
  - There should be a publicly https accessible function that enables remote attestation anybody how is interested
  - Determine the necessary steps how the build process and the inject of configuration needs to be change so remote attestation becomes meaningful for external parties.
