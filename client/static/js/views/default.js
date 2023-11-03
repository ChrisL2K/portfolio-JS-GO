export default class {
    constructor(args) {
        this.args = args;
    }

    async getBody() {
        return (
            "<p>default HTML</p>"
        );
    }
}