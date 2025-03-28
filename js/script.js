// JavaScript für das Portfolio mit minimalen Effekten

// Initialize EmailJS
(function() {
    emailjs.init("ek1JgPqqSf0LEakc4");
})();

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageElement = notification.querySelector('.notification-message');
    const closeBtn = notification.querySelector('.notification-close');
    
    // Set message and type
    messageElement.textContent = message;
    notification.className = `notification ${type}`;
    
    // Show notification
    notification.classList.add('show');
    
    // Add close button functionality
    closeBtn.onclick = () => {
        notification.classList.remove('show');
    };
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Funktion zum Hinzufügen eines Bildes (für zukünftige Implementierung)
    const imageContainer = document.querySelector('.profile-image-placeholder');
    
    if (imageContainer) {
        imageContainer.addEventListener('click', function() {
            showNotification('Diese Funktion ist aktuell ein Platzhalter.', 'error');
        });
    }
    
    // Smooth Scrolling für Navigation
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling
    const form = document.getElementById('email-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Prepare template parameters
            const templateParams = {
                from_name: form.name.value,
                from_email: form.email.value,
                message: form.message.value,
                to_email: 'hadialthiab@gmail.com'
            };

            // Send email using EmailJS
            emailjs.send('service_qb9ornq', 'template_qvb7o4m', templateParams)
                .then(function() {
                    // Success
                    showNotification('Thank you! Your message has been sent successfully.');
                    form.reset();
                }, function(error) {
                    // Error
                    showNotification('Sorry, there was an error sending your message. Please try again later.', 'error');
                    console.error('EmailJS error:', error);
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});
