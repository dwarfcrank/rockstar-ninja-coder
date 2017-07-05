import { mapState, mapGetters, mapMutations } from "vuex";

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
                        <b>Commits/s:</b> {{ developerInfo.commitsPerSecond }}
                    </p>
                </div>
            </div>
        </div>
       `,

    props: ["developerInfo"],

    computed: {
        ...mapGetters(["canHireDeveloper"]),

        canHire() {
            return this.canHireDeveloper(this.developerInfo.id);
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
                <developer-item v-for="developer in developerTypesSorted" v-if="developer.unlocked" :key="developer.id" v-bind:developer-info="developer" />
            </div>
        </div>
    </div>
</div>
`;

export default {
    name: "shop-pane",
    template,

    components: {
        developerItem
    },

    computed: {
        ...mapState({
            developerTypes: state => state.game.developerTypes
        }),

        developerTypesSorted() {
            return Object.keys(this.developerTypes)
                .map(key => ({ id: key, ...this.developerTypes[key]}))
                .sort((a, b) => a.rank - b.rank);
        }
    }
};
