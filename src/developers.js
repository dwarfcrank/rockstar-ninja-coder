
export const developerTypes = {
    intern: {
        rank: 1,
        title: "Intern",
        description: "Wrote a Hello World in Python recently.",
        initialCost: 10,
        baseCommitRate: 1
    },

    juniorSwEng: {
        rank: 2,
        title: "Junior Software Engineer",
        description: "Still unsullied by enterprise Java.",
        initialCost: 150,
        baseCommitRate: 3
    }
};

// Helper to keep the initial state object in sync with developerTypes.
export function getInitialDeveloperState() {
    let result = {};

    for (let devId in developerTypes) {
        result[devId] = {
            count: 0,
            available: false,
            cost: developerTypes[devId].initialCost,
            commitRate: developerTypes[devId].baseCommitRate
        };
    }

    return result;
}
