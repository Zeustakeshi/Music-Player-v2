import List from "../list/List.js";

export default class TrackList {
    constructor(global) {
        this.global = global;
        this.element = document.querySelector(".list.track-list");
        this.content;
        this.initContent();
        this.view();
        this.content.handleClickItem(this.handleClickItem.bind(this));

        Sortable.create(this.element, {
            group: "track-list",
            animation: 250,
            pull: true,
        });
    }

    initContent() {
        const content = [];
        [...this.global.songs].splice(0, 5).forEach((item) => {
            const data = {
                ...item,
                desc: item.singer,
            };
            content.push(data);
        });
        this.content = new List(this.global, content);
    }

    addSong(song) {
        const songData = {
            ...song,
            desc: song.singer,
        };
        this.content.addItem(songData);
        this.view();
        this.content.addEvenClickItem(0, this.handleClickItem.bind(this));
    }

    handleClickItem(item) {
        this.global.nowPlaying.changeSong(item.id - 1);
        console.log("click song: " + item.id);
    }

    view() {
        this.element.innerHTML = this.content.html;
    }
}
