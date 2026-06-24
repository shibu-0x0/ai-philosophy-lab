document.addEventListener('DOMContentLoaded', () => {

    // 0. Theme: ブラウザ設定に従って自動適用
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
    };

    // ブラウザ設定を優先（手動切り替えなし）
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(systemPrefersLight ? 'light' : 'dark');

    // ブラウザ設定が変更されたときにリアルタイム反映
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        applyTheme(e.matches ? 'light' : 'dark');
    });


    // 1. Header scroll effect
    const header = document.querySelector('.site-header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // 2. Mobile navigation toggle (hamburger menu)
    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.querySelector('.site-nav');
    
    if (navToggle && siteNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.classList.toggle('open');
            siteNav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close mobile nav when clicking a menu link
        const navLinks = siteNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                siteNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 4. Active Navigation Link Highlighting on Scroll
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.site-nav a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${currentSectionId}` || (currentSectionId === null && href === '#')) {
                item.classList.add('active');
            }
        });
    });

    // 5. Portfolio Process Tab Switcher (AI & Philosophy Lab. Case Study)
    const processTabs = document.querySelectorAll('.process-tab');
    const processSlides = document.querySelectorAll('.process-slide');

    if (processTabs.length > 0 && processSlides.length > 0) {
        processTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active classes from all tabs
                processTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');

                // Hide all slides
                processSlides.forEach(slide => slide.classList.remove('active'));
                
                // Show targeted slide
                const targetId = tab.getAttribute('data-target');
                const targetSlide = document.getElementById(targetId);
                if (targetSlide) {
                    targetSlide.classList.add('active');
                }
            });
        });
    }
});
