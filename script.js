document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. NAVIGATION MOBILE (BURGER MENU)
       ========================================= */
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Burger Animation
            burger.classList.toggle('toggle');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // Fermer le menu si on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(item => item.style.animation = '');
        });
    });


    /* =========================================
       2. HERO SLIDER (Background Change)
       ========================================= */
    const heroSection = document.querySelector('.hero');
    const dots = document.querySelectorAll('.dot');

    // Images de fond pour le slider (assurez-vous que ces images existent dans assets/)
    // On utilise celles déjà présentes ou logiques par rapport au thème
    const sliderImages = [
        'assets/hero-home.jpg',   // Image 1 (Défaut)
        'assets/dest-ushuaia.jpg', // Image 2
        'assets/dest-iguazu.jpg'   // Image 3
    ];

    let currentSlide = 0;
    const slideInterval = 5000; // 5 secondes

    // Ne lancer le slider que si on a des points de navigation (donc sur la home)
    if (heroSection && dots.length > 0) {

        function changeSlide(index) {
            // Reset dots
            dots.forEach(dot => dot.classList.remove('active'));

            // Update index safely
            currentSlide = index;
            if (currentSlide >= sliderImages.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = sliderImages.length - 1;

            // Change Background
            heroSection.style.backgroundImage = `url('${sliderImages[currentSlide]}')`;

            // Active dot
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
        }

        // Auto Slide
        let autoSlide = setInterval(() => {
            changeSlide(currentSlide + 1);
        }, slideInterval);

        // Manual Click on Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(autoSlide); // Stop timer on interaction
                changeSlide(index);
                // Restart timer
                autoSlide = setInterval(() => {
                    changeSlide(currentSlide + 1);
                }, slideInterval);
            });
        });
    }


    /* =========================================
       3. SMOOTH SCROLLING (Navigation)
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Ajustement pour la navbar sticky
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


    /* =========================================
       4. FORM VALIDATION & CAPTCHA
       ========================================= */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Captcha simple : 9 + 8 = 17
            const captchaInput = document.querySelector('.captcha-box');
            const captchaValue = parseInt(captchaInput.value);

            if (captchaValue !== 17) {
                alert("Erreur de calcul ! Prouvez que vous n'êtes pas un robot 🤖 (9 + 8 = ?)");
                captchaInput.style.border = "2px solid red";
                return;
            }

            // Si tout est OK
            captchaInput.style.border = "1px solid #ccc";
            alert("Merci pour votre message ! Il a bien été envoyé (simulation). ✈️");
            contactForm.reset();
        });
    }

    /* =========================================
       5. INTERACTIVE CARDS (Animation extra)
       ========================================= */
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.overlay h3');
            if (overlay) overlay.style.borderColor = "#d4af37"; // Or
        });
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.overlay h3');
            if (overlay) overlay.style.borderColor = "white";
        });
    });

});
