import { Upgrade } from "./types";

const upgrades: { [upgradeId: string]: Upgrade } = {
    jetbrains: {
        title: "JetBrains Subscription",
        description: "IDEA is awesome. Junior SW Engineers' productivity up 4%",
        cost: 500,
        modifiers: {
            juniorSwEng: {
                multiplier: 0.04,
            },
        },
        requirements: {
            juniorSwEng: 10,
        },
    },

    typeScript: {
        title: "TypeScript",
        description: "Static typing. 'Nuff said. Junior SW Engineers' producitivty up 10%.",
        cost: 2500,
        modifiers: {
            juniorSwEng: {
                multiplier: 0.10,
            },
        },
        requirements: {
            juniorSwEng: 25,
        },
    },

};

export default upgrades;
