---
info:
  company: Stealth (2)
  role: Contract Engineer
  is_contract: true
summary: Build a multi-media website with complex customizable content
start_date: 2024-05-20
end_date: 2024-07-27
tags: Typescript DevOps Netlify CI/CD HTML CSS SolidJs Astro Figma dev-containers front-end
resume_details: {}
---

This project involved the creation of a site containing two distinct sections:

- A set of pages with complex layout requirements that need to be easily editable by the client
- A collection of articles, that can be filtered by a set of tags, that have a standardized header alongside a potentially complex body

The project was built on top of Astro, using the FrontMatter CMS extension to enable easy editing of the content as markdown files. This allowed the client to use GitHub Codespaces to edit the content, and removed the need for a custom CMS.

The most robust element of the site is the layout engine - which involved extending Astro's markdown rendering capabilities to support a variety of additional components, such as galleries of images, profiles, and sections of text that toggled media or images.
