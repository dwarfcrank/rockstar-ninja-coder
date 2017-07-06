import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: `
        <div class="col-md-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Team</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-8">Commits per second</div>
                        <div class="col-md-4">{{ commitRate }}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">Developers</div>
                        <div class="col-md-4">{{ developerCount }}</div>
                    </div>
                </div>
            </div>
        </div>
        `
})
export default class TeamPane extends Vue {
    get commitRate() {
        return this.$store.getters.commitRate.toFixed(2);
    }

    get developerCount() {
        return this.$store.getters.developerCount;
    }
}
