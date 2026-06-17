document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded');

    // ----- HAMBURGER MENU (FIXED FOR MOBILE) -----
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    function toggleMenu(e) {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (hamburger && navMenu) {
        // Both click and touch for mobile
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('touchstart', toggleMenu, { passive: false });

        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ----- SWIPERS -----
    new Swiper('.projects-swiper', {
        loop: true, slidesPerView: 1, spaceBetween: 20, autoplay: { delay: 3030, disableOnInteraction: false },
        breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });
    new Swiper('.photos-swiper', {
        loop: true, slidesPerView: 1, spaceBetween: 20, autoplay: { delay: 3030, disableOnInteraction: false },
        breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true }
    });

    // ==========================================================
    // YOUTUBE VIDEO MODAL
    // ==========================================================
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeBtn = document.querySelector('.close-btn');

    function extractVideoId(url) {
        if (!url) return null;
        let match = url.match(/(?:youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^?&]+)/);
        if (match) return match[1];
        match = url.match(/youtube\.com\/watch\?v=([^&]+)/);
        if (match) return match[1];
        match = url.match(/youtube\.com\/shorts\/([^?&]+)/);
        if (match) return match[1];
        if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
        return null;
    }

    function playVideo(videoUrl) {
        if (!videoUrl) { alert('No video URL found!'); return; }
        const videoId = extractVideoId(videoUrl);
        if (!videoId) { alert('Invalid YouTube link!'); return; }
        const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&controls=1&rel=0&showinfo=0&iv_load_policy=3&enablejsapi=1`;
        modalVideo.src = embedUrl;
        modalVideo.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        modalVideo.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
        modalVideo.setAttribute('allowfullscreen', 'true');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalVideo.onerror = function() { console.warn('YouTube embed failed'); };
    }

    document.querySelectorAll('.project-card.video-card, .video-card').forEach(card => {
        card.addEventListener('click', function (e) {
            e.stopPropagation();
            const videoUrl = this.dataset.video;
            if (videoUrl) playVideo(videoUrl);
            else alert('No video URL found on this card.');
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        modalVideo.src = '';
        document.body.style.overflow = '';
    }
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });

    // ----- SMOOTH SCROLLING -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ----- ACTIVE LINK HIGHLIGHTING -----
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
        if (current === 'home') { header.classList.add('section-home'); header.classList.remove('section-other'); }
        else if (current) { header.classList.add('section-other'); header.classList.remove('section-home'); }
    });

    // ----- IGNORE GOOGLE ADS ERRORS -----
    window.addEventListener('error', e => {
        if (e.target.src && (e.target.src.includes('doubleclick') || e.target.src.includes('googlead'))) {
            e.stopPropagation(); e.preventDefault(); return false;
        }
    }, true);

    // ----- TYPED.JS -----
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: ["Mechanical Engineer", "DIY Innovator", "Problem Solver", "3D Printing Expert"],
            typeSpeed: 80, backSpeed: 40, backDelay: 1500, loop: true
        });
    }

    // ----- COUNTER ANIMATION -----
    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        document.querySelectorAll('.counter-number').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let step = 0;
            const update = () => {
                step++;
                current += increment;
                if (step < steps) {
                    if (target >= 1000) counter.innerText = Math.floor(current).toLocaleString();
                    else counter.innerText = Math.ceil(current);
                    setTimeout(update, duration / steps);
                } else {
                    counter.innerText = target;
                }
            };
            update();
        });
    }

    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.counter-item').forEach((item, index) => {
                        setTimeout(() => item.classList.add('visible'), index * 150);
                    });
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(counterSection);
    }

    // ==========================================================
    // SHOWCASE VIDEO PLAY/PAUSE
    // ==========================================================
    const videoSection = document.getElementById('bg-video');
    const video = document.getElementById('myVideo');
    const muteBtn = document.getElementById('muteToggle');
    const muteIcon = document.getElementById('muteIcon');
    let userPaused = false;

    if (videoSection && video) {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        function isInViewport(el) {
            const rect = el.getBoundingClientRect();
            const thresh = isMobile ? 50 : 0;
            return rect.top <= (window.innerHeight + thresh) && rect.bottom >= -thresh;
        }
        function handlePlayback() {
            if (userPaused) {
                video.pause();
                document.querySelector('.mobile-hint')?.classList.remove('hidden');
                return;
            }
            if (isInViewport(videoSection)) {
                video.play().catch(e => console.log('Autoplay prevented', e));
                document.querySelector('.mobile-hint')?.classList.add('hidden');
            } else {
                video.pause();
                if (video.paused) document.querySelector('.mobile-hint')?.classList.remove('hidden');
            }
        }
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => { handlePlayback(); ticking = false; });
                ticking = true;
            }
        });
        setTimeout(handlePlayback, 500);

        if (muteBtn && video) {
            let muted = true;
            const toggleMute = (e) => {
                e.preventDefault();
                if (muted) { video.muted = false; muteIcon.className = 'fas fa-volume-up'; muted = false; }
                else { video.muted = true; muteIcon.className = 'fas fa-volume-mute'; muted = true; }
            };
            muteBtn.addEventListener('click', toggleMute);
            muteBtn.addEventListener('touchstart', toggleMute);
        }

        const playPauseBtn = document.getElementById('playPauseToggle');
        const playPauseIcon = document.getElementById('playPauseIcon');
        if (playPauseBtn && video) {
            function togglePlayPause(e) {
                e.preventDefault(); e.stopPropagation();
                if (video.paused) { userPaused = false; video.play(); playPauseIcon.className = 'fas fa-pause'; }
                else { userPaused = true; video.pause(); playPauseIcon.className = 'fas fa-play'; }
            }
            playPauseBtn.addEventListener('click', togglePlayPause);
            playPauseBtn.addEventListener('touchstart', togglePlayPause);
            video.addEventListener('ended', () => { playPauseIcon.className = 'fas fa-play'; userPaused = true; });
            video.addEventListener('play', () => { playPauseIcon.className = 'fas fa-pause'; userPaused = false; });
            video.addEventListener('pause', () => { if (userPaused) playPauseIcon.className = 'fas fa-play'; });
        }
    }

    // ==========================================================
    // FULLSCREEN WITH ORIENTATION LOCK
    // ==========================================================
    const fullscreenBtn = document.getElementById('fullscreenToggle');
    const fullscreenIcon = document.getElementById('fullscreenIcon');
    if (fullscreenBtn && video) {
        async function toggleFullscreen(e) {
            e.preventDefault(); e.stopPropagation();
            const container = video.parentElement;
            const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
            if (!isFullscreen) {
                try {
                    if (container.requestFullscreen) await container.requestFullscreen();
                    else if (container.webkitRequestFullscreen) await container.webkitRequestFullscreen();
                    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
                    else { alert('Fullscreen not supported'); return; }
                    try { await screen.orientation.lock('landscape'); } catch (o) {}
                } catch (err) { console.error('Fullscreen error:', err); }
            } else {
                try {
                    if (document.exitFullscreen) await document.exitFullscreen();
                    else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
                    try { await screen.orientation.unlock(); } catch (o) {}
                } catch (err) { console.error('Exit fullscreen error:', err); }
            }
        }
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        fullscreenBtn.addEventListener('touchstart', toggleFullscreen);
        function updateFullscreenIcon() {
            const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
            fullscreenIcon.className = isFullscreen ? 'fas fa-compress' : 'fas fa-expand';
        }
        document.addEventListener('fullscreenchange', updateFullscreenIcon);
        document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
    }

    // ----- FEEDBACK FORM (Google Sheets) -----
    const feedbackForm = document.getElementById('feedbackForm');
    const statusDiv = document.getElementById('formStatus');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            statusDiv.style.display = 'block';
            statusDiv.textContent = 'Sending...';
            statusDiv.className = '';
            const formData = new FormData(feedbackForm);
            const formObject = {};
            formData.forEach((val, key) => formObject[key] = val);
            const scriptURL = 'https://script.google.com/macros/s/AKfycbwIcOJi396ZS9mTu9JnpFgRudiC_9hC3ozK5JX7qeQljuK2BZe0WD9x0uYVSD8gjcvFvg/exec';
            try {
                const res = await fetch(scriptURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formObject).toString()
                });
                const result = await res.json();
                if (result.result === 'success') {
                    statusDiv.textContent = '✅ Thank you! Your feedback has been recorded.';
                    statusDiv.classList.add('success');
                    feedbackForm.reset();
                    setTimeout(() => statusDiv.style.display = 'none', 5000);
                } else throw new Error('Server error');
            } catch (err) {
                statusDiv.textContent = '❌ Something went wrong. Please try again later.';
                statusDiv.classList.add('error');
                setTimeout(() => statusDiv.style.display = 'none', 5000);
            }
        });
    }

    // ==========================================================
    // TESTIMONIALS - INFINITE LOOP (FIXED)
    // ==========================================================
    function initTestimonials() {
        const scrollContainer = document.getElementById('testimonialScroll');
        if (!scrollContainer) return;
        const cards = scrollContainer.querySelectorAll('.testimonial-card-horizontal');
        if (cards.length === 0) return;

        // clone only once
        if (!scrollContainer.dataset.cloned) {
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                scrollContainer.appendChild(clone);
            });
            scrollContainer.dataset.cloned = 'true';
        }

        let originalSetWidth = 0;

        function computeWidths() {
            originalSetWidth = scrollContainer.scrollWidth / 2;
            scrollContainer.scrollLeft = 0;
        }

        if (document.readyState === 'complete') computeWidths();
        else window.addEventListener('load', computeWidths);

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(computeWidths, 300);
        });

        let autoScrollInterval = null;
        let isPaused = false;
        const autoScrollSpeed = 1.5;

        function startAutoScroll() {
            if (autoScrollInterval) return;
            autoScrollInterval = setInterval(() => {
                if (!isPaused && scrollContainer && originalSetWidth > 0) {
                    const currentScroll = scrollContainer.scrollLeft;
                    if (currentScroll >= originalSetWidth) {
                        scrollContainer.scrollLeft = currentScroll - originalSetWidth;
                    } else {
                        scrollContainer.scrollLeft += autoScrollSpeed;
                    }
                    updateDots();
                }
            }, 30);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }

        const wrapper = document.querySelector('.testimonial-scroll-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', () => { isPaused = true; });
            wrapper.addEventListener('mouseleave', () => { isPaused = false; });
            wrapper.addEventListener('touchstart', () => {
                isPaused = true;
                clearTimeout(resizeTimer);
            });
            wrapper.addEventListener('touchend', () => {
                resizeTimer = setTimeout(() => { isPaused = false; }, 3000);
            });
        }

        window.scrollTestimonials = function(direction) {
            if (!scrollContainer) return;
            const scrollAmount = 300;
            const current = scrollContainer.scrollLeft;
            let target = direction === 'left' ? current - scrollAmount : current + scrollAmount;
            if (target < 0) target = originalSetWidth - scrollAmount;
            if (target > originalSetWidth) target = target - originalSetWidth;
            if (target < 0) target = 0;
            scrollContainer.scrollTo({ left: target, behavior: 'smooth' });
            isPaused = true;
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => { isPaused = false; }, 4000);
            setTimeout(updateDots, 400);
        };

        const dotsContainer = document.getElementById('scrollIndicators');

        function buildDots() {
            if (!dotsContainer) return;
            const total = cards.length;
            dotsContainer.innerHTML = '';
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('span');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.dataset.index = i;
                dot.addEventListener('click', () => {
                    const targetCard = cards[i];
                    if (targetCard && scrollContainer) {
                        targetCard.scrollIntoView({ behavior: 'smooth', inline: 'center' });
                        isPaused = true;
                        clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(() => { isPaused = false; }, 4000);
                        setTimeout(updateDots, 500);
                    }
                });
                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            const dots = dotsContainer?.querySelectorAll('.dot');
            if (!dots || !scrollContainer || !originalSetWidth) return;
            const cardWidth = cards[0]?.offsetWidth || 340;
            const gap = 25;
            const cardTotal = cardWidth + gap;
            const visibleCards = Math.ceil(scrollContainer.clientWidth / cardTotal);
            const totalOriginal = cards.length;
            let effectiveScroll = scrollContainer.scrollLeft % originalSetWidth;
            if (effectiveScroll < 0) effectiveScroll += originalSetWidth;
            const maxIndex = Math.max(0, totalOriginal - visibleCards);
            const currentIndex = Math.min(Math.round(effectiveScroll / cardTotal), maxIndex);
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        window.openTestimonialModal = function(card) {
            const modal = document.getElementById('testimonialModal');
            if (!modal) return;
            const img = card.querySelector('.testimonial-profile img');
            const name = card.querySelector('.testimonial-content h4')?.textContent || 'Client';
            const role = card.querySelector('.testimonial-role')?.textContent || '';
            const feedback = card.querySelector('.testimonial-content p')?.textContent || '';
            const ratingStars = card.querySelectorAll('.testimonial-rating i');
            document.getElementById('modalProfileImg').src = img?.src || '';
            document.getElementById('modalProfileImg').alt = name;
            document.getElementById('modalName').textContent = name;
            document.getElementById('modalRole').textContent = role;
            document.getElementById('modalFeedback').textContent = feedback;
            const ratingContainer = document.getElementById('modalRating');
            ratingContainer.innerHTML = '';
            ratingStars.forEach(star => {
                const newStar = document.createElement('i');
                newStar.className = star.className;
                ratingContainer.appendChild(newStar);
            });
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            stopAutoScroll();
        };

        window.closeTestimonialModal = function() {
            const modal = document.getElementById('testimonialModal');
            if (!modal) return;
            modal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => { if (!autoScrollInterval) startAutoScroll(); }, 300);
        };

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') window.closeTestimonialModal();
        });

        buildDots();
        setTimeout(() => {
            computeWidths();
            startAutoScroll();
            updateDots();
        }, 300);

        scrollContainer.addEventListener('scroll', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateDots, 150);
        });
    }

    if (document.readyState === 'complete') initTestimonials();
    else window.addEventListener('load', initTestimonials);
});

// ===== LIGHTBOX =====
window.openLightbox = function (card) {
    const img = card.querySelector('img');
    if (!img) return;
    const src = img.src;
    const alt = img.alt || 'Photo';
    let lightbox = document.getElementById('photoLightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'photoLightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-img" src="">
            <div class="lightbox-caption"></div>
        `;
        document.body.appendChild(lightbox);
        lightbox.querySelector('.lightbox-close').onclick = () => lightbox.classList.remove('active');
        lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); };
    }
    lightbox.querySelector('.lightbox-img').src = src;
    lightbox.querySelector('.lightbox-caption').textContent = alt;
    lightbox.classList.add('active');
};

    // ==========================================================
    // FEEDBACK FORM - WITH GOOGLE SHEETS
    // ==========================================================
    
    // 👇 REPLACE WITH YOUR DEPLOYED WEB APP URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

    const feedbackForm = document.getElementById('feedbackForm');
    const statusDiv = document.getElementById('formStatus');

    // ----- Profile Photo Preview -----
    const photoInput = document.getElementById('profilePhoto');
    const photoImg = document.getElementById('profilePhotoImg');

    if (photoInput && photoImg) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    photoImg.src = event.target.result;
                    photoImg.style.animation = 'none';
                    setTimeout(() => {
                        photoImg.style.animation = 'starPop 0.4s ease';
                    }, 10);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // ----- Rating Stars -----
    const stars = document.querySelectorAll('.rating-stars i');
    const ratingInput = document.getElementById('userRating');
    const ratingLabel = document.getElementById('ratingLabel');

    if (stars.length && ratingInput) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.dataset.value);
                ratingInput.value = value;
                updateStars(value);
            });
            star.addEventListener('mouseenter', function() {
                const value = parseInt(this.dataset.value);
                highlightStars(value);
            });
            star.addEventListener('mouseleave', function() {
                const current = parseInt(ratingInput.value) || 0;
                updateStars(current);
            });
        });

        function highlightStars(value) {
            stars.forEach((s, index) => {
                s.classList.toggle('active', index < value);
            });
        }

        function updateStars(value) {
            highlightStars(value);
            if (value > 0) {
                const labels = ['', '😞 Needs Improvement', '👎 Below Average', '👍 Good', '🌟 Great', '⭐ Excellent!'];
                ratingLabel.textContent = labels[value] || 'Select a rating';
                ratingLabel.classList.add('active');
            } else {
                ratingLabel.textContent = 'Select a rating';
                ratingLabel.classList.remove('active');
            }
        }
    }

    // ----- Character Counter -----
    const messageInput = document.getElementById('userMessage');
    const charCount = document.getElementById('charCount');
    const charCounter = document.getElementById('charCounter');

    if (messageInput && charCount) {
        messageInput.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            charCounter.classList.toggle('limit-reached', length >= 450);
        });
    }

    // ----- Form Submission to Google Sheets -----
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.classList.add('loading');

            statusDiv.style.display = 'block';
            statusDiv.textContent = '⏳ Sending your feedback...';
            statusDiv.className = '';

            try {
                // Collect form data
                const formData = new FormData(feedbackForm);
                const formObject = {};

                // Get all text fields
                formData.forEach((value, key) => {
                    if (key !== 'profilePhoto') {
                        formObject[key] = value;
                    }
                });

                // Handle profile photo (convert to base64)
                const photoFile = document.getElementById('profilePhoto')?.files[0];
                if (photoFile) {
                    const reader = new FileReader();
                    const photoData = await new Promise((resolve) => {
                        reader.onload = (e) => resolve(e.target.result);
                        reader.readAsDataURL(photoFile);
                    });
                    formObject.profilePhoto = photoData;
                } else {
                    // Default avatar if no photo uploaded
                    formObject.profilePhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(formObject.name || 'User')}&background=f39c12&color=fff&size=120`;
                }

                // Get rating
                formObject.rating = document.getElementById('userRating')?.value || '0';

                // Get subject
                if (!formObject.subject) {
                    formObject.subject = document.getElementById('userSubject')?.value || 'General Feedback';
                }

                // Send to Google Sheets
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formObject)
                });

                const result = await response.json();

                if (result.result === 'success') {
                    statusDiv.textContent = '✅ Thank you! Your feedback has been recorded. 🌟';
                    statusDiv.classList.add('success');
                    feedbackForm.reset();
                    
                    // Reset photo preview
                    if (photoImg) {
                        photoImg.src = 'https://ui-avatars.com/api/?name=User&background=f39c12&color=fff&size=120';
                    }
                    // Reset rating
                    if (ratingInput) ratingInput.value = 0;
                    updateStars(0);
                    // Reset char counter
                    if (charCount) charCount.textContent = '0';
                    if (charCounter) charCounter.classList.remove('limit-reached');
                    
                    setTimeout(() => { statusDiv.style.display = 'none'; }, 6000);
                } else {
                    throw new Error(result.message || 'Server error');
                }

            } catch (error) {
                console.error('Form submission error:', error);
                statusDiv.textContent = '❌ Something went wrong. Please try again later.';
                statusDiv.classList.add('error');
                setTimeout(() => { statusDiv.style.display = 'none'; }, 5000);
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('loading');
            }
        });
    }
