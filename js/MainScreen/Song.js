export default class Song {
    constructor(song, audio) {
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
    upDate(song) {
        this.singer = song.singer;
        this.name = song.name;
        this.image = song.image;
        this.url = song.url;
        this.audio.setAttribute("src", this.url);
    }
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
}
