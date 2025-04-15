/**
 * Cookie Consent Management
 */

class CookieConsent {
    constructor() {
        this.cookieBanner = document.querySelector('.cookie-banner');
        this.acceptButton = document.querySelector('.cookie-accept');
        this.settingsButton = document.querySelector('.cookie-settings');
        this.consentCookie = 'kmups_cookie_consent';
        this.language = document.documentElement.lang || 'de';
        
        this.init();
    }
    
    init() {
        // Check if user has already made a choice
        if (!this.hasConsent()) {
            this.showBanner();
        }
        
        // Add event listeners
        if (this.acceptButton) {
            this.acceptButton.addEventListener('click', () => {
                this.setConsent(true);
                this.hideBanner();
                this.activateServices();
            });
        }
        
        if (this.settingsButton) {
            this.settingsButton.addEventListener('click', () => {
                this.showSettings();
            });
        }
    }
    
    hasConsent() {
        return document.cookie.indexOf(this.consentCookie + '=true') > -1;
    }
    
    setConsent(accepted) {
        // Set cookie that expires in 365 days
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        
        document.cookie = `${this.consentCookie}=${accepted}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict; Secure`;
    }
    
    showBanner() {
        if (this.cookieBanner) {
            this.cookieBanner.classList.add('visible');
        }
    }
    
    hideBanner() {
        if (this.cookieBanner) {
            this.cookieBanner.classList.remove('visible');
        }
    }
    
    showSettings() {
        // In a real implementation, this would open a modal with detailed settings
        // For language-specific messages
        let message = 'In der vollständigen Version würde hier ein Modal mit detaillierten Cookie-Einstellungen erscheinen.';
        
        if (this.language === 'en') {
            message = 'In the full version, a modal with detailed cookie settings would appear here.';
        }
        
        alert(message);
    }
    
    activateServices() {
        // Activate analytics and other third-party services
        if (typeof loadAnalytics === 'function') {
            loadAnalytics();
        }
    }
}

// Initialize cookie consent on page load
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
});
