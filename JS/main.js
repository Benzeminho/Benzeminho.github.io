// Menu mobile toggle
const menuIcon = document.getElementById('menuIcon');
const mainNav = document.getElementById('mainNav');

menuIcon.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

// Fermer le menu au clic sur un lien
const navLinks = mainNav.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mainNav.classList.remove('active');
        }
    });
});

// Fermer le menu en cliquant en dehors
document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
        mainNav.classList.remove('active');
    }
});

// Smooth scroll pour les ancres
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