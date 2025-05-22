// DOM Elements
const header = document.querySelector('header');
const themeToggle = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const contactForm = document.getElementById('contactForm');

// Create mobile menu elements
const mobileMenu = document.createElement('div');
mobileMenu.classList.add('mobile-menu');
mobileMenu.innerHTML = `
    <div class="close-menu">
        <i class="fas fa-times"></i>
    </div>
    <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
`;
document.body.appendChild(mobileMenu);

const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

const closeMenu = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

// Functions
function checkScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

function openMobileMenu() {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Update active nav link
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function handleContactFormSubmit(e) {
    // Formspree가 폼 제출을 처리하므로 기본 제출 동작을 막지 않습니다.
    // 단, 클라이언트 측 유효성 검사만 수행합니다.
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // 간단한 유효성 검사
    if (!name || !email || !message) {
        e.preventDefault();
        alert('모든 필드를 채워주세요.');
        return false;
    }
    
    // 폼이 유효하면 Formspree가 처리합니다
    return true;
}

// Event Listeners
window.addEventListener('scroll', checkScroll);
themeToggle.addEventListener('click', toggleTheme);
hamburger.addEventListener('click', openMobileMenu);
closeMenu.addEventListener('click', closeMobileMenu);
overlay.addEventListener('click', closeMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

// Handle form submission
if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
}

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1
});

sections.forEach(section => {
    observer.observe(section);
});

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleTheme();
    }
    
    // Initial check for scroll position
    checkScroll();
    
    // Add fade-in class to visible sections on load
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            section.classList.add('fade-in');
        }
    });
}); 