import _ from "lodash";

const constantFactors = {
    developerCostIncrease: 1.1337
};

const developerTypeDefaults = {
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

function commitsPerSecondByDeveloper(state, id) {
    const { count, commitsPerSecond } = state.developerTypes[id];
    return count * commitsPerSecond;
}

export const gameModule = {
    state: {
        totalCommits: 0,
        developerTypes: _.cloneDeep(developerTypeDefaults)
    },

    getters: {
        canHireDeveloper(state, getters) {
            return (developerId) =>
                state.totalCommits >= state.developerTypes[developerId].cost;
        },

        totalCommitsPerSecond(state, getters) {
            return _.reduce(state.developerTypes,
                (result, developerType, id) => result + commitsPerSecondByDeveloper(state, id),
                0);
        },

        totalDevelopers(state, getters) {
            return _.reduce(state.developerTypes,
                (result, developerType) => result + developerType.count,
                0);
        }
    },

    mutations: {
        addCommits(state, amount) {
            state.totalCommits += Math.round(amount);

            _.forOwn(state.developerTypes, (developerType, id) => {
                if (state.totalCommits >= developerType.cost && !developerType.unlocked) {
                    state.developerTypes[id].unlocked = true;
                }
            });
        },

        hireDeveloper(state, developerId) {
            state.totalCommits -= state.developerTypes[developerId].cost;

            const newCost = Math.round(state.developerTypes[developerId].cost * constantFactors.developerCostIncrease);
            state.developerTypes[developerId].cost = newCost;
            state.developerTypes[developerId].count++;
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
