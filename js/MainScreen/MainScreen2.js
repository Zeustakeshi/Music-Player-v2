import NowPlaying from "./NowPlaying2.js";
import TrackList from "./TrackList2.js";

export default class MainScreen {
    constructor(store) {
        this.store = store;
        this.states = this.storestates;
        this.audio = document.getElementById("audio");
        this.nowPlaying = new NowPlaying(
            this.store,
            this.store.states.trackList,
            this.audio
        );

        this.trackList = new TrackList(this.store, this.store.states.trackList);
    }
    view() {
        this.nowPlaying.view();
        this.trackList.view();
    }
}
