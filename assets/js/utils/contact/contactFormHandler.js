
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function clearInvalidClasses() {
    document.getElementById('name').classList.remove('is-invalid');
    document.getElementById('email').classList.remove('is-invalid');
    document.getElementById('subject').classList.remove('is-invalid');
    document.getElementById('message').classList.remove('is-invalid');
}

export function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'none';
    successMessage.classList.add('success-message', 'text-center');
    successMessage.innerHTML += `<i class="fas fa-check-circle"></i>
        <span>Your message has been sent successfully! We'll get back to you soon.</span>`;


    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;


        clearInvalidClasses();

        if (!name) {
            document.getElementById('name').classList.add('is-invalid');
            isValid = false;
        }
        if (!email || !validateEmail(email)) {
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

        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: new Date().toISOString()
        };

        messages.push(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));

        successMessage.style.display = 'flex';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);

        contactForm.reset();
    });
}