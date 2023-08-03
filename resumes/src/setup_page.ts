const buttons = document.querySelectorAll('button.tag-button');

const active_filters: { [key: string]: boolean } = {};

const render = () => {
    let root = document.querySelector("html");
    if (!root) return;
    let filters = Object.keys(active_filters).filter((k) => active_filters[k]);

    if (filters.length > 0) {
        root.classList.value = `filtering ${filters.map((v) => `tag-${v}`).join(" ")}`
    } else {
        root.classList.value = "";
    }
}

for (const button of buttons) {
    let tag = button.id.replace("button-", "");
    if (tag) {
        button.addEventListener("click", () => {
            active_filters[tag] = active_filters[tag] ? false : true;
            render();
        });
    }
}