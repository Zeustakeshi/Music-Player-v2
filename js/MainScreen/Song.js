export default class Song {
    constructor(store, song, audio) {
        this.store = store;
        this.id = song.id;
        this.url = song.url;
        this.audio = audio;
        if (this.audio) {
            this.audio.setAttribute("src", this.url);
        }

        this.singer = song.singer;
        this.name = song.name;
        this.image = song.image;
    }
    update(song) {
        if (song) {
            this.singer = song.singer;
            this.name = song.name;
            this.image = song.image;
            this.url = song.url;
        } else {
            const currIndex = this.store.states.playingSong;
            const song = this.store.states.trackList[currIndex];
            console.log(currIndex);
            this.singer = song.singer;
            this.name = song.name;
            this.image = song.image;
            this.url = song.url;
        }
        this.audio.setAttribute("src", this.url);
    }
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
}
