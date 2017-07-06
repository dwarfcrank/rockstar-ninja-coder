import _ from "lodash";
import { upgrades, UpgradeState } from "./upgrades";
import { developerTypes, DeveloperState } from "./developers";
import { UpgradeStatus } from "./constants";

export function getUnmetRequirements(developers: DeveloperState[], upgradeId: string): { [devId: string]: number } {
    const {
        requirements
    } = upgrades[upgradeId];

    return _.reduce(requirements, (result, numRequired, requiredDev) => {
        const numDevs = developers[requiredDev].count;

        if (numDevs < numRequired) {
            result[requiredDev] = numRequired - numDevs;
        }

        return result;
    }, {});
}

export function getAvailableUpgrades(state): string[] {
    return Object.keys(upgrades).filter(upgradeId => {
        const requirements = getUnmetRequirements(state.developers, upgradeId);
        return _.isEmpty(requirements);
    });
}

export function getAvailableDevelopers(state): string[] {
    return Object.keys(developerTypes)
        .filter(devId => state.totalCommits >= state.developers[devId].cost);
}

function getDeveloperCommitRateMultiplier(state, devId: string): number {
    return _.reduce(state.upgrades,
        (result, upgrade, upgradeId) => {
            if (upgrade.status !== UpgradeStatus.Unlocked
                || !upgrades[upgradeId].modifiers[devId]) {
                return result;
            }

            return result * (upgrades[upgradeId].modifiers[devId].multiplier + 1);
        }, 1);
}

export function getDeveloperCommitRate(state, devId: string): number {
    const baseRate = developerTypes[devId].baseCommitRate;
    const multiplier = getDeveloperCommitRateMultiplier(state, devId);

    return baseRate * multiplier;
}

export function getCommitRate(state): number {
    const commitRate = _.reduce(state.developers,
        (result, dev, devId) => result + getDeveloperCommitRate(state, devId) * dev.count, 0);

    const multiplier = 1;

    return commitRate * multiplier;
}
