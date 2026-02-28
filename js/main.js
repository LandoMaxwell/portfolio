class ImageCarousel {
    constructor(containerSelector, images = [], options = {}) {
        this.container = document.querySelector(containerSelector);
        this.images = images;
        this.currentIndex = 0;
        this.interval = null;
        this.options = {
            autoPlay: true,
            interval: 5000,
            transition: 'fade',
            ...options
        };

        this.init();
    }

    init() {
        if (!this.container) return;

        // Create carousel elements
        this.createCarousel();
        
        // Start auto-play if enabled
        if (this.options.autoPlay) {
            this.startAutoPlay();
        }

        // Add event listeners
        this.addEventListeners();
    }

    createCarousel() {
        // Clear existing content
        this.container.innerHTML = '';

        // Create slides
        this.slides = this.images.map((img, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.style.backgroundImage = `url(${img})`;
            this.container.appendChild(slide);
            return slide;
        });

        // Create navigation arrows
        this.prevArrow = document.createElement('div');
        this.prevArrow.className = 'carousel-arrow prev';
        this.prevArrow.innerHTML = '<';
        this.container.appendChild(this.prevArrow);

        this.nextArrow = document.createElement('div');
        this.nextArrow.className = 'carousel-arrow next';
        this.nextArrow.innerHTML = '>';
        this.container.appendChild(this.nextArrow);

        // Create dots navigation
        this.dotsContainer = document.createElement('div');
        this.dotsContainer.className = 'carousel-dots';
        this.dots = this.images.map((_, index) => {
            const dot = document.createElement('span');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.dataset.index = index;
            this.dotsContainer.appendChild(dot);
            return dot;
        });
        this.container.appendChild(this.dotsContainer);
    }

    goToSlide(index) {
        if (index < 0 || index >= this.images.length) return;

        // Update current slide
        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');

        this.currentIndex = index;

        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.interval = setInterval(() => this.nextSlide(), this.options.interval);
    }

    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    addEventListeners() {
        // Arrow controls
        this.prevArrow.addEventListener('click', () => {
            this.prevSlide();
            if (this.options.autoPlay) this.startAutoPlay();
        });

        this.nextArrow.addEventListener('click', () => {
            this.nextSlide();
            if (this.options.autoPlay) this.startAutoPlay();
        });

        // Dot controls
        this.dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                this.goToSlide(index);
                if (this.options.autoPlay) this.startAutoPlay();
            });
        });

        // Pause on hover
        this.container.addEventListener('mouseenter', () => {
            if (this.options.autoPlay) this.stopAutoPlay();
        });

        this.container.addEventListener('mouseleave', () => {
            if (this.options.autoPlay) this.startAutoPlay();
        });

        // Navigation bar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Menu Toggle Functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Card Hover Effect Class
class HoverCards {
    constructor(containerSelector, cardsData = []) {
        this.container = document.querySelector(containerSelector);
        this.cardsData = cardsData;
        this.init();
    }

    init() {
        if (!this.container) return;
        this.createCards();
    }

    createCards() {
        // Clear existing content
        this.container.innerHTML = '';

        // Create cards from data
        this.cardsData.forEach(cardData => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Card image
            const cardImage = document.createElement('div');
            cardImage.className = 'card-image';
            
            const img = document.createElement('img');
            img.src = cardData.image;
            img.alt = cardData.title;
            cardImage.appendChild(img);
            
            // Card content
            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            
            const cardTitle = document.createElement('h3');
            cardTitle.className = 'card-title';
            cardTitle.textContent = cardData.title;
            cardContent.appendChild(cardTitle);
            
            const cardDescription = document.createElement('p');
            cardDescription.className = 'card-description';
            cardDescription.textContent = cardData.description;
            cardContent.appendChild(cardDescription);
            
            // Card hover content
            const cardHoverContent = document.createElement('div');
            cardHoverContent.className = 'card-hover-content';
            
            const cardHoverTitle = document.createElement('h3');
            cardHoverTitle.className = 'card-hover-title';
            cardHoverTitle.textContent = cardData.hoverTitle || cardData.title;
            cardHoverContent.appendChild(cardHoverTitle);
            
            const cardHoverDescription = document.createElement('p');
            cardHoverDescription.className = 'card-hover-description';
            cardHoverDescription.textContent = cardData.hoverDescription || cardData.description;
            cardHoverContent.appendChild(cardHoverDescription);
            
            const cardHoverLink = document.createElement('a');
            cardHoverLink.className = 'card-hover-link';
            cardHoverLink.href = cardData.link || '#';
            cardHoverLink.textContent = cardData.linkText || '查看详情';
            cardHoverContent.appendChild(cardHoverLink);
            
            // Assemble card
            card.appendChild(cardImage);
            card.appendChild(cardContent);
            card.appendChild(cardHoverContent);
            
            this.container.appendChild(card);
        });
    }
}

// Initialize cards when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Sample card data
    const cardsData = [
        {
            title: '项目一',
            description: '这是一个创新的项目，展示了现代Web开发的最佳实践。',
            image: 'https://picsum.photos/seed/project1/400/300.jpg',
            hoverTitle: '项目一详情',
            hoverDescription: '这个项目采用了最新的前端技术，包括响应式设计、动画效果和用户交互优化。它展示了如何创建一个既美观又实用的Web应用。',
            link: '#project1',
            linkText: '了解更多'
        },
        {
            title: '项目二',
            description: '一个专注于用户体验设计的网站项目。',
            image: 'https://picsum.photos/seed/project2/400/300.jpg',
            hoverTitle: '项目二详情',
            hoverDescription: '这个项目专注于用户体验设计，通过精心设计的界面和交互流程，为用户提供直观、高效的使用体验。',
            link: '#project2',
            linkText: '查看案例'
        },
        {
            title: '项目三',
            description: '结合了数据可视化和现代设计的数据分析平台。',
            image: 'https://picsum.photos/seed/project3/400/300.jpg',
            hoverTitle: '项目三详情',
            hoverDescription: '这个数据分析平台结合了先进的数据可视化技术和现代设计理念，帮助用户更直观地理解和分析复杂数据。',
            link: '#project3',
            linkText: '探索平台'
        },
        {
            title: '项目四',
            description: '一个创新的移动应用设计项目。',
            image: 'https://picsum.photos/seed/project4/400/300.jpg',
            hoverTitle: '项目四详情',
            hoverDescription: '这个移动应用设计项目专注于为用户提供简洁、直观的移动体验，通过精心设计的界面和流畅的交互，满足用户的各种需求。',
            link: '#project4',
            linkText: '下载应用'
        },
        {
            title: '项目五',
            description: '一个展示创意设计的品牌网站。',
            image: 'https://picsum.photos/seed/project5/400/300.jpg',
            hoverTitle: '项目五详情',
            hoverDescription: '这个品牌网站通过创意设计和精心策划的内容，展示了品牌的独特价值和理念，为用户留下深刻印象。',
            link: '#project5',
            linkText: '访问网站'
        },
        {
            title: '项目六',
            description: '一个集成了多种功能的Web应用程序。',
            image: 'https://picsum.photos/seed/project6/400/300.jpg',
            hoverTitle: '项目六详情',
            hoverDescription: '这个Web应用程序集成了多种实用功能，通过简洁的界面和高效的交互，为用户提供一站式解决方案。',
            link: '#project6',
            linkText: '开始使用'
        }
    ];

    // Initialize cards
    const cards = new HoverCards('.cards-container', cardsData);
});

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Replace with actual image paths
    const carousel = new ImageCarousel('.carousel', [
        'images/hero1.jpg',
        'images/hero2.jpg',
        'images/hero3.jpg'
    ], {
        autoPlay: true,
        interval: 7000,
        transition: 'fade'
    });
});
