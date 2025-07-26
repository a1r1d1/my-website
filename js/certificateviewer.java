public class CertificateViewer {
    private Element modal;
    private Element modalContent;
    private Element certificateImage;
    private Element closeButton;

    public CertificateViewer() {
        initializeElements();
        setupEventListeners();
    }

    private void initializeElements() {
        this.modal = document.querySelector(".certificate-modal");
        this.modalContent = modal.querySelector(".modal-content");
        this.certificateImage = modal.querySelector(".certificate-image");
        this.closeButton = modal.querySelector(".close-modal");
    }

    private void setupEventListeners() {
        // View certificate buttons
        document.querySelectorAll(".view-certificate").forEach(button -> {
            button.addEventListener("click", (e) -> {
                String imagePath = button.getAttribute("data-image");
                showCertificate(imagePath);
            });
        });

        // Close modal when clicking the close button
        closeButton.addEventListener("click", (e) -> {
            closeModal();
        });

        // Close modal when clicking outside
        modal.addEventListener("click", (e) -> {
            if (e.target == modal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener("keydown", (e) -> {
            if (e.key == "Escape" && modal.classList.contains("active")) {
                closeModal();
            }
        });
    }

    private void showCertificate(String imagePath) {
        certificateImage.setAttribute("src", imagePath);
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    private void closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = ""; // Restore background scrolling
    }
}

// Initialize certificate viewer when DOM is loaded
document.addEventListener("DOMContentLoaded", () -> {
    new CertificateViewer();
}); 