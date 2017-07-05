import { mapState, mapGetters, mapMutations } from "vuex";

const unitItem = {
    template: `
        <div class="list-group-item" v-bind:class="{ 'list-group-item-success': canBuy }" v-on:click="onClick">
            <div class="row">
                <div class="col-md-8">
                    <h4 class="list-group-item-heading">{{ unitInfo.title }}</h4>
                    <p class="list-group-item-text">{{ unitInfo.description }}</p>
                </div>
                <div class="col-md-4">
                    <p>
                        <b>Cost:</b> {{ unitInfo.cost }}
                        <br>
                        <b>Commits/s:</b> {{ unitInfo.commitsPerSecond }}
                    </p>
                </div>
            </div>
        </div>
       `,

    props: ["unitInfo"],

    computed: {
        ...mapGetters(["canBuyUnit"]),

        canBuy() {
            return this.canBuyUnit(this.unitInfo.id);
        }
    },

    methods: {
        ...mapMutations(["buyUnit"]),

        onClick() {
            if (!this.canBuyUnit(this.unitInfo.id)) {
                return;
            }

            this.buyUnit(this.unitInfo.id);
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
            <div class="panel-body">
                todo
            </div>
        </div>
    </div>

    <div class="row">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Human Resources</h3>
            </div>
            <div class="list-group">
                <unit-item v-for="unit in unitTypesSorted" :key="unit.id" v-bind:unit-info="unit" />
            </div>
        </div>
    </div>
</div>
`;

export default {
    name: "shop-pane",
    template,

    components: {
        unitItem
    },

    computed: {
        ...mapState(["unitTypes"]),

        unitTypesSorted() {
            return Object.keys(this.unitTypes)
                .map(key => ({ id: key, ...this.unitTypes[key]}))
                .sort((a, b) => a.rank - b.rank);
        }
    }
};
