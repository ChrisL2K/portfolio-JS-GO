import {View} from "./views/view.js";

const fullPath = new URL("static/js/views/", document.baseURI).href;

async function getNavbar() {
    document.getElementById("nav").innerHTML = await View.getContent({path: fullPath + "navbar.html", args: {}});
}

function navigateTo({href}) {
    history.pushState(null, null, href);
    router();
}

/**
 * Renders view from the current location.pathname
 */
async function router() {
    const routes = {
        "/": {
            path: fullPath + "home.html",
            args: [function() {
                const hour = new Date().getHours();
                if (hour >= 5 && hour < 12) return "Good morning,";
                else if (hour >= 12 && hour < 18) return "Good afternoon,";
                else if (hour >= 18 && hour < 24) return "Good evening,";
                else return "Welcome,";
            }]
        },
        "/projects": {
            path: fullPath + "projects.html",
            args: []
        },
        "/resume": {
            path: fullPath + "resume.html",
            args: []
        },
        "/contact-me": {
            path: fullPath + "contactMe.html",
            args: []
        }
    }

    const view = function() {
        if (routes[location.pathname]) return routes[location.pathname];
        else {
            location.pathname = "/";
            return routes["/"];
        }
    }

    document.getElementById("view").innerHTML = await View.getContent(view());
}

document.addEventListener("DOMContentLoaded", () => {
    // On content loaded
    getNavbar();
    router();

    // Handle clicks
    document.body.addEventListener("click", e => {
        // Navbar option clicks
        if (e.target.matches("[data-link]")) {
            // Prevent reload and push new state if not same path
            e.preventDefault();
            console.log("data click");
        }
    });
});