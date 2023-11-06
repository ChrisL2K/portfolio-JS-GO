import DefaultView from "./default.js";

export default class extends DefaultView {
    constructor() {
        super();
        this.state = {mode: 0}
    }

    async getBody() {
        const html = await super.retrieveHTML("./static/js/views/home.html");
        this.state.mode = "regular"

        return super.retrieveInnerHTML(html, this.state);
    }
}