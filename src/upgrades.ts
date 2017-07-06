import _ from "lodash";
import { UpgradeStatus } from "./constants";

export interface UpgradeModifier {
    multiplier?: number;
    additiveMultiplier?: number;
}

export interface Upgrade {
    title: string;
    description: string;
    cost: number;
    modifiers: { [devId: string]: UpgradeModifier };
    requirements: { [devId: string]: number };
}

export interface UpgradeState {
    status: UpgradeStatus
}

export const upgrades: { [upgradeId: string]: Upgrade } = {
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
        modifiers: {
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
        modifiers: {
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

export function getInitialUpgradeState(): { [upgradeId: string]: UpgradeState } {
    let result = {};

    for (let upgradeId in upgrades) {
        result[upgradeId] = {
            status: UpgradeStatus.Locked
        };
    }

    return result;
}