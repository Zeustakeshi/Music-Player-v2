export default class Item {
    constructor(data) {
        this.id = data.id;
        this.image = data.image;
        this.name = data.name;
        this.desc = data.desc;
        this.time = data.time;
        this.html = this.createHtml();
    }

    addActive() {
        this.element.classList.add("active");
    }

    removeActive() {
        this.element.classList.remove("active");
    }

    handleClick(callback) {
        this.element = document.querySelector(`.list-item.item-${this.id}`);
        this.element.addEventListener("click", () => {
            callback(this);
            this.addActive();
        });
    }

    createHtml() {
        return `        
            <div class="list-item item-${this.id} " >
            <div class="img">
                <img
                    src="${this.image}"
                    alt="img"
                />
            </div>
            <div class="info">
                <p class="title">
                    <span class="name">${this.name}</span>
                    ${this.time ? `<span class="time">${this.time}</span>` : ""}
                </p>
                <p class="desc">${this.desc}</p>
            </div>
        </div>`;
    }
}
