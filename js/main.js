// Main JavaScript File

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }
    });
    
    // Load dynamic content
    loadLatestNews();
    loadUpcomingEvents();
    loadLeaders();
    loadProjects();
    loadGallery();
});

// Load Latest News
function loadLatestNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;
    
    // Sample news data - In production, this would come from a database
    const news = [
        {
            title: 'Youth Parliament Inauguration Ceremony',
            date: '2025-02-15',
            summary: 'New executives sworn in at the Regional Coordinating Council.',
            image: 'https://via.placeholder.com/300x200?text=Inauguration'
        },
        {
            title: 'Clean Bono Initiative Launch',
            date: '2025-02-10',
            summary: 'Massive community cleanup exercise across all districts.',
            image: 'https://via.placeholder.com/300x200?text=Clean+Bono'
        },
        {
            title: 'ICT Training for Youth',
            date: '2025-02-05',
            summary: '50 youth trained in digital skills and programming.',
            image: 'https://via.placeholder.com/300x200?text=ICT+Training'
        }
    ];
    
    newsGrid.innerHTML = news.map(item => `
        <div class="news-card">
            <div class="news-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="news-content">
                <div class="news-date">${formatDate(item.date)}</div>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <a href="news.html" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
}

// Load Upcoming Events
function loadUpcomingEvents() {
    const eventsList = document.getElementById('eventsList');
    if (!eventsList) return;
    
    const events = [
        {
            name: 'Regional Youth Conference 2025',
            date: '2025-03-15',
            location: 'Sunyani',
            time: '10:00 AM'
        },
        {
            name: 'Entrepreneurship Summit',
            date: '2025-03-22',
            location: 'Wenchi',
            time: '9:00 AM'
        },
        {
            name: 'Leadership Training Workshop',
            date: '2025-04-05',
            location: 'Techiman',
            time: '8:30 AM'
        },
        {
            name: 'Community Development Forum',
            date: '2025-04-12',
            location: 'Berekum',
            time: '2:00 PM'
        }
    ];
    
    eventsList.innerHTML = events.map(event => {
        const eventDate = new Date(event.date);
        return `
            <div class="event-item">
                <div class="event-date">
                    <div class="day">${eventDate.getDate()}</div>
                    <div class="month">${eventDate.toLocaleString('default', { month: 'short' })}</div>
                </div>
                <div class="event-details">
                    <h4>${event.name}</h4>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location} | <i class="fas fa-clock"></i> ${event.time}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Load Leaders (for leaders.html)
function loadLeaders() {
    const leadersGrid = document.querySelector('.leaders-grid');
    if (!leadersGrid) return;
    
    const leaders = [
        { name: 'Hon. John Doe', position: 'Patron', bio: 'Experienced leader with 10+ years in youth development.', image: 'https://via.placeholder.com/300x300?text=Patron' },
        { name: 'Hon. Jane Smith', position: 'President', bio: 'Youth advocate and community organizer.', image: 'https://via.placeholder.com/300x300?text=President' },
        { name: 'Hon. Michael Johnson', position: 'Vice President', bio: 'Entrepreneur and mentor.', image: 'https://via.placeholder.com/300x300?text=VP' },
        { name: 'Hon. Sarah Addo', position: 'Secretary', bio: 'Communications expert and writer.', image: 'https://via.placeholder.com/300x300?text=Secretary' },
        { name: 'Hon. Kwame Asante', position: 'Organizing Secretary', bio: 'Event planning specialist.', image: 'https://via.placeholder.com/300x300?text=Organizing' },
        { name: 'Hon. Akua Mensah', position: 'Treasurer', bio: 'Finance professional.', image: 'https://via.placeholder.com/300x300?text=Treasurer' },
        { name: 'Hon. Yaw Boateng', position: 'Communications Director', bio: 'Media and PR expert.', image: 'https://via.placeholder.com/300x300?text=Comms' }
    ];
    
    leadersGrid.innerHTML = leaders.map(leader => `
        <div class="leader-card">
            <div class="leader-image">
                <img src="${leader.image}" alt="${leader.name}">
            </div>
            <div class="leader-info">
                <h3>${leader.name}</h3>
                <div class="leader-position">${leader.position}</div>
                <p class="leader-bio">${leader.bio}</p>
            </div>
        </div>
    `).join('');
}

// Load Projects (for projects.html)
function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    const projects = [
        {
            title: 'Community Clean-Up Exercise',
            date: '2025-01-20',
            description: 'Youth volunteers cleaned markets and public spaces in Sunyani.',
            image: 'https://via.placeholder.com/400x300?text=Clean+Up',
            participants: 150,
            impact: '10 communities'
        },
        {
            title: 'ICT Skills Workshop',
            date: '2025-01-15',
            description: 'Training youth in web development and digital marketing.',
            image: 'https://via.placeholder.com/400x300?text=ICT+Workshop',
            participants: 80,
            impact: '5 districts'
        },
        {
            title: 'Entrepreneurship Support Program',
            date: '2025-01-10',
            description: 'Seed funding and mentorship for 20 youth-led businesses.',
            image: 'https://via.placeholder.com/400x300?text=Entrepreneurship',
            participants: 20,
            impact: '20 businesses'
        },
        {
            title: 'Leadership Development Camp',
            date: '2024-12-05',
            description: 'Weekend camp for emerging youth leaders.',
            image: 'https://via.placeholder.com/400x300?text=Leadership',
            participants: 60,
            impact: '8 schools'
        }
    ];
    
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <div class="project-date">${formatDate(project.date)}</div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-stats">
                    <span><i class="fas fa-users"></i> ${project.participants}+ participants</span>
                    <span><i class="fas fa-globe"></i> ${project.impact}</span>
                </div>
                <a href="#" class="read-more">Learn More <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
}

// Load Gallery (for gallery.html)
function loadGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;
    
    // Sample gallery images
    const galleryItems = [
        { category: 'events', title: 'Inauguration Ceremony', image: 'https://via.placeholder.com/400x300?text=Event+1' },
        { category: 'events', title: 'Youth Conference', image: 'https://via.placeholder.com/400x300?text=Event+2' },
        { category: 'projects', title: 'Clean-Up Exercise', image: 'https://via.placeholder.com/400x300?text=Project+1' },
        { category: 'projects', title: 'ICT Training', image: 'https://via.placeholder.com/400x300?text=Project+2' },
        { category: 'training', title: 'Leadership Workshop', image: 'https://via.placeholder.com/400x300?text=Training+1' },
        { category: 'training', title: 'Skills Development', image: 'https://via.placeholder.com/400x300?text=Training+2' },
        { category: 'awards', title: 'Awards Night', image: 'https://via.placeholder.com/400x300?text=Awards+1' },
        { category: 'awards', title: 'Recognition Ceremony', image: 'https://via.placeholder.com/400x300?text=Awards+2' }
    ];
    
    galleryGrid.innerHTML = galleryItems.map((item, index) => `
        <div class="gallery-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-overlay">
                <h4>${item.title}</h4>
                <p>${item.category}</p>
            </div>
        </div>
    `).join('');
    
    // Add gallery filters functionality
    setupGalleryFilters();
}

// Gallery Filters
function setupGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterBtns.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Form validation for join.html
function validateJoinForm() {
    const form = document.getElementById('joinForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        const fields = form.querySelectorAll('[required]');
        
        fields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--red)';
                isValid = false;
            } else {
                field.style.borderColor = '#eee';
            }
        });
        
        if (isValid) {
            // Show success message
            alert('Thank you for joining! We will contact you soon.');
            form.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Contact form handling
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message. We will respond shortly.');
        form.reset();
    });
}

// Initialize all forms
document.addEventListener('DOMContentLoaded', function() {
    validateJoinForm();
    setupContactForm();

    // Add this to your main.js file to prevent scroll-induced shaking

// Throttle scroll events
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Add class to temporarily disable hover effects during scroll
            document.body.classList.add('is-scrolling');
            
            // Remove the class after scrolling stops
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(() => {
                document.body.classList.remove('is-scrolling');
            }, 100);
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Add this CSS to disable hover effects during scroll
const style = document.createElement('style');
style.textContent = `
    body.is-scrolling .main-nav a:hover {
        color: inherit;
    }
    
    body.is-scrolling .main-nav a::after {
        width: 0;
    }
`;
document.head.appendChild(style);
});