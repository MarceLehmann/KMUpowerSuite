// FAQ toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement; // Das .faq-item Element
        const answer = question.nextElementSibling;
        const isOpen = item.classList.contains('open');

        // Schliesse alle anderen offenen FAQs (optional, aber oft gewünscht)
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
            if (openItem !== item) {
                openItem.classList.remove('open');
                openItem.querySelector('.faq-answer').style.display = 'none';
                openItem.querySelector('.faq-question span:last-child').textContent = '+';
            }
        });

        // Toggle das aktuelle Element
        if (!isOpen) {
            item.classList.add('open');
            answer.style.display = 'block'; // Oder slideDown Effekt hinzufügen
            question.querySelector('span:last-child').textContent = '−'; // Minus statt gedrehtem Plus
        } else {
            item.classList.remove('open');
            answer.style.display = 'none'; // Oder slideUp Effekt hinzufügen
            question.querySelector('span:last-child').textContent = '+';
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // Nur verhindern, wenn es ein echter Anker ist (nicht nur '#')
        if (href.length > 1 && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            const headerOffset = document.querySelector('header').offsetHeight || 80; // Höhe des Headers holen oder Fallback

            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // 20px zusätzlicher Abstand

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add CSS for language switcher
document.addEventListener('DOMContentLoaded', function() {
    // Add styles for language switcher
    const style = document.createElement('style');
    style.textContent = `
        .language-switcher a {
            font-weight: 600;
            padding: 0.3rem 0.5rem;
            border-radius: 4px;
            background-color: var(--gray);
            transition: background-color 0.3s ease;
        }
        .language-switcher a:hover {
            background-color: var(--primary-light);
            color: var(--dark);
        }
        @media (max-width: 768px) {
            .language-switcher {
                margin-top: 0.5rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Set up intersection observer for lazy loading images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img.lazy-load');
        
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset;
                const lazyImages = document.querySelectorAll('img.lazy-load');
                
                lazyImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                        }
                        img.classList.remove('lazy-load');
                    }
                });
                
                if (lazyImages.length == 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
    
    // Add schema markup dynamically where needed
    addSchemaMarkup();
    
    // Setup mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            body.classList.toggle('menu-open');
        });
        
        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const navContainer = document.querySelector('.nav-container');
            const isClickInside = navContainer.contains(event.target) || mobileMenuToggle.contains(event.target);
            
            if (!isClickInside && body.classList.contains('menu-open')) {
                body.classList.remove('menu-open');
            }
        });
        
        // Close menu with escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && body.classList.contains('menu-open')) {
                body.classList.remove('menu-open');
            }
        });
    }
});

// Function to add schema markup dynamically
function addSchemaMarkup() {
    // Add FAQPage schema
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": []
        };
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span:first-child').textContent;
            const answer = item.querySelector('.faq-answer p').textContent;
            
            faqSchema.mainEntity.push({
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": answer
                }
            });
        });
        
        const faqScript = document.createElement('script');
        faqScript.type = 'application/ld+json';
        faqScript.text = JSON.stringify(faqSchema);
        document.head.appendChild(faqScript);
    }
}
