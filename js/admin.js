// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
    checkSession();
    loadDashboardStats();
});

function initializeAdmin() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle-admin');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    
    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize charts if on dashboard
    if (document.getElementById('statsChart')) {
        initializeCharts();
    }
}

function checkSession() {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') || localStorage.getItem('adminLoggedIn');
    
    // If not on login page and not logged in, redirect to login
    if (!window.location.href.includes('index.html') && !isLoggedIn) {
        window.location.href = 'index.html';
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember')?.checked || false;
    
    // In production, this would be an API call
    if (username === 'admin' && password === 'admin123') {
        if (remember) {
            localStorage.setItem('adminLoggedIn', 'true');
        } else {
            sessionStorage.setItem('adminLoggedIn', 'true');
        }
        
        showNotification('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        showNotification('Invalid username or password', 'error');
    }
}

function handleLogout(event) {
    event.preventDefault();
    
    sessionStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoggedIn');
    
    showNotification('Logged out successfully', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

function loadDashboardStats() {
    // In production, fetch stats from API
    const stats = {
        members: 156,
        pending: 23,
        projects: 12,
        events: 8,
        news: 45,
        messages: 7
    };
    
    // Update stats if elements exist
    for (let [key, value] of Object.entries(stats)) {
        const element = document.getElementById(`stat-${key}`);
        if (element) {
            element.textContent = value;
        }
    }
}

function initializeCharts() {
    // Simple chart implementation
    const ctx = document.getElementById('statsChart')?.getContext('2d');
    if (!ctx) return;
    
    // This would normally use Chart.js or similar
    console.log('Chart initialized');
}

function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = event.target.getAttribute('data-tooltip');
    
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
    
    event.target._tooltip = tooltip;
}

function hideTooltip(event) {
    if (event.target._tooltip) {
        event.target._tooltip.remove();
        delete event.target._tooltip;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.background = type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
    notification.style.zIndex = '9999';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.animation = 'slideIn 0.3s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-GH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatDateTime(date) {
    const d = new Date(date);
    return d.toLocaleString('en-GH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    let isValid = true;
    const inputs = form.querySelectorAll('[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--danger)';
            isValid = false;
            
            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'var(--danger)';
            errorDiv.style.fontSize = '0.85rem';
            errorDiv.style.marginTop = '5px';
            errorDiv.textContent = 'This field is required';
            
            if (!input.nextElementSibling?.classList.contains('error-message')) {
                input.insertAdjacentElement('afterend', errorDiv);
            }
        } else {
            input.style.borderColor = '';
            if (input.nextElementSibling?.classList.contains('error-message')) {
                input.nextElementSibling.remove();
            }
        }
    });
    
    return isValid;
}

// Export functions for use in other files
window.adminFunctions = {
    handleLogin,
    handleLogout,
    showNotification,
    confirmAction,
    formatDate,
    formatDateTime,
    validateForm
};

// Add styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .tooltip {
        position: fixed;
        background: var(--dark);
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
        font-size: 0.85rem;
        z-index: 10000;
        pointer-events: none;
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: var(--dark) transparent transparent transparent;
    }
    
    .error-message {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);