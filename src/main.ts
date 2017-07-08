import Vue from "vue";
import App from "./app";
import store from "./store";

new Vue({
    el: "#app",
    store,
    render: (h) => h(App),
});

const tickInterval = 100;
const autosaveInterval = 60 * 1000;

setInterval(() => {
    const commitsPerTick = store.getters.commitRate * (tickInterval / 1000);
    store.commit("addCommits", commitsPerTick);
}, tickInterval);

setInterval(() => {
    const stateJson = JSON.stringify(store.state);
    localStorage.setItem("gameState", stateJson);
}, autosaveInterval);
