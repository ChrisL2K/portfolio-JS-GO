import DefaultView from "./default.js";

export default class extends DefaultView {
    constructor(width) {
        super();
        this.width = width;
        this.state = {mode: ""};
        this.HamburgIcon = new URL("./static/images/hamburger.png", document.baseURI).href;
        this.CloseIcon = new URL("./static/images/close.png", document.baseURI).href;
    }

    async getBody() {
        const html = await super.retrieveHTML("./static/js/views/navbar.html");
        (this.width < 750) ? this.state.mode = "mobile" : this.state.mode = "regular";

        return super.retrieveInnerHTML(html, this.state);
    }
}