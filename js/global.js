// =============================
// Global JS – Navbar / Hamburger
// =============================

// Toggle mobile navigation menu
function toggleMenu() {
    const nav = document.getElementById("navMenu");
    if (nav) {
        nav.classList.toggle("open");
    }
}

// =============================
// Close Mobile Nav When Clicking Outside
// =============================

document.addEventListener("click", function (event) {
    const nav = document.getElementById("navMenu");
    const hamburger = document.querySelector(".hamburger");

    // If nav does NOT exist, do nothing
    if (!nav) return;

    // Only apply this rule when nav is OPEN
    if (nav.classList.contains("open")) {

        // If click is NOT inside nav AND NOT on hamburger → close menu
        if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
            nav.classList.remove("open");
        }
    }
});
    

// =============================
// Highlight Active Page in Navbar
// =============================

document.addEventListener("DOMContentLoaded", () => {
    // Get the current page file name (e.g., "index.html", "about.html")
    let currentPage = window.location.pathname.split("/").pop();

    // If served from root (e.g., "http://site.com/"), treat as index.html
    if (currentPage === "") {
        currentPage = "index.html";
    }

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
});
