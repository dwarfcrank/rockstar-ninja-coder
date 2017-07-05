import { mapState, mapMutations } from "vuex";

const template = `
<div class="col-md-3">
<div class="row">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Development</h3>
        </div>
        <div class="panel-body">
            <p class="text-center">{{ totalCommits }} commits</p>
            <p class="text-center">
                <button v-on:click="addCommits(1)" type="button" class="btn btn-primary btn-lg">$ git commit -m "yolo"</button>
            </p>
        </div>
    </div>
</div>
</div>
`;

export default {
    name: "development-pane",
    template,

    data() {
        return {};
    },

    methods: {
        ...mapMutations(["addCommits"])
    },

    computed: {
        ...mapState(["totalCommits"])
    }
};
