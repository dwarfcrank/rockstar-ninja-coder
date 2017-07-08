import { Upgrade } from "./types";

const upgrades: { [upgradeId: string]: Upgrade } = {
    zsh: {
        title: "Zsh",
        description: "Everything's better with a good shell. Overall productivity up 4%.",
        cost: 750,
        modifiers: {
            all: {
                additiveMultiplier: 0.04,
            },
        },
        requirements: {
            intern: 15,
            juniorSwEng: 15,
        },
    },

    thinkpads: {
        title: "ThinkPads",
        description: "Physical function keys improve debugging experience. Total productivity up 5%.",
        cost: 1000,
        modifiers: {
            all: {
                additiveMultiplier: 0.05,
            },
        },
        requirements: {
            intern: 20,
            juniorSwEng: 20,
        },
    },

    coffeeMachine: {
        title: "Coffee Machine",
        description: "A fancy machine to brew extra strong espresso. Total productivity up 5%.",
        cost: 3000,
        modifiers: {
            all: {
                additiveMultiplier: 0.05,
            },
        },
        requirements: {},
    },

};

export default upgrades;
