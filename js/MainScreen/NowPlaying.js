import Song from "./Song.js";

export default class NowPlaying {
    constructor(global) {
        this.global = global;
        this.audio = this.global.audio;
        this.songs = this.global.songs;

        this.song = new Song(
            this.songs[this.global.getCurrIndexSong()],
            this.audio
        );
        this.thumb = document.querySelector("#content .thumb .img img");
        this.name = document.querySelector(
            "#content .thumb .action .name .main"
        );
        this.singer = document.querySelector(
            "#content .thumb .action .name .sub"
        );
        // control
        this.control = new Control(
            this.songs,
            this.song,
            this.audio,
            this.setCurrIndexSong.bind(this),
            this.getCurrIndexSong.bind(this)
        );
        // render to view
        this.view();
    }

    view() {
        this.thumb.setAttribute("src", this.song.image);
        this.name.innerText = this.song.name || "No name";
        this.singer.innerText = this.song.singer || "unknow";
    }

    getCurrIndexSong() {
        return this.global.getCurrIndexSong();
    }

    setCurrIndexSong(index) {
        this.global.setCurrIndexSong(index);
        this.song.upDate(this.songs[this.global.currIndexSong]);
        this.view();
    }

    changeSong(index) {
        this.setCurrIndexSong(index);
        this.control.clearState();
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
    constructor(songs, song, audio, setCurrIndex, getCurrIndex) {
        this.songs = songs;
        this.audio = audio;
        this.setCurrIndex = setCurrIndex;
        this.getCurrIndex = getCurrIndex;

        this.song = song;
        this.isPlaying = false;
        this.isRandom = false;
        this.isRepeat = false;

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
        this.btnRandom = document.querySelector("#control .content .random");
        this.btnRepeat = document.querySelector(
            "#control .content .repeat-song"
        );
        this.btnNextSong = document.querySelector(
            "#control .content .next-song"
        );
        this.btnPrevSong = document.querySelector(
            "#control .content .prev-song"
        );
        this.btnPlaySong = document.querySelector(
            "#control .content .btn-play"
        );
        // volum control
        this.volume = document.getElementById("volume");

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

        // radom song
        this.btnRandom.addEventListener(
            "click",
            this.handleClickRandomBtn.bind(this)
        );
        // repeat song
        this.btnRepeat.addEventListener(
            "click",
            this.handleClickRepeatBtn.bind(this)
        );

        // change volume
        this.volume.addEventListener(
            "change",
            this.handleChangeVolume.bind(this)
        );
    }

    clearState() {
        this.progress.reset();
        this.progress.init();
        this.handlePauseSong();
    }

    handleClickRandomBtn() {
        if (!this.isRandom) {
            this.btnRandom.classList.add("active");
            this.btnRepeat.classList.remove("active");
        } else {
            this.btnRandom.classList.remove("active");
        }
        this.isRandom = !this.isRandom;
        this.isRepeat = false;
    }

    handleClickRepeatBtn() {
        if (!this.isRepeat) {
            this.btnRepeat.classList.add("active");
            this.btnRandom.classList.remove("active");
        } else {
            this.btnRepeat.classList.remove("active");
        }
        this.isRepeat = !this.isRepeat;
        this.isRandom = false;
    }

    handleRandomSong() {
        let randomIndex = Math.floor(Math.random() * this.songs.length);
        while (this.getCurrIndex() == randomIndex) {
            randomIndex = Math.floor(Math.random() * this.songs.length);
        }
        this.setCurrIndex(randomIndex);
        this.clearState();
        this.handlePlaySong();
    }

    handleRepeatSong() {
        this.clearState();
        this.handlePlaySong();
    }

    handlePrevSong() {
        this.setCurrIndex(this.getCurrIndex() - 1);
        this.clearState();
    }

    handleNextSong() {
        this.setCurrIndex(this.getCurrIndex() + 1);
        this.clearState();
    }

    handlePlaySong() {
        this.song.play();
        this.btnPlaySong.classList.add("playing");
        this.progress.init();
        this.progress.update();
        this.isPlaying = true;
    }

    handlePauseSong() {
        this.song.pause();
        this.btnPlaySong.classList.remove("playing");
        this.isPlaying = false;
    }

    handleToggleSong() {
        if (!this.isPlaying) {
            this.handlePlaySong();
        } else {
            this.handlePauseSong();
        }
    }

    handleEndSong() {
        if (this.isRandom && !this.isRepeat) {
            this.handleRandomSong();
        } else if (this.isRepeat && !this.isRandom) {
            this.handleRepeatSong();
        } else {
            this.progress.reset();
            this.setCurrIndex(this.getCurrIndex() + 1);
            this.handlePlaySong();
        }
    }

    handleChangeVolume(e) {
        this.audio.volume = e.target.value / 100;
    }

    addLike() {}
    addToLib() {}
}
