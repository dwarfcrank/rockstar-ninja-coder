import _ from "lodash";
import constants from "./constants";

export const upgrades = {
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

    jetbrains: {
        title: "JetBrains Subscription",
        description: "IDEA is awesome. Junior SW Engineers' productivity up 4%",
        cost: 500,
        multipliers: {
            juniorSwEng: {
                multiplier: 0.04
            }
        },
        requirements: {
            juniorSwEng: 10
        }
    },

    thinkpads: {
        title: "ThinkPads",
        description: "Physical function keys improve debugging experience. Total productivity up 5%.",
        cost: 1000,
        modifier: {
            all: {
                additiveMultiplier: 0.05
            }
        },
        requirements: {
            intern: 20,
            juniorSwEng: 20
        }
    }
};

export function getInitialUpgradeState() {
    let result = {};

    for (let upgradeId in upgrades) {
        result[upgradeId] = {
            status: constants.upgradeStatus.locked
        };
    }

    return result;
}
