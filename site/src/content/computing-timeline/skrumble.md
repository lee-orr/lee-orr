---
info:
  company: Skrumble
  role: Full Stack Developer
summary: Managed over 200 deployed systems. Architected a scalable, cloud based version of our product. Developed a highly customizable phone IVR system. Migrated our SIP & Media servers from 2 physical Freeswitch servers to NodeJS & Kurento on the cloud.
start_date: 2015-06-01
end_date: 2018-12-01
tags: Architecture Javascript Vue NodeJS Docker DevOps SQL MongoDB AWS Freeswitch Lua Bash HTML WebRTC P2P PHP front-end back-end full-stack websocket redis
---

My work at Skrumble started as a website developer - implementing PSD designs in HTML & CSS. During downtime, I built a custom version of the ProcessWire CMS that allowed the graphic designed to update the site directly - making my original job reudandant and saving ~50k a year on that position.

At that point, I was asked to help our back end developer handle his workload - and primarily worked on migrating us from VMWare VMs to LXD containers, and contributing small features like mobile notifications. However, when the back end developer left the company I became the sole developer on the back end - and had to handle feature development and operations for our ~2-300 containers across 2 physical machines.

This experience lead to my proposed re-architecture of our product - migrating from having individual containers running our entire stack for each client, to utilizing AWS Elastic Beanstalk with NodeJS for our HTTP & WebSocket APIs, including real-time chat functionality, and a single instance of our media server (Freeswitch) on each of the physical machines for handling calls.

We were able to complete the back-end re-write, and start building out new features and adaptations over time - as well as hiring additional developers. Eventually, I started work on the IVR system - which allowed clients to visually construct complex voice prompts for their phone systems, before moving towards R&D work.

My initial assignment was to find a scalable solution for our media server & SIP communications, since we were hitting the limit with our 2 Freeswitch machines, and that system was not designed in a way that works well at scale. After some experimentation, I developed a solution using Kurento & NodeJS - which was able to scale horizontally on AWS rather than requiring bare metal operation. We were able to integrate this solution into the main product - fully replacing our original VOIP infrustructure.

My last assignment was to prototype peer-to-peer video calling functionality to support larger video conferences. At the time, converencing would have to go through our media server - and the best-in-class peer-to-peer solutions could handle at most 3-4 users. I found an approach that was able to support 18 individual video streams with acceptible latency using a partial, self-healing mesh structure, where only the initial connection to the conference had to be mediated by a server.
