const tags = document.querySelectorAll('button.tag-button');
const item_buttons = document.querySelectorAll('button.timeline-item-button');

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

for (const button of tags) {
    let tag = button.id.replace("button-", "");
    if (tag) {
        button.addEventListener("click", () => {
            active_filters[tag] = active_filters[tag] ? false : true;
            render();
        });
    }
}

for (const button of item_buttons) {
    let dialog_id = button.id.replace("item-", "dialog-");
    let dialog = document.querySelector<HTMLDialogElement>(`dialog#${dialog_id}`);
    if (dialog) {
        dialog.addEventListener("click", (event) => {
            if (event.target == dialog) {
                dialog?.close();
            }
        });
        button.addEventListener("click", () => {
            if (dialog) {
                if (dialog.open) {
                    dialog.close();
                } else {
                    dialog.showModal();
                }
            }
            render();
        });
    }
}