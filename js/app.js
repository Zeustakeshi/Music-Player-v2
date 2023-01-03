import Data from "./Data.js";
import MainScreen from "./MainScreen/MainScreen.js";

class App {
    constructor() {
        this.songs = Data;
        this.mainScreen = new MainScreen(this.songs);
    }
}

window.addEventListener("load", () => {
    const app = new App();
});
