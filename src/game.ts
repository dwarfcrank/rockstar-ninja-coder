import _ from "lodash";
import { upgrades, UpgradeState, UpgradeRequirements } from "./upgrades";
import { developerTypes, DeveloperState } from "./developers";
import { availabilityCostMultiplier } from "./constants";
import { UpgradeStatus } from "./upgrades";

export interface GameState {
    totalCommits: number;
    allTimeCommits: number;
    developers: { [devId: string]: DeveloperState };
    upgrades: { [upgradeId: string]: UpgradeState };
}

export function getUnmetRequirements(developers: { [devId: string]: DeveloperState }, upgradeId: string): UpgradeRequirements {
    const requirements = upgrades[upgradeId].requirements;
    let unmet: UpgradeRequirements = {};

    for (let [devId, numRequired] of Object.entries(requirements)) {
        if (developers[devId].count < numRequired) {
            unmet[devId] = numRequired - developers[devId].count;
        }
    }

    return unmet;
}

export function getAvailableUpgrades(state: GameState): string[] {
    let available: string[] = [];

    for (let [id, upgrade] of Object.entries(upgrades)) {
        const unmet = getUnmetRequirements(state.developers, id);
        const isAvailable = state.totalCommits >= upgrade.cost * availabilityCostMultiplier;

        if (_.isEmpty(unmet) && isAvailable) {
            available.push(id);
        }
    }

    return available;
}

export function getAvailableDevelopers(state: GameState): string[] {
    const isAvailable = (devId: string) =>
        state.totalCommits >= state.developers[devId].cost * availabilityCostMultiplier;

    return Object.keys(developerTypes).filter(isAvailable);
}

function getDeveloperCommitRateMultiplier(state: GameState, devId: string): number {
    let multiplier = 1;

    for (let [id, upgrade] of Object.entries(upgrades)) {
        if (!upgrade.modifiers[devId] || state.upgrades[id].status !== UpgradeStatus.Unlocked) {
            continue;
        }

        multiplier *= (upgrade.modifiers[devId].multiplier + 1);
    }

    return multiplier;
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

export function getCommitsPerClick(state: GameState): number {
    const { multiplier, constant } = _.reduce(state.upgrades,
        (result: any, upgrade: UpgradeState, upgradeId: string) => {
            const modifier = upgrades[upgradeId].modifiers["player"];

            if (upgrade.status !== UpgradeStatus.Unlocked || !modifier) {
                return result;
            }

            return {
                constant: result.constant + (modifier.constantAddition || 0),
                multiplier: result.multiplier * (modifier.multiplier || 1)
            };
        },
        { multiplier: 1, constant: 1 });

    return constant * multiplier;
}
