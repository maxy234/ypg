// Form handling and validation

document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
});

function initializeForms() {
    // Join form validation
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', handleJoinForm);
    }
    
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', formatPhoneNumber);
    });
}

function handleJoinForm(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        fullname: document.getElementById('fullname')?.value,
        district: document.getElementById('district')?.value,
        age: document.getElementById('age')?.value,
        occupation: document.getElementById('occupation')?.value,
        phone: document.getElementById('phone')?.value,
        email: document.getElementById('email')?.value,
        reason: document.getElementById('reason')?.value
    };
    
    // Validate
    const errors = validateJoinForm(formData);
    
    if (Object.keys(errors).length === 0) {
        // Submit form (in production, send to server)
        console.log('Form submitted:', formData);
        showNotification('Application submitted successfully! We will contact you soon.', 'success');
        e.target.reset();
    } else {
        // Show errors
        displayFormErrors(errors);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name')?.value,
        email: document.getElementById('contact-email')?.value,
        subject: document.getElementById('subject')?.value,
        message: document.getElementById('message')?.value
    };
    
    const errors = validateContactForm(formData);
    
    if (Object.keys(errors).length === 0) {
        console.log('Contact form:', formData);
        showNotification('Message sent successfully! We will respond shortly.', 'success');
        e.target.reset();
    } else {
        displayFormErrors(errors);
    }
}

function validateJoinForm(data) {
    const errors = {};
    
    if (!data.fullname || data.fullname.trim().length < 3) {
        errors.fullname = 'Full name must be at least 3 characters';
    }
    
    if (!data.district) {
        errors.district = 'Please select your district';
    }
    
    if (!data.age || data.age < 15 || data.age > 35) {
        errors.age = 'Age must be between 15 and 35';
    }
    
    if (!data.occupation || data.occupation.trim().length < 2) {
        errors.occupation = 'Please enter your occupation';
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.phone = 'Please enter a valid phone number';
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!data.reason || data.reason.trim().length < 20) {
        errors.reason = 'Please tell us why you want to join (minimum 20 characters)';
    }
    
    return errors;
}

function validateContactForm(data) {
    const errors = {};
    
    if (!data.name || data.name.trim().length < 2) {
        errors.name = 'Please enter your name';
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!data.subject || data.subject.trim().length < 3) {
        errors.subject = 'Please enter a subject';
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^(\+233|0)[0-9]{9}$/;
    return re.test(phone.replace(/\s/g, ''));
}

function formatPhoneNumber(e) {
    let input = e.target;
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.startsWith('233')) {
            value = '+' + value;
        } else if (value.startsWith('0')) {
            value = value;
        }
    }
    
    input.value = value;
}

function displayFormErrors(errors) {
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error-input').forEach(el => {
        el.classList.remove('error-input');
    });
    
    // Display new errors
    for (let field in errors) {
        const input = document.getElementById(field) || document.getElementById('contact-' + field);
        if (input) {
            input.classList.add('error-input');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'var(--red)';
            errorDiv.style.fontSize = '0.85rem';
            errorDiv.style.marginTop = '5px';
            errorDiv.textContent = errors[field];
            
            input.parentNode.appendChild(errorDiv);
        }
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.background = type === 'success' ? '#4CAF50' : '#2196F3';
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

// Add animations
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
    
    .error-input {
        border-color: var(--red) !important;
    }
`;
document.head.appendChild(style);