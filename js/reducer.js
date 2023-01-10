import Data from "./Data.js";

const initStates = {
    songs: Data,
    playingSong: 0,
    trackList: [...Data].splice(0, 5),
    topChart: [],
    favorites: [],
    userInfo: {},
};

const addSongToTrackList = (states, newSong) => {
    if (
        !states.trackList.find(
            (item) => JSON.stringify(item) === JSON.stringify(newSong)
        )
    ) {
        return { ...states, trackList: [newSong, ...states.trackList] };
    }
    return states;
};

const setPlayingSong = (states, index) => {
    if (index < 0) {
        return { ...states, playingSong: states.trackList.length - 1 };
    } else if (index >= states.trackList.length) {
        return { ...states, playingSong: 0 };
    } else {
        return { ...states, playingSong: index };
    }
};

export default function reducer(states = initStates, action, payload) {
    switch (action) {
        case "ADD_SONG_TO_TRACK_LIST":
            return addSongToTrackList(states, payload);
        case "SET_PLAYING_SONG":
            return setPlayingSong(states, payload);
        default:
            return states;
    }
}
