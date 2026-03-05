// Gallery functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
});

function initializeGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (!galleryGrid) return;
    
    // Load gallery items if not already loaded
    if (galleryGrid.children.length === 0) {
        loadGalleryItems();
    }
    
    // Setup filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const filter = this.getAttribute('data-filter');
            filterGallery(filter);
        });
    });
    
    // Setup lightbox for gallery items
    setupLightbox();
}

function loadGalleryItems() {
    // Sample gallery data - in production, this would come from database
    const galleryItems = [
        {
            id: 1,
            title: 'Inauguration Ceremony 2025',
            category: 'events',
            image: 'https://via.placeholder.com/600x400?text=Inauguration',
            description: 'Swearing-in ceremony of new executives'
        },
        {
            id: 2,
            title: 'Clean Bono Initiative',
            category: 'projects',
            image: 'https://via.placeholder.com/600x400?text=Clean+Up',
            description: 'Community cleanup in Sunyani Central Market'
        },
        {
            id: 3,
            title: 'ICT Training Workshop',
            category: 'training',
            image: 'https://via.placeholder.com/600x400?text=ICT+Training',
            description: 'Youth learning web development'
        },
        {
            id: 4,
            title: 'Youth Leadership Conference',
            category: 'events',
            image: 'https://via.placeholder.com/600x400?text=Conference',
            description: 'Annual youth leadership conference'
        },
        {
            id: 5,
            title: 'Entrepreneurship Fair',
            category: 'projects',
            image: 'https://via.placeholder.com/600x400?text=Entrepreneurship',
            description: 'Young entrepreneurs showcase their businesses'
        },
        {
            id: 6,
            title: 'Awards Night 2024',
            category: 'awards',
            image: 'https://via.placeholder.com/600x400?text=Awards',
            description: 'Recognizing outstanding youth leaders'
        },
        {
            id: 7,
            title: 'Health Screening Exercise',
            category: 'projects',
            image: 'https://via.placeholder.com/600x400?text=Health',
            description: 'Free health screening for community members'
        },
        {
            id: 8,
            title: 'Parliamentary Session',
            category: 'events',
            image: 'https://via.placeholder.com/600x400?text=Parliament',
            description: 'Monthly parliamentary sitting'
        },
        {
            id: 9,
            title: 'Skills Training Program',
            category: 'training',
            image: 'https://via.placeholder.com/600x400?text=Skills',
            description: 'Vocational skills training for youth'
        }
    ];
    
    const galleryGrid = document.querySelector('.gallery-grid');
    
    galleryItems.forEach(item => {
        const galleryItem = createGalleryItem(item);
        galleryGrid.appendChild(galleryItem);
    });
}

function createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('data-category', item.category);
    div.setAttribute('data-id', item.id);
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
        </div>
    `;
    
    return div;
}

function filterGallery(filter) {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

function setupLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
            <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    
    // Style lightbox
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 2000;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox.active {
            display: flex;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 10px;
            box-shadow: 0 5px 30px rgba(0,0,0,0.3);
        }
        
        .lightbox-caption {
            color: white;
            text-align: center;
            margin-top: 15px;
            font-size: 1.1rem;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .lightbox-close:hover {
            color: var(--gold);
        }
        
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: var(--green);
        }
        
        .lightbox-prev {
            left: -70px;
        }
        
        .lightbox-next {
            right: -70px;
        }
        
        @media (max-width: 768px) {
            .lightbox-prev {
                left: 10px;
            }
            
            .lightbox-next {
                right: 10px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(lightbox);
    
    let currentIndex = 0;
    const items = Array.from(galleryItems);
    
    // Open lightbox on image click
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            openLightbox(this);
        });
    });
    
    function openLightbox(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-overlay h4')?.textContent || '';
        const description = item.querySelector('.gallery-overlay p')?.textContent || '';
        
        lightbox.querySelector('.lightbox-image').src = img.src;
        lightbox.querySelector('.lightbox-caption').innerHTML = `<strong>${title}</strong><br>${description}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Navigate with keyboard
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });
    
    // Navigation buttons
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function() {
        navigateLightbox(-1);
    });
    
    lightbox.querySelector('.lightbox-next').addEventListener('click', function() {
        navigateLightbox(1);
    });
    
    function navigateLightbox(direction) {
        const visibleItems = Array.from(document.querySelectorAll('.gallery-item[style*="display: block"], .gallery-item:not([style*="display: none"])'));
        
        if (visibleItems.length === 0) return;
        
        currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
        const nextItem = visibleItems[currentIndex];
        
        const img = nextItem.querySelector('img');
        const title = nextItem.querySelector('.gallery-overlay h4')?.textContent || '';
        const description = nextItem.querySelector('.gallery-overlay p')?.textContent || '';
        
        lightbox.querySelector('.lightbox-image').src = img.src;
        lightbox.querySelector('.lightbox-caption').innerHTML = `<strong>${title}</strong><br>${description}`;
    }
    
    // Click outside to close
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});