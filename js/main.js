document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS Animation com configurações mais suaves
    AOS.init({
        duration: 1200,
        easing: 'ease-in-out-cubic',
        once: false,
        mirror: true,
        offset: 50
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

    // Parallax effect aprimorado
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });

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

    // Formulário de agendamento aprimorado
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animação do botão
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.style.width = submitButton.offsetWidth + 'px';
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<div class="spinner-grow spinner-grow-sm" role="status"></div>';
            submitButton.disabled = true;

            // Simular envio com animação
            setTimeout(() => {
                Swal.fire({
                    title: 'Agendamento Realizado!',
                    text: 'Entraremos em contato em breve para confirmar sua consulta.',
                    icon: 'success',
                    confirmButtonColor: '#BEA282',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });

                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Hover effects para cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(139, 33, 49, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});