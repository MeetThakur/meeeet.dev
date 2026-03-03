// ============================================================
// ANIME PAPER PORTFOLIO — main.js
// All interactive animations, scroll effects, and UI logic
// ============================================================

import anime from 'animejs/lib/anime.es.js';

// ---------- DOM Ready ----------
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavigation();
    initScrollProgress();
    initScrollAnimations();
    initTypingEffect();
    initSVGDrawing();
    initSkillBars();
    initStatCounters();
    initContactForm();
    initCherryBlossomPetals();
    initInkCanvas();
    initTiltCards();
    initFooterYear();
    initSmoothScroll();
});

// ---------- Page Loader / Intro Animation ----------
function initLoader() {
    // Animate hero elements on page load
    const heroElements = document.querySelectorAll('.hero .anim-fade-up');

    // Slight delay to let fonts load
    setTimeout(() => {
        heroElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 150 + 200);
        });
    }, 300);
}

// ---------- Navigation ----------
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScroll = 0;

    // Scroll behavior
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Update active nav link
        updateActiveNavLink();
        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ---------- Scroll Progress ----------
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / docHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    }, { passive: true });
}

// ---------- Scroll Reveal Animations ----------
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve so re-entering view re-triggers?
                // Actually for portfolio, animate once is cleaner:
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements (except hero ones which are triggered by loader)
    const animatedElements = document.querySelectorAll(
        '.about .anim-fade-up, .about .anim-reveal, ' +
        '.work .anim-fade-up, .work .anim-reveal, ' +
        '.skills .anim-fade-up, .skills .anim-reveal, ' +
        '.contact .anim-fade-up, .contact .anim-reveal'
    );

    animatedElements.forEach(el => observer.observe(el));
}

// ---------- Typing Effect ----------
function initTypingEffect() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;

    const strings = [
        'Creative Developer',
        'UI/UX Designer',
        'Manga Enthusiast',
        'Frontend Engineer',
        'Digital Craftsman'
    ];

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentString = strings[stringIndex];

        if (!isDeleting) {
            typedElement.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentString.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else {
                typingSpeed = 80 + Math.random() * 60; // Natural typing speed
            }
        } else {
            typedElement.textContent = currentString.substring(0, charIndex - 1);
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
    const drawPaths = document.querySelectorAll('.draw-path');

    // Measure and set the correct dasharray/dashoffset for each path
    drawPaths.forEach(path => {
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
    const svgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const paths = entry.target.querySelectorAll('.draw-path');
                paths.forEach((path, i) => {
                    setTimeout(() => {
                        anime({
                            targets: path,
                            strokeDashoffset: [anime.setDashoffset, 0],
                            easing: 'easeInOutSine',
                            duration: 1500,
                            delay: i * 200,
                        });
                    }, 100);
                });
                svgObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe containers that hold SVG drawings
    const svgContainers = document.querySelectorAll(
        '.sketch-deco, .portrait-placeholder, .project-sketch, .contact-crane'
    );
    svgContainers.forEach(container => svgObserver.observe(container));
}

// ---------- Skill Bars Animation ----------
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const level = item.getAttribute('data-level');
                const fill = item.querySelector('.skill-bar-fill');

                setTimeout(() => {
                    fill.style.width = `${level}%`;
                    item.classList.add('animated');
                }, 200);

                skillObserver.unobserve(item);
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => skillObserver.observe(item));
}

// ---------- Stat Counter Animation ----------
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));

                anime({
                    targets: el,
                    innerHTML: [0, target],
                    easing: 'easeOutExpo',
                    round: 1,
                    duration: 2000,
                });

                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
}

// ---------- Contact Form ----------
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('span').textContent;

        // Simulate sending
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.classList.add('sent');
            submitBtn.querySelector('span').textContent = 'Sent!';

            // Create a little burst animation
            createInkBurst(submitBtn);

            // Reset after delay
            setTimeout(() => {
                submitBtn.classList.remove('sent');
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
        }, 1200);
    });
}

function createInkBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
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
            easing: 'easeOutExpo',
            duration: 800,
            delay: i * 50,
            complete: () => particle.remove(),
        });
    }
}

// ---------- Cherry Blossom Petals ----------
function initCherryBlossomPetals() {
    const container = document.getElementById('petals-container');
    if (!container) return;

    // Reduce motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const size = 8 + Math.random() * 10;
        const startX = Math.random() * window.innerWidth;
        const rotation = Math.random() * 360;
        const duration = 8000 + Math.random() * 7000;
        const swayAmount = 80 + Math.random() * 100;

        // SVG petal shape
        const hue = Math.random() > 0.5 ? '#d4878f' : '#e8b4b8';
        petal.innerHTML = `
            <svg viewBox="0 0 20 20" width="${size}" height="${size}">
                <ellipse cx="10" cy="10" rx="8" ry="5"
                    fill="${hue}" opacity="0.6"
                    transform="rotate(${rotation} 10 10)"/>
            </svg>
        `;

        petal.style.left = `${startX}px`;
        petal.style.top = '-20px';

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
                { value: 0.7, duration: 1000, easing: 'easeInQuad' },
                { value: 0.7, duration: duration - 3000 },
                { value: 0, duration: 2000, easing: 'easeOutQuad' },
            ],
            easing: 'easeInOutSine',
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
    const canvas = document.getElementById('ink-canvas');
    if (!canvas) return;

    // Reduce motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: -100, y: -100 };
    let animationId;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
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
            ctx.fillStyle = `rgba(44, 44, 44, ${p.alpha})`;
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
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// ---------- Tilt Effect on Cards ----------
function initTiltCards() {
    const cards = document.querySelectorAll('[data-tilt]');

    // Only on desktop
    if (window.matchMedia('(hover: none)').matches) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}

// ---------- Footer Year ----------
function initFooterYear() {
    const yearEl = document.querySelector('.footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// ---------- Smooth Scroll ----------
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            e.preventDefault();

            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPos = targetEl.offsetTop - navHeight;

            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        });
    });
}
