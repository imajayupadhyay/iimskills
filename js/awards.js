// Awards Page JavaScript

// ================================
// Smooth Scroll to Grid
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Add scroll reveal animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all award cards
    const awardsCards = document.querySelectorAll('.awards-card');
    awardsCards.forEach(card => {
        observer.observe(card);
    });

    // ================================
    // Card Interaction Effects
    // ================================

    awardsCards.forEach(card => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ================================
    // Read More Link Animation
    // ================================

    const readMoreLinks = document.querySelectorAll('.awards-card-link');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('awards-ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Simulate navigation (you can replace with actual navigation)
            console.log('Navigating to article...');
        });
    });

    // ================================
    // Counter Animation for Stats (if needed)
    // ================================

    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const counter = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = Math.floor(target);
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // ================================
    // Lazy Loading Images
    // ================================

    const lazyImages = document.querySelectorAll('.awards-media-logo');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading class
                img.classList.add('awards-loading');
                
                // When image loads
                img.addEventListener('load', function() {
                    img.classList.remove('awards-loading');
                    img.classList.add('awards-loaded');
                });
                
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ================================
    // Filter Functionality (Optional)
    // ================================

    // You can add filter buttons later if needed
    const filterButtons = document.querySelectorAll('.awards-filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                awardsCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ================================
    // Search Functionality (Optional)
    // ================================

    const searchInput = document.getElementById('awards-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            awardsCards.forEach(card => {
                const title = card.querySelector('.awards-card-title').textContent.toLowerCase();
                const description = card.querySelector('.awards-card-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    }

    // ================================
    // Hero Section Animation
    // ================================

    const heroContent = document.querySelector('.awards-hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // ================================
    // Parallax Effect for Hero - DISABLED
    // ================================

    // Parallax effect removed to prevent scrolling issues

    // ================================
    // Add Loading State
    // ================================

    window.addEventListener('load', function() {
        document.body.classList.add('awards-loaded');
    });

});

// ================================
// Add CSS for Ripple Effect
// ================================

const style = document.createElement('style');
style.textContent = `
    .awards-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(102, 126, 234, 0.3);
        width: 20px;
        height: 20px;
        animation: awards-ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes awards-ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .awards-loading {
        opacity: 0.5;
        filter: blur(2px);
    }
    
    .awards-loaded {
        transition: opacity 0.3s ease, filter 0.3s ease;
    }
    
    body:not(.awards-loaded) .awards-hero-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(style);

// ================================
// Console Message
// ================================

console.log('%c🏆 Awards Page Loaded Successfully!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cIIM SKILLS - Excellence in Education', 'color: #764ba2; font-size: 12px;');
