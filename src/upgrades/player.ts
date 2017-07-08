import { Upgrade } from "./types";

const upgrades: { [upgradeId: string]: Upgrade } = {
    extraTerminal: {
        title: "Extra Terminal Window",
        description: "Two windows, two shells, two commits! +1 commit per click.",
        cost: 100,
        modifiers: {
            player: {
                constantAddition: 1,
            },
        },
        requirements: {},
    },

    crispr: {
        title: "CRISPR",
        description: "Use gene editing to grow a third arm. +50% commits per click.",
        cost: 5000,
        modifiers: {
            player: {
                multiplier: 1.50,
            },
        },
        requirements: {},
    },
};

export default upgrades;
