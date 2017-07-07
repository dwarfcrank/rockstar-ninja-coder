import { Upgrade } from "./types";

const upgrades: { [upgradeId: string]: Upgrade } = {
    scrum: {
        title: "Scrum",
        description: "Agile methods improve Software Engineers' productivity by 10%.",
        cost: 10000,
        modifiers: {
            swEngineer: {
                multiplier: 0.10
            }
        },
        requirements: {
            swEngineer: 10
        }
    },

};

export default upgrades;
