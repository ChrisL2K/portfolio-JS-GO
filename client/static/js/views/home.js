import DefaultView from "./default.js";

export default class extends DefaultView {
    async getBody() {
        return (`
            <p>Home Page</p>
        `);
    }
}