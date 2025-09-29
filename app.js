// Palaniappa Electronics - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Palaniappa Electronics web app loaded.');
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }
    
    // Hero Slider Functionality - Auto Scroll Implementation
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const progressBar = document.querySelector('.progress-bar');
    const totalSlides = slides.length;
    
    // Different timing for each slide
    const slideTiming = [15000, 5000, 5000, 5000]; // 15s for first slide, 5s for others
    
    let slideTimer;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate dot
        if (slides[index] && dots[index]) {
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }
        
        // Reset and start progress bar animation with current slide timing
        const currentTiming = slideTiming[index] || 5000;
        if (progressBar) {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            
            setTimeout(() => {
                progressBar.style.transition = `width ${currentTiming}ms linear`;
                progressBar.style.width = '100%';
            }, 50);
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
        console.log('Auto-scrolled to slide:', currentSlide + 1, `- Duration: ${slideTiming[currentSlide]}ms`); // Debug log
    }
    
    function startSlideshow() {
        console.log('Starting auto-slideshow...'); // Debug log
        const currentTiming = slideTiming[currentSlide] || 5000;
        slideTimer = setTimeout(() => {
            nextSlide();
            startSlideshow(); // Recursively call to use different timing for each slide
        }, currentTiming);
    }
    
    function stopSlideshow() {
        console.log('Stopping slideshow...'); // Debug log
        if (slideTimer) {
            clearTimeout(slideTimer);
            slideTimer = null;
        }
    }
    
    function restartSlideshow() {
        stopSlideshow();
        startSlideshow();
    }
    
    // Dot click functionality
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            console.log('Dot clicked:', index + 1); // Debug log
            currentSlide = index;
            showSlide(currentSlide);
            restartSlideshow();
        });
    });
    
    // Pause on hover for desktop only
    const heroSection = document.querySelector('.pj-hero');
    if (heroSection && window.innerWidth > 1024) {
        heroSection.addEventListener('mouseenter', () => {
            console.log('Hero hovered - pausing slideshow'); // Debug log
            stopSlideshow();
        });
        
        heroSection.addEventListener('mouseleave', () => {
            console.log('Hero unhovered - resuming slideshow'); // Debug log
            startSlideshow();
        });
    }
    
    // Initialize slideshow
    if (slides.length > 0) {
        console.log(`Initializing slideshow with ${slides.length} slides`); // Debug log
        showSlide(0);
        
        // Start auto-scroll after a short delay
        setTimeout(() => {
            startSlideshow();
        }, 1000);
    }
    
    // File upload functionality
    const fileInput = document.getElementById('cv-upload');
    const fileStatus = document.querySelector('.file-upload-status');
    
    if (fileInput && fileStatus) {
        fileInput.addEventListener('change', function(e) {
            const fileName = e.target.files[0] ? e.target.files[0].name : 'No file selected.';
            fileStatus.textContent = fileName;
        });
    }
    
    // Animated counters and progress circles
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const progressCircles = document.querySelectorAll('.progress-circle');
        const statCircles = document.querySelectorAll('.stat-circle');
        
        counters.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 30);
        });
        
        // Animate progress circles
        progressCircles.forEach((circle, index) => {
            const statCircle = statCircles[index];
            if (statCircle) {
                const percentage = parseInt(statCircle.getAttribute('data-percentage'));
                const circumference = 2 * Math.PI * 65; // radius = 65
                const offset = circumference - (percentage / 100) * circumference;
                
                setTimeout(() => {
                    circle.style.strokeDashoffset = offset;
                }, 500 + (index * 200));
            }
        });
    }
    
    // Intersection Observer for triggering animation when section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    const statsSection = document.querySelector('.pj-subtopics');
    if (statsSection) {
        observer.observe(statsSection);
    }
});
