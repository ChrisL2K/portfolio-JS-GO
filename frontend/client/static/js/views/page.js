export class Page {
    /**
     * @param {*} path path of the view's html file
     * @param {*} mode specify whether "mobile" or "regular" content should be returned
     * @returns html content string
     */
    static async getContent(path) {
        // fetch html file from path
        const htmlText = async function() {
            return (await fetch(path)).text();
        }

        return await htmlText();
    }
}