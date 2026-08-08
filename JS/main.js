// Raza Magna — main.js

const CONFIG = {
  submitCooldownMs: 5000,
  minNameLength: 2,
  minMessageLength: 10,
};

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initContactForm();
  initScrollReveal();
  initMobileNav();
});

// ---------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  if (!navToggle) return;

  navToggle.addEventListener('click', () => {
    document.querySelector('.nav ul')?.classList.toggle('show');
  });
}

// ---------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------

function initContactForm() {
  const form = document.querySelector('form');
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  let lastSubmitTime = 0;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitTime < CONFIG.submitCooldownMs) {
      alert('Por favor espera un momento antes de enviar otro mensaje');
      return;
    }

    const data = getFormData(form);
    const error = validateFormData(data);
    if (error) {
      alert(error);
      return;
    }

    lastSubmitTime = now;
    await submitForm(data, form, submitButton);
  });
}

function getFormData(form) {
  return {
    nombre: form.querySelector('#nombre').value.trim(),
    email: form.querySelector('#email').value.trim(),
    asunto: form.querySelector('#asunto').value,
    mensaje: form.querySelector('#mensaje').value.trim(),
    newsletter: form.querySelector('#newsletter').checked,
  };
}

function validateFormData({ nombre, email, mensaje }) {
  if (!nombre || nombre.length < CONFIG.minNameLength) {
    return 'Por favor ingresa tu nombre completo';
  }
  if (!isValidEmail(email)) {
    return 'Por favor ingresa un email válido';
  }
  if (!mensaje || mensaje.length < CONFIG.minMessageLength) {
    return `El mensaje debe tener al menos ${CONFIG.minMessageLength} caracteres`;
  }
  return null;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function submitForm(data, form, submitButton) {
  const originalLabel = submitButton.textContent;
  submitButton.textContent = 'Enviando...';
  submitButton.disabled = true;

  try {
    await sendContactRequest(data);
    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto 🤘');
    form.reset();
  } catch (err) {
    alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
    console.error('Contact form submission failed:', err);
  } finally {
    submitButton.textContent = originalLabel;
    submitButton.disabled = false;
  }
}

// Replace with a real API call once the backend endpoint is ready
function sendContactRequest(data) {
  return new Promise((resolve) => {
    console.log('Form payload:', data);
    setTimeout(resolve, 1500);
  });
}

// ---------------------------------------------------------------
// Scroll reveal
// ---------------------------------------------------------------

function initScrollReveal() {
  const sections = document.querySelectorAll('section');
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
  );

  sections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}
