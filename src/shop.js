import { mapState, mapGetters, mapMutations } from "vuex";
import { developerTypes } from "./developers";
import { upgrades } from "./upgrades";
import constants from "./constants";

const developerItem = {
    template: `
        <div class="list-group-item" v-bind:class="{ 'list-group-item-success': canHire }"
            v-bind:style="{ cursor: canHire ? 'pointer' : '' }" v-on:click="onClick">
            <div class="row">
                <div class="col-md-8">
                    <h4 class="list-group-item-heading">{{ developerInfo.title }}</h4>
                    <p class="list-group-item-text">{{ developerInfo.description }}</p>
                </div>
                <div class="col-md-4">
                    <p>
                        <b>Cost:</b> {{ developerInfo.cost }}
                        <br>
                        <b>Commits/s:</b> {{ commitRateByDeveloper(developerInfo.id) }}
                    </p>
                </div>
            </div>
        </div>
       `,

    props: ["developerInfo"],

    computed: {
        ...mapGetters(["canHireDeveloper", "commitRateByDeveloper"]),

        canHire() {
            return this.canHireDeveloper(this.developerInfo.id);
        },

        commitsPerSecond() {
            return this.developerInfo.commitsPerSecond * this.developerCommitMultiplier(this.developerInfo.id);
        }
    },

    methods: {
        ...mapMutations(["hireDeveloper"]),

        onClick() {
            if (!this.canHireDeveloper(this.developerInfo.id)) {
                return;
            }

            this.hireDeveloper(this.developerInfo.id);
        }
    }
};

const upgradeItem = {
    template: `
        <div class="list-group-item" v-bind:class="{ 'list-group-item-success': canBuy }"
            v-bind:style="{ cursor: canBuy ? 'pointer' : '' }" v-on:click="onClick">
            <div class="row">
                <div class="col-md-8">
                    <h4 class="list-group-item-heading">{{ upgradeInfo.title }}</h4>
                    <p class="list-group-item-text">{{ upgradeInfo.description }}</p>
                </div>
                <div class="col-md-4">
                    <p>
                        <b>Cost:</b> {{ upgradeInfo.cost }}
                    </p>
                </div>
            </div>
        </div>
       `,

    props: ["upgradeInfo"],

    computed: {
        ...mapGetters(["canBuyUpgrade"]),

        canBuy() {
            return this.canBuyUpgrade(this.upgradeInfo.id);
        }
    },

    methods: {
        ...mapMutations(["buyUpgrade"]),

        onClick() {
            if (!this.canBuyUpgrade(this.upgradeInfo.id)) {
                return;
            }

            this.buyUpgrade(this.upgradeInfo.id);
        }
    }
};

const template = `
<div class="col-md-5">
    <div class="row">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Upgrades</h3>
            </div>
            <div class="list-group">
                <upgrade-item v-for="upgrade in upgradesSorted" v-if="upgrade.available" :key="upgrade.id" v-bind:upgrade-info="upgrade" />
            </div>
        </div>
    </div>

    <div class="row">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Human Resources</h3>
            </div>
            <div class="list-group">
                <developer-item v-for="developer in developerTypesSorted" v-if="developer.available" :key="developer.id" v-bind:developer-info="developer" />
            </div>
        </div>
    </div>
</div>
`;

export default {
    name: "shop-pane",
    template,

    components: {
        developerItem,
        upgradeItem
    },

    computed: {
        ...mapState(["developers", "upgrades"]),

        developerTypesSorted() {
            return Object.keys(this.developers)
                .map(key => ({ id: key, ...developerTypes[key], ...this.developers[key]}))
                .sort((a, b) => developerTypes[a.id].rank - developerTypes[b.id].rank);
        },

        upgradesSorted() {
            return Object.keys(this.upgrades)
                .map(id => ({
                    id,
                    ...upgrades[id],
                    ...this.upgrades[id],
                    available: this.upgrades[id].status === constants.upgradeStatus.available
                }))
                .sort((a, b) => upgrades[a.id].cost - upgrades[b.id].cost);
        }
    }
};
