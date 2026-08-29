/* =========================================================
   BSGA CONSULTING — MAIN JAVASCRIPT
   Global functionality for all pages
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    if (menuToggle && mobileNav) {

        const closeMobileMenu = () => {

            menuToggle.classList.remove("active");
            mobileNav.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            document.body.classList.remove("mobile-menu-open");
        };


        const openMobileMenu = () => {

            menuToggle.classList.add("active");
            mobileNav.classList.add("active");

            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

            document.body.classList.add("mobile-menu-open");
        };


        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });


        /* Close menu when clicking a navigation link */

        const mobileLinks =
            mobileNav.querySelectorAll("a");

        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {
                closeMobileMenu();
            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            if (
                mobileNav.classList.contains("active") &&
                !mobileNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMobileMenu();
            }

        });


        /* Close menu with Escape */

        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                mobileNav.classList.contains("active")
            ) {
                closeMobileMenu();
                menuToggle.focus();
            }

        });


        /* Close mobile menu if viewport becomes desktop */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 900) {
                closeMobileMenu();
            }

        });

    }


    /* =====================================================
       HEADER SCROLL STATE
    ====================================================== */

    const siteHeader =
        document.querySelector(".site-header");

    if (siteHeader) {

        const updateHeader = () => {

            if (window.scrollY > 30) {
                siteHeader.classList.add("scrolled");
            } else {
                siteHeader.classList.remove("scrolled");
            }

        };

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header =
                document.querySelector(".site-header");

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;

            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       CURRENT PAGE NAVIGATION
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    const normalizedPage =
        currentPage === ""
            ? "index.html"
            : currentPage;


    const navigationLinks =
        document.querySelectorAll(
            ".main-navigation a, .mobile-nav a"
        );


    navigationLinks.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        /*
         * Ignore external links, email links,
         * telephone links and anchor links.
         */

        if (
            href.startsWith("http") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.startsWith("#")
        ) {
            return;
        }


        const linkPage =
            href.split("/").pop() || "index.html";


        if (linkPage === normalizedPage) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });


    /* =====================================================
       EXTERNAL LINKS
    ====================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[href^="http"]'
        );


    externalLinks.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }


        try {

            const url =
                new URL(
                    href,
                    window.location.origin
                );

            /*
             * Only apply target="_blank" automatically
             * to links pointing outside the BSGA domain.
             */

            if (
                url.hostname &&
                url.hostname !== window.location.hostname
            ) {

                link.setAttribute(
                    "target",
                    "_blank"
                );

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        } catch (error) {

            /*
             * Invalid URLs are left untouched.
             */

        }

    });


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, " +
            ".service-card, " +
            ".services-approach-step, " +
            ".about-card, " +
            ".insight-card"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach((element) => {

            element.classList.add(
                "reveal-ready"
            );

            revealObserver.observe(element);

        });

    } else {

        /*
         * Fallback for browsers without
         * IntersectionObserver.
         */

        revealElements.forEach((element) => {

            element.classList.add(
                "is-visible"
            );

        });

    }


    /* =====================================================
       CONTACT / EMAIL LINKS
    ====================================================== */

    const emailLinks =
        document.querySelectorAll(
            'a[href^="mailto:"]'
        );


    emailLinks.forEach((link) => {

        link.addEventListener("click", () => {

            link.classList.add(
                "email-clicked"
            );

        });

    });


    /* =====================================================
       HERO IMAGE LOADING
    ====================================================== */

    const heroImages =
        document.querySelectorAll(
            ".services-hero-background img, " +
            ".service-hero-background img, " +
            ".hero-background img"
        );


    heroImages.forEach((image) => {

        if (image.complete) {

            image.classList.add(
                "image-loaded"
            );

        } else {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "image-loaded"
                    );

                },
                { once: true }
            );

        }

    });


    /* =====================================================
       REDUCED MOTION ACCESSIBILITY
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (prefersReducedMotion.matches) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }


    const handleMotionPreference = (event) => {

        if (event.matches) {

            document.documentElement.classList.add(
                "reduce-motion"
            );

        } else {

            document.documentElement.classList.remove(
                "reduce-motion"
            );

        }

    };


    if (
        typeof prefersReducedMotion.addEventListener ===
        "function"
    ) {

        prefersReducedMotion.addEventListener(
            "change",
            handleMotionPreference
        );

    } else if (
        typeof prefersReducedMotion.addListener ===
        "function"
    ) {

        prefersReducedMotion.addListener(
            handleMotionPreference
        );

    }


    /* =====================================================
       CONTACT FORM BASIC VALIDATION
       Works only if a form exists.
    ====================================================== */

    const contactForms =
        document.querySelectorAll(
            ".contact-form, form[data-contact-form]"
        );


    contactForms.forEach((form) => {

        form.addEventListener("submit", (event) => {

            let valid = true;


            const requiredFields =
                form.querySelectorAll(
                    "[required]"
                );


            requiredFields.forEach((field) => {

                const value =
                    field.value.trim();


                if (!value) {

                    valid = false;

                    field.classList.add(
                        "input-error"
                    );

                } else {

                    field.classList.remove(
                        "input-error"
                    );

                }

            });


            const emailField =
                form.querySelector(
                    'input[type="email"]'
                );


            if (
                emailField &&
                emailField.value.trim()
            ) {

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        emailField.value.trim()
                    )
                ) {

                    valid = false;

                    emailField.classList.add(
                        "input-error"
                    );

                }

            }


            if (!valid) {

                event.preventDefault();

                const firstError =
                    form.querySelector(
                        ".input-error"
                    );


                if (firstError) {
                    firstError.focus();
                }

            }

        });

    });


    /* =====================================================
       FORM INPUT ERROR CLEANUP
    ====================================================== */

    const formInputs =
        document.querySelectorAll(
            "input, textarea, select"
        );


    formInputs.forEach((input) => {

        input.addEventListener(
            "input",
            () => {

                if (
                    input.value.trim()
                ) {

                    input.classList.remove(
                        "input-error"
                    );

                }

            }
        );

    });


    /* =====================================================
       LAZY LOADING SAFETY
    ====================================================== */

    const contentImages =
        document.querySelectorAll(
            "img"
        );


    contentImages.forEach((image) => {

        /*
         * Do not override explicitly high-priority
         * hero images.
         */

        if (
            !image.hasAttribute("loading") &&
            !image.hasAttribute("fetchpriority")
        ) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }

    });


    /* =====================================================
       YEAR AUTO-UPDATE
       Optional footer support.
    ====================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach((element) => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       BACK TO TOP
       Only activates if a matching button exists.
    ====================================================== */

    const backToTop =
        document.querySelector(
            "[data-back-to-top]"
        );


    if (backToTop) {

        const updateBackToTop = () => {

            if (window.scrollY > 600) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        };


        updateBackToTop();


        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       PAGE READY
    ====================================================== */

    document.documentElement.classList.add(
        "js-enabled"
    );

});
