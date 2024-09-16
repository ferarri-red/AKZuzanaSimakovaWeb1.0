'use strict'
console.log("Script loaded and running");

const form = document.getElementById('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            // Přesměrování na stránku "thanks.html" při úspěšném odeslání
            window.location.href = "https://zuzanasimakova.cz/html/thanks.html";
        } else {
            console.log(response);
            alert(json.message);
        }
    })
    .catch(error => {
        console.log(error);
        alert("Something went wrong!");
    })
    .then(function() {
        form.reset();
    });
});

// Funkce zastavení pozice menu
document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector('.menu');
    const contactForm = document.getElementById('contact-form');
    const offset = 20;  // Pozice zastaveného menu
    const initialPaddingTop = parseFloat(window.getComputedStyle(document.body).paddingTop);
    let lastScrollY = window.scrollY;
    let isMenuFixed = true;

    function checkScroll() {
        const menuHeight = menu.offsetHeight;
        const menuBottom = menu.getBoundingClientRect().bottom + window.scrollY;
        const contactTop = contactForm.getBoundingClientRect().top + window.scrollY;
        const currentScrollY = window.scrollY;

        if (menuBottom + offset >= contactTop && isMenuFixed) {
            // Menu se dostane nad contact-form, přepne se na absolutní
            menu.style.position = 'absolute';
            menu.style.top = (contactTop - menuHeight - offset) + 'px';
            isMenuFixed = false;
        } else if (currentScrollY < lastScrollY && !isMenuFixed) {
            // Pokud se scrolluje nahoru a menu bylo absolutní, vrátíme ho na fixní
            menu.style.position = 'fixed';
            menu.style.top = `${initialPaddingTop}px`; // Vrátíme původní padding body
            isMenuFixed = true;
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', checkScroll);
});

// Funkce posunutí na položky webu
document.querySelector('a[href="#contact-form"]').addEventListener('click', function(e) {
    e.preventDefault();
    const contactForm = document.getElementById('contact-form');
    const offset = 20;  // offset aby se menu neztratilo v contact-form
    const yOffset = -offset;
    const y = contactForm.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});
});

// Funkce rychlosti posunu
function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animationScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animationScroll);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animationScroll);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'), 500);  // 500ms = 0.5s
    });
});

// Cookies Local Storage save
document.addEventListener("DOMContentLoaded", function() {
    if (!localStorage.getItem('cookieConsent')) {
        document.querySelector('.cookie-banner').style.display = 'flex';
    }

    document.querySelector('.cookie-accept').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'true');
        document.querySelector('.cookie-banner').style.display = 'none';
    });
});



