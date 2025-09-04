document.addEventListener('DOMContentLoaded', function() {
    const feedbackBtn = document.getElementById('fed');
    const popup = document.getElementById('feedbackPopup');
    const closeBtn = document.querySelector('.close-popup');
    const form = document.querySelector('.feedback-form');

    // Initialize feedback storage if it doesn't exist
    if (!localStorage.getItem('feedbacks')) {
        localStorage.setItem('feedbacks', JSON.stringify([]));
    }

    feedbackBtn.addEventListener('click', function(e) {
        e.preventDefault();
        popup.classList.add('active');
    });

    closeBtn.addEventListener('click', function() {
        popup.classList.remove('active');
    });

    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            id: Date.now(),
            name: form.querySelector('input[type="text"]').value,
            email: form.querySelector('input[type="email"]').value,
            feedback: form.querySelector('textarea').value,
            date: new Date().toLocaleString()
        };

        // Get existing feedbacks
        let feedbacks = JSON.parse(localStorage.getItem('feedbacks'));
        
        // Add new feedback
        feedbacks.push(formData);
        
        // Save back to localStorage
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

        // Show success message
        showNotification('Thank you for your feedback!');

        // Close popup and reset form
        popup.classList.remove('active');
        form.reset();

        // Log to console for verification
        console.log('Feedback stored:', formData);
        console.log('All feedbacks:', feedbacks);
    });





    // -------------------------------------Contact form functionality



    const contactBtn = document.querySelector('#contact-btn');
    const contactPopup = document.getElementById('contactPopup');
    const contactCloseBtn = contactPopup.querySelector('.close-popup');
    const contactForm = contactPopup.querySelector('.contact-form');

    // Initialize contact storage
    if (!localStorage.getItem('contacts')) {
        localStorage.setItem('contacts', JSON.stringify([]));
    }

    contactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        contactPopup.classList.add('active');
    });

    contactCloseBtn.addEventListener('click', function() {
        contactPopup.classList.remove('active');
    });

    contactPopup.addEventListener('click', function(e) {
        if (e.target === contactPopup) {
            contactPopup.classList.remove('active');
        }
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const contactData = {
            id: Date.now(),
            name: contactForm.querySelector('#contact-name').value,
            email: contactForm.querySelector('#contact-email').value,
            subject: contactForm.querySelector('#contact-subject').value,
            message: contactForm.querySelector('#contact-message').value,
            date: new Date().toLocaleString()
        };

        // Get existing contacts
        let contacts = JSON.parse(localStorage.getItem('contacts'));
        
        // Add new contact
        contacts.push(contactData);
        
        // Save back to localStorage
        localStorage.setItem('contacts', JSON.stringify(contacts));

        // Show success message
        showNotification('Message sent successfully!');

        // Close popup and reset form
        contactPopup.classList.remove('active');
        contactForm.reset();
    });

    // Mobile Menu Functionality
    const menuBtn = document.querySelector('.menu-btn');
    const mobileNav = document.querySelector('.links');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        if(!menuOpen) {
            menuBtn.classList.add('open');
            mobileNav.classList.add('active');
            menuOpen = true;
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            menuBtn.classList.remove('open');
            mobileNav.classList.remove('active');
            menuOpen = false;
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            mobileNav.classList.remove('active');
            menuOpen = false;
            document.body.style.overflow = '';
        });
    });
});




// ----------------------------Function to show notification





function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'feedback-notification';
    notification.textContent = message;
    





    //-------------------- Style the notification





    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(45deg, #00ff87, #60efff);
        color: #000;
        padding: 15px 25px;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.5s ease;
        z-index: 2000;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Function to view stored feedbacks (can be called from console)
function viewFeedbacks() {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    console.table(feedbacks);
    return feedbacks;
}

// Function to clear all feedbacks (for testing)
function clearFeedbacks() {
    localStorage.setItem('feedbacks', JSON.stringify([]));
    console.log('All feedbacks cleared');
}

// same functions for contacts
function viewContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    console.table(contacts);
    return contacts;
}

function clearContacts() {
    localStorage.setItem('contacts', JSON.stringify([]));
    console.log('All contact messages cleared');
}
