/**
 * Enhanced image handling for SEO
 * - Adds missing alt attributes
 * - Adds structured data for images
 * - Improves lazy loading
 */
document.addEventListener('DOMContentLoaded', function() {
    // Find images without alt text and add meaningful alternatives
    document.querySelectorAll('img:not([alt]), img[alt=""]').forEach(img => {
        // Get context clues from parent or nearby elements
        let parentContext = img.closest('div, section, article');
        let nearbyHeading = parentContext ? parentContext.querySelector('h1, h2, h3, h4') : null;
        let altText = "";
        
        if (img.src.includes('Logo')) {
            altText = "KMUpower Suite Logo - Modulare Business-Software für KMU";
        } else if (nearbyHeading) {
            altText = "Illustration zu: " + nearbyHeading.textContent.trim();
        } else {
            altText = "KMUpower Suite - Microsoft 365 basierte Businesslösung";
        }
        
        img.alt = altText;
    });
    
    // Add loading="lazy" attribute to images below the fold
    document.querySelectorAll('img:not([loading])').forEach(img => {
        // Check if image is likely below the fold
        const rect = img.getBoundingClientRect();
        if (rect.top >= window.innerHeight) {
            img.setAttribute('loading', 'lazy');
        }
    });
});
