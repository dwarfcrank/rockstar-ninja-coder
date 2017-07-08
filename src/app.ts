import Vue from "vue";
import Component from "vue-class-component";

import DevelopmentPane from "./development";
import ShopPane from "./shop";
import TeamPane from "./team";

@Component({
    template: `
        <div id="app">
            <development-pane></development-pane>
            <team-pane></team-pane>
            <shop-pane></shop-pane>
        </div>
        `,

    components: {
        DevelopmentPane, TeamPane, ShopPane,
    },
})
export default class App extends Vue { }
