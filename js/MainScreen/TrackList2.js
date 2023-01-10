import List from "../list/List.js";

export default class TrackList {
    constructor(store) {
        this.store = store;
        this.element = document.querySelector(".list.track-list");
        this.trackList = this.store.states.trackList;
        this.content;
        this.view();
        Sortable.create(this.element, {
            group: "track-list",
            animation: 250,
            pull: true,
        });
    }

    initContent() {
        this.trackList = this.store.states.trackList;
        const content = [];
        this.trackList.forEach((item) => {
            const data = {
                ...item,
                desc: item.singer,
            };
            content.push(data);
        });
        this.content = new List(content);
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
        this.store.dispatch("SET_PLAYING_SONG", item.id - 1);
        this.store.dispatch("ADD_SONG_TO_TRACK_LIST", {
            id: "15",
            name: "Sweet but Psycho",
            desc: "ok",
            url: "http://api.mp3.zing.vn/api/streaming/audio/ZOF6WF76/320",
            image: "https://photo-resize-zmp3.zmdcdn.me/w500_r1x1_webp/cover/8/3/e/3/83e32789998b1ed5d77f8f8916266f09.jpg",
            singer: "Lia Nea",
        });
    }

    view() {
        this.content = [];
        this.initContent();
        this.element.innerHTML = this.content.html;
        this.content.handleClickItem(this.handleClickItem.bind(this));
    }
}
