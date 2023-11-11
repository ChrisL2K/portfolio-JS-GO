import {View} from "./views/view.js";

function navigateTo({href}) {
    history.pushState(null, null, href);
    router();
}

/**
 * Renders view from the current location.pathname
 */
async function router() {
    const fullPath = new URL("static/js/views/", document.baseURI).href;
    
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

    const view = function() {
        if (routes[location.pathname]) return routes[location.pathname];
        else {
            location.pathname = "/";
            return routes["/"];
        }
    }

    document.querySelector("main").innerHTML = await View.getViewHTML(view());
    View.runViewScript(View.view);
}

document.addEventListener("DOMContentLoaded", () => {
    // On content loaded
    router();

    // Handle clicks
    document.body.addEventListener("click", e => {
        console.log(e.target);
        
        // Navbar option clicks
        if (e.target.matches("[data-nav]")) {
            e.preventDefault();
            console.log("nav click");
        }
        else if (e.target.matches("[data-ext]")) {
            e.preventDefault();
            console.log("ext click");
        }
    });

    // Handle viewport resize
    window.addEventListener("resize", () => {
        View.runViewScript(View.view);
    });
});