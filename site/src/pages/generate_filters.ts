export const generate_storytelling_filters = (tags: string[]) => {
  let classes = tags.map(
    (tag) => `
    .filtering.tag-${tag} .timeline-item.tag-${tag} {
      scale: 1;
      opacity: 1;
      max-height: 100vh;
      max-width: 100vw;
      margin: 0.3rem;
    }

    .filtering.tag-${tag} .tag-button.tag-${tag} {
      scale: 1;
      filter: grayscale(0);
    }
  `,
  );

  let style = `<style>

  .timeline-item {
    scale: 1;
    opacity: 1;
    margin: 0.3rem;
    max-height: 100vh;
    max-width: 100vw;
    transition: scale 1s, opacity 1s;
  }

  .filtering .timeline-item {
    scale: 0.8;
    opacity: 0.2;
  }

  .tag-button {
    scale: 1;
    transition: scale 1s, opacity 1s;
  }

  .filtering .tag-button {
    filter: grayscale(1);
    scale: 0.7;
  }

 
  ${classes.join("\n")}
  </style>`;

  return style;
};

export const generate_computing_filters = (tags: string[]) => {
  let classes = tags.map(
    (tag) => `
    .filtering.tag-${tag} .timeline-item.tag-${tag} {
      opacity: 1;
      filter: grayscale(0);
    }

    .filtering.tag-${tag} .tag-button.tag-${tag} {
      filter: grayscale(0);
      scale: 1;
    }
  `,
  );

  let style = `<style>


  .tag-button {
    scale: 1;
    transition: scale 1s, opacity 1s;
  }

  .timeline-item {
    opacity: 1;
    filter: grayscale(0);
    transition: scale 1s, opacity 1s, max-height 1s, max-width 1s, filter 1s;
  }

  .filtering .timeline-item {
    opacity: 0.2;
    filter: grayscale(1);
  }

  .filtering .tag-button {

    scale: 0.7;
    filter: grayscale(1);
    transition: scale 1s, opacity 1s, max-height 1s, max-width 1s, filter 1s;
  }

 
  ${classes.join("\n")}
  </style>`;

  return style;
};
