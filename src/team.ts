import Vue from "vue";
import Component from "vue-class-component";
import { developerTypes } from "./developers";

@Component({
    template: `
        <div class="col-md-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Team</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-8">Commits per click</div>
                        <div class="col-md-4">{{ commitsPerClick }}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">Commits per second</div>
                        <div class="col-md-4">{{ commitRate }}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">Commits (all time)</div>
                        <div class="col-md-4">{{ allTimeCommits }}</div>
                    </div>
                    <p></p>
                    <div class="row">
                        <div class="col-md-8">Developers</div>
                        <div class="col-md-4">{{ developerCount }}</div>
                    </div>
                    <div class="row">
                        <ul>
                            <li v-for="(dev, id) in developers" v-if="dev.count > 0">
                                <b>{{dev.count}}x</b> {{ developerTitle(id) }} ({{ developerCommitRate(id) }} commits/s)
                            </li>
                        </ul>
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

    get commitsPerClick() {
        return this.$store.getters.commitsPerClick.toFixed(2);
    }

    get developerCount() {
        return this.$store.getters.developerCount;
    }

    get allTimeCommits() {
        return this.$store.state.allTimeCommits.toFixed(2);
    }

    get developers() {
        return this.$store.state.developers;
    }

    developerTitle(id: string) {
        return developerTypes[id].title;
    }

    developerCommitRate(id: string) {
        return (this.$store.getters.commitRateByDeveloper(id)
                * this.$store.state.developers[id].count).toFixed(2);
    }
}
