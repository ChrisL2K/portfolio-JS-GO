import DefaultView from "./default.js";

export default class extends DefaultView {
    constructor(width) {
        super();
        this.width = width;
        this.state = {mode: 0};
        this.HamburgIcon = new URL("./static/images/hamburger.png", document.baseURI).href;
        this.CloseIcon = new URL("./static/images/close.png", document.baseURI).href;
    }

    async retrieveHTML() {
        const resp = await fetch(new URL("./static/js/views/navbar.html", document.baseURI));
        return resp.text();
    }

    async getBody() {
        const html = await this.retrieveHTML();
        (this.width < 750) ? this.state.mode = "collapsed" : this.state.mode = "regular";

        return super.retrieveInnerHTML(html, this.state);
    }
}