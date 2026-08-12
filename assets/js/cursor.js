/* -----------------------------------------
   Rahul Kumar Portfolio - Custom Cursor
-------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');

    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice || !dot || !outline) {
        if (dot) dot.style.display = 'none';
        if (outline) outline.style.display = 'none';
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Show cursor on first mouse movement
    let hasMoved = false;

    document.addEventListener('mousemove', (e) => {
        if (!hasMoved) {
            dot.style.opacity = '1';
            outline.style.opacity = '1';
            hasMoved = true;
        }

        mouseX = e.clientX;
        mouseY = e.clientY;

        // Position inner dot instantly
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Animate outer ring with a slight lag for high fidelity feel
    const animateOutline = () => {
        // Linear interpolation formula: current + (target - current) * factor
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;
        
        requestAnimationFrame(animateOutline);
    };
    requestAnimationFrame(animateOutline);

    // Active scale effects on hover
    const hoverElements = 'a, button, .clickable, .stat-card, .skill-card, .project-card, .api-route-btn, textarea, input[type="text"], input[type="email"]';
    
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverElements)) {
            document.body.classList.add('cursor-active');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverElements)) {
            document.body.classList.remove('cursor-active');
        }
    });

    // Fade out cursor when mouse leaves the viewport
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        outline.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        if (hasMoved) {
            dot.style.opacity = '1';
            outline.style.opacity = '1';
        }
    });
});
