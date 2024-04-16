---
info:
  project: Crossroad Blues
summary: A game prototype involving physics opimizations, procedural generation, and utility AI.
start_date: 2023-09-08
end_date: 2023-09-18
tags: games rust bevy ci-cd
links:
    "github": "https://github.com/lee-orr/crossroad-blues/"
    "itch": "https://lee-orr.itch.io/crossroad-blues"
resume_details:
  map-generation: Procedurally generated maps with constraints to allow for level design
  performance: Optimized collision detection and logic processing for hundreds of enemies and pickups
  ai: Implemented enemy logic using Utility AI, allowing them to be modified in a modular manner
---

When [VimJam4](https://itch.io/jam/vimjam4) unveiled their theme, "Cross Paths", my mind immediately went to the legends around Robert Johnson's "Cross Road Blues". A classic story of a Faustian bargin, at a crossroad, in the dead of night. As I was playing with that concept, I realized it'd be fun to be a devil trying to gather souls with these deals, working their way up in the world. And so, the game "Crossroad Blues" was born.

This game involved some significant technical challenges around a few key areas:

- the generation of maps that followed a road but still had some amount of ability to define their expected pacing and shapes.

- the handling of many objects with collisions and logic processing - each level would contain thousands of trees and hundreds of enemies, and we had to optimize their performance using approaches like oct-trees and distance-based culling to ensuire smooth gameplay.

- this was my first foray into utility AI, and implementing it was complex even with the use of pre-existing libraries as a base.