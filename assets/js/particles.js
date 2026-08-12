/* -----------------------------------------
   Rahul Kumar Portfolio - Canvas Particles
   and Mouse Pointer Glow Coordinates Tracker
-------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Global Mouse Coordinates Tracker for Vercel Card Glows
    const root = document.documentElement;
    
    window.addEventListener('mousemove', (e) => {
        // Track absolute cursor coords
        root.style.setProperty('--mouse-x', `${e.clientX}px`);
        root.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // Custom track on hoverable stats cards to get relative positions inside element boundaries
    const setupCardHoverGlow = () => {
        const glowCards = document.querySelectorAll('.stat-card, .glass-card, .skill-card, .project-card, .contact-card');
        
        glowCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    };
    setupCardHoverGlow();
    
    // Watch for dynamic elements rendering (re-apply hover handler if needed)
    window.setupCardHoverGlow = setupCardHoverGlow;

    // 2. Hero Canvas Particles System
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let numberOfParticles = 70;
    
    // Set size
    const resizeCanvas = () => {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        
        // Adjust density based on size
        if (canvas.width < 768) {
            numberOfParticles = 30;
        } else {
            numberOfParticles = 70;
        }
        initParticles();
    };

    // Particle constructor
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off boundaries or wrap
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`; // Cyan tint
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    const initParticles = () => {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    };

    // Animate loop
    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connection lines
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 110) {
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - distance/110)})`; // Blue connections
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();
});
