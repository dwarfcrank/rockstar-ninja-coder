export interface DeveloperType {
    rank: number;
    title: string;
    description: string;
    initialCost: number;
    baseCommitRate: number;
}

export interface DeveloperState {
    count: number;
    available: boolean;
    cost: number;
    commitRate: number;
}

export const developerTypes: { [devId: string]: DeveloperType } = {
    intern: {
        rank: 1,
        title: "Intern",
        description: "Wrote a Hello World in Python recently.",
        initialCost: 10,
        baseCommitRate: 1,
    },

    juniorSwEng: {
        rank: 2,
        title: "Junior Software Engineer",
        description: "Still unsullied by enterprise Java.",
        initialCost: 150,
        baseCommitRate: 3,
    },

    swEngineer: {
        rank: 3,
        title: "Software Engineer",
        description: "Knows the standard library and isn't afraid to use it.",
        initialCost: 500,
        baseCommitRate: 10,
    },

    leetHaxor: {
        rank: 4,
        title: "1337 h4x0r",
        description: "Eats bytecode for breakfast.",
        initialCost: 1337,
        baseCommitRate: 13.37,
    },

    seniorSwEng: {
        rank: 5,
        title: "Senior Software Engineer",
        description: "Actually designs their code before writing it.",
        initialCost: 2000,
        baseCommitRate: 18,
    },

    cProgrammer: {
        rank: 6,
        title: "C Programmer",
        description: "Uses the K&R book as a pillow.",
        initialCost: 3000,
        baseCommitRate: 30,
    },

    rustacean: {
        rank: 7,
        title: "The Rustacean",
        description: "Here to rewrite everything in Rust.",
        initialCost: 5000,
        baseCommitRate: 100,
    },
};

// Helper to keep the initial state object in sync with developerTypes.
export function getInitialDeveloperState(): { [devId: string]: DeveloperState } {
    const result: { [devId: string]: DeveloperState } = {};

    for (const devId in developerTypes) {
        result[devId] = {
            count: 0,
            available: false,
            cost: developerTypes[devId].initialCost,
            commitRate: developerTypes[devId].baseCommitRate,
        };
    }

    return result;
}
