document.addEventListener('DOMContentLoaded', () => {
    const bookContent = document.querySelector('.book-content');
    const pages = document.querySelectorAll('.page');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');
    const fullscreenButton = document.getElementById('fullscreen');

    let currentPage = 1;
    const totalPages = pages.length;
    let zoomLevel = 1;

    // Initialize
    totalPagesSpan.textContent = totalPages;
    showPage(currentPage);

    // Navigation
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        }
    });

    // Touch navigation
    let touchStartX = 0;
    let touchEndX = 0;

    bookContent.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    bookContent.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next page
                if (currentPage < totalPages) {
                    currentPage++;
                    showPage(currentPage);
                }
            } else {
                // Swipe right - previous page
                if (currentPage > 1) {
                    currentPage--;
                    showPage(currentPage);
                }
            }
        }
    }

    // Zoom functionality
    zoomInButton.addEventListener('click', () => {
        if (zoomLevel < 2) {
            zoomLevel += 0.1;
            updateZoom();
        }
    });

    zoomOutButton.addEventListener('click', () => {
        if (zoomLevel > 0.5) {
            zoomLevel -= 0.1;
            updateZoom();
        }
    });

    function updateZoom() {
        bookContent.style.transform = `scale(${zoomLevel})`;
        bookContent.style.transformOrigin = 'center center';
    }

    // Fullscreen functionality
    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            bookContent.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    // Show page function
    function showPage(pageNumber) {
        pages.forEach(page => {
            page.classList.remove('active');
        });

        const targetPage = document.querySelector(`.page[data-page="${pageNumber}"]`);
        if (targetPage) {
            targetPage.classList.add('active');
            currentPageSpan.textContent = pageNumber;
        }

        // Update button states
        prevButton.disabled = pageNumber === 1;
        nextButton.disabled = pageNumber === totalPages;
    }

    // Add page turn animation
    function addPageTurnAnimation() {
        const activePage = document.querySelector('.page.active');
        if (activePage) {
            activePage.style.animation = 'pageTurn 0.5s ease-in-out';
            setTimeout(() => {
                activePage.style.animation = '';
            }, 500);
        }
    }
}); 