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
    
    // Promotional banner functionality
    loadPromoBanner();
});

// Function to load and process the promotional banner
function loadPromoBanner() {
    try {
        // Remove any existing static banner first
        const existingStaticBanner = document.querySelector('.promo-banner');
        if (existingStaticBanner) {
            existingStaticBanner.remove();
        }
        
        // Remove any existing dynamic banner section
        const existingBannerSection = document.querySelector('.banner-section');
        if (existingBannerSection) {
            existingBannerSection.remove();
        }
        
        // Determine which banner file to load based on language
        const isEnglishPage = document.body.classList.contains('en');
        const bannerFile = isEnglishPage ? 'banner-control-en.html' : 'banner-control.html';
        
        fetch(bannerFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Banner file not found');
                }
                return response.text();
            })
            .then(content => {
                // Only proceed if file is not empty (has content after trimming whitespace)
                if (content.trim().length > 0) {
                    // Create the banner section
                    const bannerSection = document.createElement('section');
                    bannerSection.className = 'section banner-section';
                    bannerSection.innerHTML = `
                        <div class="container">
                            <div class="banner-content">
                                ${content}
                            </div>
                        </div>
                    `;
                    
                    // Insert the banner right after the header
                    const header = document.querySelector('header');
                    if (header && header.nextElementSibling) {
                        header.parentNode.insertBefore(bannerSection, header.nextElementSibling);
                    } else {
                        // Fallback to inserting before features section
                        const featuresSection = document.getElementById('features');
                        if (featuresSection) {
                            featuresSection.parentNode.insertBefore(bannerSection, featuresSection);
                        }
                    }
                }
            })
            .catch(error => {
                console.log('Banner could not be loaded:', error);
                // In case of error, don't show banner
            });
    } catch (error) {
        console.log('Banner error:', error);
        // In case of error, don't show banner
    }
}

// Function to check if a string is a valid date
function isValidDate(dateString) {
    // Check if it's a date in YYYY-MM-DD format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return false;
    }
    
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

// Function to display the banner (improved)
function showPromoBanner(content) {
    console.log("Showing banner with content:", content); // Debug log
    
    // Create banner if it doesn't exist
    if (!document.querySelector('.promo-banner')) {
        const banner = document.createElement('div');
        banner.className = 'promo-banner';
        document.body.appendChild(banner);
    }
    
    // Set content and show banner
    const banner = document.querySelector('.promo-banner');
    banner.innerHTML = content;
    
    // Force a browser reflow to ensure styles are applied
    void banner.offsetWidth;
    
    // Show immediately and ensure visibility with inline style as backup
    banner.style.display = 'block';
    banner.classList.add('show');
    
    console.log("Banner element:", banner); // Debug log
}

// Function to add schema markup dynamically
function addSchemaMarkup() {
    // Check if FAQPage schema already exists in the document
    const existingFAQSchema = document.querySelector('script[type="application/ld+json"]')?.textContent.includes('"@type":"FAQPage"');
    
    // Only add FAQPage schema if it doesn't already exist
    if (!existingFAQSchema && document.querySelectorAll('.faq-item').length > 0) {
        const faqItems = document.querySelectorAll('.faq-item');
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
    
    // Add Product schema
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "KMUpower Suite",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Cloud, Microsoft 365",
        "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "1000",
            "highPrice": "7500",
            "priceCurrency": "EUR",
            "offerCount": "3"
        },
        "description": "KMUpower Suite ist eine modulare Business-Software für KMUs mit nahtloser Microsoft 365 Integration. CRM, Projektmanagement, Zeiterfassung, Rechnungsstellung und mehr in einer Plattform.",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "127"
        },
        "featureList": "CRM für KMU, Mailing/Newsletter-Modul, Mitarbeiterverwaltung, Zeiterfassung digital, Projektmanagement in Teams, Rechnungsstellung/Faktura, Serviceportal/Support"
    };
    
    const productScript = document.createElement('script');
    productScript.type = 'application/ld+json';
    productScript.text = JSON.stringify(productSchema);
    document.head.appendChild(productScript);
    
    // Add LocalBusiness schema
    const businessSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareVendor",
        "name": "KMUpower Suite by ThePowerAddicts",
        "url": "https://www.kmupowersuite.com",
        "logo": "https://www.kmupowersuite.com/assets/images/Logo_KMUpowerSuite.webp",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "CH"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+41-XXX-XXX-XXX",
            "contactType": "customer service",
            "availableLanguage": ["German", "English"]
        }
    };
    
    const businessScript = document.createElement('script');
    businessScript.type = 'application/ld+json';
    businessScript.text = JSON.stringify(businessSchema);
    document.head.appendChild(businessScript);
}
