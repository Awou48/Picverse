document.addEventListener('DOMContentLoaded', function() {
    const backgroundData = [ 
        { image: 'assets/images/Background Dyanamic Images/Cats.jpg', title: 'ANIMALS', artist: '@Steviefeesh' },
        { image: 'assets/images/Background Dyanamic Images/Nature.jpg', title: 'NATURE', artist: '@ImagiGraphStudio' },
        { image: 'assets/images/Background Dyanamic Images/Anime.jpg', title: 'ANIME', artist: '@DeafyAndyVGamer' },
        { image: 'assets/images/Background Dyanamic Images/Games.jpg', title: 'GAME', artist: '@Iketsumi' },
        { image: 'assets/images/Background Dyanamic Images/Fantasy.jpg', title: 'FANTASY', artist: '@MoodiAmbiance' }
    ];

    const mainContent = document.querySelector('.main-content');

    const heroTitle = document.getElementById('hero-title');
    const heroArtist = document.getElementById('hero-artist');
    const heroDivider = document.querySelector('.art-info-box .divider');

    if (!mainContent) {
        console.error("Element .main-content not found!");
        return;
    }
    if (!backgroundData || backgroundData.length === 0) {
        console.error("backgroundData is empty or not defined in background.js");
        mainContent.style.backgroundColor = '#2c3e50'; 
        return;
    }

    let currentIndex = 0;
    const preloadedImages = [];
    let isTransitioning = false;
    let slideshowIntervalId = null;

    function applyStyles(imagePath, data) {
        if (mainContent && imagePath) {
            mainContent.style.backgroundImage = `url(${imagePath})`;
        }
        if (heroTitle && heroArtist && heroDivider && data) {
            heroTitle.textContent = data.title;
            heroArtist.textContent = 'Art By ' + data.artist;
        }
    }

    function preloadImages() {
        let loadedCount = 0;
        if (backgroundData.length === 0) { 
            applyInitialBackgroundAndText(); 
            return;
        }
        backgroundData.forEach((data, index) => {
            const img = new Image();
            img.src = data.image;
            img.onload = () => {
                preloadedImages[index] = img;
                loadedCount++;
                if (index === 0) { 
                    applyStyles(img.src, data);
                }
                if (loadedCount === backgroundData.length) { 
                    startSlideshow();
                }
            };
            img.onerror = () => {
                console.error("Failed to load background image:", data.image);
                preloadedImages[index] = null; 
                loadedCount++;
                if (index === 0) {
                    applyInitialBackgroundAndText(); 
                }
                if (loadedCount === backgroundData.length) {
                    startSlideshow(); 
                }
            };
        });
    }
    
    function applyInitialBackgroundAndText() {
        const firstValidImageIndex = preloadedImages.findIndex(pImg => pImg && pImg.src);
        if (firstValidImageIndex !== -1) {
            applyStyles(preloadedImages[firstValidImageIndex].src, backgroundData[firstValidImageIndex]);
        } else if (backgroundData.length > 0 && backgroundData[0].image) {
             const tempImg = new Image();
             tempImg.src = backgroundData[0].image;
             tempImg.onload = () => applyStyles(tempImg.src, backgroundData[0]);
             tempImg.onerror = () => mainContent.style.backgroundColor = '#2c3e50';
        }
         else {
            mainContent.style.backgroundColor = '#2c3e50'; 
        }
    }


    function runTransition() {
        const validPreloadedImages = preloadedImages.filter(img => img && img.complete && img.naturalWidth !== 0);
        if (isTransitioning || validPreloadedImages.length === 0) {

            if (validPreloadedImages.length === 0) mainContent.style.backgroundColor = '#2c3e50';
            return;
        }
        
        isTransitioning = true;

        if (heroTitle && heroArtist && heroDivider) {
            heroTitle.style.opacity = '0';
            heroArtist.style.opacity = '0';
            heroDivider.style.opacity = '0';
        }
        
        let nextValidIndexFound = false;
        let originalCurrentIndex = currentIndex;
        do {
            currentIndex = (currentIndex + 1) % backgroundData.length;
            if (preloadedImages[currentIndex] && preloadedImages[currentIndex].complete && preloadedImages[currentIndex].naturalWidth !== 0) {
                nextValidIndexFound = true;
                break;
            }
        } while (currentIndex !== originalCurrentIndex);

        if (!nextValidIndexFound) { 
            isTransitioning = false;
            return;
        }

        const nextData = backgroundData[currentIndex];
        const nextImage = preloadedImages[currentIndex];

        const tempDiv = document.createElement('div');
        tempDiv.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-image: url(${nextImage.src});
            background-size: cover; background-position: center; background-attachment: fixed;
            opacity: 0; transition: opacity 1.5s ease-in-out; z-index: -2; 
        `;
        mainContent.prepend(tempDiv);
        
        setTimeout(() => tempDiv.style.opacity = 1, 50);

        setTimeout(() => {
            if (heroTitle && heroArtist && heroDivider) {
                heroTitle.textContent = nextData.title;
                heroArtist.textContent = 'Art By ' + nextData.artist;
                heroTitle.style.opacity = '1';
                heroArtist.style.opacity = '1';
                heroDivider.style.opacity = '1';
            }
        }, 850); 

        setTimeout(() => {
            if(nextImage && nextImage.src) mainContent.style.backgroundImage = `url(${nextImage.src})`;
            tempDiv.remove();
            isTransitioning = false;
        }, 2000); 
    }

    function startSlideshow() {
        const validPreloadedImages = preloadedImages.filter(img => img && img.complete && img.naturalWidth !== 0);
        if (validPreloadedImages.length > 1 && !slideshowIntervalId) { 
            slideshowIntervalId = setInterval(runTransition, 5000);
        } else if (validPreloadedImages.length <= 1) {
            console.log("Slideshow not started: Not enough valid images preloaded or available.");
        }
    }
    
    preloadImages();
});