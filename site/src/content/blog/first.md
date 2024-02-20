---
title: Hot Reload in Rust - How Do We Start?
tags: rust, bevy, hot-reload, ui
date: 2024-02-19
summary: This post covers the inspiration and challenges behind the initial versions of Dexterous Developer
type: computing
---

# Why?

About 6 months ago, I started working on a hot-reload system for [Bevy](https://bevyengine.org) - an awesome rust-based game engine.

I had just finished a game jam, and was frustrated by the cycle of needing to restart the game and navigate back to a given screen to see my changes - especially for styling in-game UI. Compared to my experience with front-end web development, where tools like Vite let you make sweeping changes on the fly and use hot module reload to update the code as you go. This was so much slower - and as a result, harder to progress or justify - especially a time sensitive context like a game jam.

So I looked for options...

I found [Cargo Watch](https://github.com/watchexec/cargo-watch) which supports *live reload*, where the app is re-built and re-loaded but state is erased. And on WASM, [Trunk](https://trunkrs.dev) supported the same functionality.
I found [Dioxus](https://dioxuslabs.com), which managed to make their view macros hot reloadable! But the rest of the app wasn't.
And then there was [Ridiculous Bevy Hot Reloading](https://github.com/DGriffin91/ridiculous_bevy_hot_reloading)! This was a Bevy plugin already, and it could reload new logic - but it couldn't handle adding new systems or changing their signatures, and couldn't deal with changes to components or resources structures.

Each of these tools is great - but none of them solved the problem I was having... so I decided to give implementing something myself a shot.

# How it works (in short)
