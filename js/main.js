document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS Animation com configurações otimizadas
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });

    // Navbar scroll effect aprimorado
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 50) {
            navbar.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll Down
            navbar.classList.add('scroll-down');
            navbar.classList.add('scrolled');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll Up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Smooth scrolling aprimorado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Fechar menu mobile
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }

                // Scroll suave com easing
                const targetPosition = target.offsetTop - 100;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Parallax removido para melhorar performance

    // Form animations
    const formControls = document.querySelectorAll('.form-control, .form-select');
    
    formControls.forEach(control => {
        // Label animation
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        control.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Validação com animação
        control.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });

    // Animação simplificada para depoimentos
    const testimonialCards = document.querySelectorAll('#depoimentos .card');
    testimonialCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            const stars = this.querySelectorAll('.testimonial-stars i');
            stars.forEach(star => {
                star.style.transform = 'scale(1.1)';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const stars = this.querySelectorAll('.testimonial-stars i');
            stars.forEach(star => {
                star.style.transform = 'scale(1)';
            });
        });
    });

    // Hover effects simplificados para cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});