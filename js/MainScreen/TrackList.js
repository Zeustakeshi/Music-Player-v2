import List from "../list/List.js";

export default class TrackList {
    constructor(global) {
        this.global = global;
        this.content = new List(this.global, this.global.songs);
        this.element = document.querySelector(".list.track-list");
        this.view();
        this.content.handleClickItem(this.handleClickItem.bind(this));

        Sortable.create(this.element, {
            group: "track-list",
            animation: 250,
            pull: true,
        });
    }

    handleClickItem(item) {
        this.global.nowPlaying.changeSong(item.id - 1);
    }

    view() {
        this.element.innerHTML = this.content.html;
    }
}
