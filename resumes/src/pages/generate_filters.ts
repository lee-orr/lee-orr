export const generate_filters = (tags: string[]) => {
    let classes = tags.map((tag) => `
    .filtering.tag-${tag} .timeline-item.tag-${tag} {
      display: flex;
    }

    .filtering.tag-${tag} .tag-button.tag-${tag} {
      filter: grayscale(0);
    }
  `);

    let style = `<style>
  .filtering .timeline-item {
    display: none;
  }

  .filtering .tag-button {
    filter: grayscale(1);
  }

 
  ${classes.join("\n")}
  </style>`;

    return style;
};
