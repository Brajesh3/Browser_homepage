document.addEventListener('DOMContentLoaded', function() {
  // Show or hide settings panel when settings button is clicked
  document.getElementById('settings-btn').addEventListener('click', function() {
    const settingsPanel = document.getElementById('settings-panel');
    settingsPanel.style.display === 'none' ? settingsPanel.style.display = 'block' : settingsPanel.style.display = 'none';
  });

  // Load settings from browser cache or set defaults
  loadSettings();

  // Preload the first image before applying animation
  preloadBackgroundImage();

  // Fetch background image when the page loads and set interval
  setInterval(fetchAndAnimateBackgroundImage, 5000);

  // Save settings when Save button is clicked
  document.getElementById('save-btn').addEventListener('click', function() {
    saveSettings();
  });
});

async function preloadBackgroundImage() {
  try {
    const response = await fetchBackgroundImage();
    const imageUrl = response.url;
    const preloadImage = new Image();
    preloadImage.src = imageUrl;
    preloadImage.onload = () => {
      document.getElementById('background').style.backgroundImage = `url(${imageUrl})`;
    };
  } catch (error) {
    console.error('Error preloading background image:', error);
  }
}

async function fetchAndAnimateBackgroundImage() {
  try {
    const response = await fetchBackgroundImage();
    const imageUrl = response.url;
    const backgroundElement = document.getElementById('background');
    backgroundElement.classList.remove('animate__fadeIn');
    setTimeout(() => {
      backgroundElement.style.backgroundImage = `url(${imageUrl})`;
      backgroundElement.classList.add('animate__fadeIn');
    }, 100);
  } catch (error) {
    console.error('Error fetching background image:', error);
  }
}

async function fetchBackgroundImage() {
  const screenWidth = window.innerWidth;
  const orientation = screenWidth < 600 ? 'portrait' : 'landscape';
  const categories = Array.from(document.getElementById('image-category').selectedOptions).map(option => option.value);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const response = await fetch(`https://source.unsplash.com/random/${orientation}/?${randomCategory}`);
  if (!response.ok) {
    throw new Error('Failed to fetch background image');
  }
  return response;
}

function saveSettings() {
  const timing = document.getElementById('change-timing').value;
  const selectedCategories = Array.from(document.getElementById('image-category').selectedOptions).map(option => option.value);
  localStorage.setItem('browserHomepageSettings', JSON.stringify({ timing, selectedCategories }));
}

function loadSettings() {
  const savedSettings = localStorage.getItem('browserHomepageSettings');
  if (savedSettings) {
    const { timing, selectedCategories } = JSON.parse(savedSettings);
    document.getElementById('change-timing').value = timing;
    const imageCategory = document.getElementById('image-category');
    selectedCategories.forEach(category => {
      const option = imageCategory.querySelector(`option[value="${category}"]`);
      if (option) {
        option.selected = true;
      }
    });
  }
}