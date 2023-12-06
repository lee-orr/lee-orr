---
info:
  project: Rusty Dev Containers
summary: A collection of useful dev container features, to make it easier to set them up for rust or wasm development.
start_date: 2023-05-13
tags: rust wasm dev-containers docker
github: https://github.com/lee-orr/rusty-dev-containers
---

One of the tools that has helped my work most is the use of containers to create consistent development environments. I used to use GitPod, but since finding out about dev-containers - which allow you to run containerized development environments locally via docker - I've been using them on every project I can. However, many of the tools I use regularly were not available as features for dev-containers, so I would have to create custom docker files.

This project is the solution to that frustration - it provides dev container features for many Rust or WASM related tools, such as the Wasm Bindgen CLI, Wargo Watch, Bacon, and more.
