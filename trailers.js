document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.querySelector('.search-box');
    const platformCheckboxes = document.querySelectorAll('.platform-checkbox');
    const allPlatformsCheckbox = document.getElementById('filter-all');
    const trailerCards = document.querySelectorAll('.trailer-card');
    
	// Filter and search functionality
    function filterTrailers() {
        const searchTerm = searchBox.value.toLowerCase();
        const selectedPlatforms = Array.from(platformCheckboxes)
            .filter(checkbox => checkbox.checked && checkbox.id !== 'filter-all')
            .map(checkbox => checkbox.id.replace('filter-', ''));
        
        trailerCards.forEach(card => {
            const title = card.querySelector('.trailer-title').textContent.toLowerCase();
            const platforms = card.dataset.platforms.split(' ');
            
            // Check if title includes search term
            const titleMatches = title.includes(searchTerm) || searchTerm === '';
            
            // Check if platforms match selected filters
            let platformMatches = false;
            if (selectedPlatforms.length === 0 || allPlatformsCheckbox.checked) {
                platformMatches = true;
            } else {
                platformMatches = selectedPlatforms.some(platform => platforms.includes(platform));
            }
            
            // Show or hide trailer cards
            if (titleMatches && platformMatches) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Handle "All Platforms" checkbox behavior
    allPlatformsCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Uncheck all other platform checkboxes
            platformCheckboxes.forEach(checkbox => {
                if (checkbox.id !== 'filter-all') {
                    checkbox.checked = false;
                }
            });
        }
        filterTrailers();
    });
    
    // Handle platform checkbox changes
    platformCheckboxes.forEach(checkbox => {
        if (checkbox.id !== 'filter-all') {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    // Uncheck "All Platforms" when selecting other platforms
                    allPlatformsCheckbox.checked = false;
                } else {
                    // When no platforms are selected, check "All Platforms"
                    const anyChecked = Array.from(platformCheckboxes)
                        .some(cb => cb.checked && cb.id !== 'filter-all');
                    if (!anyChecked) {
                        allPlatformsCheckbox.checked = true;
                    }
                }
                filterTrailers();
            });
        }
    });
    
    // Search box event listener
    searchBox.addEventListener('input', filterTrailers);
    
    filterTrailers();
});