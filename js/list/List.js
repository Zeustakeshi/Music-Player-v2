import Item from "./Item.js";

export default class List {
    constructor(data) {
        // this.global = global;
        this.data = data;
        this.items = [];
        this.createItem();
        this.html = this.createHtml();
        this.activeItem = 0;
    }

    addItem(item) {
        if (this.data.find((i) => JSON.stringify(i) === JSON.stringify(item))) {
            return;
        }
        this.data.push(item);
        this.items = [new Item(this.global, item), ...this.items];

        this.activeItem = this.items[0].id;
        this.html = this.createHtml();
    }

    addEvenClickItem(index, callback) {
        this.activeItem = index;
        this.handleClickItem(callback);
    }

    handleClickItem(callback) {
        this.items.forEach((item) => {
            item.handleClick((item, index) => {
                this.items.forEach((item) => {
                    if (item.id != this.activeItem) {
                        item.removeActive();
                    } else {
                        item.addActive();
                    }
                });
                callback(item, index);
            });
        });
    }

    createHtml() {
        return this.items.map((item) => item.html).join("");
    }

    createItem() {
        this.data.forEach((item) => {
            this.items.push(new Item(item));
        });
    }
}
