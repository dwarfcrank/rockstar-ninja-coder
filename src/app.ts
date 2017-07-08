import Vue from "vue";
import Component from "vue-class-component";

import DevelopmentPane from "./development";
import TeamPane from "./team";
import ShopPane from "./shop";

@Component({
    template: `
        <div id="app">
            <development-pane></development-pane>
            <team-pane></team-pane>
            <shop-pane></shop-pane>
        </div>
        `,

    components: {
        DevelopmentPane, TeamPane, ShopPane
    }
})
export default class App extends Vue { }
