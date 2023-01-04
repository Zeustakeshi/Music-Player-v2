import NowPlaying from "./NowPlaying.js";
import TopChart from "./TopChart.js";
import TrackList from "./TrackList.js";

export default class MainScreen {
    constructor(songs) {
        this.songs = songs;
        this.currIndexSong = 0;
        this.audio = document.getElementById("audio");
        this.nowPlaying = new NowPlaying(this);
        this.topChart = new TopChart(this);
        this.trackList = new TrackList(this);
    }

    getCurrIndexSong() {
        return this.currIndexSong;
    }

    setCurrIndexSong(index) {
        if (index < 0) index = this.songs.length - 1;
        else if (index > this.songs.length - 1) index = 0;
        this.currIndexSong = index;
    }
}
