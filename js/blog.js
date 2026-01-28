// Blog Page JavaScript

// Category Slider Navigation
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('categoriesSlider');
    const prevBtn = document.getElementById('categoryPrev');
    const nextBtn = document.getElementById('categoryNext');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const loadMoreBtn = document.querySelector('.btn-load-more');

    // Check if elements exist
    if (!slider || !prevBtn || !nextBtn) return;

    // Scroll amount for category slider
    const scrollAmount = 300;

    // Previous button click
    prevBtn.addEventListener('click', function() {
        slider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Next button click
    nextBtn.addEventListener('click', function() {
        slider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Check scroll position and update button states
    function updateScrollButtons() {
        const isAtStart = slider.scrollLeft <= 0;
        const isAtEnd = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 1;

        prevBtn.disabled = isAtStart;
        nextBtn.disabled = isAtEnd;
    }

    // Initial check
    updateScrollButtons();

    // Update on scroll
    slider.addEventListener('scroll', updateScrollButtons);

    // Update on window resize
    window.addEventListener('resize', updateScrollButtons);

    // Category Filter Functionality
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');

            // Get selected category
            const selectedCategory = this.getAttribute('data-category');

            // Filter blog cards
            filterBlogCards(selectedCategory);
        });
    });

    // Function to filter blog cards
    function filterBlogCards(category) {
        let visibleCount = 0;

        blogCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            // Show all if 'all' is selected
            if (category === 'all') {
                card.style.display = 'block';
                // Fade in animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, visibleCount * 50);
                visibleCount++;
            } 
            // Show only matching categories
            else if (cardCategory === category) {
                card.style.display = 'block';
                // Fade in animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, visibleCount * 50);
                visibleCount++;
            } 
            // Hide non-matching cards
            else {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Show message if no cards found
        const gridContainer = document.querySelector('.blog-grid-container');
        let noResultsMsg = document.getElementById('noResultsMessage');
        
        if (visibleCount === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'noResultsMessage';
                noResultsMsg.style.gridColumn = '1 / -1';
                noResultsMsg.style.textAlign = 'center';
                noResultsMsg.style.padding = '60px 20px';
                noResultsMsg.style.fontSize = '18px';
                noResultsMsg.style.color = '#666';
                noResultsMsg.innerHTML = `
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5" style="margin-bottom: 20px;">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4M12 16h.01"/>
                    </svg>
                    <p style="margin: 0; font-weight: 600; color: #333;">No articles found</p>
                    <p style="margin: 10px 0 0; font-size: 15px;">Try selecting a different category</p>
                `;
                gridContainer.appendChild(noResultsMsg);
            }
            noResultsMsg.style.display = 'block';
        } else {
            if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        }

        // Update load more button visibility
        const loadMoreWrapper = document.querySelector('.load-more-wrapper');
        if (loadMoreWrapper) {
            if (visibleCount === 0) {
                loadMoreWrapper.style.display = 'none';
            } else {
                loadMoreWrapper.style.display = 'block';
            }
        }

        console.log(`Filtered by: ${category}, Visible cards: ${visibleCount}`);
    }

    // Load More Button Functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;

            // Simulate loading (in production, this would fetch more articles from backend)
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                
                // Show success message or load more cards
                console.log('Loading more articles...');
                
                // Scroll to newly loaded content
                // window.scrollBy({
                //     top: 400,
                //     behavior: 'smooth'
                // });
            }, 1000);
        });
    }

    // Smooth scroll for anchor links
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

    // Blog Card Click Handler
    blogCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link
            if (e.target.tagName === 'A') return;
            
            // In production, this would navigate to the blog detail page
            console.log('Blog card clicked');
            // window.location.href = 'blog-detail.html?id=' + cardId;
        });
    });

    // Add keyboard navigation for category slider
    slider.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextBtn.click();
        }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left
                nextBtn.click();
            } else {
                // Swiped right
                prevBtn.click();
            }
        }
    }

    // Auto-hide category buttons that overflow on mobile
    function adjustCategoryDisplay() {
        if (window.innerWidth < 768) {
            // On mobile, ensure smooth scrolling is enabled
            slider.style.overflowX = 'auto';
        }
    }

    adjustCategoryDisplay();
    window.addEventListener('resize', adjustCategoryDisplay);
});
