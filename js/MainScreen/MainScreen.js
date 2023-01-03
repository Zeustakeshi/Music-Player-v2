import NowPlaying from "./NowPlaying.js";

export default class MainScreen {
    constructor(songs) {
        this.songs = songs;

        this.nowPlaying = new NowPlaying(songs);
    }
}
