import { Upgrade } from "./types";

const upgrades: { [upgradeId: string]: Upgrade } = {
    cargo: {
        title: "Cargo",
        description: "Rusty crates filled with stuff. Rustaceans' productivity up 7%.",
        cost: 15000,
        modifiers: {
            rustacean: {
                multiplier: 0.07
            }
        },
        requirements: {
            rustacean: 10
        }
    },

};

export default upgrades;
