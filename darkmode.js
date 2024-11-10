const body = document.body;
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const navbar = document.querySelector('.navbar');
const logo = document.querySelector('.navbar-brand img');

if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
}

function enableDarkMode() {
    body.classList.add('dark-mode');
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('dark-mode');
    }
    if (navbar) {
        navbar.setAttribute('data-bs-theme', 'dark');
    }
    if (logo) {
        logo.src = 'images/logodark.jpg';  
    }

    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    const header = document.querySelector('header');
    if (header) {
        header.classList.remove('dark-mode');
    }
    if (navbar) {
        navbar.removeAttribute('data-bs-theme');
    }
    if (logo) {
        logo.src = 'images/Recipe Finder (1).png';  
    }
    if(faqSection){
faqSection.classList.remove('dark-mode');}
    localStorage.setItem('darkMode', 'disabled');
}

if (toggleDarkModeButton) {
    toggleDarkModeButton.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
}
