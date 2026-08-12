/* -----------------------------------------
   Rahul Kumar Portfolio - Typewriter Effect
-------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const words = [
        "Python Backend Engineer",
        "Django Developer",
        "API Architect",
        "Linux Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            // Add character
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentWord.length) {
            // Word complete, wait before deleting
            typingSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word deleted, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Short pause before typing next
        }

        setTimeout(type, typingSpeed);
    };

    // Initialize typewriter
    setTimeout(type, 1000);
});
