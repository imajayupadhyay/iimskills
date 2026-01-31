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

// ========================================
// Curriculum Module Accordion
// ========================================
const moduleItems = document.querySelectorAll('.module-item');
const expandAllBtn = document.getElementById('expandAll');
const collapseAllBtn = document.getElementById('collapseAll');

// Toggle individual module
moduleItems.forEach(item => {
    const header = item.querySelector('.module-header');

    header.addEventListener('click', () => {
        // Close other modules (optional - remove if you want multiple open)
        // moduleItems.forEach(otherItem => {
        //     if (otherItem !== item) {
        //         otherItem.classList.remove('active');
        //     }
        // });

        // Toggle current module
        item.classList.toggle('active');
    });
});

// Expand All
if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
        moduleItems.forEach(item => {
            item.classList.add('active');
        });
    });
}

// Collapse All
if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
        moduleItems.forEach(item => {
            item.classList.remove('active');
        });
    });
}

// ========================================
// Alumni Testimonials Video Player
// ========================================
const alumniVideo = document.getElementById('alumniVideo');
const videoOverlay = document.getElementById('videoOverlay');
const playBtn = document.getElementById('playBtn');
const alumniCards = document.querySelectorAll('.alumni-card');

// Alumni data
const alumniData = {
    1: {
        name: 'Gunifsa',
        company: 'Honeywell',
        role: 'Digital Marketer',
        quote: '"Thankful for the real-time practical exposure and full support from the team."',
        testimonial: 'Firstly, I would like to thank my counsellor, Chandi Ma\'am, who helped me throughout the enrollment process and made it so easy for me. I would also like to thank the faculty who made sure that I would not miss anything and rearranged classes for me because taking online classes can be sometimes challenging. They also gave real-time practical exposure. I took the digital marketing and AI course, and it was the best decision I have ever taken.',
        video: 'videos/iimskills-video-1.mp4',
        poster: 'images/success-story2-thumbnail.png'
    },
    2: {
        name: 'Anvi',
        company: 'Fractal',
        role: 'Marketing Specialist',
        quote: '"All thanks to the faculty, in-depth training, and internship, I have my portfolio ready."',
        testimonial: 'The comprehensive curriculum and hands-on projects helped me build a strong portfolio. The internship experience was invaluable, giving me real-world exposure to digital marketing campaigns. The faculty were always supportive and available to clarify doubts. I highly recommend IIM Skills to anyone looking to start their career in digital marketing.',
        video: 'videos/iimskills-video-1.mp4',
        poster: 'images/success-story2-thumbnail.png'
    },
    3: {
        name: 'Kaushal',
        company: 'Accenture',
        role: 'Digital Marketing Analyst',
        quote: '"The course was of great help, and I got to learn about various marketing skills."',
        testimonial: 'I was looking for a course that could provide me with comprehensive knowledge of digital marketing, and IIM Skills exceeded my expectations. The modules covered everything from SEO to social media marketing, and the live projects helped me understand how to apply these skills in real scenarios. Thanks to this course, I landed my dream job at Accenture.',
        video: 'videos/iimskills-video-1.mp4',
        poster: 'images/success-story2-thumbnail.png'
    },
    4: {
        name: 'Varun Joshi',
        company: 'MNS',
        role: 'Freelance Marketer',
        quote: '"The best course with a practical nature, and it helped me get a client."',
        testimonial: 'What sets IIM Skills apart is the practical approach to learning. The course not only taught me the theory but also how to implement strategies that work. During the course itself, I was able to land my first freelance client using the skills I learned. The support from mentors and the community has been phenomenal.',
        video: 'videos/iimskills-video-1.mp4',
        poster: 'images/success-story2-thumbnail.png'
    }
};

// Video play/pause functionality
if (playBtn && alumniVideo && videoOverlay) {
    playBtn.addEventListener('click', () => {
        alumniVideo.play();
        videoOverlay.classList.add('hidden');
    });

    // Show overlay when video ends
    alumniVideo.addEventListener('ended', () => {
        videoOverlay.classList.remove('hidden');
    });

    // Show overlay when video is paused
    alumniVideo.addEventListener('pause', () => {
        if (!alumniVideo.ended) {
            videoOverlay.classList.remove('hidden');
        }
    });

    // Click on video to pause
    alumniVideo.addEventListener('click', () => {
        if (!alumniVideo.paused) {
            alumniVideo.pause();
        }
    });
}

// Alumni card click handler
alumniCards.forEach(card => {
    card.addEventListener('click', () => {
        const alumniId = card.getAttribute('data-alumni');
        const data = alumniData[alumniId];

        if (data) {
            // Update active card
            alumniCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            // Reset and update video
            if (alumniVideo) {
                alumniVideo.pause();
                alumniVideo.src = data.video;
                alumniVideo.poster = data.poster;
                alumniVideo.load();
                videoOverlay.classList.remove('hidden');
            }

            // Update video info
            const videoName = document.querySelector('.video-name');
            const videoRole = document.querySelector('.video-role');
            const videoCompany = document.querySelector('.video-company');

            if (videoName) videoName.textContent = data.name;
            if (videoRole) videoRole.textContent = data.role;
            if (videoCompany) videoCompany.textContent = '@ ' + data.company;

            // Update details section
            const detailName = document.getElementById('detailName');
            const detailCompany = document.getElementById('detailCompany');
            const detailQuote = document.getElementById('detailQuote');
            const detailTestimonial = document.getElementById('detailTestimonial');

            if (detailName) detailName.textContent = data.name;
            if (detailCompany) detailCompany.textContent = data.company;
            if (detailQuote) detailQuote.textContent = data.quote;
            if (detailTestimonial) detailTestimonial.textContent = data.testimonial;
        }
    });
});
