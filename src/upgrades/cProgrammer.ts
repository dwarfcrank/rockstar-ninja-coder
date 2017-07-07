import { Upgrade } from "./types";

const upgrades: { [upgradeId: string]: Upgrade } = {
    c11: {
        title: "C11",
        description: "Bringing C to the 21st century. C programmers' productivity up 7%.",
        cost: 10000,
        modifiers: {
            cProgrammer: {
                multiplier: 0.07
            }
        },
        requirements: {
            cProgrammer: 10
        }
    },
};

export default upgrades;
