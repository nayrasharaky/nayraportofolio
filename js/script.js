(function () {
    function initStartScreen() {
        const startScreen = document.getElementById("startScreen");
        const enterLab = document.getElementById("enterLab");

        if (!startScreen || !enterLab) return;

        document.body.classList.add("start-locked");

        enterLab.addEventListener("click", function (event) {
            event.preventDefault();
            startScreen.classList.add("is-leaving");
            document.body.classList.remove("start-locked");

            setTimeout(function () {
                const home = document.getElementById("home");
                if (home) home.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);

            setTimeout(function () {
                if (startScreen && startScreen.parentNode) {
                    startScreen.parentNode.removeChild(startScreen);
                }
            }, 950);
        }, { once: true });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initStartScreen, { once: true });
    } else {
        initStartScreen();
    }
})();

const cursorGlow = document.querySelector(".cursor-glow");
const portrait = document.querySelector(".portrait-frame");
const menuPanel = document.getElementById("menuPanel");
const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const enterBtn = document.getElementById("enterBtn");

document.addEventListener("mousemove", (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    }

    if (window.innerWidth > 900 && portrait) {
        const x = (e.clientX / window.innerWidth - .5) * 9;
        const y = (e.clientY / window.innerHeight - .5) * -9;
        portrait.style.transform = `rotate(2deg) translate(${x}px, ${y}px)`;
    }
});
function openMenu() {
    menuPanel.classList.add("open");
    document.body.classList.add("menu-open");
}
function hideMenu() {
    menuPanel.classList.remove("open");
    document.body.classList.remove("menu-open");
}
if (menuBtn) menuBtn.addEventListener("click", openMenu);
if (closeMenu) closeMenu.addEventListener("click", hideMenu);
menuPanel.querySelectorAll("a").forEach(link => link.addEventListener("click", hideMenu));

enterBtn.addEventListener("click", () => {
    document.getElementById("about").scrollIntoView({behavior:"smooth"});
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
    });
}, {threshold:.12});
revealItems.forEach(item => observer.observe(item));

const projects = {
    lumora: {
        title:"LUMORA",
        description:"A modern digital art museum experience presenting exhibitions, artworks, artists and visitor stories through responsive layouts, animation and interactive Bootstrap components.",
        tech:["HTML5","CSS3","JavaScript","Bootstrap 5","Font Awesome"],
        link:"https://github.com/nayrasharaky/LUMORA.git"
    },
    choco: {
        title:"ChocoDelight",
        description:"A responsive chocolate e-commerce experience with authentication, product management, shopping cart interactions, checkout flow and persistent browser storage.",
        tech:["HTML5","CSS3","JavaScript","Bootstrap","Swiper.js","SweetAlert2","localStorage"],
        link:"https://github.com/nayrasharaky/chocodelight"
    },
    dior: {
        title:"Dior Website",
        description:"A fashion-inspired web experience focused on visual presentation, responsive layouts and JavaScript interactions.",
        tech:["HTML5","CSS3","JavaScript"],
        link:"https://github.com/nayrasharaky/Diorwebsite"
    },
    chocoluxe: {
        title:"ChocoLuxe",
        description:"A chocolate brand web experience built around products, categories, offers and a polished visual identity.",
        tech:["HTML5","CSS3","JavaScript"],
        link:"https://github.com/nayrasharaky/chocoluxe"
    },
    nexus: {
        title:"Nexus",
        description:"A digital-solutions landing page exploring sections, pricing, testimonials, statistics, animation and responsive presentation.",
        tech:["HTML5","CSS3","JavaScript"],
        link:"https://github.com/nayrasharaky/-Nexus"
    },
    backend: {
        title:"IEEE Backend Task",
        description:"A backend learning project focused on building REST-style routes and CRUD operations with Node.js, Express, MongoDB and Mongoose.",
        tech:["Node.js","Express","MongoDB","Mongoose","REST API"],
        link:"https://github.com/nayrasharaky/IEEE-Backend-Task"
    },
    ieee: {
        title:"IEEE Task",
        description:"A JavaScript problem-solving practice project covering arrays, strings, loops and common data-manipulation exercises.",
        tech:["JavaScript","Arrays","Strings","Loops"],
        link:"https://github.com/nayrasharaky/IEEETASK"
    }
};

const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalLink = document.getElementById("modalLink");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        const data = projects[card.dataset.project];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalTech.innerHTML = data.tech.map(t => `<span>${t}</span>`).join("");
        modalLink.href = data.link;
        modal.classList.add("open");
        document.body.classList.add("modal-open");
    });
});
function closeModal() {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
}
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

const techProjects = {
    html:["LUMORA","ChocoDelight","Dior Website","ChocoLuxe","Nexus"],
    css:["LUMORA","ChocoDelight","Dior Website","ChocoLuxe","Nexus"],
    js:["LUMORA","ChocoDelight","Dior Website","ChocoLuxe","Nexus","IEEE Task"],
    bootstrap:["LUMORA","ChocoDelight"],
    git:["All portfolio experiments"],
    csharp:["Academic / learning work"],
    node:["IEEE Backend Task"],
    mongo:["IEEE Backend Task"],
    python:["Exploring / learning"]
};

const techResult = document.getElementById("techResult");
document.querySelectorAll(".tech-node").forEach(node => {
    node.addEventListener("click", () => {
        document.querySelectorAll(".tech-node").forEach(n => n.classList.remove("active"));
        node.classList.add("active");
        const tech = node.dataset.tech;
        const names = techProjects[tech] || [];
        techResult.innerHTML = `
            <span>${node.textContent}</span>
            <strong>${names.join("  ·  ")}</strong>
        `;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("copyEmail");
    const text = document.getElementById("copyEmailText");

    if (!btn || !text) return;

    btn.addEventListener("click", async () => {
        const email = "nayrasharaky79@gmail.com";

        try {
            await navigator.clipboard.writeText(email);
            text.textContent = "Email copied ✓";

            setTimeout(() => {
                text.textContent = "Copy my email";
            }, 1800);
        } catch (e) {
            window.location.href = "mailto:" + email;
        }
    });
});