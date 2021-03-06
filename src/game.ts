import _ from "lodash";
import { availabilityCostMultiplier } from "./constants";
import { DeveloperState, developerTypes } from "./developers";
import { UpgradeRequirements, upgrades, UpgradeState, UpgradeStatus } from "./upgrades";

export interface GameState {
    totalCommits: number;
    allTimeCommits: number;
    developers: { [devId: string]: DeveloperState };
    upgrades: { [upgradeId: string]: UpgradeState };
}

export function getUnmetRequirements(developers: { [devId: string]: DeveloperState },
                                     upgradeId: string): UpgradeRequirements {
    const requirements = upgrades[upgradeId].requirements;
    const unmet: UpgradeRequirements = {};

    for (const [devId, numRequired] of Object.entries(requirements)) {
        if (developers[devId].count < numRequired) {
            unmet[devId] = numRequired - developers[devId].count;
        }
    }

    return unmet;
}

export function getAvailableUpgrades(state: GameState): string[] {
    const available: string[] = [];

    for (const [id, upgrade] of Object.entries(upgrades)) {
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

    for (const [id, upgrade] of Object.entries(upgrades)) {
        if (!upgrade.modifiers[devId] || state.upgrades[id].status !== UpgradeStatus.Unlocked) {
            continue;
        }

        multiplier *= (upgrade.modifiers[devId].multiplier! + 1);
    }

    return multiplier;
}

export function getDeveloperCommitRate(state: GameState, devId: string): number {
    const baseRate = developerTypes[devId].baseCommitRate;
    const multiplier = getDeveloperCommitRateMultiplier(state, devId);

    return baseRate * multiplier;
}

export function getCommitRate(state: GameState): number {
    let commitRate = 0;
    let multiplier = 1;

    for (const [id, developer] of Object.entries(state.developers)) {
        commitRate += getDeveloperCommitRate(state, id) * developer.count;
    }

    for (const [id, upgrade] of Object.entries(state.upgrades)) {
        const modifier = upgrades[id].modifiers.all;

        if (upgrade.status === UpgradeStatus.Unlocked && modifier) {
            multiplier += modifier.additiveMultiplier!;
        }
    }

    return commitRate * multiplier;
}

export function getCommitsPerClick(state: GameState): number {
    let constant = 1;
    let multiplier = 1;

    for (const [id, upgrade] of Object.entries(state.upgrades)) {
        const modifier = upgrades[id].modifiers.player;

        if (upgrade.status !== UpgradeStatus.Unlocked || !modifier) {
            continue;
        }

        constant += (modifier.constantAddition || 0);
        multiplier *= (modifier.multiplier || 1);
    }

    return constant * multiplier;
}
