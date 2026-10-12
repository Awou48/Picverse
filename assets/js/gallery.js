document.addEventListener('DOMContentLoaded', function() {
    
    const galleryData = [
        { 
            src: 'assets/images/Game Images/Fotos de Joystick.jpg', 
            title: 'Fotos de Joystick', 
            artist: 'Freepik', 
            tags: ['games'],
            hasPopup: true, 
            description: `This is a vibrant and imaginative piece of digital art from Freepik, celebrating the nostalgia of retro gaming.

The central focus is a vintage-style handheld gaming console, reminiscent of classic devices from the 8-bit or 16-bit era. The console itself is set against a stylized, scenic landscape featuring unique, flat-topped trees and distant mountains under a brilliant sunset sky of pink and orange.

What makes the image particularly clever is the scene displayed on the console's screen: it's a pixel-art version of the very same landscape in the background. This "game-within-a-world" concept creates a fascinating, immersive feeling, blurring the line between the game and reality. The entire illustration is rendered in a colorful, pixelated aesthetic, evoking a strong sense of adventure and fondness for classic video games.` 
        },
        { src: 'assets/images/Game Images/Games Setup.jpg', title: 'Games Setup', artist: 'Lilia', tags: ['games'], description: 'An elaborate and colorful gaming setup with multiple monitors and accessories.' },
        { src: 'assets/images/Game Images/Starting Soon.jpg', title: 'Starting Soon', artist: 'Coalcuties', tags: ['games'], description: 'A pixel art "Starting Soon" screen, often used by streamers before gameplay.' },
        { src: 'assets/images/Game Images/Retro Gaming.jpg', title: 'Retro Gaming', artist: 'EtsyUK', tags: ['games'], description: 'Classic retro gaming console and peripherals, bringing back nostalgic memories.' },
        { src: 'assets/images/Game Images/Purple Lo_Fi.jpg', title: 'Purple Lo_Fi', artist: 'YTubescape', tags: ['games'], description: 'A purple-themed lo-fi gaming room, creating a relaxing and immersive atmosphere.' },
        { src: 'assets/images/Game Images/Bedroom.jpg', title: 'Bedroom', artist: 'Trinity Helton', tags: ['games'], description: 'A cozy pixel art bedroom setup, perfect for late-night gaming sessions.' },


        { 
            src: 'assets/images/Anime Images/Konotetsu Mountain.jpg', 
            title: 'Konotetsu Mountain', 
            artist: 'Uomi', 
            tags: ['anime'],
            hasPopup: true,
            description: `In the beautiful artwork "Konotetsu Mountain" by Uomi, a lone traveler stands on a train platform, suitcase in hand, gazing towards a majestic snow-capped peak that dominates the horizon. The scene is enveloped in the warm, golden light of sunrise or sunset, which illuminates the vibrant red and orange foliage of the surrounding autumn trees and imbues the moment with a profound sense of nostalgia and quiet contemplation. Rendered in a style characteristic of Japanese anime, the illustration uses the leading lines of the railway to draw the viewer into a poignant narrative of a journey, capturing a feeling of hopeful anticipation and deep reflection against a stunning natural backdrop.`
        },
        { src: 'assets/images/Anime Images/Mariana Glow.jpg', title: 'Mariana Glow', artist: 'Alto.ai', tags: ['anime'], description: 'Mysterious and enchanting underwater glow, reminiscent of deep-sea anime adventures.' },
        { src: 'assets/images/Anime Images/Melofi.jpg', title: 'Melofi', artist: 'Sanya', tags: ['anime'], description: 'A calming and melodic anime scene, perfect for lo-fi background visuals.' },
        { src: 'assets/images/Anime Images/Nighty View.jpg', title: 'Nighty View', artist: 'Nimsaz', tags: ['anime'], description: 'A breathtaking nighttime view of an anime city or landscape.' },
        { src: 'assets/images/Anime Images/On the cliff.jpg', title: 'On the cliff', artist: 'Jon Martin', tags: ['anime'], description: 'An anime character standing reflectively on a cliff, overlooking a vast vista.' },
        { src: 'assets/images/Anime Images/Studer Strainted.jpg', title: 'Studer Strainted', artist: 'Nune', tags: ['anime'], description: 'An intense and strained moment captured in a dramatic anime style.' },
        
        { 
            src: 'assets/images/Animal Images/Ducky.jpg', 
            title: 'Ducky', 
            artist: 'Ducksinspo', 
            tags: ['animal'],
            hasPopup: true,
            description: `This charming and whimsical illustration captures a heartwarming scene of friendship between a cute duck and a hedgehog. The two friends are nestled together in a vibrant field of yellow and white wildflowers, sharing a quiet moment over a tiny tea set. The hedgehog rests comfortably against the duck, who is adorned with a blue scarf.

The background creates a dreamy and serene atmosphere, with large, fluffy clouds painted in soft pink and lavender hues against a starry twilight sky. The gentle, pastel color palette and adorable character design evoke a strong sense of peace, comfort, and companionship, making it a truly delightful and sweet image.`
        },
        { src: 'assets/images/Animal Images/Beary Sleepy.jpg', title: 'Beary Sleepy', artist: 'Noemi Maugeri', tags: ['animal'], description: "An adorable and heartwarming illustration of a sleepy bear, perhaps after a long day of foraging or play." },
        { src: 'assets/images/Animal Images/Cute Cat.jpg', title: 'Cute Cat', artist: 'Didou Multi', tags: ['animal'], description: 'An irresistibly cute cat, captured with charming details and personality.' },
        { src: 'assets/images/Animal Images/Follow me.jpg', title: 'Follow me', artist: 'Capybaraq', tags: ['animal'], description: 'A friendly capybara inviting you on an adventure, full of charm.' },
        { src: 'assets/images/Animal Images/Jake the dog.jpg', title: 'Jake the dog', artist: 'Zophiel', tags: ['animal'], description: 'Jake the Dog from Adventure Time, chilling with headphones.' },
        { src: 'assets/images/Animal Images/Snowy Bear.jpg', title: 'Snowy Bear', artist: 'Zxyaz', tags: ['animal'], description: 'A majestic bear in a snowy landscape, showcasing its resilience and beauty.' },
    ];
        
    const galleryGrid = document.getElementById('gallery-grid');
    const tagButtons = document.querySelectorAll('.tag-button');
    const tagDropdown = document.getElementById('tag-dropdown');

    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalArtist = document.getElementById('modal-artist');
    const modalTags = document.getElementById('modal-tags');
    const modalDescription = document.getElementById('modal-description');
    const closeButton = document.querySelector('.modal .close-button');

    function createGalleryItem(item, originalIndex) {
        const itemAttributes = item.hasPopup 
            ? `class="gallery-item popup-trigger" data-index="${originalIndex}"` 
            : `class="gallery-item"`;
        return `
            <div ${itemAttributes}>
                <div class="gallery-item-image-wrapper">
                    <img src="${item.src}" alt="${item.title}">
                </div>
                <div class="gallery-item-info">
                    <h3 class="gallery-item-title">${item.title}</h3>
                    <p class="gallery-item-description">${item.artist}</p>
                </div>
            </div>
        `;
    }

    function renderGallery(tag) {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';
        
        const filteredData = galleryData.filter(item => item.tags.includes(tag)).slice(0, 6);
        
        const galleryHTML = filteredData.map(itemInFilter => {
            const originalIndex = galleryData.findIndex(originalItem => originalItem.src === itemInFilter.src);
            return createGalleryItem(itemInFilter, originalIndex);
        }).join('');
        
        galleryGrid.innerHTML = galleryHTML;
        addPopupListeners();
    }

    function openModal(itemData) {
        if (!modal || !itemData) return;
        modalImage.src = itemData.src;
        modalTitle.textContent = itemData.title;
        modalArtist.textContent = "By " + itemData.artist;
        modalDescription.textContent = itemData.description || "No description available.";
        modalTags.innerHTML = itemData.tags.map(tag => `<span class="tag">#${tag}</span>`).join(' ');
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function addPopupListeners() {
        const popupTriggers = document.querySelectorAll('.popup-trigger');
        popupTriggers.forEach(trigger => {
            const newTrigger = trigger.cloneNode(true);
            trigger.parentNode.replaceChild(newTrigger, trigger);
            
            newTrigger.addEventListener('click', () => {
                const itemIndex = parseInt(newTrigger.dataset.index);
                if (!isNaN(itemIndex) && galleryData[itemIndex] && galleryData[itemIndex].hasPopup) {
                    openModal(galleryData[itemIndex]);
                }
            });
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                closeModal();
            }
        });
    }

    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            tagButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const tag = button.dataset.tag;
            renderGallery(tag);
            if (tagDropdown) tagDropdown.value = tag;
        });
    });

    if (tagDropdown) {
        tagDropdown.addEventListener('change', () => {
            const tag = tagDropdown.value;
            renderGallery(tag);
            tagButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tag === tag);
            });
        });
    }

    if (galleryData.length > 0) {
        renderGallery('games');
    }
});