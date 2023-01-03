export default class NowPlaying {
    constructor(songs) {
        this.songs = songs;
        this.currIndexSong = 0;
        this.song = new Song(this.songs[this.currIndexSong]);

        this.thumb = document.querySelector("#content .thumb .img img");
        this.name = document.querySelector(
            "#content .thumb .action .name .main"
        );
        this.singer = document.querySelector(
            "#content .thumb .action .name .sub"
        );
        // control
        this.control = new Control(
            this.song,
            this.nextSong.bind(this),
            this.prevSong.bind(this)
        );
        // render to view
        this.view();
    }

    view() {
        this.thumb.setAttribute("src", this.song.image);
        this.name.innerText = this.song.name || "No name";
        this.singer.innerText = this.song.singer || "unknow";
    }

    nextSong() {
        this.currIndexSong += 1;
        if (this.currIndexSong > this.songs.length) this.currIndexSong = 0;
        this.song.upDate(this.songs[this.currIndexSong]);
        this.view();
    }

    prevSong() {
        this.currIndexSong -= 1;
        if (this.currIndexSong < 0) this.currIndexSong = this.songs.length - 1;
        this.song.upDate(this.songs[this.currIndexSong]);
        this.view();
    }
}

class Song {
    constructor(data) {
        this.audio = document.getElementById("audio");
        this.audio.setAttribute("src", this.url);
        this.singer = data.singer;
        this.name = data.name;
        this.image = data.image;
        this.url = data.url;
    }
    upDate(data) {
        this.singer = data.singer;
        this.name = data.name;
        this.image = data.image;
        this.url = data.url;
        this.audio.setAttribute("src", this.url);
    }
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
}

class Control {
    constructor(song, nextSong, prevSong) {
        this.song = song;
        this.isPlaying = false;
        this.nextSong = nextSong;
        this.prevSong = prevSong;

        // btn like
        this.btnLike = document.querySelector(
            "#content .thumb .action .btn-like"
        );
        // btn add
        this.btnAddtoLib = document.querySelector(
            "#content .thumb .action .btn-add"
        );

        //process bar
        this.timeStart;
        this.timeEnd;
        this.process;
        // main control
        this.btnRandom;
        this.btnRepeatSong;
        this.btnNextSong = document.querySelector(
            "#control .content .next-song"
        );
        this.btnPrevSong = document.querySelector(
            "#control .content .prev-song"
        );
        this.btnPlaySong = document.querySelector(
            "#control .content .btn-play"
        );

        this.handleEven();
    }

    handleEven() {
        this.btnLike.addEventListener("click", this.addLike);
        this.btnAddtoLib.addEventListener("click", this.addToLib);

        // click btn play
        this.btnPlaySong.addEventListener(
            "click",
            this.handleToggleSong.bind(this)
        );
        // prev song
        this.btnPrevSong.addEventListener(
            "click",
            this.handlePrevSong.bind(this)
        );
        // next song
        this.btnNextSong.addEventListener(
            "click",
            this.handleNextSong.bind(this)
        );
    }

    handlePrevSong() {
        this.prevSong();
        this.handlePauseSong();
    }

    handleNextSong() {
        this.nextSong();
        this.handlePauseSong();
    }

    handlePlaySong() {
        this.song.play();
        this.btnPlaySong.classList.add("playing");
    }

    handlePauseSong() {
        this.song.pause();
        this.btnPlaySong.classList.remove("playing");
    }

    handleToggleSong() {
        if (!this.isPlaying) {
            this.handlePlaySong();
        } else {
            this.handlePauseSong();
        }
        this.isPlaying = !this.isPlaying;
    }

    addLike() {}
    addToLib() {}
}
