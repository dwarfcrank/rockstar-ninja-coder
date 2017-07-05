import { mapState, mapGetters } from "vuex";

const template = `
<div class="col-md-4">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Team</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-8">Commits per second</div>
                <div class="col-md-4">{{ totalCommitsPerSecond }}</div>
            </div>
            <div class="row">
                <div class="col-md-8">Developers</div>
                <div class="col-md-4">{{ totalDevelopers }}</div>
            </div>
        </div>
    </div>
</div>
`;

export default {
    name: "team-pane",
    template,

    computed: {
        ...mapGetters(["totalCommitsPerSecond", "totalDevelopers"])
    }
};
