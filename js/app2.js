import MainScreen from "./MainScreen/MainScreen2.js";
import reducer from "./reducer.js";

class App {
    constructor() {
        this.store = new Store(reducer, this);
        this.mainScreen = new MainScreen(this.store);
    }
    view() {
        this.mainScreen.view();
    }
}

window.addEventListener("load", () => {
    const app = new App();
});

class Store {
    constructor(reducer, root) {
        this.root = root;
        this.reducer = reducer;
        this.states = this.reducer();
    }

    dispatch(action, payload) {
        this.states = this.reducer(this.states, action, payload);
        console.log(this.states);
        this.view();
    }

    view() {
        this.root.view();
    }
}
