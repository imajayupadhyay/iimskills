// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close menu when clicking on a nav link (mobile) - except mega menu items
const navLinks = document.querySelectorAll('.nav-item:not(.has-mega-menu) a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
});

// Mega Menu Toggle for Mobile (Click) and Desktop (Hover)
const megaMenuItems = document.querySelectorAll('.nav-item.has-mega-menu');

megaMenuItems.forEach(item => {
    const link = item.querySelector('a');
    const megaMenu = item.querySelector('.mega-menu');
    
    if (link && megaMenu) {
        // Click handler for mobile
        link.addEventListener('click', function(e) {
            // Only prevent default and toggle on mobile
            if (window.innerWidth <= 900) {
                e.preventDefault();
                
                // Close other mega menus
                megaMenuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('mega-menu-active');
                    }
                });
                
                // Toggle current mega menu
                item.classList.toggle('mega-menu-active');
            }
        });
    }
});

// Handle window resize - remove active states when switching to desktop
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (window.innerWidth > 900) {
            megaMenuItems.forEach(item => {
                item.classList.remove('mega-menu-active');
            });
        }
    }, 250);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }
});

// Video Play on Hover for Story Cards
const storyCards = document.querySelectorAll('.story-card');

storyCards.forEach(card => {
    const video = card.querySelector('.card-video');
    const thumbnail = card.querySelector('.card-thumbnail');

    if (video) {
        card.addEventListener('mouseenter', () => {
            thumbnail.style.display = 'none';
            video.style.opacity = '1';
            video.muted = false;
            video.currentTime = 0;
            video.play().catch(err => console.log('Video play error:', err));
        });

        card.addEventListener('mouseleave', () => {
            video.pause();
            video.muted = true;
            video.currentTime = 0;
            video.style.opacity = '0';
            thumbnail.style.display = 'block';
        });
    }
});

// Tabs Functionality for Popular Courses
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');

        // Remove active class from all buttons and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button and corresponding panel
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Draggable Demo Slider
const demoSlider = document.querySelector('.demo-marquee-wrapper');
const demoTrack = document.querySelector('.demo-marquee-track');

if (demoSlider && demoTrack) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse Events
    demoSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        demoSlider.classList.add('dragging');
        startX = e.pageX - demoSlider.offsetLeft;
        scrollLeft = demoSlider.scrollLeft;
    });

    demoSlider.addEventListener('mouseleave', () => {
        isDown = false;
        demoSlider.classList.remove('dragging');
    });

    demoSlider.addEventListener('mouseup', () => {
        isDown = false;
        demoSlider.classList.remove('dragging');
    });

    demoSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - demoSlider.offsetLeft;
        const walk = (x - startX) * 2;
        demoSlider.scrollLeft = scrollLeft - walk;
    });

    // Touch Events for Mobile
    demoSlider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - demoSlider.offsetLeft;
        scrollLeft = demoSlider.scrollLeft;
    });

    demoSlider.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - demoSlider.offsetLeft;
        const walk = (x - startX) * 2;
        demoSlider.scrollLeft = scrollLeft - walk;
    });

    // Navigation Arrows
    const prevBtn = document.querySelector('.demo-nav-prev');
    const nextBtn = document.querySelector('.demo-nav-next');
    const cardWidth = 390; // card width + gap

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            demoSlider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            demoSlider.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
    }
}
