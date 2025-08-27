// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with responsive settings
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        mirror: false,
        disable: function() {
            return window.innerWidth < 576; // Disable animations on very small screens
        }
    });
    
    // Implement lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const parent = img.parentElement;
                    
                    // Add loading class
                    if (parent.classList.contains('project-img')) {
                        parent.classList.add('loading');
                    }
                    
                    // Load the image
                    img.src = img.dataset.src;
                    
                    img.onload = function() {
                        img.removeAttribute('data-src');
                        if (parent.classList.contains('loading')) {
                            parent.classList.remove('loading');
                        }
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // Handle responsive images
    function handleResponsiveImages() {
        const projectImages = document.querySelectorAll('.project-img img');
        projectImages.forEach(img => {
            if (img.complete) {
                img.parentElement.classList.remove('loading');
            } else {
                img.parentElement.classList.add('loading');
                img.onload = function() {
                    img.parentElement.classList.remove('loading');
                };
            }
        });
    }
    
    // Call on page load
    handleResponsiveImages();
    
    // Call on window resize
    window.addEventListener('resize', handleResponsiveImages);
    
    // Typing Animation
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    const textArray = ['Software Engineer', 'React Developer', 'UI/UX Designer', 'Full Stack Developer', 'SIH 2024 Finalist'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function() {
        // Add scrolled class to navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });

        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Mobile Menu Toggle with improved functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    // Function to toggle menu state
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        if (navOverlay) {
            navOverlay.classList.toggle('active');
        }
        
        // Prevent body scrolling when menu is open
        if (navLinksContainer.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            if (navLinksContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const isMenuToggle = e.target.closest('.menu-toggle');
        const isNavLinks = e.target.closest('.nav-links');
        
        if (!isMenuToggle && !isNavLinks && navLinksContainer.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinksContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Close menu on escape key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Projects Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Form Submission with Formspree
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm ? contactForm.querySelector('.submit-btn') : null;
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Submit to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success
                    contactForm.reset();
                    submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
                    submitBtn.style.backgroundColor = '#28a745';
                    
                    // Show success message
                    showNotification('Thank you for your message! I will get back to you soon.', 'success');
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                    }, 3000);
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.innerHTML = '<span>Try Again</span><i class="fas fa-exclamation-triangle"></i>';
                submitBtn.style.backgroundColor = '#dc3545';
                
                // Show error message
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            });
        });
    }
    
    // Notification function
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to menu toggle
    menuToggle.addEventListener('click', function() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('animate'));
    });

    // Add CSS for animated bars
    const style = document.createElement('style');
    style.textContent = `
        .menu-toggle.active .bar:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        
        .menu-toggle.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active .bar:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);
    
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Check if touch is supported
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Setup touch event listeners
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        const swipeThreshold = 100; // Minimum distance required for swipe
        const swipeRight = touchEndX - touchStartX > swipeThreshold;
        const swipeLeft = touchStartX - touchEndX > swipeThreshold;
        
        // Swipe right to open menu (from left edge)
        if (swipeRight && touchStartX < 50 && !navLinksContainer.classList.contains('active')) {
            toggleMenu();
        }
        
        // Swipe left to close menu
        if (swipeLeft && navLinksContainer.classList.contains('active')) {
            toggleMenu();
        }
    }
    
    // Handle window resize - close mobile menu if window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinksContainer.classList.contains('active')) {
            toggleMenu();
        }
    });
});