---
info:
  company: Storyteller.ai
  role: Bevy Contractor
  is_contract: true
summary: Implement a custom Asset Loader for animation clips from a time-stamped CSV
start_date: 2024-02-05
end_date: 2024-02-12
tags: rust bevy game ci-cd tdd
---

Storyteller.ai provide a tool for animation, and needed a way to import those animations into Bevy. The original expectation was that it would require significant work adapting the animation system and the rendering of mesh morphs, but ultimately I was able to make it work by writing a custom asset loader and format for mapping the animations onto a given mesh.
