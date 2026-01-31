// ========================================
// Course Detail Page JavaScript
// ========================================

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
