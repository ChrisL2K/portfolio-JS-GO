import {View} from "./view.js";
const view = new View();

function navigateTo({href}) {
    history.pushState(null, null, href);
    router();
}

function openNewTab({href}) {
    window.open(href);
}

/**
 * Renders view from the current location.pathname
 */
async function router() {
    const fullPath = new URL("static/html/", document.baseURI).href;
    
    const routes = {
        "/": {
            view: 1,
            path: fullPath + "home.html"
        },
        "/projects": {
            view: 2,
            path: fullPath + "projects.html"
        },
        "/resume": {
            view: 3,
            path: fullPath + "resume.html"
        },
        "/contact-me": {
            view: 4,
            path: fullPath + "contactMe.html"
        }
    }

    const route = function() {
        if (routes[location.pathname]) return routes[location.pathname];
        else {
            location.pathname = "/";
            return routes["/"];
        }
    }

    document.querySelector("main").innerHTML = await view.getViewContentHTML(route());
    view.runViewScript("router");
}

document.addEventListener("DOMContentLoaded", () => {
    // On content loaded
    router();

    // Handle clicks
    document.body.addEventListener("click", e => {
        // Navbar option clicks
        if (e.target.matches("[data-nav]")) {
            e.preventDefault();
            navigateTo(e.target);
        }
        else if (e.target.matches("[data-ext]") || e.target.matches("[data-git]")) {
            e.preventDefault();
            openNewTab(e.target);
        }
        else if (e.target.matches("[type=\"submit\"]")) {
            e.preventDefault();
            console.log("submit function called");
            console.log(document.querySelector("textarea").scrollHeight);
        }
        else if (e.target.matches("option") && !e.target.matches("[value=\"default\"]"))
        {
            console.log(e.target);
            //?
        }
    });

    // Handle viewport resize
    window.addEventListener("resize", () => {
        if (view.activeView === 1) view.runViewScript();
    });
});