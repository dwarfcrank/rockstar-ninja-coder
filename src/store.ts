import _ from "lodash";
import Vue from "vue";
import Vuex from "vuex";
import { developerCostGrowth } from "./constants";
import { DeveloperState, getInitialDeveloperState } from "./developers";
import { GameState, getAvailableDevelopers, getAvailableUpgrades, getCommitRate, getCommitsPerClick, getDeveloperCommitRate } from "./game";
import { getInitialUpgradeState, upgrades } from "./upgrades";
import { UpgradeStatus } from "./upgrades";

Vue.use(Vuex);

function updateAvailability(state: GameState) {
    getAvailableUpgrades(state)
        .forEach((upgradeId) => {
            if (state.upgrades[upgradeId].status !== UpgradeStatus.Unlocked) {
                state.upgrades[upgradeId].status = UpgradeStatus.Available;
            }
        });

    getAvailableDevelopers(state)
        .forEach((devId) => state.developers[devId].available = true);
}

function getInitialState(): GameState {
    const savedStateJson = localStorage.getItem("gameState");

    if (savedStateJson) {
        return JSON.parse(savedStateJson) as GameState;
    }

    return {
        totalCommits: 0,
        allTimeCommits: 0,
        developers: getInitialDeveloperState(),
        upgrades: getInitialUpgradeState(),
    };
}

const store = new Vuex.Store({
    state: getInitialState(),

    getters: {
        canHireDeveloper: (state: GameState, getters) => (id: string): boolean => {
            return state.totalCommits >= state.developers[id].cost;
        },

        canBuyUpgrade: (state: GameState, getters) => (id: string): boolean => {
            return state.totalCommits >= upgrades[id].cost;
        },

        commitRateByDeveloper: (state: GameState, getters) => (id: string): number => {
            return getDeveloperCommitRate(state, id);
        },

        developerCount(state: GameState): number {
            return _.reduce(state.developers, (result: number, dev: DeveloperState) => result + dev.count, 0);
        },

        commitRate: (state: GameState): number => getCommitRate(state),

        commitsPerClick: (state: GameState): number => getCommitsPerClick(state),
    },

    mutations: {
        addCommits(state: GameState, amount: number) {
            state.totalCommits += amount;
            state.allTimeCommits += amount;
            updateAvailability(state);
        },

        hireDeveloper(state: GameState, devId: string) {
            state.totalCommits -= state.developers[devId].cost;
            state.developers[devId].cost = Math.round(state.developers[devId].cost * developerCostGrowth);
            state.developers[devId].count++;
        },

        buyUpgrade(state: GameState, upgradeId: string) {
            state.totalCommits -= upgrades[upgradeId].cost;
            state.upgrades[upgradeId].status = UpgradeStatus.Unlocked;
        },
    },
});

export default store;
