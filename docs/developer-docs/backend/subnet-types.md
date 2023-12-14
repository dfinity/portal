# Subnet types

## Overview

A subnet on ICP is a collection of interacting replicas that run their own, separate instance of the ICP consensus mechanism, effectively creating their own blockchain on which a set of canisters can run. Each subnet can communicate with other subnets and is controlled by a root subnet. The root subnet uses chain-key cryptography to delegate its authority to the various subnets.

You can learn more about subnets and how they work [here](/docs/current/concepts/nodes-subnets).

There are three primary types of subnets: system, application, and European subnets. 

## Application subnets

Application subnets are the most common type of subnet on ICP. Almost all canisters run on an application subnet. Application subnets can be individually configured to have different features enabled or disabled, for example the Bitcoin integration subnet. 

## System subnets

System subnets are reserved for running canisters that provide a system functionality to ICP, such as the NNS canisters. System subnets have special configurations, such as not charging cycles to any of the canisters running on the subnet since system canisters need to be available at all times. System subnets also have a more generous per-call instruction limit and a more generous Wasm module size limit.

## [European subnets](/docs/current/concepts/eu-subnets)

European subnets are comprised of only node machines located in the European geographic region. This type of subnet allows for developers and enterprises to build applications that require a GDPR-aligned infrastructure and leverage blockchain decentralization with regional data sovereignty needs.




