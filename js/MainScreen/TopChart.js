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
    }

    createItem() {
        [...this.songs].splice(0, 4).forEach((song) => {
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

    createHtml() {
        return `
        <div class="item" >
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
