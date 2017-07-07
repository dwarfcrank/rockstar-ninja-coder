import { Upgrade } from "./types";

const upgrades: { [upgradeId: string]: Upgrade } = {
    vim: {
        title: "vim",
        description: "Modal editing improves interns' productivity by 2%.",
        cost: 50,
        modifiers: {
            intern: {
                multiplier: 0.02
            }
        },
        requirements: {
            intern: 10
        }
    },

    energyDrinks: {
        title: "Energy Drinks",
        description: "Fueled by caffeine and sugar, interns commit 10% faster.",
        cost: 250,
        modifiers: {
            intern: {
                multiplier: 0.10
            }
        },
        requirements: {
            intern: 20
        }
    }
};

export default upgrades;
