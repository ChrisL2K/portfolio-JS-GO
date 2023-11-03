import Home from "./views/home.js";
import Projects from "./views/projects.js";
import Resume from "./views/resume.js";
import ContactMe from "./views/contactMe.js";

function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

/**
 * Renders view from the current location.pathname
 */
async function router() {
    const routes = {
        "/": Home,
        "/projects": Projects,
        "/resume": Resume,
        "/contact-me": ContactMe
    };
    
    const view = function() {
        if (routes[location.pathname]) return new routes[location.pathname];
        else return new routes["/"];
    }

    document.getElementById("body-screen").innerHTML = await view().getBody();
}

document.addEventListener("DOMContentLoaded", () => {
    router(); // To handle initial routing

    // Handle anchor clicks
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            if (window.location.href !== e.target.href) navigateTo(e.target.href);
        }
    });
});