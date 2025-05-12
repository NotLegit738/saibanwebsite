document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    const serviceCards = document.querySelectorAll('.service-card');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Slider functionality
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlider(direction = 'next') {
        if (isAnimating) return;
        isAnimating = true;

        // Remove all transition classes
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });

        // Add appropriate classes based on direction
        if (direction === 'next') {
            slides[currentSlide].classList.add('active');
            if (currentSlide > 0) {
                slides[currentSlide - 1].classList.add('prev');
            }
        } else {
            slides[currentSlide].classList.add('active');
            if (currentSlide < slides.length - 1) {
                slides[currentSlide + 1].classList.add('prev');
            }
        }

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 800); // Match the CSS transition duration
    }

    function goToSlide(index) {
        if (isAnimating || index === currentSlide) return;
        const direction = index > currentSlide ? 'next' : 'prev';
        currentSlide = index;
        updateSlider(direction);
        resetSlideInterval();
    }

    function nextSlide() {
        if (isAnimating) return;
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider('next');
    }

    function prevSlide() {
        if (isAnimating) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider('prev');
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 6000); // Increased to 6 seconds to account for longer transition
    }

    // Event listeners for navigation
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            resetSlideInterval();
        });

        nextButton.addEventListener('click', () => {
            nextSlide();
            resetSlideInterval();
        });
    }

    // Start automatic sliding
    resetSlideInterval();

    // Pause sliding when hovering over the slider
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', resetSlideInterval);
    }

    // Mobile Menu Toggle
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's the services section, also fade in the cards
                if (entry.target.id === 'services') {
                    serviceCards.forEach(card => {
                        card.classList.add('visible');
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}); 