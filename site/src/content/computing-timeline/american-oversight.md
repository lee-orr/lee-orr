---
info:
  company: American Oversight
  role: Contract Engineer
  is_contract: true
summary: Build an interactive map for filtering & visualizing a collection of profiles 
start_date: 2024-08-01
end_date: 2024-12-03
tags: Typescript DevOps Wordpress React CI/CD HTML CSS dev-containers front-end Airtable d3 GeoJSON SVG
resume_details:
  airtable: Set up an Airtable database and a workflow for deploying the data into a static site
  d3: Built an interactive map using D3 & GeoJSON data
---

The client has been constructing a database of people active in various parts of the US, and were looking for way to expose that data on an interactive map.

The primary constraints of this work included integrating with their new Wordpress site, and ensuring the research team can easily continue updating the database without unnecessary impacts on their processes. 

The work on this project started with planning a simple layout, writing a Wordpress plugin, and setting up a process to automatically build & deploy updates from my repository to the Wordpress server.

Once that was complete, the work centered around a few elements:

**The map**: which started out using react-simple-maps before the project outgrew it's capabilities, leading me to use d3 directly

**The database**: originally built in google sheets and exported as a CSV, that would get manually imported into the codebase and processed on the client side. Once it's structure had solidified enough, I set up the database on Airtable to allow the client to make changes both to the data itself and to metadata relating to the map. Airtable was chosen since the client's team was familiar with it already, and it provided a good balance of structure & flexibility

**The search and filter system**: The map includes tools for filtering & searching through both people & locatons. It required the capacity to adjust the order and grouping of results based on the current selection in the map, hadling of fuzzy search results separately from exact search results, and the ability for the client to define a variety of filters in a hierarchy.

**Design**: the client did not have access to a UI or UX designer for this project, so it was my responsibility to design the map to fit in with the rest of their website. The design was responsive, scaling smoothly from desktop down to mobile devices.
