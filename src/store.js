import _ from "lodash";
import Vue from "vue";
import Vuex from "vuex";
import { getInitialDeveloperState } from "./developers";
import { getInitialUpgradeState, upgrades } from "./upgrades";
import { getAvailableUpgrades, getAvailableDevelopers, getDeveloperCommitRate, getCommitRate } from "./game";
import constants from "./constants";

Vue.use(Vuex);

function updateAvailability(state) {
    getAvailableUpgrades(state)
        .forEach(upgradeId => {
            if (state.upgrades[upgradeId].status !== constants.upgradeStatus.unlocked) {
                state.upgrades[upgradeId].status = constants.upgradeStatus.available;
            }
        });

    getAvailableDevelopers(state)
        .forEach(devId => state.developers[devId].available = true);
}

const store = new Vuex.Store({
    state: {
        totalCommits: 0,
        developers: getInitialDeveloperState(),
        upgrades: getInitialUpgradeState()
    },

    getters: {
        canHireDeveloper: (state, getters) => id => {
            return state.totalCommits >= state.developers[id].cost;
        },

        canBuyUpgrade: (state, getters) => id => {
            return state.totalCommits >= upgrades[id].cost;
        },

        commitRateByDeveloper: (state, getters) => id => {
            return getDeveloperCommitRate(state, id);
        },

        developerCount(state) {
            return _.reduce(state.developers, (result, dev) => result + dev.count, 0);
        },

        commitRate: (state) => getCommitRate(state)
    },

    mutations: {
        tick(state) {
            state.totalCommits += getCommitRate(state);
            updateAvailability(state);
        },

        addCommits(state, amount) {
            state.totalCommits += amount;
            updateAvailability(state);
        },

        hireDeveloper(state, devId) {
            state.totalCommits -= state.developers[devId].cost;
            state.developers[devId].cost *= constants.developerCostGrowth;
            state.developers[devId].count++;
        },

        buyUpgrade(state, upgradeId) {
            state.totalCommits -= upgrades[upgradeId].cost;
            state.upgrades[upgradeId].status = constants.upgradeStatus.unlocked;
        }
    }
});

export default store;
