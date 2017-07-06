import _ from "lodash";
import { upgrades } from "./upgrades";
import { developerTypes } from "./developers";
import constants from "./constants";

export function getUnmetRequirements(developers, upgradeId) {
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

export function getAvailableUpgrades(state) {
    return Object.keys(upgrades).filter(upgradeId => {
        const requirements = getUnmetRequirements(state.developers, upgradeId);
        return _.isEmpty(requirements);
    });
}

export function getAvailableDevelopers(state) {
    return Object.keys(developerTypes)
        .filter(devId => state.totalCommits >= state.developers[devId].cost);
}

function getDeveloperCommitRateMultiplier(state, devId) {
    return _.reduce(state.upgrades,
        (result, upgrade, upgradeId) => {
            if (upgrade.status !== constants.upgradeStatus.unlocked
                || !upgrades[upgradeId].modifiers[devId]) {
                return result;
            }

            return result * (upgrades[upgradeId].modifiers[devId].multiplier + 1);
        }, 1);
}

export function getDeveloperCommitRate(state, devId) {
    const baseRate = developerTypes[devId].baseCommitRate;
    const multiplier = getDeveloperCommitRateMultiplier(state, devId);

    return baseRate * multiplier;
}

export function getCommitRate(state) {
    const commitRate = _.reduce(state.developers,
        (result, dev, devId) => result + getDeveloperCommitRate(state, devId) * dev.count, 0);

    const multiplier = 1;

    return commitRate * multiplier;
}
