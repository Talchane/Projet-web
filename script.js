document.addEventListener('DOMContentLoaded', () => {

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');

            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(item => item.style.animation = '');
        });
    });

    const heroSection = document.querySelector('.hero');
    const dots = document.querySelectorAll('.dot');

    const sliderImages = [
        'assets/hero-home.jpg',
        'assets/dest-ushuaia.jpg',
        'assets/dest-iguazu.jpg'
    ];

    let currentSlide = 0;
    const slideInterval = 5000;

    if (heroSection && dots.length > 0) {

        function changeSlide(index) {
            dots.forEach(dot => dot.classList.remove('active'));

            currentSlide = index;
            if (currentSlide >= sliderImages.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = sliderImages.length - 1;

            heroSection.style.backgroundImage = `url('${sliderImages[currentSlide]}')`;

            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
        }

        let autoSlide = setInterval(() => {
            changeSlide(currentSlide + 1);
        }, slideInterval);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(autoSlide);
                changeSlide(index);
                autoSlide = setInterval(() => {
                    changeSlide(currentSlide + 1);
                }, slideInterval);
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const captchaInput = document.querySelector('.captcha-box');
            const captchaValue = parseInt(captchaInput.value);

            if (captchaValue !== 17) {
                alert("Erreur de calcul ! Prouvez que vous n'êtes pas un robot 🤖 (9 + 8 = ?)");
                captchaInput.style.border = "2px solid red";
                return;
            }

            captchaInput.style.border = "1px solid #ccc";
            alert("Merci pour votre message ! Il a bien été envoyé (simulation). ✈️");
            contactForm.reset();
        });
    }

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.overlay h3');
            if (overlay) overlay.style.borderColor = "#d4af37";
        });
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.overlay h3');
            if (overlay) overlay.style.borderColor = "white";
        });
    });

});
