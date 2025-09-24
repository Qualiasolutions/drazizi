// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize demo button
    initializeDemoButton();
    
    // Initialize smooth scrolling for internal links
    initializeSmoothScrolling();
    
    // Initialize card hover effects
    initializeCardEffects();
    
    // Initialize intersection observer for animations
    initializeScrollAnimations();
}

// Demo button functionality
function initializeDemoButton() {
    const demoButton = document.getElementById('demoButton');
    
    if (demoButton) {
        demoButton.addEventListener('click', function() {
            handleDemoButtonClick();
        });
    }
}

function handleDemoButtonClick() {
    // Show loading state
    const button = document.getElementById('demoButton');
    const originalText = button.textContent;
    
    button.textContent = 'Launching Demo...';
    button.disabled = true;
    button.style.backgroundColor = '#2f855a';
    
    // Simulate demo loading
    setTimeout(() => {
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
        button.style.backgroundColor = '';
        
        // Show demo message
        showDemoMessage();
    }, 2000);
}

function showDemoMessage() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(26, 54, 93, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        border: none;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        transform: translateY(50px);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <h2 style="color: #1a365d; margin-bottom: 20px; font-size: 24px;">Demo Ready!</h2>
        <p style="color: #4a5568; margin-bottom: 30px; line-height: 1.6;">
            The AI-Powered Reservoir Analytics demo is now ready to launch. 
            In a real implementation, this would navigate to the live dashboard 
            with real-time data visualization and analytics capabilities.
        </p>
        <div style="display: flex; gap: 16px; justify-content: center;">
            <button id="closeModal" style="
                background: #38a169;
                color: white;
                padding: 12px 24px;
                border: none;
                font-weight: 600;
                cursor: pointer;
                transition: background-color 0.2s;
            ">Continue</button>
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Animate modal in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
    }, 10);
    
    // Close modal functionality
    const closeButton = modalContent.querySelector('#closeModal');
    closeButton.addEventListener('click', () => {
        modalOverlay.style.opacity = '0';
        modalContent.style.transform = 'translateY(50px)';
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
        }, 300);
    });
    
    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeButton.click();
        }
    });
}

// Smooth scrolling for internal navigation
function initializeSmoothScrolling() {
    // Handle any internal anchor links if added in future
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
}

// Enhanced card interactions
function initializeCardEffects() {
    const cards = document.querySelectorAll('.challenge-card, .feature-card, .benefit-card, .demo-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
}

// Scroll-based animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add CSS for animations
    addScrollAnimationStyles();
}

function addScrollAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .header {
            opacity: 1 !important;
            transform: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: #38a169;
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    const updateProgress = debounce(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, 10);
    
    window.addEventListener('scroll', updateProgress);
}

// Initialize scroll progress on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addScrollProgress, 100);
});

// Add keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('[style*="position: fixed"]');
        if (modal) {
            const closeButton = modal.querySelector('#closeModal');
            if (closeButton) {
                closeButton.click();
            }
        }
    }
});