document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            offset: 80,
            once: true,
            easing: 'ease-in-out-quad'
        });
    } else {
        console.warn('AOS library not loaded.');
    }

    // Logo Animation with Welding Sparks
    const logo = document.getElementById('mainLogo');
    let canAnimate = true;

    function createSpark(x, y) {
        try {
            const spark = document.createElement('div');
            spark.className = 'welding-spark';
            
            spark.style.left = x + 'px';
            spark.style.top = y + 'px';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const sparkX = Math.cos(angle) * distance;
            const sparkY = Math.sin(angle) * distance + 50;
            
            spark.style.setProperty('--spark-x', `${sparkX}px`);
            spark.style.setProperty('--spark-y', `${sparkY}px`);
            
            document.body.appendChild(spark);
            
            setTimeout(() => {
                if (spark && spark.parentNode) {
                    spark.remove();
                }
            }, 800);
        } catch (error) {
            console.error('Error creating spark:', error);
        }
    }

    function createWeldingSparks(logoElement) {
        if (!logoElement) return;
        
        try {
            const rect = logoElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const sparkX = centerX + (Math.random() - 0.5) * 20;
                    const sparkY = centerY + (Math.random() - 0.5) * 20;
                    createSpark(sparkX, sparkY);
                }, i * 50);
            }
        } catch (error) {
            console.error('Error creating welding sparks:', error);
        }
    }

    function animateLogo() {
        if (!logo) return;
        
        if (canAnimate) {
            try {
                canAnimate = false;
                logo.classList.add('animate');
                createWeldingSparks(logo);
                
                setTimeout(() => {
                    logo.classList.remove('animate');
                    canAnimate = true;
                }, 800);
            } catch (error) {
                console.error('Error animating logo:', error);
                canAnimate = true;
            }
        }
    }

    if (logo) {
        setInterval(() => {
            if (Math.random() > 0.7) {
                animateLogo();
            }
        }, 4000);
    }

    // Brand colors for flashing effect
    const brandColors = [
        'var(--brand-primary)',
        'var(--brand-secondary)',
        'var(--brand-accent)',
        'var(--brand-dark)',
        'var(--brand-blue)',
        'var(--brand-grey)'
    ];

    // Enhanced Text Animation with Sparks
    const animateText = () => {
        const texts = document.querySelectorAll('.animate-text');
        texts.forEach(text => {
            if (!text) return;
            try {
                const originalWords = text.textContent.split(' ');
                text.textContent = ''; 
                const wordSpansForThisTextBlock = [];

                let maxDelayForThisBlock = 0;
                
                originalWords.forEach((word, wordIndex) => {
                    const wordSpan = document.createElement('span');
                    wordSpan.style.display = 'inline-block';
                    wordSpan.style.whiteSpace = 'nowrap';
                    wordSpansForThisTextBlock.push(wordSpan);
                    
                    const letters = word.split('');
                    letters.forEach((letter, letterIndex) => {
                        const span = document.createElement('span');
                        span.textContent = letter;
                        span.style.opacity = '0';
                        span.style.transform = 'translateY(20px)';
                        span.style.display = 'inline-block';
                        if (letterIndex === letters.length - 1) {
                            span.style.marginRight = '0';
                        }
                        wordSpan.appendChild(span);
                        
                        const currentLetterIntroDelay = (100 * wordIndex) + (30 * letterIndex);
                        maxDelayForThisBlock = Math.max(maxDelayForThisBlock, currentLetterIntroDelay);
                        
                        setTimeout(() => {
                            span.style.transition = 'all 0.5s ease';
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                            
                            if (Math.random() > 0.8) {
                                setTimeout(() => {
                                    span.classList.add('xray-text');
                                    setTimeout(() => {
                                        span.classList.remove('xray-text');
                                    }, 500);
                                }, Math.random() * 1000);
                            }
                        }, currentLetterIntroDelay);
                    });
                    text.appendChild(wordSpan);
                });

                const initialAnimationsEndTime = maxDelayForThisBlock + 500 + 700 + 300;

                setTimeout(() => {
                    if (wordSpansForThisTextBlock.length > 0) {
                        setInterval(() => {
                            const randomWordSpanToSpark = wordSpansForThisTextBlock[Math.floor(Math.random() * wordSpansForThisTextBlock.length)];
                            if (randomWordSpanToSpark) {
                                const lettersToSpark = randomWordSpanToSpark.querySelectorAll('span');
                                if (lettersToSpark.length > 0) {
                                    lettersToSpark.forEach(s => s.classList.add('xray-text'));
                                    setTimeout(() => {
                                        lettersToSpark.forEach(s => s.classList.remove('xray-text'));
                                    }, 500);
                                }
                            }
                        }, 2500);
                    }
                }, initialAnimationsEndTime);
            } catch (error) {
                console.error('Error in animateText for element:', text, error);
            }
        });
    };
    
    // Initialize text animation
    setTimeout(animateText, 500);

    // --- Custom Cursor Logic (Minimalist) ---
    const bodyForCursor = document.body;
    if (bodyForCursor && bodyForCursor.classList.contains('custom-cursor-active')) {
        try {
            const cursorDot = document.createElement('div');
            cursorDot.classList.add('custom-cursor', 'cursor-dot');
            bodyForCursor.appendChild(cursorDot);

            const cursorOutline = document.createElement('div');
            cursorOutline.classList.add('custom-cursor', 'cursor-outline');
            bodyForCursor.appendChild(cursorOutline);
            
            cursorDot.style.display = 'block';
            cursorOutline.style.display = 'block';

            let mouseX = 0, mouseY = 0;
            let dotX = 0, dotY = 0;
            let outlineX = 0, outlineY = 0;
            let raf;

            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animateCursor() {
                dotX += (mouseX - dotX) * 0.7;
                dotY += (mouseY - dotY) * 0.7;
                cursorDot.style.transform = `translate(${dotX - cursorDot.offsetWidth / 2}px, ${dotY - cursorDot.offsetHeight / 2}px)`;

                outlineX += (mouseX - outlineX) * 0.15;
                outlineY += (mouseY - outlineY) * 0.15;
                cursorOutline.style.transform = `translate(${outlineX - cursorOutline.offsetWidth / 2}px, ${outlineY - cursorOutline.offsetHeight / 2}px)`;

                raf = requestAnimationFrame(animateCursor);
            }
            raf = requestAnimationFrame(animateCursor);

            const interactiveElements = document.querySelectorAll('a, button, input[type="text"], input[type="email"], textarea, .service-card, .portfolio-item');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover-effect'));
                el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover-effect'));
            });

            document.addEventListener('mouseleave', () => {
                cursorDot.style.opacity = '0';
                cursorOutline.style.opacity = '0';
            });
            document.addEventListener('mouseenter', () => {
                cursorDot.style.opacity = '1';
                cursorOutline.style.opacity = '0.8';
            });
        } catch (error) {
            console.error('Error in custom cursor logic:', error);
        }
    }
    // --- End Custom Cursor Logic ---

    // --- Navigation Bar Scroll Effect ---
    const navBar = document.querySelector('.top-bar');
    if (navBar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navBar.classList.add('scrolled');
            } else {
                navBar.classList.remove('scrolled');
            }
        });
    }

    // --- Smooth Scrolling for Nav Links ---
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .cta-button[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navBarHeight = navBar && navBar.classList.contains('scrolled') ? navBar.offsetHeight : (navBar ? navBar.offsetHeight -10 : 0);
                    let elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - navBarHeight - 15;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Contact Form Submission Simulation ---
    const contactForm = document.querySelector('.contact-form form'); // Target the form element itself
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                setTimeout(() => {
                    submitButton.textContent = 'Sent!';
                    contactForm.reset();
                    setTimeout(() => {
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                    }, 2500);
                }, 1500);
            }
        });
    }
    
    // --- Mobile Navigation Toggle ---
    const navContent = document.querySelector('.nav-content');
    if (navContent) {
        const navMenuLinks = navContent.querySelector('.nav-links');
        const menuToggle = document.createElement('button');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.classList.add('mobile-menu-toggle');
        menuToggle.setAttribute('aria-label', 'Toggle navigation');
        menuToggle.setAttribute('aria-expanded', 'false');

        if (navMenuLinks && navMenuLinks.parentNode) { // Ensure navMenuLinks and its parentNode exist
            if (navMenuLinks.previousElementSibling) {
                navMenuLinks.parentNode.insertBefore(menuToggle, navMenuLinks);
            } else {
                 navContent.appendChild(menuToggle);
            }
           
            menuToggle.addEventListener('click', () => {
                if (navMenuLinks) {
                    const isActive = navMenuLinks.classList.toggle('active');
                    menuToggle.setAttribute('aria-expanded', isActive);
                    menuToggle.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
                }
            });
        }
    }

    // --- Update current year in footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Portfolio Horizontal Scroll
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    if (scrollLeftBtn && scrollRightBtn && portfolioGrid) {
        const scrollAmount = 400;

        scrollLeftBtn.addEventListener('click', () => {
            portfolioGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            portfolioGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        portfolioGrid.addEventListener('scroll', () => {
            const maxScroll = portfolioGrid.scrollWidth - portfolioGrid.clientWidth;
            scrollLeftBtn.style.opacity = portfolioGrid.scrollLeft === 0 ? '0.5' : '1';
            scrollRightBtn.style.opacity = portfolioGrid.scrollLeft >= maxScroll -1 ? '0.5' : '1'; // -1 for precision
        });
        // Initial check
        if (portfolioGrid.scrollWidth <= portfolioGrid.clientWidth) {
            scrollLeftBtn.style.opacity = '0.5';
            scrollRightBtn.style.opacity = '0.5';
        }
    }

    // Initialize Google Maps
    function initMap() {
        try {
            const mapElement = document.getElementById('map');
            if (!mapElement) {
                console.warn('Map element not found.');
                return;
            }
            const johannesburg = { lat: -26.2041, lng: 28.0473 };
            const map = new google.maps.Map(mapElement, {
                zoom: 12,
                center: johannesburg,
                // Minimalist map styles (optional, add your styles here if needed)
                 styles: [
                    { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
                    { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
                    { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
                    { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
                    { featureType: 'administrative.land_parcel', stylers: [{ visibility: 'off' }] },
                    { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] },
                    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
                    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
                    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
                    { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
                    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
                    { featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
                    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#dadada' }] },
                    { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
                    { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
                    { featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
                    { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
                    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9c9c9' }] },
                    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] }
                ]
            });

            new google.maps.Marker({
                position: johannesburg,
                map: map,
                title: "Wayne's Welding Works"
            });
        } catch (error) {
            console.error('Error initializing Google Map:', error);
        }
    }
    window.initMap = initMap; // Make initMap global for Google Maps API callback

    // Load Google Maps API only if the map element exists
    if (document.getElementById('map')) {
        const mapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key
        if (mapsApiKey === 'YOUR_GOOGLE_MAPS_API_KEY' || mapsApiKey === '') {
            console.warn('Google Maps API Key is not set. Map will not load.');
            const mapContainer = document.getElementById('map');
            if (mapContainer) {
                mapContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Map could not be loaded. API key missing.</p>';
            }
        } else {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        }
    }
}); 