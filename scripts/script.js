// Function to fetch a random image from the selected image provider and set it as the background
async function fetchBackgroundImage() {
    try {
        const changeTiming = Number(document.getElementById('change-timing').value);
        const imageProvider = document.getElementById('image-provider').value;
        const imageCategory = document.getElementById('image-category').value;
        
        let imageUrl;
        if (imageCategory === 'all') {
            const categories = ['nature', 'animals', 'cars', 'space'];
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            const response = await fetch(`https://source.unsplash.com/640x1136/?${randomCategory}`);
            imageUrl = response.url;
        } else {
            const response = await fetch(`https://source.unsplash.com/640x1136/?${imageCategory}`);
            imageUrl = response.url;
        }

        document.getElementById('background').style.backgroundImage = `url(${imageUrl})`;
        setTimeout(fetchBackgroundImage, changeTiming);
    } catch (error) {
        console.error('Error fetching background image:', error);
    }
}

// Show or hide settings panel when settings button is clicked
document.getElementById('settings-btn').addEventListener('click', function() {
    const settingsPanel = document.getElementById('settings-panel');
    settingsPanel.classList.toggle('animate__fadeIn');
    settingsPanel.classList.toggle('animate__fadeOut');
});

// Fetch background image when the page loads
window.onload = fetchBackgroundImage;

// Save settings and fetch new background image
document.getElementById('save-btn').addEventListener('click', function() {
    const settingsPanel = document.getElementById('settings-panel');
    settingsPanel.style.display = 'none';
    fetchBackgroundImage();
});
