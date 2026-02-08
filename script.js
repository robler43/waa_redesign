/* ============================================
   BLOCKCHAIN SCHOOL CLUB - JAVASCRIPT v2.0
   Interactive features and animations
   Hacker aesthetic enhancements
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initMobileMenu();
    initHeaderScroll();
    initTabs();
    initScrollReveal();
    initShowcaseSlider();
    initFooterPixels();
    initFooterPixels();
    initHeroCharacterFade();
    animateMascotText();
    initCompassNeedle();
    initJoinModal();
});

/* ---------- Join Us / Mint Modal ---------- */
function initJoinModal() {
    const modal = document.getElementById('joinModal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('joinForm');
    const joinBtns = document.querySelectorAll('a[href="#join"]'); // Target all join links
    const gasFeeEl = document.getElementById('gasFee');

    if (!modal) return;

    // Open Modal
    const openModal = (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Close Modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(resetForm, 300); // Reset form after animation
    };

    // Event Listeners for Open
    joinBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Event Listeners for Close
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form Submission (Minting Effect)
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = document.getElementById('mintBtn');
            const btnText = btn.querySelector('.btn-text');
            const btnLoading = btn.querySelector('.btn-loading');
            const successMsg = document.getElementById('modalSuccess');
            const modalBody = document.querySelector('.modal-body');

            // Show Loading
            btn.disabled = true;
            btnText.classList.add('hidden');
            btnLoading.classList.remove('hidden');

            // Simulate Transaction Delay
            setTimeout(() => {
                // Hide Form, Show Success
                modalBody.classList.add('hidden');
                successMsg.classList.remove('hidden');

                // Trigger Confetti or some celebration if wanted
                // For now, simple success message

                // Auto Close after success
                setTimeout(() => {
                    closeModal();
                }, 3000);
            }, 2000);
        });
    }

    function resetForm() {
        if (form) form.reset();
        const btn = document.getElementById('mintBtn');
        const btnText = btn.querySelector('.btn-text');
        const btnLoading = btn.querySelector('.btn-loading');
        const successMsg = document.getElementById('modalSuccess');
        const modalBody = document.querySelector('.modal-body');

        if (btn) {
            btn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
        }

        if (modalBody) modalBody.classList.remove('hidden');
        if (successMsg) successMsg.classList.add('hidden');
    }

    // Gas Fee Ticker removed per user request
}
function animateMascotText() {
    const bubble = document.querySelector('.mascot-bubble');
    if (bubble) {
        const text = bubble.textContent.trim();
        bubble.innerHTML = text.split('').map((char, index) =>
            `<span style="--i:${index}">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
    }
}

/* ---------- Mobile Menu Toggle ---------- */
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

/* ---------- Header Scroll Effect ---------- */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/* ---------- Tabs Functionality ---------- */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (!tabBtns.length || !tabContents.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.tab;

            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and target content
            btn.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/* ---------- Scroll Reveal Animation ---------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    if (!revealElements.length) return;

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = windowHeight - 80;

            if (elementTop < revealPoint) {
                el.classList.add('visible');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll, { passive: true });
}

/* ---------- Product Showcase Slideshow ---------- */
/* ---------- Product Showcase Slideshow ---------- */
function initShowcaseSlider() {
    const track = document.getElementById('showcaseTrack');
    const container = document.querySelector('.showcase-wrapper');
    const prevBtn = document.querySelector('.showcase-nav.prev');
    const nextBtn = document.querySelector('.showcase-nav.next');

    if (!track || !container) return;

    // Scroll amount for each click (card width + gap)
    // Dynamic calculation for responsiveness
    const getScrollAmount = () => {
        const item = track.querySelector('.showcase-item');
        if (!item) return 424; // Fallback

        const itemWidth = item.offsetWidth;
        const gap = parseInt(window.getComputedStyle(track).gap) || 24; // Default to 24px if parsing fails

        return itemWidth + gap;
    };

    const updateArrowVisibility = () => {
        if (!container) return;

        // Tolerance for floating point calculation differences
        const tolerance = 2;
        const reachedEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - tolerance;
        const reachedstart = container.scrollLeft <= tolerance;

        if (prevBtn) {
            prevBtn.style.opacity = reachedstart ? '0' : '1';
            prevBtn.style.pointerEvents = reachedstart ? 'none' : 'all';
        }

        if (nextBtn) {
            nextBtn.style.opacity = reachedEnd ? '0' : '1';
            nextBtn.style.pointerEvents = reachedEnd ? 'none' : 'all';
        }
    };

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            container.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            container.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Update visibility on scroll and resize
        container.addEventListener('scroll', updateArrowVisibility);
        window.addEventListener('resize', updateArrowVisibility);

        // Initial check
        updateArrowVisibility();
    }

    // Make items clickable - add visual feedback
    const items = track.querySelectorAll('.showcase-item');
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            // If the link href is just "#", prevent default
            if (item.getAttribute('href') === '#') {
                e.preventDefault();
                // Visual feedback
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 150);
            }
        });
    });
}

/* ---------- Smooth Scroll for Anchor Links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '#join') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();

            const headerHeight = document.getElementById('header')?.offsetHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ---------- Marquee Pause on Hover ---------- */
const marquee = document.querySelector('.marquee');
if (marquee) {
    const marqueeContents = marquee.querySelectorAll('.marquee-content');

    marquee.addEventListener('mouseenter', () => {
        marqueeContents.forEach(content => {
            content.style.animationPlayState = 'paused';
        });
    });

    marquee.addEventListener('mouseleave', () => {
        marqueeContents.forEach(content => {
            content.style.animationPlayState = 'running';
        });
    });
}

/* ---------- Active Navigation Highlight ---------- */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.getElementById('header')?.offsetHeight || 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

// Initialize active nav highlight
initActiveNavHighlight();

/* ---------- Terminal Typing Effect (for future use) ---------- */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

/* ---------- Glitch Effect Trigger (for future use) ---------- */
function triggerGlitch(element, duration = 500) {
    element.classList.add('glitching');
    setTimeout(() => {
        element.classList.remove('glitching');
    }, duration);
}

/* ---------- Footer Animated Pixel Blocks ---------- */
function initFooterPixels() {
    const container = document.getElementById('footerPixels');
    if (!container) return;

    // Configuration
    const pixelSize = 40; // Larger pixels
    const rows = 4;
    const containerWidth = window.innerWidth;
    const pixelsPerRow = Math.ceil(containerWidth / pixelSize) + 5;

    // Pixel pattern (1 = blue/primary, 0 = transparent/white)
    // Creates a scattered pattern that transitions from white to blue footer
    const patterns = [
        // Row 1 (bottom) - very dense (almost solid)
        () => Math.random() > 0.1 ? 1 : 0,
        // Row 2 (middle) - dense
        () => Math.random() > 0.4 ? 1 : 0,
        // Row 3 (top) - sparse
        () => Math.random() > 0.8 ? 1 : 0,
        // Row 4 (very top) - very sparse (floating pixels)
        () => Math.random() > 0.95 ? 1 : 0
    ];

    // Create pixel rows
    for (let row = 0; row < rows; row++) {
        const rowEl = document.createElement('div');
        rowEl.className = 'pixel-row';
        rowEl.style.cssText = `
            position: absolute;
            bottom: ${row * pixelSize}px;
            left: 0;
            display: flex;
            gap: 0;
        `;

        // Create pixels for this row
        for (let i = 0; i < pixelsPerRow; i++) {
            const type = patterns[row]();

            if (type > 0) {
                const pixel = document.createElement('div');
                pixel.className = 'pixel-block primary';

                // Random animation properties
                const duration = 3 + Math.random() * 3; // Slower: 3s to 6s
                const delay = Math.random() * 3; // 0s to 3s

                pixel.style.cssText = `
                    width: ${pixelSize}px;
                    height: ${pixelSize}px;
                    flex-shrink: 0;
                    animation: pixelBlink ${duration}s ease-in-out infinite;
                    animation-delay: ${delay}s;
                `;

                rowEl.appendChild(pixel);
            } else {
                // Empty space
                const spacer = document.createElement('div');
                spacer.style.cssText = `
                    width: ${pixelSize}px;
                    height: ${pixelSize}px;
                    flex-shrink: 0;
                `;
                rowEl.appendChild(spacer);
            }
        }

        container.appendChild(rowEl);
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Clear and regenerate pixels
            container.innerHTML = '';
            initFooterPixels();
        }, 250);
    }, { passive: true });
}

/* ---------- Hero Character Fade on Scroll ---------- */
function initHeroCharacterFade() {
    const character = document.getElementById('heroCharacter');
    if (!character) return;

    const fadeDistance = 900; // pixels to scroll before fully faded

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - (scrollY / fadeDistance));
        character.style.opacity = opacity;
    }, { passive: true });
}

/* ---------- Stat Counter Animation ---------- */
function initStatCounter() {
    const stats = document.querySelectorAll('.stat-value[data-target]');

    if (!stats.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;

                // Check if already animated to avoid re-running
                if (stat.classList.contains('counted')) return;

                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 1500; // 1.5 seconds
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease In Expo: starts slow, speeds up exponentially
                    const ease = progress === 0 ? 0 : Math.pow(2, 10 * (progress - 1));

                    const current = Math.floor(ease * target);

                    stat.textContent = formatStat(current, stat);

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        stat.textContent = formatStat(target, stat);
                        stat.classList.add('counted');
                    }
                }

                requestAnimationFrame(update);

                // Stop observing once started
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 }); // Start when 50% visible

    stats.forEach(stat => observer.observe(stat));
}

function formatStat(value, element) {
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') || '';
    return `${prefix}${value}${suffix}`;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initStatCounter);

/* ---------- Compass Needle Cursor Tracking ---------- */
function initCompassNeedle() {
    const compassContainer = document.getElementById('compassContainer');
    const compassNeedle = document.getElementById('compassNeedle');
    const compassTopics = document.querySelectorAll('.compass-topic');

    if (!compassContainer || !compassNeedle) return;

    let currentAngle = 0;
    let targetAngle = 0;
    let isAnimating = false;
    let hoveredTopic = null;

    // Cardinal direction angles (from top, clockwise)
    const directionAngles = {
        north: 0,
        east: 90,
        south: 180,
        west: 270
    };

    // Mouse move handler for cursor tracking
    compassContainer.addEventListener('mousemove', (e) => {
        if (hoveredTopic) return; // Don't track cursor if hovering on a topic

        const rect = compassContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate angle from center to mouse
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        // Calculate angle in degrees (0 = top, clockwise)
        let angle = Math.atan2(deltaX, -deltaY) * (180 / Math.PI);

        targetAngle = angle;

        if (!isAnimating) {
            animateNeedle();
        }
    });

    // Mouse leave - return to default position
    compassContainer.addEventListener('mouseleave', () => {
        if (!hoveredTopic) {
            targetAngle = 0; // Return to north
            if (!isAnimating) {
                animateNeedle();
            }
        }
    });

    // Topic hover handlers for magnetic effect and needle color
    compassTopics.forEach(topic => {
        topic.addEventListener('mouseenter', () => {
            hoveredTopic = topic;
            const direction = topic.dataset.direction;

            if (direction && directionAngles.hasOwnProperty(direction)) {
                targetAngle = directionAngles[direction];

                // Add magnetic-active class to the hovered topic
                topic.classList.add('magnetic-active');

                // Update needle color based on direction
                compassNeedle.classList.remove('north', 'east', 'south', 'west');
                compassNeedle.classList.add(direction);

                if (!isAnimating) {
                    animateNeedle();
                }
            }
        });

        topic.addEventListener('mouseleave', () => {
            topic.classList.remove('magnetic-active');
            // Remove needle color class
            compassNeedle.classList.remove('north', 'east', 'south', 'west');
            hoveredTopic = null;
        });
    });

    // Smooth animation function
    function animateNeedle() {
        isAnimating = true;

        // Calculate shortest rotation path
        let diff = targetAngle - currentAngle;

        // Normalize to -180 to 180 range for shortest path
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;

        // Easing factor (higher = faster)
        const easing = 0.12;

        // Apply easing
        currentAngle += diff * easing;

        // Apply rotation to needle
        compassNeedle.style.transform = `rotate(${currentAngle}deg)`;

        // Continue animation if not close enough
        if (Math.abs(diff) > 0.5) {
            requestAnimationFrame(animateNeedle);
        } else {
            currentAngle = targetAngle;
            compassNeedle.style.transform = `rotate(${currentAngle}deg)`;
            isAnimating = false;
        }
    }

    // Add subtle wobble animation when idle
    let idleWobbleInterval;
    let isIdle = true;

    function startIdleWobble() {
        if (idleWobbleInterval) return;

        idleWobbleInterval = setInterval(() => {
            if (isIdle && !hoveredTopic) {
                const wobble = (Math.random() - 0.5) * 8; // Small random wobble
                targetAngle = currentAngle + wobble;
                if (!isAnimating) {
                    animateNeedle();
                }
            }
        }, 2000);
    }

    compassContainer.addEventListener('mouseenter', () => {
        isIdle = false;
        if (idleWobbleInterval) {
            clearInterval(idleWobbleInterval);
            idleWobbleInterval = null;
        }
    });

    compassContainer.addEventListener('mouseleave', () => {
        isIdle = true;
        startIdleWobble();
    });

    // Start idle wobble after initial load
    setTimeout(startIdleWobble, 2000);
}
