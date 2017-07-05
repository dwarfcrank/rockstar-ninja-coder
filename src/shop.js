import { mapState, mapGetters, mapMutations } from "vuex";

const unitItem = {
    template: `
        <tr v-bind:class="{ success: canBuyUnit(unitInfo.id) }" v-on:click="onClick">
            <td>{{ unitInfo.title }}</td>
            <td>{{ unitInfo.cost }}</td>
            <td>{{ unitInfo.commitsPerSecond }}</td>
        </tr>`,

    props: ["unitInfo"],

    computed: {
        ...mapGetters(["canBuyUnit"])
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
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Cost</th>
                        <th>Commits/s</th>
                    </tr>
                </thead>
                <tbody>
                    <unit-item v-for="unit in unitTypesSorted" :key="unit.id" v-bind:unit-info="unit" />
                </tbody>
            </table>
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
