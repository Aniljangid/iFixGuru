// Initialize Lucide Icons
lucide.createIcons();

// Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-button');

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    // Securely inject the access key from environment variables
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.textContent = "Thanks! We've received your request and will get back to you soon.";
            formStatus.style.color = "#28a745";
            formStatus.style.display = "block";
            contactForm.reset();
        } else {
            const data = await response.json();
            if (Object.hasOwn(data, 'errors')) {
                formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
            } else {
                formStatus.textContent = "Oops! There was a problem submitting your form.";
            }
            formStatus.style.color = "#dc3545";
            formStatus.style.display = "block";
        }
    } catch (error) {
        formStatus.textContent = "Oops! There was a problem submitting your form.";
        formStatus.style.color = "#dc3545";
        formStatus.style.display = "block";
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Request';
    }
});

// Scroll Reveal Effect
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(card);
});
