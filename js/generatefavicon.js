// Function to generate favicon from profile image
function generateFavicon() {
    const profileImage = document.querySelector('.profile-image img');
    if (!profileImage) return;

    // Create canvas elements for different sizes
    const sizes = [16, 32, 180];
    sizes.forEach(size => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Draw circular image
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Draw image
        ctx.drawImage(profileImage, 0, 0, size, size);

        // Convert to blob and download
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `favicon-${size}x${size}.png`;
            link.click();
            URL.revokeObjectURL(url);
        });
    });
}

// Generate favicon when profile image is loaded
document.querySelector('.profile-image img').addEventListener('load', generateFavicon); 