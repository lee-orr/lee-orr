---
info:
    company: Stealth
    role: Contract Engineer
    is_contract: true
summary: Built a tool allowing the creation of interactive maps using Figma & Google Sheets.
start_date: 2022-12-01
end_date: 2023-05-01
tags: Typescript Rust Architecture DevOps Netlify CI/CD SVG HTML CSS Figma CSV dev-containers front-end full-stack yew tdd
---

This project involved the creation of an interactive transit-style map, with the ability to highlight lines, get information about stops, and see additional layers of connections between them.

When we started, the client wanted my to develop the map based on the then-current designs & information. However, given they were still actively updating the information I suggested creating a tool that would allow them to make changes and updates themselves. This lead me to build a rust-based CLI that took Figma's SVG export & CSV's from their google sheets to generate the final result - a simple Javascript & CSS site - and have that deployed to Netlify.

Over time - the CLI tool evolved into it's own web-based editor, displaying errors in the input data and allowing for adjustments to some aspects of the site before deploying. The generated site also evolved, moving from a single JS file & some CSS to a typescript-based functional-programming-style application.

Throughout the entire process, changes were built, tested and deployed allowing the client to see the product evolve from it's earliest roots rather than waiting for a "completed" version.