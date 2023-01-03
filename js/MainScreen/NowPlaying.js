export default class NowPlaying {
    constructor(songs) {
        this.audio = document.getElementById("audio");
        this.songs = songs;
        this.currIndexSong = 0;
        this.song = new Song(this.songs[this.currIndexSong], this.audio);

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
            this.prevSong.bind(this),
            this.audio
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
    constructor(data, audio) {
        this.url = data.url;
        this.audio = audio;
        this.audio.setAttribute("src", this.url);
        this.singer = data.singer;
        this.name = data.name;
        this.image = data.image;
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

class Progress {
    constructor(audio) {
        this.progress = document.getElementById("progress-1");
        this.audio = audio;
        this.timeStart = document.querySelector(
            "#control .slidecontainer .time .start"
        );
        this.timeEnd = document.querySelector(
            "#control .slidecontainer .time .end"
        );
    }

    change() {
        this.progress.addEventListener("change", (e) => {
            this.audio.currentTime = e.target.value;
        });
    }

    fomatTime(time) {
        const minutes = Math.floor(time / 60);
        const second = Math.floor(time - minutes * 60);
        return {
            minutes: minutes < 10 ? "0" + minutes : minutes,
            second: second < 10 ? "0" + second : second,
        };
    }

    init() {
        const duration = this.audio.duration;
        this.progress.max = duration;
        const time = this.fomatTime(duration);
        this.timeEnd.innerText = `${time.minutes || "00"}:${
            time.second || "00"
        }`;
    }

    update() {
        this.audio.ontimeupdate = () => {
            this.progress.value = this.audio.currentTime;
            const time = this.fomatTime(this.audio.currentTime);
            this.timeStart.innerText = `${time.minutes}: ${time.second}`;
            this.init();
        };
    }

    reset() {
        this.progress.value = 0;
    }
}

class Control {
    constructor(song, nextSong, prevSong, audio) {
        this.audio = audio;

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

        // progress bar
        this.progress = new Progress(this.audio);
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
        // progress change
        this.progress.change();

        // on song ended
        this.audio.addEventListener("ended", this.handleEndSong.bind(this));
    }

    handlePrevSong() {
        this.progress.reset();
        this.progress.init();
        this.prevSong();
        this.handlePauseSong();
    }

    handleNextSong() {
        this.progress.reset();
        this.progress.init();
        this.nextSong();
        this.handlePauseSong();
    }

    handlePlaySong() {
        this.song.play();
        this.btnPlaySong.classList.add("playing");
        this.progress.init();
        this.progress.update();
    }

    handlePauseSong() {
        this.song.pause();
        this.btnPlaySong.classList.remove("playing");
        this.isPlaying = false;
    }

    handleToggleSong() {
        if (!this.isPlaying) {
            this.handlePlaySong();
            this.isPlaying = true;
        } else {
            this.handlePauseSong();
            this.isPlaying = false;
        }
    }

    handleEndSong() {
        this.progress.reset();
        this.nextSong();
        this.handlePlaySong();
    }

    addLike() {}
    addToLib() {}
}
