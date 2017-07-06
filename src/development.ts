import { mapState, mapMutations } from "vuex";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: `
        <div class="col-md-3">
            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Development</h3>
                    </div>
                    <div class="panel-body">
                        <p class="text-center">{{ totalCommits }} commits</p>
                        <p class="text-center">
                            <button v-on:click="onClick" type="button" class="btn btn-primary btn-lg">$ git commit -m "yolo"</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `
})
export default class DevelopmentPane extends Vue {
    get totalCommits() {
        return this.$store.state.totalCommits;
    }

    onClick() {
        this.$store.commit("addCommits", this.$store.getters.commitsPerClick);
    }
}
