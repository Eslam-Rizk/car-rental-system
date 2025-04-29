
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Ensure the success message is hidden on page load
    successMessage.style.display = 'none';

    // Load existing messages from Local Storage or initialize an empty array
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let isValid = true;

        // Remove any previous invalid classes
        document.getElementById('name').classList.remove('is-invalid');
        document.getElementById('email').classList.remove('is-invalid');
        document.getElementById('subject').classList.remove('is-invalid');
        document.getElementById('message').classList.remove('is-invalid');

        if (!name) {
            document.getElementById('name').classList.add('is-invalid');
            isValid = false;
        }
        if (!email || !emailPattern.test(email)) {
            document.getElementById('email').classList.add('is-invalid');
            isValid = false;
        }
        if (!subject) {
            document.getElementById('subject').classList.add('is-invalid');
            isValid = false;
        }
        if (!message) {
            document.getElementById('message').classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) return;

        // Store the form data in Local Storage
        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: new Date().toISOString()
        };

        messages.push(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));

        // Show success message only after successful submission
        successMessage.style.display = 'flex';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000); // Hide after 5 seconds

        // Reset the form
        contactForm.reset();
    });
