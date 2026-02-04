// Initialize cursor system handles
const initCustomCursor = () => {
    // Prevent double initialization
    if (document.querySelector('.custom-cursor-dot')) return;

    // Create cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('custom-cursor-dot');

    const cursorRing = document.createElement('div');
    cursorRing.classList.add('custom-cursor-ring');

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    // Track mouse movement
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update dot position instantly
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

        // Ensure visibility on movement (in case it started off-screen)
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
    });

    // Smooth ring movement loop
    const updateRing = () => {
        // Lerp for smooth trailing
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;

        requestAnimationFrame(updateRing);
    };
    requestAnimationFrame(updateRing);

    // Hover detection logic
    const handleHover = (e) => {
        const target = e.target;

        // Reset classes
        const resetCursor = () => {
            cursorDot.className = 'custom-cursor-dot';
            cursorRing.className = 'custom-cursor-ring';
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
        };

        const clickable = target.closest('a, button, .clickable, .timeline-item, .edu-card, .logo, .nav-link');

        if (clickable) {
            cursorDot.classList.add('hover');
            cursorRing.classList.add('hover');

            // Remove all existing color variants to prevent conflict
            const colors = ['cursor-blue', 'cursor-gold', 'cursor-pink', 'cursor-red'];
            cursorDot.classList.remove(...colors);
            cursorRing.classList.remove(...colors);

            // Detect color context
            if (clickable.classList.contains('experience-blue') || target.closest('.experience-blue')) {
                cursorDot.classList.add('cursor-blue');
                cursorRing.classList.add('cursor-blue');
            } else if (clickable.classList.contains('experience-gold') || target.closest('.experience-gold')) {
                cursorDot.classList.add('cursor-gold');
                cursorRing.classList.add('cursor-gold');
            } else if (clickable.classList.contains('experience-pink') || target.closest('.experience-pink')) {
                cursorDot.classList.add('cursor-pink');
                cursorRing.classList.add('cursor-pink');
            } else if (clickable.classList.contains('experience-red') || target.closest('.experience-red')) {
                cursorDot.classList.add('cursor-red');
                cursorRing.classList.add('cursor-red');
            } else if (target.closest('.edu-card')) {
                cursorDot.classList.add('cursor-blue');
                cursorRing.classList.add('cursor-blue');
            }
        } else {
            resetCursor();
        }
    };

    document.addEventListener('mouseover', handleHover);

    // Handle Active (Click) State
    document.body.addEventListener('mousedown', () => {
        cursorDot.classList.add('active');
        cursorRing.classList.add('active');
    });

    document.body.addEventListener('mouseup', () => {
        cursorDot.classList.remove('active');
        cursorRing.classList.remove('active');
    });
};

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomCursor);
} else {
    initCustomCursor();
}

// Particle System for Comet Background
const createParticles = () => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const createParticle = () => {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random starting position: anywhere on screen
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        // Significant drift distance to make movement obvious
        const driftX = (Math.random() - 0.5) * 600;
        const driftY = (Math.random() - 0.5) * 600;

        // Duration: 15-25 seconds (slightly faster but still smooth)
        const duration = 15 + Math.random() * 10;

        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.setProperty('--drift-x', `${driftX}px`);
        particle.style.setProperty('--drift-y', `${driftY}px`);
        particle.style.animation = `drift ${duration}s linear forwards`;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    };

    // Start with more particles
    for (let i = 0; i < 25; i++) {
        createParticle();
    }

    // Higher frequency: new particle every 800ms to ensure the site feels "live"
    setInterval(createParticle, 800);
};

// Initialize particles
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createParticles);
} else {
    createParticles();
}
