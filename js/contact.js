// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const floatingChatBtn = document.getElementById('floatingChat');

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Show loading state
            const submitBtn = this.querySelector('.contact-submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                console.log('Form submitted:', formData);
                
                // Show success message
                alert('Thank you for contacting us! We will get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 1500);
        });
    }

    // Floating Chat Button
    if (floatingChatBtn) {
        floatingChatBtn.addEventListener('click', function() {
            // You can integrate with your chat system here
            alert('Chat feature coming soon! For now, please use the contact form or call us directly.');
            
            // Or redirect to contact form
            // const contactFormSection = document.querySelector('.contact-form-section');
            // if (contactFormSection) {
            //     contactFormSection.scrollIntoView({ behavior: 'smooth' });
            // }
        });

        // Hide chat button when scrolling past footer
        const footer = document.querySelector('.footer');
        if (footer) {
            window.addEventListener('scroll', function() {
                const footerTop = footer.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (footerTop < windowHeight + 100) {
                    floatingChatBtn.style.opacity = '0';
                    floatingChatBtn.style.pointerEvents = 'none';
                } else {
                    floatingChatBtn.style.opacity = '1';
                    floatingChatBtn.style.pointerEvents = 'auto';
                }
            });
        }
    }

    // Phone Number Validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remove non-numeric characters
            let value = e.target.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            
            e.target.value = value;
        });

        phoneInput.addEventListener('blur', function(e) {
            const value = e.target.value;
            if (value.length > 0 && value.length < 10) {
                e.target.setCustomValidity('Please enter a valid 10-digit phone number');
                e.target.reportValidity();
            } else {
                e.target.setCustomValidity('');
            }
        });
    }

    // Email Validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function(e) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (e.target.value && !emailPattern.test(e.target.value)) {
                e.target.setCustomValidity('Please enter a valid email address');
                e.target.reportValidity();
            } else {
                e.target.setCustomValidity('');
            }
        });
    }

    // Form Input Animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Info Card Hover Effect Enhancement
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe form and info cards
    const animateElements = document.querySelectorAll('.contact-form-wrapper, .info-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Copy to clipboard functionality for contact info
    const infoTexts = document.querySelectorAll('.info-text');
    infoTexts.forEach(text => {
        text.style.cursor = 'pointer';
        text.title = 'Click to copy';
        
        text.addEventListener('click', function() {
            const textContent = this.textContent.trim();
            navigator.clipboard.writeText(textContent).then(() => {
                // Show temporary feedback
                const originalText = this.textContent;
                this.textContent = '✓ Copied!';
                this.style.color = '#4CAF50';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text:', err);
            });
        });
    });
});
