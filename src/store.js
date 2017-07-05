import _ from "lodash";
import Vue from "vue";
import Vuex from "vuex";
import {
    constantFactors,
    unitTypeDefaults
} from "./game";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        totalCommits: 0,
        unitTypes: _.cloneDeep(unitTypeDefaults)
    },

    getters: {
        canBuyUnit(state, getters) {
            return (unitId) =>
                state.totalCommits >= state.unitTypes[unitId].cost;
        },

        totalCommitsPerSecond(state, getters) {
            return _.reduce(state.unitTypes,
                (result, unitType) => result + unitType.count * unitType.commitsPerSecond,
                0);
        }
    },

    mutations: {
        addCommits(state, amount) {
            state.totalCommits += Math.round(amount);

            _.forOwn(state.unitTypes, (unitType, id) => {
                if (state.totalCommits >= unitType.cost && !unitType.unlocked) {
                    state.unitTypes[id].unlocked = true;
                }
            });
        },

        buyUnit(state, unitId) {
            state.totalCommits -= state.unitTypes[unitId].cost;

            const newCost = Math.round(state.unitTypes[unitId].cost * constantFactors.unitCostIncrease);
            state.unitTypes[unitId].cost = newCost;
            state.unitTypes[unitId].count++;
        }
    },

    actions: {
        addProducedCommits({
            state,
            commit,
            getters
        }) {
            commit("addCommits", getters.totalCommitsPerSecond);
        }
    }
});

export default store;
