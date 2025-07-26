public class MobileMenu {
    private boolean isMenuOpen;
    private Element menuButton;
    private Element navLinks;
    private Element menuIcon;

    public MobileMenu() {
        this.isMenuOpen = false;
        initializeElements();
        setupEventListeners();
    }

    private void initializeElements() {
        this.menuButton = document.querySelector(".mobile-menu-button");
        this.navLinks = document.querySelector(".nav-links");
        this.menuIcon = menuButton.querySelector("i");
    }

    private void setupEventListeners() {
        // Toggle menu on button click
        menuButton.addEventListener("click", (e) -> {
            toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) -> {
            if (!navLinks.contains(e.target) && !menuButton.contains(e.target)) {
                closeMenu();
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll("a").forEach(link -> {
            link.addEventListener("click", (e) -> {
                closeMenu();
            });
        });

        // Handle window resize
        window.addEventListener("resize", (e) -> {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
    }

    private void toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    private void openMenu() {
        navLinks.classList.add("active");
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");
        isMenuOpen = true;
    }

    private void closeMenu() {
        navLinks.classList.remove("active");
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
        isMenuOpen = false;
    }
}

// Initialize mobile menu when DOM is loaded
document.addEventListener("DOMContentLoaded", () -> {
    new MobileMenu();
}); 