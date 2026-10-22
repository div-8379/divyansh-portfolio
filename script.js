
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

// Mobile navigation
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close mobile menu after selecting a section
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

// Highlight the navbar link for the visible section
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navItems.forEach((link) => {
                    const matches =
                        link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    link.classList.toggle("active", matches);
                });
            }
        });
    },
    {
        rootMargin: "-25% 0px -60% 0px"
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});


/* ================================
   RAINBOW SILK — THEME TOGGLE
================================ */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector(".theme-icon");

function applyTheme(theme) {
    const isDark = theme === "dark";

    document.documentElement.dataset.theme = isDark ? "dark" : "light";

    if (themeIcon) {
        themeIcon.textContent = isDark ? "☀" : "☾";
    }

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        themeToggle.setAttribute("aria-pressed", String(isDark));
        themeToggle.setAttribute(
            "title",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    }
}

// Restore the visitor's saved preference
let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("portfolio-theme") || "light";
} catch {
    // Continue with light mode if storage is unavailable.
}

applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.dataset.theme || "light";

        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        // Create the animated sheen only when the user changes the theme.
        let sweep = document.querySelector(".theme-sweep");

        if (!sweep) {
            sweep = document.createElement("div");
            sweep.className = "theme-sweep";
            sweep.setAttribute("aria-hidden", "true");
            document.body.appendChild(sweep);
        }

        sweep.classList.remove("play");
        void sweep.offsetWidth;

        applyTheme(nextTheme);
        sweep.classList.add("play");

        try {
            localStorage.setItem("portfolio-theme", nextTheme);
        } catch {
            // The theme still works if storage is unavailable.
        }
    });
}
