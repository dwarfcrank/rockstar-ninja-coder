import DevelopmentPane from "./development";
import TeamPane from "./team";
import ShopPane from "./shop";

const template = `
<div id="app">
    <development-pane></development-pane>
    <team-pane></team-pane>
    <shop-pane></shop-pane>
</div>`;

export default {
    components: {
        DevelopmentPane, TeamPane, ShopPane
    },

    name: "app",
    template,

    data () {
        return {};
    }
};
