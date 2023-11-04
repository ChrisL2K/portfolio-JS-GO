import Home from "./views/home.js";
import Projects from "./views/projects.js";
import Resume from "./views/resume.js";
import ContactMe from "./views/contactMe.js";
import Navbar from "./views/navbar.js";

let activeNavbar = {};

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
    }
    
    const view = function() {
        if (routes[location.pathname]) return new routes[location.pathname];
        else return new routes["/"];
    }

    document.getElementById("body-screen").innerHTML = await view().getBody();
}

async function getNavbar() {
    const nav = function() {
        return new Navbar(innerWidth);
    }

    activeNavbar = nav();
    document.getElementById("navbar").innerHTML = await activeNavbar.getBody();
    if (activeNavbar.state.mode == 2) {
        document.getElementById("icon-nav").src = activeNavbar.HamburgIcon;
        document.getElementById("nav-options-collapsed").style.display="none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // On content loaded
    getNavbar();
    router();

    // Handle clicks
    document.body.addEventListener("click", e => {
        // Navbar option clicks
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            if (window.location.href !== e.target.href) navigateTo(e.target.href);
        }

        // Icon clicks
        if (e.target.matches("#icon-nav")) {
            if (e.target.src === activeNavbar.HamburgIcon) {
                e.target.src = activeNavbar.CloseIcon;
                document.getElementById("nav-options-collapsed").style.display="flex";
            }
            else {
                e.target.src = activeNavbar.HamburgIcon;
                document.getElementById("nav-options-collapsed").style.display="none";
            }
        }
    });

    // Handle window resizing
    window.addEventListener("resize", e => {
        getNavbar();
    });
});