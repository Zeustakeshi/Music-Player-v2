import Song from "./Song.js";

export default class TopChart {
    constructor(global) {
        this.global = global;
        this.songs = this.global.songs;
        this.items = [];
        this.createItem();
        this.html = this.createHtml();
        this.container = document.querySelector(
            "#sidebar-left .content .top-chart .container"
        );
        this.container.innerHTML = this.html;
        this.handleClickItem();
    }

    handleClickItem() {
        this.items.forEach((item) => {
            item.handleClick(({ song }) => {
                this.global.nowPlaying.changeSong(song.id - 1);
            });
        });
    }

    createItem() {
        [...this.songs].splice(8, 4).forEach((song) => {
            this.items.push(new TopChartItem(song));
        });
    }

    createHtml() {
        return this.items.map((item) => item.html).join("");
    }
}

class TopChartItem {
    constructor(song) {
        this.song = new Song(song);
        this.html = this.createHtml();
    }

    handleClick(callback) {
        this.element = document.querySelector(
            `#sidebar-left .content .top-chart .container .item.item-${this.song.id}`
        );
        this.element.addEventListener("click", () => callback(this));
    }

    createHtml() {
        return `
        <div class="item item-${this.song.id}" >
            <div class="img">
                <img
                    src="${this.song.image}"
                    alt="song"
                />
            </div>
            <div class="info">
                <p class="name">${this.song.name}</p>
                <p class="desc">${this.song.singer}</p>
            </div>
        </div>
        `;
    }
}
