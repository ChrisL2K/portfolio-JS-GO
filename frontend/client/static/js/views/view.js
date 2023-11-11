export class View {
    view = 0;

    /**
     * @param {*} path path of the view's html file
     * @param {*} args list of arg strings to modify html content
     * @returns html content string
     */
    static async getViewHTML({view, path}) {
        const args = this.getViewArgs(view);
        let html = await (await fetch(path)).text();

        for (let i = 0; i < args.length; i++) {
            html = html.replace(`%${i}`, args[i]);
        }

        View.view = this.view;
        return html;
    }

    static getViewArgs(view) {
        let args = [];

        const getTimeMsg = function() {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) return "Good morning,";
            else if (hour >= 12 && hour < 18) return "Good afternoon,";
            else if (hour >= 18 && hour < 24) return "Good evening,";
            else return "Welcome,";
        }

        const argsMap = {
            1: getTimeMsg(),
            2: 0,
            3: 0,
            4: 0
        }
        args.push(argsMap[view]);

        return args;
    }

    static runViewScript(view) {
        // Resize "Quick Links" divider to match hero-section width
        const quickLinksStyling = function() {
            const heroWidth = document.getElementById("hero-section").offsetWidth;
            document.getElementById("ql-section").setAttribute("style", `width: ${heroWidth}px`);
        }

        const scriptsMap = {
            1: quickLinksStyling(),
            2: 0,
            3: 0,
            4: 0
        }
        scriptsMap[view];
    }
}