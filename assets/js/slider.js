document.addEventListener('DOMContentLoaded', function() {
    const sliderSection = document.querySelector('.slider-section');
    if (!sliderSection) return;

    const sliderData = [
        {
            image: 'assets/images/Background Dyanamic Images/Anime.jpg',
            title: 'Luffy',
            artist: 'DeafAndyVGamer',
            likes: 8793,
            tags: ['anime']
        },
        {
            image: 'assets/images/Home Page Images/Mountain.jpg',
            title: 'Mountain',
            artist: 'FujiKume',
            likes: 5463,
            tags: ['landscape', 'nature']
        },
        {
            image: 'assets/images/Home Page Images/Fantasy.jpg',
            title: 'Blooming Moon',
            artist: 'MoonAmbiance',
            likes: 5621,
            tags: ['nature', 'fantasy']
        },
        {
            image: 'assets/images/Home Page Images/Animal Cat.jpg',
            title: 'Water Melon Cats',
            artist: 'Xiao Pien',
            likes: 12352,
            tags: ['animal']
        },
        {
            image: 'assets/images/Home Page Images/Garden.jpg',
            title: 'Gardening Focus',
            artist: 'liv ling',
            likes: 6784,
            tags: ['garden', 'nature']
        },
        {
            image: 'assets/images/Home Page Images/View.jpg',
            title: 'Beauty Life',
            artist: 'Xiao Pien',
            likes: 9832,
            tags: ['fantasy']
        },
        {
            image: 'assets/images/Home Page Images/Games.png',
            title: 'Game World',
            artist: 'GamerX',
            likes: 7500,
            tags: ['game', 'fantasy']
        }
    ];

    const tags = ['all', 'anime', 'landscape', 'garden', 'nature', 'fantasy', 'animal', 'game'];

    function createSlideHTML(slide) {
        return `
            <div class="slider-slide">
                <img src="${slide.image}" alt="${slide.title}">
                <div class="slider-content">
                    <h3>${slide.title}</h3>
                    <p class="artist">${slide.artist}</p>
                    <div class="likes-container">
                        <span class="likes-icon">❤</span>
                        <span class="likes-count">${slide.likes.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;
    }

    function renderSlider(filter = 'all') {
        const dataToRender = filter === 'all'
            ? sliderData
            : sliderData.filter(slide => slide.tags.includes(filter));

        const sliderHTML = `
            <div class="container">
                <h2 id="trending-title">TRENDING TAGS</h2>
                <div class="tags-container">
                    ${tags.map(tag => `
                        <button class="tag ${tag === filter ? 'active' : ''}" data-tag="${tag}">#${tag}</button>
                    `).join('')}
                </div>
                <div class="slider-container">
                    <button class="slider-nav prev" disabled>❮</button>
                    <div class="slider-wrapper">
                        ${dataToRender.map(createSlideHTML).join('')}
                    </div>
                    <button class="slider-nav next">❯</button>
                </div>
                <div class="slider-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        sliderSection.innerHTML = sliderHTML;
        
        setupSlider();
    }

    function setupSlider() {
        const wrapper = sliderSection.querySelector('.slider-wrapper');
        const slides = sliderSection.querySelectorAll('.slider-slide');
        const progressBar = sliderSection.querySelector('.progress-bar');
        const prevButton = sliderSection.querySelector('.slider-nav.prev');
        const nextButton = sliderSection.querySelector('.slider-nav.next');
        const tagButtons = sliderSection.querySelectorAll('.tag');

        if (!wrapper || slides.length === 0) {
          if(nextButton) nextButton.disabled = true;
          return;
        }

        let currentSlide = 0;
        let itemsPerView = window.innerWidth > 1200 ? 4 : window.innerWidth > 992 ? 3 : window.innerWidth > 576 ? 2 : 1;
        const slideCount = slides.length;
        let maxSlides = Math.max(0, slideCount - itemsPerView);

        function updateSlider() {
            const slideWidthPercentage = 100 / itemsPerView;
            const offset = currentSlide * slideWidthPercentage;
            wrapper.style.transform = `translateX(-${offset}%)`;

            const progress = maxSlides > 0 ? (currentSlide / maxSlides) * 100 : 0;
            progressBar.style.width = `${progress}%`;

            prevButton.disabled = currentSlide === 0;
            nextButton.disabled = currentSlide >= maxSlides;
        }

        prevButton.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentSlide < maxSlides) {
                currentSlide++;
                updateSlider();
            }
        });

        tagButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tag = button.dataset.tag;
                renderSlider(tag); 
            });
        });
        
        window.addEventListener('resize', () => {
          const activeTag = document.querySelector('.tag.active')?.dataset.tag || 'all';
          renderSlider(activeTag);
        });

        updateSlider();
    }

    renderSlider();
});