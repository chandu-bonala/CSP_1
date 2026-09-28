/* =========================================
   CANCER PREVENTION CSP PROTOTYPE
========================================= */


/* =========================================
   SURVEY DATA
========================================= */

let surveyResponses =
    JSON.parse(localStorage.getItem("cancerSurveyResponses")) || [];


/* =========================================
   SURVEY SUBMISSION
========================================= */

const surveyForm = document.getElementById("awarenessSurvey");

surveyForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const heard =
        document.querySelector('input[name="heard"]:checked').value;

    const topic =
        document.querySelector('input[name="topic"]:checked').value;


    const response = {

        id: Date.now(),

        heard: heard,

        topic: topic,

        date: new Date().toLocaleString()

    };


    surveyResponses.push(response);


    localStorage.setItem(
        "cancerSurveyResponses",
        JSON.stringify(surveyResponses)
    );


    document.getElementById("surveyMessage").textContent =
        "Thank you. Your awareness survey has been submitted successfully.";


    surveyForm.reset();


    updateDashboard();


    setTimeout(function() {

        document.getElementById("surveyMessage").textContent = "";

    }, 5000);

});


/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

    const responseMetric = document.querySelector('[data-metric="responses"]');

    if (responseMetric) {
        responseMetric.textContent = surveyResponses.length;
    }

}


updateDashboard();


/* =========================================
   RESPONSIVE NAVIGATION
========================================= */

const navToggle = document.querySelector(".nav-toggle");
const primaryNavigation = document.getElementById("primary-navigation");

function closeNavigation() {

    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    primaryNavigation.classList.remove("is-open");

}


navToggle.addEventListener("click", function() {

    const isExpanded =
        navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navToggle.setAttribute(
        "aria-label",
        isExpanded ? "Open navigation" : "Close navigation"
    );
    primaryNavigation.classList.toggle("is-open", !isExpanded);

});


document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeNavigation();
    }

});


primaryNavigation.querySelectorAll("a").forEach(function(link) {

    link.addEventListener("click", closeNavigation);

});


/* =========================================
   NAVIGATION
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(function(link) {

    link.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =========================================
   SCROLL ANIMATION
========================================= */

const observer =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );


document.querySelectorAll(
    ".section-heading, .card, .risk-card, .prevention-item, .warning-card, .vaccine-card, .dashboard-card, .stat-card, .poster-card, .flow-step, .resource-card, .team-card"
).forEach(function(element) {

    element.classList.add("animate");

    observer.observe(element);

});


const sectionLinks = Array.from(
    primaryNavigation.querySelectorAll('a[href^="#"]')
);

const sectionObserver = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (!entry.isIntersecting) {
                return;
            }

            sectionLinks.forEach(function(link) {

                const isCurrent = link.hash === `#${entry.target.id}`;

                link.classList.toggle("active", isCurrent);

                if (isCurrent) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }

            });

        });

    },
    {
        rootMargin: "-25% 0px -65% 0px"
    }
);

sectionLinks.forEach(function(link) {

    const section = document.querySelector(link.hash);

    if (section) {
        sectionObserver.observe(section);
    }

});


/* =========================================
   CONSOLE INFORMATION
========================================= */

console.log(
    "Cancer Prevention CSP Prototype loaded successfully."
);

console.log(
    "This application is for educational awareness only."
);