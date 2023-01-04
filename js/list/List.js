import Item from "./Item.js";

export default class List {
    constructor(global, data) {
        this.global = global;
        this.data = data;
        this.items = [];
        this.createItem();
        this.html = this.createHtml();
        this.activeItem = 1;
    }

    handleClickItem(callback) {
        this.items.forEach((item) => {
            item.handleClick((item) => {
                this.activeItem = item.id;
                this.items.forEach((item) => {
                    if (item.id != this.activeItem) {
                        item.removeActive();
                    } else {
                        item.addActive();
                    }
                });
                callback(item);
            });
        });
    }

    createHtml() {
        return this.items.map((item) => item.html).join("");
    }

    createItem() {
        this.data.forEach((item) => {
            const dataItem = {
                ...item,
                desc: item.singer,
            };
            this.items.push(new Item(this.global, dataItem));
        });
    }
}
