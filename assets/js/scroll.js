/* -----------------------------------------
   Rahul Kumar Portfolio - Scroll Interactions
-------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar and Back-To-Top Toggle
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Progress percentage
        if (scrollProgress && scrollHeight > 0) {
            const progress = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollTop > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial check

    // Back to top click event
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 2. Intersection Observer for Scroll Reveals
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Highlight Active Navigation on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-sec') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3, // Match when 30% of the section is visible
        rootMargin: '-80px 0px -40% 0px' // Adjust for sticky navbar
    });

    sections.forEach(sec => activeNavObserver.observe(sec));
});
