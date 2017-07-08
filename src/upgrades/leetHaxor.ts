import { Upgrade } from "./types";

const upgrades: { [upgradeId: string]: Upgrade } = {
    greenFont: {
        title: "Green Terminal Font",
        description: "1337 h4x0rs look even more 1337 with a green font. 1337 h4x0rs' productivity up 15%.",
        cost: 1337,
        modifiers: {
            leetHaxor: {
                multiplier: 0.15,
            },
        },
        requirements: {
            leetHaxor: 10,
        },
    },
};

export default upgrades;
