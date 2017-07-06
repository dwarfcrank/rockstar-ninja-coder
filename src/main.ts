import Vue from "vue";
import App from "./app";
import store from "./store";

new Vue({
    el: "#app",
    store,
    render: h => h(App)
});

setInterval(() => {
    store.commit("tick");
}, 1000);
