import _ from "lodash";
import { upgrades, UpgradeState, UpgradeRequirements } from "./upgrades";
import { developerTypes, DeveloperState } from "./developers";
import { UpgradeStatus } from "./constants";

export interface GameState {
    totalCommits: number;
    developers: { [devId: string]: DeveloperState };
    upgrades: { [upgradeId: string]: UpgradeState };
}

export function getUnmetRequirements(developers: { [devId: string]: DeveloperState }, upgradeId: string): UpgradeRequirements {
    const {
        requirements
    } = upgrades[upgradeId];

    return _.reduce(requirements, (result: UpgradeRequirements, numRequired: number, requiredDev: string) => {
        const numDevs = developers[requiredDev].count;

        if (numDevs < numRequired) {
            result[requiredDev] = numRequired - numDevs;
        }

        return result;
    }, {});
}

export function getAvailableUpgrades(state: GameState): string[] {
    return Object.keys(upgrades).filter(upgradeId => {
        const requirements = getUnmetRequirements(state.developers, upgradeId);
        return _.isEmpty(requirements);
    });
}

export function getAvailableDevelopers(state: GameState): string[] {
    return Object.keys(developerTypes)
        .filter(devId => state.totalCommits >= state.developers[devId].cost);
}

function getDeveloperCommitRateMultiplier(state: GameState, devId: string): number {
    return _.reduce(state.upgrades,
        (result: number, upgrade: UpgradeState, upgradeId: string) => {
            if (upgrade.status !== UpgradeStatus.Unlocked
                || !upgrades[upgradeId].modifiers[devId]) {
                return result;
            }

            return result * (upgrades[upgradeId].modifiers[devId].multiplier + 1);
        }, 1);
}

export function getDeveloperCommitRate(state: GameState, devId: string): number {
    const baseRate = developerTypes[devId].baseCommitRate;
    const multiplier = getDeveloperCommitRateMultiplier(state, devId);

    return baseRate * multiplier;
}

export function getCommitRate(state: GameState): number {
    const commitRate = _.reduce(state.developers,
        (result: number, dev: DeveloperState, devId: string) =>
            result + getDeveloperCommitRate(state, devId) * dev.count,
        0);

    const multiplier = _.reduce(state.upgrades,
        (result: number, upgrade: UpgradeState, upgradeId: string) => {
            const modifier = upgrades[upgradeId].modifiers["all"];

            if (upgrade.status !== UpgradeStatus.Unlocked || !modifier) {
                return result;
            }

            return result + modifier.additiveMultiplier;
        },
        1);

    return commitRate * multiplier;
}
