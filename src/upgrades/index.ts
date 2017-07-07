import _ from "lodash";
import { Upgrade, UpgradeState, UpgradeStatus } from "./types";

import internUpgrades from "./intern";
import juniorSwEngUpgrades from "./juniorSwEng";
import swEngineerUpgrades from "./swEngineer";
import cProgrammerUpgrades from "./cProgrammer";
import rustaceanUpgrades from "./rustacean";
import leetHaxorUpgrades from "./leetHaxor";
import playerUpgrades from "./player";
import generalUpgrades from "./general";

export * from "./types";

export const upgrades: { [upgradeId: string]: Upgrade } = {
    ...internUpgrades,
    ...juniorSwEngUpgrades,
    ...swEngineerUpgrades,
    ...cProgrammerUpgrades,
    ...rustaceanUpgrades,
    ...leetHaxorUpgrades,
    ...playerUpgrades,
    ...generalUpgrades
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
