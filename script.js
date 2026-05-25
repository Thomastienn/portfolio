// Smooth scroll for in-page nav
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Reveal-on-scroll
const reveals = document.querySelectorAll('.section');
reveals.forEach((el) => el.classList.add('reveal'));

const io = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.08 }
);

reveals.forEach((el) => io.observe(el));

// Active nav-link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function syncActiveNav() {
    let current = '';
    const offset = 220;
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - offset) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach((link) => {
        link.classList.toggle(
            'is-active',
            link.getAttribute('href') === `#${current}`
        );
    });
}

window.addEventListener('scroll', syncActiveNav, { passive: true });
syncActiveNav();

// Clickable project cards
document.querySelectorAll('.project-card[data-href]').forEach((card) => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const href = card.getAttribute('data-href');
        if (href) window.location.href = href;
    });
});
