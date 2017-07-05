import _ from "lodash";

export const constantFactors = {
    unitCostIncrease: 1.1337
};

export const unitTypeDefaults = {
    intern: {
        rank: 1,
        title: "Intern",
        description: "Wrote a Hello World in Python recently.",
        cost: 10,
        commitsPerSecond: 1,
        count: 0,
        unlocked: true
    },

    juniorSwEng: {
        rank: 2,
        title: "Junior Software Engineer",
        description: "Still unsullied by enterprise Java.",
        cost: 150,
        commitsPerSecond: 3,
        count: 0,
        unlocked: false
    }

};

export const gameModule = {
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
        },

        totalUnits(state, getters) {
            return _.reduce(state.unitTypes,
                (result, unitType) => result + unitType.count,
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
};
