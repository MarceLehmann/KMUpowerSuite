/**
 * Performance Optimizations
 */

// Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    // Setup IntersectionObserver
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // Observe each image
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// Defer non-critical JavaScript
function loadDeferredScripts() {
    const deferredScripts = [
        'assets/js/analytics.js',
        'assets/js/cookie-consent.js'
    ];
    
    deferredScripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        document.body.appendChild(script);
    });
}

// Execute after page load
window.addEventListener('load', loadDeferredScripts);

// Optimize CLS (Cumulative Layout Shift)
document.addEventListener('DOMContentLoaded', function() {
    // Pre-calculate height for dynamic elements
    const dynamicElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
    
    dynamicElements.forEach(element => {
        // Add min-height based on content
        const computedStyle = window.getComputedStyle(element);
        const elementHeight = element.offsetHeight;
        
        if (elementHeight > 0) {
            element.style.minHeight = `${elementHeight}px`;
        }
    });
});

// Remove pricing toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Make sure pricing displays one-time payment only
    const prices = document.querySelectorAll('.pricing-price');
    
    prices.forEach(price => {
        if (price.hasAttribute('data-onetime')) {
            const oneTime = price.getAttribute('data-onetime');
            price.innerHTML = oneTime;
        }
    });

    // Hide pricing toggle section
    const pricingToggle = document.querySelector('.pricing-toggle');
    if (pricingToggle) {
        pricingToggle.style.display = 'none';
    }
});
