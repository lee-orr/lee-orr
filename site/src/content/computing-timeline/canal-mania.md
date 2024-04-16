---
info:
  project: Canal Mania!
summary: A prototype of a puzzle game inspired by the rush to build canals in early 1800s great britain. Involved significant shader work, a robust rules engine, and a custom level editor.
start_date: 2023-12-31
end_date: 2023-01-08
tags: games 3d rust bevy ci-cd wgsl
links:
    "github": "https://github.com/lee-orr/CanalMania"
    "itch": "https://lee-orr.itch.io/canal-mania"
resume_details:
  water-flow-simulation: Integrated a water simulation into the puzzle gameplay
  ui-system: Built an abstraction around Bevy's UI to enable easier UI manipulation and the creation of an in-game editor
  playtests: Ran regular play tests and utilized user feedback to improve the design
  shader: Created a custom shader to display terrain contour lines and deform flat tiles to generate a height map
---

I originally built this game as part of the Historically Accurate Game Jam - based on the theme of "The Industrial Revolution".

The main technical challenges of the game fell into a few categories:

- Presenting a clear and easy to parse map where height was of such importance, which required the creation of a custom shader that generated terrain contour lines akin to a physical map.

- Processing the flow of water down stream as part of the logic puzzle, and in particular detecting when flow is cut off.

- Creating an abstraction around the Bevy UI systems that would allow for easy UI manipulation and the creation of an in-game editor, despite it's lack of pre-existing features.
