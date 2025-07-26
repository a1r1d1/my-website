document.addEventListener('DOMContentLoaded', () => {
    // Get all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Create Intersection Observer for fade-in animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe all timeline items
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Add click event to timeline items to show/hide additional content
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const content = item.querySelector('.timeline-content');
            const updates = content.querySelector('.project-updates');
            
            if (updates) {
                updates.style.display = updates.style.display === 'none' ? 'block' : 'none';
            }
        });
    });

    // Toggle project details for all project-toggle buttons
    document.querySelectorAll('.project-toggle').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const content = btn.closest('.timeline-content');
            const details = content.querySelector('.project-details');
            const arrow = btn.querySelector('.arrow-icon');
            if (details.style.maxHeight && details.style.maxHeight !== '0px') {
                details.style.maxHeight = '0px';
                details.style.opacity = '0';
                details.style.marginTop = '0';
                arrow.textContent = '▼';
            } else {
                details.style.maxHeight = details.scrollHeight + 'px';
                details.style.opacity = '1';
                details.style.marginTop = '1rem';
                arrow.textContent = '▲';
            }
        });
    });

    // Function to add new project updates
    window.addProjectUpdate = function(projectId, updateText, date) {
        const project = document.querySelector(`[data-project="${projectId}"]`);
        if (!project) return;

        const updatesContainer = project.querySelector('.project-updates') || 
            (() => {
                const container = document.createElement('div');
                container.className = 'project-updates';
                project.querySelector('.timeline-content').appendChild(container);
                return container;
            })();

        const update = document.createElement('div');
        update.className = 'update';
        
        const updateDate = document.createElement('span');
        updateDate.className = 'update-date';
        updateDate.textContent = date;
        
        const updateTextElement = document.createElement('p');
        updateTextElement.textContent = updateText;
        
        update.appendChild(updateDate);
        update.appendChild(updateTextElement);
        updatesContainer.appendChild(update);
    };

    // Example of adding a new update (you can call this function from anywhere)
    // addProjectUpdate('palmyra-petra', 'تم توقيع العقد مع جامعة لوزان', 'يناير 2024');
}); 