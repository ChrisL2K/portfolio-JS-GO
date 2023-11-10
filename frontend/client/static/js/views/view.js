export class View {
    /**
     * @param {*} path path of the view's html file
     * @param {*} args list of arg strings to modify html content
     * @returns html content string
     */
    static async getContent({path, args}) {
        let html = await (await fetch(path)).text();

        for (let i = 0; i < args.length; i++) {
            html = html.replace(`%${i}`, args[i]);
        }

        return html;
    }
}