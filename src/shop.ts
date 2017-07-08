import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters, mapMutations, mapState } from "vuex";
import { developerTypes } from "./developers";
import { upgrades, UpgradeStatus } from "./upgrades";

interface DeveloperItemModel {
    id: string;
    title: string;
    description: string;
    cost: number;
    baseCommitRate: number;
}

interface UpgradeItemModel {
    id: string;
    title: string;
    description: string;
    cost: number;
    available: boolean;
}

@Component({
    props: {
        developerModel: {},
    },

    template: `
        <div class="list-group-item" v-bind:class="{ 'list-group-item-success': canHire }"
            v-bind:style="{ cursor: canHire ? 'pointer' : '' }" v-on:click="onClick">
            <div class="row">
                <div class="col-md-8">
                    <h4 class="list-group-item-heading">{{ developerModel.title }}</h4>
                    <p class="list-group-item-text">{{ developerModel.description }}</p>
                </div>
                <div class="col-md-4">
                    <p>
                        <b>Cost:</b> {{ developerModel.cost }}
                        <br>
                        <b>Commits/s:</b> {{ commitsPerSecond }}
                    </p>
                </div>
            </div>
        </div>
       `,
})
class DeveloperItem extends Vue {
    developerModel: DeveloperItemModel;

    get canHire() {
        return this.$store.getters.canHireDeveloper(this.developerModel.id);
    }

    get commitsPerSecond() {
        return this.$store.getters.commitRateByDeveloper(this.developerModel.id).toFixed(2);
    }

    onClick() {
        if (!this.$store.getters.canHireDeveloper(this.developerModel.id)) {
            return;
        }

        this.$store.commit("hireDeveloper", this.developerModel.id);
    }
}

@Component({
    props: {
        upgradeModel: {},
    },

    template: `
        <div class="list-group-item" v-bind:class="{ 'list-group-item-success': canBuy }"
            v-bind:style="{ cursor: canBuy ? 'pointer' : '' }" v-on:click="onClick">
            <div class="row">
                <div class="col-md-8">
                    <h4 class="list-group-item-heading">{{ upgradeModel.title }}</h4>
                    <p class="list-group-item-text">{{ upgradeModel.description }}</p>
                </div>
                <div class="col-md-4">
                    <p>
                        <b>Cost:</b> {{ upgradeModel.cost }}
                    </p>
                </div>
            </div>
        </div>
        `,
})
class UpgradeItem extends Vue {
    upgradeModel: UpgradeItemModel;

    get canBuy() {
        return this.$store.getters.canBuyUpgrade(this.upgradeModel.id);
    }

    onClick() {
        if (!this.$store.getters.canBuyUpgrade(this.upgradeModel.id)) {
            return;
        }

        this.$store.commit("buyUpgrade", this.upgradeModel.id);
    }
}

@Component({
    template: `
        <div class="col-md-5">
            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Upgrades</h3>
                    </div>
                    <div class="list-group">
                        <upgrade-item v-for="upgrade in upgradesSorted" v-if="upgrade.available" :key="upgrade.id" v-bind:upgrade-model="upgrade" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Human Resources</h3>
                    </div>
                    <div class="list-group">
                        <developer-item v-for="developer in developerTypesSorted" v-if="developer.available" :key="developer.id" v-bind:developer-model="developer" />
                    </div>
                </div>
            </div>
        </div>
        `,

    components: {
        DeveloperItem,
        UpgradeItem,
    },
})
export default class ShopPane extends Vue {
    get developerTypesSorted(): DeveloperItemModel[] {
        return Object.keys(this.$store.state.developers)
            .map((id) => ({
                id,
                ...developerTypes[id],
                ...this.$store.state.developers[id],
            }))
            .sort((a, b) => developerTypes[a.id].rank - developerTypes[b.id].rank);
    }

    get upgradesSorted(): UpgradeItemModel[] {
        return Object.keys(this.$store.state.upgrades)
            .map((id) => ({
                id,
                ...upgrades[id],
                ...this.$store.state.upgrades[id],
                available: this.$store.state.upgrades[id].status === UpgradeStatus.Available,
            }))
            .sort((a, b) => upgrades[a.id].cost - upgrades[b.id].cost);
    }
}
