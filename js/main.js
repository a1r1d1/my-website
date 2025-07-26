document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const menuIcon = mobileMenuButton.querySelector('i');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenuButton.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle menu icon
        if (isMenuOpen) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            // Restore body scroll when menu is closed
            document.body.style.overflow = '';
        }
    }

    // Toggle menu on button click
    mobileMenuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navLinks.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Smooth scrolling for navigation links
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in, .scale-in').forEach(element => {
        observer.observe(element);
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData.entries());
            
            try {
                // Send form data to email
                const emailBody = `
                    Name: ${formObject.name}
                    Email: ${formObject.email}
                    Subject: ${formObject.subject}
                    Message: ${formObject.message}
                `;

                // Create mailto link
                const mailtoLink = `mailto:vortea26@gmail.com?subject=${encodeURIComponent(formObject.subject)}&body=${encodeURIComponent(emailBody)}`;
                window.location.href = mailtoLink;
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'تم إرسال رسالتك بنجاح!';
                contactForm.appendChild(successMessage);
                
                // Clear form
                contactForm.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } catch (error) {
                console.error('Error submitting form:', error);
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.';
                contactForm.appendChild(errorMessage);
                
                // Remove error message after 3 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            }
        });
    }

    // Certificate modal functionality
    const certificateButtons = document.querySelectorAll('.view-certificate');
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    document.body.appendChild(modal);

    certificateButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const certificateImage = button.getAttribute('data-image');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${certificateImag}" alt="Certificate">
                </div>
            `;
            modal.classList.add('active');
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            modal.classList.remove('active');
        }
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-overlay').style.opacity = '0';
        });
    });

    // Skills section animation
    const skillsColumns = document.querySelectorAll('.skills-column');
    skillsColumns.forEach((column, index) => {
        column.style.animationDelay = `${index * 0.2}s`;
        observer.observe(column);
    });

    // Contact form validation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.remove('error');
            }
        });
    });

    // Add smooth scroll behavior to the whole page
    document.documentElement.style.scrollBehavior = 'smooth';

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                toggleMenu();
            }
        }, 250);
    });

    // Back button functionality
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    }

    // Add back button to all pages
    if (!document.querySelector('.back-button')) {
        const backBtn = document.createElement('a');
        backBtn.href = 'javascript:history.back()';
        backBtn.className = 'back-button';
        backBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
        document.body.appendChild(backBtn);
    }

    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    navLinks.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    navLinks.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) { // Swipe left
            if (isMenuOpen) {
                toggleMenu();
            }
        }
    }

    // Prevent menu from closing when clicking inside
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}); 