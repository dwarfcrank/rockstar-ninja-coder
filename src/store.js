import _ from "lodash";
import Vue from "vue";
import Vuex from "vuex";
import { gameModule } from "./game";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        game: gameModule
    }
});

export default store;
