// ============================================================
// ANIME PAPER PORTFOLIO — main.js
// All interactive animations, scroll effects, and UI logic
// ============================================================

import anime from "animejs/lib/anime.es.js";

// ---------- DOM Ready ----------
document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle(); // Must run first so colors are correct
    initLoader();
    initNavigation();
    initScrollProgress();
    initScrollAnimations();
    initTypingEffect();
    initSVGDrawing();

    initStatCounters();
    initContactForm();
    initCherryBlossomPetals();
    initInkCanvas();
    initTiltCards();
    initFooterYear();
    initSmoothScroll();

    // New interactive enhancements
    initCustomCursor();
    initMagneticButtons();
    initBentoSpotlight();
    initHeroParallax();
    initPillRipple();
    initNavRipples();
    initLiveCPStats();
});

// ---------- Theme Toggle ----------
function initThemeToggle() {
    const toggleDesktop = document.getElementById("theme-toggle");
    const toggleMobile = document.getElementById("theme-toggle-mobile");
    const root = document.documentElement;

    // Determine initial theme: localStorage > system preference > light
    const stored = localStorage.getItem("theme");
    if (stored) {
        root.setAttribute("data-theme", stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.setAttribute("data-theme", "dark");
    }

    function toggle() {
        const current = root.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";

        // Enable smooth color transition
        document.body.classList.add("theme-transitioning");

        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);

        // Remove transition class after animation completes
        setTimeout(() => {
            document.body.classList.remove("theme-transitioning");
        }, 500);
    }

    if (toggleDesktop) toggleDesktop.addEventListener("click", toggle);
    if (toggleMobile) toggleMobile.addEventListener("click", toggle);

    // Listen for system preference changes
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
            if (!localStorage.getItem("theme")) {
                root.setAttribute("data-theme", e.matches ? "dark" : "light");
            }
        });
}

// ---------- Page Loader / Intro Animation ----------
function initLoader() {
    // Animate hero elements on page load
    const heroElements = document.querySelectorAll(".hero .anim-fade-up");

    // Slight delay to let fonts load
    setTimeout(() => {
        heroElements.forEach((el, i) => {
            setTimeout(
                () => {
                    el.classList.add("visible");
                },
                i * 150 + 200,
            );
        });
    }, 300);
}

// ---------- Navigation ----------
function initNavigation() {
    const nav = document.getElementById("main-nav");
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");
    const navLinks = document.querySelectorAll(".nav-link");
    let lastScroll = 0;

    // Scroll behavior
    window.addEventListener(
        "scroll",
        () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 50) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }

            // Update active nav link
            updateActiveNavLink();
            lastScroll = currentScroll;
        },
        { passive: true },
    );

    // Mobile menu toggle
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        mobileMenu.classList.toggle("open");
        document.body.style.overflow = mobileMenu.classList.contains("open")
            ? "hidden"
            : "";
    });

    // Close mobile menu on link click
    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            mobileMenu.classList.remove("open");
            document.body.style.overflow = "";
        });
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll(".section");
        const scrollPos = window.scrollY + window.innerHeight / 3;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }
}

// ---------- Scroll Progress ----------
function initScrollProgress() {
    const progressBar = document.getElementById("scroll-progress");

    window.addEventListener(
        "scroll",
        () => {
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / docHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        },
        { passive: true },
    );
}

// ---------- Scroll Reveal Animations ----------
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -80px 0px",
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Don't unobserve so re-entering view re-triggers?
                // Actually for portfolio, animate once is cleaner:
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements (except hero ones which are triggered by loader)
    const animatedElements = document.querySelectorAll(
        ".about .anim-fade-up, .about .anim-reveal, " +
            ".work .anim-fade-up, .work .anim-reveal, " +
            ".skills .anim-fade-up, .skills .anim-reveal, " +
            ".contact .anim-fade-up, .contact .anim-reveal",
    );

    animatedElements.forEach((el) => observer.observe(el));
}

// ---------- Typing Effect ----------
function initTypingEffect() {
    const typedElement = document.getElementById("typed-text");
    if (!typedElement) return;

    const strings = [
        "Developer",
        "Competitive Programmer",
        "Problem Solver",
        "Always Building",
    ];

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentString = strings[stringIndex];

        if (!isDeleting) {
            typedElement.textContent = currentString.substring(
                0,
                charIndex + 1,
            );
            charIndex++;

            if (charIndex === currentString.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else {
                typingSpeed = 80 + Math.random() * 60; // Natural typing speed
            }
        } else {
            typedElement.textContent = currentString.substring(
                0,
                charIndex - 1,
            );
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % strings.length;
                typingSpeed = 400; // Pause before next word
            } else {
                typingSpeed = 40 + Math.random() * 30; // Faster deletion
            }
        }

        setTimeout(type, typingSpeed);
    }

    // Start after a short delay
    setTimeout(type, 1500);
}

// ---------- SVG Path Drawing Animation ----------
function initSVGDrawing() {
    const drawPaths = document.querySelectorAll(".draw-path");

    // Measure and set the correct dasharray/dashoffset for each path
    drawPaths.forEach((path) => {
        try {
            const length = path.getTotalLength ? path.getTotalLength() : 500;
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
        } catch (e) {
            // Some elements (like ellipses) might not support getTotalLength in all browsers
            path.style.strokeDasharray = 500;
            path.style.strokeDashoffset = 500;
        }
    });

    // Observe SVG parents and animate paths when visible
    const svgObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const paths = entry.target.querySelectorAll(".draw-path");
                    paths.forEach((path, i) => {
                        setTimeout(() => {
                            anime({
                                targets: path,
                                strokeDashoffset: [anime.setDashoffset, 0],
                                easing: "easeInOutSine",
                                duration: 1500,
                                delay: i * 200,
                            });
                        }, 100);
                    });
                    svgObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 },
    );

    // Observe containers that hold SVG drawings
    const svgContainers = document.querySelectorAll(
        ".sketch-deco, .portrait-placeholder, .project-sketch, .contact-crane",
    );
    svgContainers.forEach((container) => svgObserver.observe(container));
}

// ---------- Stat Counter Animation ----------
function initStatCounters() {
    const statNumbers = document.querySelectorAll(".stat-number");

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute("data-count"));

                    anime({
                        targets: el,
                        innerHTML: [0, target],
                        easing: "easeOutExpo",
                        round: 1,
                        duration: 2000,
                    });

                    counterObserver.unobserve(el);
                }
            });
        },
        { threshold: 0.5 },
    );

    statNumbers.forEach((el) => counterObserver.observe(el));
}

// ---------- Toast ----------
function showToast({ title, sub, error = false }) {
    let toast = document.querySelector(".toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.classList.add("toast");
        toast.innerHTML = `
            <div class="toast-icon">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--paper)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12L10 17L20 7"/>
                </svg>
            </div>
            <div class="toast-text">
                <span class="toast-title"></span>
                <span class="toast-sub"></span>
            </div>
        `;
        document.body.appendChild(toast);
    }

    toast.classList.toggle("toast--error", error);
    toast.querySelector(".toast-title").textContent = title;
    toast.querySelector(".toast-sub").textContent = sub || "";

    // Update icon for error
    toast
        .querySelector(".toast-icon svg path")
        .setAttribute("d", error ? "M18 6L6 18M6 6l12 12" : "M5 12L10 17L20 7");

    // Show
    clearTimeout(toast._hideTimer);
    toast.classList.add("toast--show");

    toast._hideTimer = setTimeout(() => {
        toast.classList.remove("toast--show");
    }, 4000);
}

// ---------- Contact Form ----------
function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector(".btn-submit");
        const originalText = submitBtn.querySelector("span").textContent;

        submitBtn.querySelector("span").textContent = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://formspree.io/f/mlgwqolj", {
                method: "POST",
                headers: { Accept: "application/json" },
                body: new FormData(form),
            });

            if (response.ok) {
                submitBtn.classList.add("sent");
                submitBtn.querySelector("span").textContent = "Sent!";
                createInkBurst(submitBtn);
                form.reset();

                showToast({
                    title: "Message sent — ありがとう!",
                    sub: "I'll get back to you soon.",
                });

                setTimeout(() => {
                    submitBtn.classList.remove("sent");
                    submitBtn.querySelector("span").textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                const data = await response.json();
                const msg =
                    data?.errors?.map((e) => e.message).join(", ") ||
                    "Something went wrong. Please try again.";
                submitBtn.querySelector("span").textContent = "Error!";

                showToast({
                    title: "Failed to send",
                    sub: "Please try again or email directly.",
                    error: true,
                });

                setTimeout(() => {
                    submitBtn.querySelector("span").textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
                console.error("Formspree error:", msg);
            }
        } catch {
            submitBtn.querySelector("span").textContent = "Error!";

            showToast({
                title: "Network error",
                sub: "Check your connection and retry.",
                error: true,
            });

            setTimeout(() => {
                submitBtn.querySelector("span").textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

function createInkBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div");
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: ${centerX}px;
            top: ${centerY}px;
        `;
        document.body.appendChild(particle);

        anime({
            targets: particle,
            translateX: () => anime.random(-60, 60),
            translateY: () => anime.random(-60, 60),
            scale: [1, 0],
            opacity: [1, 0],
            easing: "easeOutExpo",
            duration: 800,
            delay: i * 50,
            complete: () => particle.remove(),
        });
    }
}

// ---------- Cherry Blossom Petals ----------
function initCherryBlossomPetals() {
    const container = document.getElementById("petals-container");
    if (!container) return;

    // Reduce motion check
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function createPetal() {
        const petal = document.createElement("div");
        petal.classList.add("petal");

        const size = 8 + Math.random() * 10;
        const startX = Math.random() * window.innerWidth;
        const rotation = Math.random() * 360;
        const duration = 8000 + Math.random() * 7000;
        const swayAmount = 80 + Math.random() * 100;

        // SVG petal shape — read accent from CSS vars for dark mode compat
        const style = getComputedStyle(document.documentElement);
        const color1 = style.getPropertyValue("--accent").trim() || "#c97a82";
        const color2 =
            style.getPropertyValue("--accent-light").trim() || "#e8b4b8";
        const hue = Math.random() > 0.5 ? color1 : color2;
        petal.innerHTML = `
            <svg viewBox="0 0 20 20" width="${size}" height="${size}">
                <ellipse cx="10" cy="10" rx="8" ry="5"
                    fill="${hue}" opacity="0.6"
                    transform="rotate(${rotation} 10 10)"/>
            </svg>
        `;

        petal.style.left = `${startX}px`;
        petal.style.top = "-20px";

        container.appendChild(petal);

        anime({
            targets: petal,
            translateY: window.innerHeight + 40,
            translateX: [
                { value: swayAmount, duration: duration * 0.3 },
                { value: -swayAmount * 0.6, duration: duration * 0.3 },
                { value: swayAmount * 0.3, duration: duration * 0.4 },
            ],
            rotate: [rotation, rotation + 360 + Math.random() * 180],
            opacity: [
                { value: 0.7, duration: 1000, easing: "easeInQuad" },
                { value: 0.7, duration: duration - 3000 },
                { value: 0, duration: 2000, easing: "easeOutQuad" },
            ],
            easing: "easeInOutSine",
            duration: duration,
            complete: () => {
                petal.remove();
            },
        });
    }

    // Create petals at intervals — sparse and gentle
    function scheduleNextPetal() {
        const delay = 2000 + Math.random() * 4000; // Every 2-6 seconds
        setTimeout(() => {
            createPetal();
            scheduleNextPetal();
        }, delay);
    }

    // Start with a few initial petals
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createPetal(), i * 1500 + 1000);
    }

    scheduleNextPetal();
}

// ---------- Ink Canvas (Mouse Trail) ----------
function initInkCanvas() {
    const canvas = document.getElementById("ink-canvas");
    if (!canvas) return;

    // Reduce motion check
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let mouse = { x: -100, y: -100 };
    let animationId;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    document.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // Spawn a few ink particles on movement
        if (Math.random() > 0.6) {
            for (let i = 0; i < 2; i++) {
                particles.push({
                    x: mouse.x + (Math.random() - 0.5) * 8,
                    y: mouse.y + (Math.random() - 0.5) * 8,
                    radius: Math.random() * 1.5 + 0.5,
                    alpha: 0.15 + Math.random() * 0.1,
                    decay: 0.003 + Math.random() * 0.005,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                });
            }
        }
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                return;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            const rgb =
                getComputedStyle(document.documentElement)
                    .getPropertyValue("--particle-rgb")
                    .trim() || "26, 26, 26";
            ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`;
            ctx.fill();
        });

        // Keep particle count manageable
        if (particles.length > 200) {
            particles = particles.slice(-150);
        }

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup on page visibility change
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// ---------- Tilt Effect on Cards ----------
function initTiltCards() {
    const cards = document.querySelectorAll("[data-tilt]");

    // Only on desktop
    if (window.matchMedia("(hover: none)").matches) return;

    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            card.style.transition =
                "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
            setTimeout(() => {
                card.style.transition = "";
            }, 500);
        });

        card.addEventListener("mouseenter", () => {
            card.style.transition = "none";
        });
    });
}

// ---------- Footer Year ----------
function initFooterYear() {
    const yearEl = document.querySelector(".footer-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// ---------- Smooth Scroll ----------
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId === "#") return;

            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            e.preventDefault();

            const navHeight = document.querySelector(".nav").offsetHeight;
            const targetPos = targetEl.offsetTop - navHeight;

            window.scrollTo({
                top: targetPos,
                behavior: "smooth",
            });
        });
    });
}

// ============================================================
// INTERACTIVE ENHANCEMENTS
// ============================================================

// ---------- Custom Cursor Ring ----------
function initCustomCursor() {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ring = document.createElement("div");
    ring.classList.add("cursor-ring");
    const dot = document.createElement("div");
    dot.classList.add("cursor-dot");
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    let mouseX = -100,
        mouseY = -100;
    let ringX = -100,
        ringY = -100;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";
    });

    // Smooth lag for ring
    function followMouse() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + "px";
        ring.style.top = ringY + "px";
        requestAnimationFrame(followMouse);
    }
    followMouse();

    // Hover state for interactive elements
    const hoverTargets = document.querySelectorAll(
        "a, button, .bento-pill, .project-card, .social-link, .btn, .nav-link, .nav-menu-btn",
    );
    hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", () => ring.classList.add("hovering"));
        el.addEventListener("mouseleave", () =>
            ring.classList.remove("hovering"),
        );
    });

    // Click shrink
    document.addEventListener("mousedown", () =>
        ring.classList.add("clicking"),
    );
    document.addEventListener("mouseup", () =>
        ring.classList.remove("clicking"),
    );

    // Hide when leaving viewport
    document.addEventListener("mouseleave", () => {
        ring.style.opacity = "0";
        dot.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
        ring.style.opacity = "";
        dot.style.opacity = "";
    });
}

// ---------- Magnetic Buttons ----------
function initMagneticButtons() {
    if (window.matchMedia("(hover: none)").matches) return;

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn) => {
        btn.classList.add("btn-magnetic");

        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "";
        });
    });
}

// ---------- Bento Card Spotlight ----------
function initBentoSpotlight() {
    if (window.matchMedia("(hover: none)").matches) return;

    const cards = document.querySelectorAll(".bento-card");
    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--spot-x", x + "px");
            card.style.setProperty("--spot-y", y + "px");
            // Move the ::before pseudo-element via CSS custom props
            card.style.cssText += `;--spot-x:${x}px;--spot-y:${y}px;`;
        });
    });

    // Inject a tiny style that uses the custom properties
    const style = document.createElement("style");
    style.textContent = `
        .bento-card::before {
            left: var(--spot-x, 50%);
            top: var(--spot-y, 50%);
        }
    `;
    document.head.appendChild(style);
}

// ---------- Hero Parallax ----------
function initHeroParallax() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const left = document.querySelector(".hero-sketch-left");
    const right = document.querySelector(".hero-sketch-right");
    if (!left || !right) return;

    // Mouse-based parallax
    if (!window.matchMedia("(hover: none)").matches) {
        document.addEventListener("mousemove", (e) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = (e.clientX - cx) / cx; // -1 to 1
            const dy = (e.clientY - cy) / cy;

            left.style.transform = `translate(${dx * -12}px, ${dy * -8}px) rotate(${dx * -2}deg)`;
            right.style.transform = `translate(${dx * 12}px, ${dy * -8}px) rotate(${dx * 2}deg)`;
        });
    }

    // Scroll-based parallax
    window.addEventListener(
        "scroll",
        () => {
            const scrollY = window.scrollY;
            if (scrollY > window.innerHeight) return; // only in hero

            const factor = scrollY * 0.15;
            left.style.setProperty("--scroll-y", factor + "px");
            right.style.setProperty("--scroll-y", -factor + "px");

            // Combine with any existing mouse transforms
            const currentLeft = left.style.transform || "";
            const currentRight = right.style.transform || "";

            if (!currentLeft.includes("translateY")) {
                left.style.transform += ` translateY(${factor}px)`;
                right.style.transform += ` translateY(${factor * 0.6}px)`;
            }
        },
        { passive: true },
    );
}

// ---------- Pill Ripple Effect ----------
function initPillRipple() {
    document.addEventListener("click", (e) => {
        const pill = e.target.closest(".bento-pill");
        if (!pill) return;

        // Remove old ripples
        const old = pill.querySelector(".pill-ripple");
        if (old) old.remove();

        const rect = pill.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.classList.add("pill-ripple");

        const size = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = size + "px";
        ripple.style.height = size + "px";
        ripple.style.left = e.clientX - rect.left - size / 2 + "px";
        ripple.style.top = e.clientY - rect.top - size / 2 + "px";

        pill.appendChild(ripple);
        ripple.addEventListener("animationend", () => ripple.remove());
    });
}

// ---------- Nav Link Ink Ripple ----------
function initNavRipples() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        // Inject ripple element if not present
        if (!link.querySelector(".link-ripple")) {
            const ripple = document.createElement("span");
            ripple.classList.add("link-ripple");
            link.appendChild(ripple);
        }
    });
}

// ---------- Live CP Stats Fetching ----------
function initLiveCPStats() {
    const statEls = document.querySelectorAll(".bento-stat");
    if (statEls.length === 0) return;

    // Map stat sub-labels to their elements
    const statMap = {};
    statEls.forEach((el) => {
        const sub = el.querySelector(".bento-stat-sub");
        if (sub) {
            statMap[sub.textContent.trim().toLowerCase()] =
                el.querySelector(".bento-stat-num");
        }
    });

    // Fetch LeetCode rating
    fetch("https://alfa-leetcode-api.onrender.com/Meet11_/contest")
        .then((r) => r.json())
        .then((data) => {
            if (data.contestRating && statMap["leetcode"]) {
                const rating = Math.round(data.contestRating);
                const el = statMap["leetcode"];
                el.innerHTML =
                    rating + '<span class="bento-stat-plus">+</span>';
            }
        })
        .catch(() => {}); // Fail silently, keep static fallback

    // Fetch Codeforces rank
    fetch("https://codeforces.com/api/user.info?handles=meet_11")
        .then((r) => r.json())
        .then((data) => {
            if (
                data.status === "OK" &&
                data.result[0] &&
                statMap["codeforces"]
            ) {
                const user = data.result[0];
                const rank =
                    user.rank.charAt(0).toUpperCase() + user.rank.slice(1);
                statMap["codeforces"].textContent = rank;
            }
        })
        .catch(() => {});

    // Fetch CodeChef (scrape from profile page via proxy)
    fetch("https://codechef-api.vercel.app/handle/meetrix")
        .then((r) => {
            if (!r.ok) throw new Error("CodeChef API down");
            return r.json();
        })
        .then((data) => {
            if (data.currentRating && statMap["codechef"]) {
                const stars = data.stars || "★★★";
                statMap["codechef"].textContent = stars;
            }
        })
        .catch(() => {}); // Keep static ★★★ fallback
}
