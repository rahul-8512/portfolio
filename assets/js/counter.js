/* -----------------------------------------
   Rahul Kumar Portfolio - Stats Counter
-------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const animationDuration = 2000; // 2 seconds counting duration

    const countUp = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / animationDuration, 1);
            
            // Apply easeOutQuad curve for premium decelerating effect
            const easeProgress = progress * (2 - progress);
            const currentValue = Math.floor(easeProgress * target);
            
            // Format number with commas if large
            if (target >= 1000) {
                counter.textContent = currentValue.toLocaleString();
            } else {
                counter.textContent = currentValue;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                counter.textContent = target >= 1000 ? target.toLocaleString() : target;
            }
        };

        window.requestAnimationFrame(step);
    };

    // Set up observer
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.classList.add('animate-stat');
                
                const counterElement = card.querySelector('.counter');
                if (counterElement) {
                    countUp(counterElement);
                }
                
                // Stop observing once animation triggers
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => statsObserver.observe(card));
});
