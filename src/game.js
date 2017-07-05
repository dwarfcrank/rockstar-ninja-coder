import _ from "lodash";

const constantFactors = {
    developerCostIncrease: 1.1337
};

const upgradeDefaults = {
    vim: {
        title: "vim",
        description: "Modal editing improves interns' productivity by 2%.",
        cost: 50,
        multipliers: {
            intern: 1.02
        },
        requirements: {
            intern: 10
        },
        unlocked: false
    },

    jetbrains: {
        title: "JetBrains Subscription",
        description: "IDEA is awesome. Junior SW Engineers' productivity up 4%",
        cost: 500,
        multipliers: {
            juniorSwEng: 1.04
        },
        requirements: {
            juniorSwEng: 10
        },
        unlocked: false
    },

    thinkpads: {
        title: "ThinkPads",
        description: "Physical function keys improve debugging experience. Total productivity up 5%.",
        cost: 1000,
        multipliers: {
            all: 0.05
        },
        requirements: {
            intern: 20,
            juniorSwEng: 20
        },
        unlocked: false
    },
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

function developerCommitMultiplier(state, developerId) {
    return _.reduce(state.upgrades, (result, upgrade) => {
        if (upgrade.unlocked && upgrade.multipliers[developerId]) {
            return result * upgrade.multipliers[developerId];
        }

        return result;
    }, 1);
}

function commitsPerSecondByDeveloper(state, id) {
    const { count, commitsPerSecond } = state.developerTypes[id];
    return count * commitsPerSecond * developerCommitMultiplier(state, id);
}

function checkUpgradeRequirements(state, id) {
    const { requirements } = state.upgrades[id];

    let ok = true;

    _.forOwn(requirements, (reqCount, reqId) => {
        ok = ok && state.developerTypes[reqId].count >= reqCount;
    });

    return ok;
}

function totalCommitMultiplier(state) {
    return _.reduce(state.upgrades, (result, upgrade) => {
        if (upgrade.unlocked && upgrade.multipliers.all) {
            return result + upgrade.multipliers.all;
        }

        return result;
    }, 1);
}

export const gameModule = {
    state: {
        totalCommits: 0,
        developerTypes: _.cloneDeep(developerTypeDefaults),
        upgrades: _.cloneDeep(upgradeDefaults)
    },

    getters: {
        canHireDeveloper(state, getters) {
            return (developerId) =>
                state.totalCommits >= state.developerTypes[developerId].cost;
        },

        isUpgradeAvailable: (state, getters) => id =>
            checkUpgradeRequirements(state, id) && !state.upgrades[id].unlocked,

        canBuyUpgrade: (state, getters) => id => {
            return getters.isUpgradeAvailable(id)
                && state.totalCommits >= state.upgrades[id].cost;
        },

        developerCommitMultiplier: (state, getters) => id => developerCommitMultiplier(state, id),

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
        },

        buyUpgrade(state, id) {
            state.totalCommits -= state.upgrades[id].cost;
            state.upgrades[id].unlocked = true;
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
