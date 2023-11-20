import { Component } from "./component.js";

export class View {
    constructor() {
        this.activeView = 0;
    }

    /**
     * @param {*} path path of the view's html file
     * @param {*} args list of arg strings to modify html content
     * @returns html content string
     */
    async getViewContentHTML({view, path}) {
        this.activeView = view;

        const arg = await this.getViewArg();
        let html = await (await fetch(path)).text();
        html = html.replace(`%%`, arg);
        
        return html;
    }

    async getViewArg() {
        const getTimeMsg = function() {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) return "Good morning,";
            else if (hour >= 12 && hour < 18) return "Good afternoon,";
            else if (hour >= 18 && hour < 24) return "Good evening,";
            else return "Welcome,";
        }

        const getAllCards = async function() {
            // Get all card data
            await Component.getCardData();

            // Create cards from card data objects
            const cards = [];
            
            for (const data of cardData) {
                cards.push(await Component.createCard(data));
            }

            return cards.join("");
        }

        const argMap = {
            1: getTimeMsg(),
            2: getAllCards(),
            3: 0,
            4: 0
        };
        return argMap[this.activeView];
    }

    /**
     * Runs a script (if any) tied to a view
     */
    runViewScript(caller) {
        const main = document.querySelector("main");

        // Resize "Quick Links" divider to match hero-section width
        switch (this.activeView) {
            case 1:
                if ("router") {
                    main.removeAttribute("class");
                    main.setAttribute("class", "flex-col center-evenly");
                }

                const heroWidth = document.getElementById("hero-section").offsetWidth;
                document.getElementById("ql-section").setAttribute("style", `width: ${heroWidth}px`);
                break;
            case 2:
                main.removeAttribute("class");
                main.setAttribute("class", "flex-col flex-start")
                break;
            case 3:
                main.removeAttribute("class");
                main.setAttribute("class", "flex-col flex-start");
                break;
            case 4:
                main.removeAttribute("class");
                main.setAttribute("class", "flex-col center-evenly");
                break;
        }
    }
}