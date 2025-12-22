// ABOUT PAGE SPECIFIC JS

document.addEventListener("DOMContentLoaded", () => {
    // COLLAPSIBLE MEMBER SECTIONS
    const sections = document.querySelectorAll(".member-section");

    sections.forEach(section => {
        const header = section.querySelector(".member-section-header");
        if (!header) return;

        header.addEventListener("click", () => {
            // toggle this section only
            section.classList.toggle("open");
        });
    });

    // ❌ DO NOT OPEN ANY SECTION BY DEFAULT
    // (Removed the code that opened the first section)
});
