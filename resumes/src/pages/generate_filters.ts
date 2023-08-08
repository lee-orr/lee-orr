export const generate_filters = (tags: string[]) => {
  let classes = tags.map((tag) => `
    .filtering.tag-${tag} .timeline-item.tag-${tag} {
      scale: 1;
      opacity: 1;
      max-height: 100vh;
      max-width: 100vw;
    }

    .filtering.tag-${tag} .tag-button.tag-${tag} {
      filter: grayscale(0);
    }
  `);

  let style = `<style>

  .timeline-item {
    scale: 1;
    opacity: 1;
    max-height: 100vh;
    max-width: 100vw;
    transition: scale 1s, opacity 1s, max-height 1s, max-width 1s;
  }

  .filtering .timeline-item {
    scale: 0;
    opacity: 0;
    max-height: 0;
    max-width: 0;
  }

  .filtering .tag-button {
    filter: grayscale(1);
  }

 
  ${classes.join("\n")}
  </style>`;

  return style;
};
