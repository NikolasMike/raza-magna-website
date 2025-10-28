// ========================================
// RAZA MAGNA - JavaScript Principal
// ========================================

// 1. SMOOTH SCROLL para la navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 2. VALIDACIÓN Y ENVÍO DEL FORMULARIO
const form = document.querySelector('form');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const asunto = document.getElementById('asunto').value;
    const newsletter = document.getElementById('newsletter').checked;
    
    // Validación básica
    if (!nombre || nombre.length < 2) {
        alert('Por favor ingresa tu nombre completo');
        return;
    }
    
    if (!validarEmail(email)) {
        alert('Por favor ingresa un email válido');
        return;
    }
    
    if (!mensaje || mensaje.length < 10) {
        alert('El mensaje debe tener al menos 10 caracteres');
        return;
    }
    
    // Cambiar estado del botón
    const textoOriginal = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simular envío (aquí conectarías con tu backend o servicio)
    try {
        // Aquí irá tu lógica de envío real
        // Por ahora solo simulamos con un delay
        await simularEnvio({
            nombre,
            email,
            asunto,
            mensaje,
            newsletter
        });
        
        // Éxito
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto 🤘');
        form.reset();
        
    } catch (error) {
        // Error
        alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
        console.error('Error:', error);
    } finally {
        // Restaurar botón
        submitButton.textContent = textoOriginal;
        submitButton.disabled = false;
    }
});

// Función auxiliar: Validar formato de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función auxiliar: Simular envío (eliminar cuando tengas backend)
function simularEnvio(datos) {
    return new Promise((resolve) => {
        console.log('Datos del formulario:', datos);
        setTimeout(resolve, 1500); // Simula delay de red
    });
}

// 3. ANIMACIÓN AL HACER SCROLL (opcional)
// Detectar cuando las secciones entran en viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a todas las secciones
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// 4. MENÚ RESPONSIVE (opcional - para móviles)
// Puedes agregar esto si quieres un menú hamburguesa
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        const nav = document.querySelector('.nav ul');
        nav.classList.toggle('show');
    });
}

// 5. MENSAJE DE BIENVENIDA (solo primera vez)
window.addEventListener('load', () => {
    const primeraVisita = !localStorage.getItem('visitado');
    
    if (primeraVisita) {
        console.log('🤘 Bienvenido a Raza Magna - Heavy Metal desde Costa Rica 🤘');
        localStorage.setItem('visitado', 'true');
    }
});

// 6. PREVENIR SPAM EN EL FORMULARIO
let ultimoEnvio = 0;
const TIEMPO_MINIMO = 5000; // 5 segundos entre envíos

form.addEventListener('submit', (e) => {
    const ahora = Date.now();
    if (ahora - ultimoEnvio < TIEMPO_MINIMO) {
        e.preventDefault();
        alert('Por favor espera un momento antes de enviar otro mensaje');
        return;
    }
    ultimoEnvio = ahora;
});

console.log('✓ JavaScript de Raza Magna cargado correctamente');