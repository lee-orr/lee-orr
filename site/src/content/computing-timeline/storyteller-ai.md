---
info:
  company: Storyteller.ai
  role: Bevy Contractor
  is_contract: true
summary: Implement a custom Asset Loader generating animation clips from a time-stamped CSV, create an animation timeline allowing easy keyframing and the use of pre-existing animations on their characters
start_date: 2024-02-05
end_date: 2024-04-11
tags: rust bevy game ci-cd tdd lit animation
resume_details:
  retargeting: Created a system for retargeting animations from a CSV in Bevy
  loading: Built a custom asset loader for loading CSV files as Bevy animation clips
  timeline: Created a timeline with support for keyframing objects and coordinating the playback of animation clips
---

My work with Storyteller.ai started in the context of a small, targeted contract. They needed a way to import animations stored in a CSV format into the Bevy game engine. The original expectation was that it would require significant work adapting the animation system and the rendering of mesh morphs, but ultimately I was able to make it work by writing a custom asset loader and format for mapping the animations onto a given mesh.

Shortly after the initial contract, they asked me to return - this time to temporarily augment their bevy team. As part of that work, I implemented a timeline for their animation editor - along with the ability to keyframe objects and apply imported animation clips on individual characters within the timeline. I also created the initial implementation of a re-style, added the capacity to save and load assets via indexedDB in addition to the API, and aided in the resolution of bugs with the use of web workers in asset loading.
