document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Smooth scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.querySelector('i').classList.toggle('fa-times');
                menuToggle.querySelector('i').classList.toggle('fa-bars');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação ao rolar a página
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.friend-card, .fact-card, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez ao carregar a página
    
    // Efeito de digitação no hero (opcional)
    const heroText = document.querySelector('.hero-content p');
    if (heroText) {
        const originalText = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < originalText.length) {
                heroText.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 50);
    }
    
    // Carregamento de imagens lazy (opcional)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para browsers sem suporte a lazy loading
        const lazyLoad = function() {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            lazyImages.forEach(img => {
                if (img.getBoundingClientRect().top < window.innerHeight + 100 && 
                    img.getBoundingClientRect().bottom > 0 && 
                    getComputedStyle(img).display !== 'none') {
                    img.src = img.dataset.src;
                    img.removeAttribute('loading');
                }
            });
        };
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
        lazyLoad();
    }
});