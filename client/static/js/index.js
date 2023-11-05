import Home from "./views/home.js";
import Projects from "./views/projects.js";
import Resume from "./views/resume.js";
import ContactMe from "./views/contactMe.js";
import Navbar from "./views/navbar.js";

let activeNavbar = {};
let activeOption = 0;

function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

function markOptionActive(target) {
    console.log(target);

    if (activeOption != 0) activeOption.removeAttribute("style");

    if (target.matches("#nav-options-regular > a")) {
        target.style = "border-bottom-style: solid; border-bottom-width: 3px;";
        activeOption = target;
    }
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
        else {
            location.pathname = "/";
            return new routes["/"];
        }
    }

    document.getElementById("body-screen").innerHTML = await view().getBody();
}

async function getNavbar() {
    const nav = function() {
        return new Navbar(innerWidth);
    }

    // if not home page, grab anchor
    const initialRoute = function() {
        const map = {
            "/projects": document.querySelectorAll("a[href=\"/projects\"]").item(0),
            "/resume": document.querySelectorAll("a[href=\"/resume\"]").item(0),
            "/contact-me": document.querySelectorAll("a[href=\"/contact-me\"]").item(0)
        };
        return map[location.pathname];
    }

    activeNavbar = nav();
    document.getElementById("navbar").innerHTML = await activeNavbar.getBody();
    if (activeNavbar.state.mode == "collapsed") {
        document.getElementById("icon-nav").src = activeNavbar.HamburgIcon;
        document.getElementById("nav-options-collapsed").style.display="none";
    }

    if (activeOption == 0 && location.pathname != "/") markOptionActive(initialRoute());
}

document.addEventListener("DOMContentLoaded", () => {
    // On content loaded
    router();
    getNavbar();

    // Handle clicks
    document.body.addEventListener("click", e => {
        // Navbar option clicks
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            markOptionActive(e.target);
            if (window.location.href !== e.target.href) navigateTo(e.target.href);
        }

        // Icon clicks
        if (e.target.matches("#icon-nav")) {
            if (e.target.src === activeNavbar.HamburgIcon) {
                e.target.src = activeNavbar.CloseIcon;
                document.getElementById("nav-options-collapsed").removeAttribute("style");
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