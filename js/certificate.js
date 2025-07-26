document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.certificate-modal');
    const modalContent = modal.querySelector('.modal-content');
    const certificateImage = modal.querySelector('.certificate-image');
    const closeButton = modal.querySelector('.close-modal');

    // View certificate buttons
    document.querySelectorAll('.view-certificate').forEach(button => {
        button.addEventListener('click', (e) => {
            const imagePath = button.getAttribute('data-image');
            showCertificate(imagePath);
        });
    });

    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        closeModal();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function showCertificate(imagePath) {
        certificateImage.src = imagePath;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    }
}); 