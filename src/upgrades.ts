import _ from "lodash";
import { UpgradeStatus } from "./constants";

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

    energyDrinks: {
        title: "Energy Drinks",
        description: "Fueled by caffeine and sugar, interns commit 10% faster.",
        cost: 250,
        modifiers: {
            intern: {
                multiplier: 0.10
            }
        },
        requirements: {
            intern: 20
        }
    },

    zsh: {
        title: "Zsh",
        description: "Everything's better with a good shell. Overall productivity up 4%.",
        cost: 750,
        modifiers: {
            all: {
                additiveMultiplier: 0.04
            }
        },
        requirements: {
            intern: 15,
            juniorSwEng: 15
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
    },

    coffeeMachine: {
        title: "Coffee Machine",
        description: "A fancy machine to brew extra strong espresso. Total productivity up 5%.",
        cost: 3000,
        modifiers: {
            all: {
                additiveMultiplier: 0.05
            }
        },
        requirements: {}
    },

    extraTerminal: {
        title: "Extra Terminal Window",
        description: "Two windows, two shells, two commits! +1 commit per click.",
        cost: 100,
        modifiers: {
            player: {
                constantAddition: 1
            }
        },
        requirements: {}
    },

    crispr: {
        title: "CRISPR",
        description: "Use gene editing to grow a third arm. +50% commits per click.",
        cost: 5000,
        modifiers: {
            player: {
                multiplier: 1.50
            }
        },
        requirements: {}
    },

    typeScript: {
        title: "TypeScript",
        description: "Static typing. 'Nuff said. Junior SW Engs' producitivty up 10%.",
        cost: 2500,
        modifiers: {
            juniorSwEng: {
                multiplier: 0.10
            }
        },
        requirements: {
            juniorSwEng: 25
        }
    },

    c11: {
        title: "C11",
        description: "Bringing C to the 21st century. C programmers' productivity up 7%.",
        cost: 10000,
        modifiers: {
            cProgrammer: {
                multiplier: 0.07
            }
        },
        requirements: {
            cProgrammer: 10
        }
    },

    cargo: {
        title: "Cargo",
        description: "Rusty crates filled with stuff. Rustaceans' productivity up 7%.",
        cost: 15000,
        modifiers: {
            rustacean: {
                multiplier: 0.07
            }
        },
        requirements: {
            rustacean: 10
        }
    },

    scrum: {
        title: "Scrum",
        description: "Agile methods improve Software Engineers' productivity by 10%.",
        cost: 10000,
        modifiers: {
            swEngineer: {
                multiplier: 0.10
            }
        },
        requirements: {
            swEngineer: 10
        }
    },

    greenFont: {
        title: "Green Terminal Font",
        description: "1337 h4x0rs look even more 1337 with a green font. 1337 h4x0rs' productivity up 15%.",
        cost: 1337,
        modifiers: {
            leetHaxor: {
                multiplier: 0.15
            }
        },
        requirements: {
            leetHaxor: 10
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
