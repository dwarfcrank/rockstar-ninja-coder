export const enum UpgradeStatus {
    Locked,
    Available,
    Unlocked
}

export interface UpgradeModifier {
    multiplier?: number;
    additiveMultiplier?: number;
    constantAddition?: number;
}

export interface UpgradeRequirements {
    [devId: string]: number;
}

export interface Upgrade {
    title: string;
    description: string;
    cost: number;
    modifiers: { [devId: string]: UpgradeModifier };
    requirements: UpgradeRequirements;
}

export interface UpgradeState {
    status: UpgradeStatus
}
