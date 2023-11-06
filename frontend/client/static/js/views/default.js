export default class {
    async retrieveHTML(path) {
        const resp = await fetch(new URL(path, document.baseURI));
        return resp.text();
    }

    /**
     * @param {*} html html content to parse
     * @param {*} mode specify if full-size (regular) or small-width (collapsed) screen mode
     * 
     * @returns appropriate innerHTML content
     */
    retrieveInnerHTML(html, {mode}) {
        // Split html into array, by line
        const arrayHtml = html.split("\r\n");

        // Find start and end tags of element
        let elementTags = [];
        for (let i = 0; i < arrayHtml.length; i++) {
            if (elementTags.length == 2) break;
            else if (arrayHtml[i] == mode) elementTags.push(i);
        }

        // Trim array to only include lines between the open and close tags of the element
        arrayHtml.length = elementTags[1];
        return arrayHtml.slice(elementTags[0] + 1).toString().replaceAll(",", "\r\n");
    }

    /**
     * @returns html content of a view
     */
    async getBody() {
        return (
            "Default Page"
        );
    }
}