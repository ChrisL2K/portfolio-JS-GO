import {Page} from "./views/page.js";

let navbar = {};

async function getNavbar() {
    const nav = document.querySelector("nav");
    nav.innerHTML = await Page.getContent(new URL("static/js/views/navbar.html", document.baseURI).href);

    navbar = {
        "brand": nav.querySelector("div > a"),
        "projects": nav.querySelector("div > div > a[href=\"/projects\"]"),
        "resume": nav.querySelector("div > div > a[href=\"/resume\"]"),
        "contact-me": nav.querySelector("div > div > a[href=\"/contact-me\"]"),
        "active": {}
    }
}

function navigateTo({href}) {
    history.pushState(null, null, href);
    router();
}

/**
 * Renders view from the current location.pathname
 */
async function router() {
    const path = new URL("static/js/views/", document.baseURI).href;

    const routes = {
        "/": "home.html",
        "/projects": "projects.html",
        "/resume": "resume.html",
        "/contact-me": "contactMe.html"
    }

    const view = function() {
        if (routes[location.pathname]) return path + routes[location.pathname];
        else {
            location.pathname = "/";
            return path + routes["/"];
        }
    }

    document.getElementById("body-screen").innerHTML = await Page.getContent(view());
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
            if (window.location.href !== e.target.href) navigateTo(e.target);
        }
    });
});