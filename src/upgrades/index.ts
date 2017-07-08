import _ from "lodash";
import { Upgrade, UpgradeState, UpgradeStatus } from "./types";

import cProgrammerUpgrades from "./cProgrammer";
import generalUpgrades from "./general";
import internUpgrades from "./intern";
import juniorSwEngUpgrades from "./juniorSwEng";
import leetHaxorUpgrades from "./leetHaxor";
import playerUpgrades from "./player";
import rustaceanUpgrades from "./rustacean";
import swEngineerUpgrades from "./swEngineer";

export * from "./types";

export const upgrades: { [upgradeId: string]: Upgrade } = {
    ...internUpgrades,
    ...juniorSwEngUpgrades,
    ...swEngineerUpgrades,
    ...cProgrammerUpgrades,
    ...rustaceanUpgrades,
    ...leetHaxorUpgrades,
    ...playerUpgrades,
    ...generalUpgrades,
};

export function getInitialUpgradeState(): { [upgradeId: string]: UpgradeState } {
    const result: { [upgradeId: string]: UpgradeState } = {};

    for (const upgradeId in upgrades) {
        result[upgradeId] = {
            status: UpgradeStatus.Locked,
        };
    }

    return result;
}
