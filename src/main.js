import Vue from "vue";
import App from "./app";
import store from "./store";

new Vue({
    el: "#app",
    store,
    render: h => h(App)
});

setInterval(() => {
    let commits = store.getters.totalCommitsPerSecond;

    if (commits > 0) {
        store.dispatch("addProducedCommits", commits);
    }
}, 1000);
