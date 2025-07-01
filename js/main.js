document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle'); // Select all theme toggle buttons
    const body = document.body;

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Apply the saved theme
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggles.forEach(toggle => toggle.innerHTML = '<i class="fas fa-sun"></i>');
    } else {
        body.removeAttribute('data-theme');
        themeToggles.forEach(toggle => toggle.innerHTML = '<i class="fas fa-moon"></i>');
    }

    // Toggle theme on button click for each toggle button
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            if (body.hasAttribute('data-theme')) {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggles.forEach(t => t.innerHTML = '<i class="fas fa-moon"></i>');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggles.forEach(t => t.innerHTML = '<i class="fas fa-sun"></i>');
            }
            updateTranslations();
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const closeSidebar = document.querySelector('.close-sidebar');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeSidebar.addEventListener('click', function () {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    sidebarOverlay.addEventListener('click', function () {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close sidebar when clicking on a link
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Hero Carousel
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselIndicators = document.querySelector('.carousel-indicators');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;

    // Create indicators
    carouselSlides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        carouselIndicators.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.carousel-indicator');

    function updateCarousel() {
        carouselSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
        resetCarouselInterval();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        updateCarousel();
    }

    function resetCarouselInterval() {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 5000);
    }

    nextBtn.addEventListener('click', function () {
        nextSlide();
        resetCarouselInterval();
    });

    prevBtn.addEventListener('click', function () {
        prevSlide();
        resetCarouselInterval();
    });

    // Auto-advance carousel
    let carouselInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    const heroCarousel = document.querySelector('.hero-carousel');
    heroCarousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    heroCarousel.addEventListener('mouseleave', () => {
        resetCarouselInterval();
    });

    // Testimonials Carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialIndicators = document.querySelector('.testimonial-indicators');
    const testimonialPrevBtn = document.querySelector('.testimonial-prev');
    const testimonialNextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    // Create indicators
    testimonialSlides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('testimonial-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToTestimonial(index));
        testimonialIndicators.appendChild(indicator);
    });

    const testimonialIndicatorsList = document.querySelectorAll('.testimonial-indicator');

    function updateTestimonialCarousel() {
        testimonialSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentTestimonial);
        });

        testimonialIndicatorsList.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentTestimonial);
        });
    }

    function goToTestimonial(slideIndex) {
        currentTestimonial = slideIndex;
        updateTestimonialCarousel();
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        updateTestimonialCarousel();
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
        updateTestimonialCarousel();
    }

    testimonialNextBtn.addEventListener('click', nextTestimonial);
    testimonialPrevBtn.addEventListener('click', prevTestimonial);

    // Cart functionality with toast notifications
    const cartBtn = document.querySelector('.cart-btn');
    const cartCount = document.querySelector('.cart-count');
    const toastNotification = document.querySelector('.toast-notification');
    let cartItems = 0;

    function showToast() {
        toastNotification.classList.add('show');

        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 3000);
    }

    document.querySelectorAll('.btn-outline').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            cartItems++;
            cartCount.textContent = cartItems;

            // Cart animation
            cartBtn.classList.add('animate');
            setTimeout(() => cartBtn.classList.remove('animate'), 500);

            // Show toast notification
            showToast();
        });
    });

    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Intersection Observer for Section Animations
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Language Translation
    const translations = {
        en: {
            "nav.shop": "Home",
            "nav.categories": "Categories",
            "nav.offers": "About",
            "nav.about": "Contact Us",
            "topbar.login": "Login",
            "hero.title1": "Radiant Beauty Starts Here",
            "hero.text1": "Discover our vegan, cruelty-free cosmetics for your perfect glow",
            "hero.cta": "Shop Now",
            "hero.title2": "Summer Glow Collection",
            "hero.text2": "Limited edition products for your sun-kissed look",
            "hero.cta2": "Explore",
            "hero.title3": "Luxury Matte Lipsticks",
            "hero.text3": "24-hour wear with nourishing ingredients",
            "hero.cta3": "View Collection",
            "hero.title4": "Complete Skincare System",
            "hero.text4": "Transform your skin in just 7 days",
            "hero.cta4": "Shop Skincare",
            "sections.categories": "Shop By Category",
            "sections.about": "Our Story",
            "sections.testimonials": "What Our Customers Say",
            "categories.skincare": "Skin Care",
            "categories.makeup": "Makeup",
            "categories.bodycare": "Body Care",
            "general.addToCart": "Add to Cart",
            "about.text1": "Founded in 2018, Cold Azzel was born from a passion for clean, effective beauty products that enhance your natural radiance without compromise.",
            "about.text2": "We believe in cruelty-free, vegan formulations that deliver luxurious results while being kind to your skin and the planet.",
            "stats.customers": "Happy Customers",
            "stats.years": "Years of Experience",
            "stats.crueltyFree": "Cruelty-Free",
            "testimonials.text1": "\"The Vitamin C Serum transformed my skin! I've never received so many compliments. Cold Azzel is now my go-to for all skincare.\"",
            "testimonials.text2": "\"The matte lipsticks are incredible! They last all day without drying my lips. The colors are perfect for every occasion.\"",
            "testimonials.text3": "\"I love that Cold Azzel products are vegan and cruelty-free. The quality is outstanding and the packaging is beautiful.\"",
            "testimonials.verified": "Verified Buyer",
            "newsletter.title": "Join Our Beauty Community",
            "newsletter.text": "Subscribe to get exclusive offers, beauty tips, and early access to new products.",
            "form.email": "Your email address",
            "form.subscribe": "Subscribe",
            "footer.tagline": "Premium vegan beauty products for your radiant glow.",
            "footer.shop": "Shop",
            "footer.help": "Help",
            "footer.about": "About",
            "footer.contact": "Contact Us",
            "footer.faq": "FAQs",
            "footer.shipping": "Shipping & Returns",
            "footer.track": "Track Order",
            "footer.newArrivals": "New Arrivals",
            "footer.blog": "Blog",
            "footer.careers": "Careers",
            "footer.press": "Press",
            "footer.copyright": "© 2023 Cold Azzel. All rights reserved.",
            "theme.dark": "Dark Mode",
            "theme.light": "Light Mode",
            "notification.added": "Item added to cart!"
        },
        ar: {
            "nav.shop": "الرئيسيه",
            "nav.categories": "الفئات",
            "nav.offers": "من نحن",
            "nav.about": "اتصل بنا",
            "topbar.login": "تسجيل الدخول",
            "hero.title1": "الجمال المشع يبدأ هنا",
            "hero.text1": "اكتشف مستحضرات التجميل النباتية والخالية من القسوة للحصول على توهجك المثالي",
            "hero.cta": "تسوق الآن",
            "hero.title2": "مجموعة الإشراق الصيفي",
            "hero.text2": "منتجات محدودة الإصدار لمظهرك المشمس",
            "hero.cta2": "استكشف",
            "hero.title3": "أحمر شفاه مات فاخر",
            "hero.text3": "يدوم لمدة 24 ساعة مع مكونات مغذية",
            "hero.cta3": "عرض المجموعة",
            "hero.title4": "نظام العناية بالبشرة الكامل",
            "hero.text4": "حول بشرتك في 7 أيام فقط",
            "hero.cta4": "تسوق العناية بالبشرة",
            "sections.categories": "تسوق حسب الفئة",
            "sections.about": "قصتنا",
            "sections.testimonials": "ما يقوله عملاؤنا",
            "categories.skincare": "العناية بالبشرة",
            "categories.makeup": "مكياج",
            "categories.bodycare": "العناية بالجسم",
            "general.addToCart": "أضف إلى السلة",
            "about.text1": "تأسست كولد أزيل في عام 2018 من شغف بمنتجات التجميل النظيفة والفعالة التي تعزز إشراقتك الطبيعية دون أي مساومة.",
            "about.text2": "نؤمن بالتركيبات النباتية والخالية من القسوة التي تقدم نتائج فاخرة مع الحفاظ على بشرتك وكوكب الأرض.",
            "stats.customers": "عميل سعيد",
            "stats.years": "سنوات من الخبرة",
            "stats.crueltyFree": "خالي من القسوة",
            "testimonials.text1": "\"غير سيروم فيتامين سي بشرتي تمامًا! لم أحصل على هذا العدد من الإطراءات من قبل. كولد أزيل أصبح الآن وجهتي الأولى لكل ما يخص العناية بالبشرة.\"",
            "testimonials.text2": "\"أحمر الشفاه المات رائع! يدوم طوال اليوم دون أن يجفف شفتي. الألوان مثالية لكل المناسبات.\"",
            "testimonials.text3": "\"أحب أن منتجات كولد أزيل نباتية وخالية من القسوة. الجودة استثنائية والتغليف جميل.\"",
            "testimonials.verified": "مشتري موثوق",
            "newsletter.title": "انضم إلى مجتمع الجمال لدينا",
            "newsletter.text": "اشترك للحصول على عروض حصرية ونصائح تجميل ووصول مبكر إلى المنتجات الجديدة.",
            "form.email": "عنوان بريدك الإلكتروني",
            "form.subscribe": "اشتراك",
            "footer.tagline": "منتجات تجميل نباتية فاخرة لتوهجك المشع.",
            "footer.shop": "تسوق",
            "footer.help": "مساعدة",
            "footer.about": "من نحن",
            "footer.contact": "اتصل بنا",
            "footer.faq": "الأسئلة الشائعة",
            "footer.shipping": "الشحن والإرجاع",
            "footer.track": "تتبع الطلب",
            "footer.newArrivals": "وصل حديثاً",
            "footer.blog": "المدونة",
            "footer.careers": "الوظائف",
            "footer.press": "الصحافة",
            "footer.copyright": "© 2023 كولد أزيل. جميع الحقوق محفوظة.",
            "theme.dark": "الوضع المظلم",
            "theme.light": "الوضع المضيء",
            "notification.added": "تمت إضافة المنتج إلى السلة!"
        }
    };

    // Language Toggle Functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = 'en';

    function updateTranslations() {
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

        // Update all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[currentLang][key]) {
                el.placeholder = translations[currentLang][key];
            }
        });

        // Update active button
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });
    }

    // Initialize language
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    currentLang = savedLang;
    updateTranslations();

    // Language toggle event
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            localStorage.setItem('preferredLang', currentLang);
            updateTranslations();
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput.value) {
            alert(currentLang === 'en' ? 'Thank you for subscribing!' : 'شكرًا لك على الاشتراك!');
            emailInput.value = '';
        }
    });
});