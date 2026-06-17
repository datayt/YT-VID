document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded');

    // ----- HAMBURGER MENU -----
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
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
    // 🔥 FIXED: YOUTUBE VIDEO MODAL (More robust)
    // ==========================================================
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeBtn = document.querySelector('.close-btn');

    function extractVideoId(url) {
        if (!url) return null;
        // Handle youtu.be/xxxx
        let match = url.match(/(?:youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^?&]+)/);
        if (match) return match[1];
        // Handle youtube.com/watch?v=xxxx
        match = url.match(/youtube\.com\/watch\?v=([^&]+)/);
        if (match) return match[1];
        // Handle youtube.com/shorts/xxxx
        match = url.match(/youtube\.com\/shorts\/([^?&]+)/);
        if (match) return match[1];
        // If already just an ID (11 chars)
        if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
        return null;
    }

function playVideo(videoUrl) {
    if (!videoUrl) {
        alert('No video URL found!');
        return;
    }
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        alert('Invalid YouTube link!');
        return;
    }

    // Use the no-cookie domain to avoid tracking & referrer issues
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&controls=1&rel=0&showinfo=0&iv_load_policy=3&enablejsapi=1`;

    // Set src and explicitly re-apply attributes (safety)
    modalVideo.src = embedUrl;
    modalVideo.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    modalVideo.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
    modalVideo.setAttribute('allowfullscreen', 'true');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Optional: fallback if video fails to load (network issue)
    modalVideo.onerror = function() {
        console.warn('YouTube embed failed – open in new tab?');
        // You can show a button to open the video directly
    };
}

    // Attach click listeners to all video cards (project cards + video grid cards)
    document.querySelectorAll('.project-card.video-card, .video-card').forEach(card => {
        card.addEventListener('click', function (e) {
            e.stopPropagation();
            const videoUrl = this.dataset.video;
            if (videoUrl) {
                playVideo(videoUrl);
            } else {
                alert('No video URL found on this card.');
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        modalVideo.src = ''; // stop video
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    // Also close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // ----- SMOOTH SCROLLING -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ----- ACTIVE LINK HIGHLIGHTING + NAVBAR COLOR CHANGE -----
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');
    const header = document.getElementById('mainHeader');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        if (current === 'home') {
            header.classList.add('section-home');
            header.classList.remove('section-other');
        } else if (current) {
            header.classList.add('section-other');
            header.classList.remove('section-home');
        }
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
    function startCounters() {
        document.querySelectorAll('.counter-number').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const inc = target / 50;
            const update = () => {
                current += inc;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    setTimeout(update, 30);
                } else {
                    counter.innerText = target;
                }
            };
            update();
        });
    }
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 }).observe(counterSection);
    }

    // ==========================================================
    // SHOWCASE VIDEO PLAY/PAUSE (FIXED)
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
                requestAnimationFrame(() => {
                    handlePlayback();
                    ticking = false;
                });
                ticking = true;
            }
        });
        setTimeout(handlePlayback, 500);

        if (muteBtn && video) {
            let muted = true;
            const toggleMute = (e) => {
                e.preventDefault();
                if (muted) {
                    video.muted = false;
                    muteIcon.className = 'fas fa-volume-up';
                    muted = false;
                } else {
                    video.muted = true;
                    muteIcon.className = 'fas fa-volume-mute';
                    muted = true;
                }
            };
            muteBtn.addEventListener('click', toggleMute);
            muteBtn.addEventListener('touchstart', toggleMute);
        }

        const playPauseBtn = document.getElementById('playPauseToggle');
        const playPauseIcon = document.getElementById('playPauseIcon');

        if (playPauseBtn && video) {
            function togglePlayPause(e) {
                e.preventDefault();
                e.stopPropagation();
                if (video.paused) {
                    userPaused = false;
                    video.play();
                    playPauseIcon.className = 'fas fa-pause';
                } else {
                    userPaused = true;
                    video.pause();
                    playPauseIcon.className = 'fas fa-play';
                }
            }
            playPauseBtn.addEventListener('click', togglePlayPause);
            playPauseBtn.addEventListener('touchstart', togglePlayPause);

            video.addEventListener('ended', () => {
                playPauseIcon.className = 'fas fa-play';
                userPaused = true;
            });
            video.addEventListener('play', () => {
                playPauseIcon.className = 'fas fa-pause';
                userPaused = false;
            });
            video.addEventListener('pause', () => {
                if (userPaused) {
                    playPauseIcon.className = 'fas fa-play';
                }
            });
        }
    }

    // ==========================================================
    // FULLSCREEN WITH ORIENTATION LOCK
    // ==========================================================
    const fullscreenBtn = document.getElementById('fullscreenToggle');
    const fullscreenIcon = document.getElementById('fullscreenIcon');

    if (fullscreenBtn && video) {
        async function toggleFullscreen(e) {
            e.preventDefault();
            e.stopPropagation();
            const container = video.parentElement;
            const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

            if (!isFullscreen) {
                try {
                    if (container.requestFullscreen) {
                        await container.requestFullscreen();
                    } 
                    else if (container.webkitRequestFullscreen) {
                        await container.webkitRequestFullscreen();
                    } 
                    else if (video.webkitEnterFullscreen) {
                        video.webkitEnterFullscreen();
                    } else {
                        alert('Fullscreen not supported on this browser');
                        return;
                    }
                    try {
                        await screen.orientation.lock('landscape');
                    } catch (orientError) {
                        console.log('Orientation lock not supported:', orientError);
                    }
                } catch (err) {
                    console.error('Fullscreen error:', err);
                }
            } else {
                try {
                    if (document.exitFullscreen) {
                        await document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        await document.webkitExitFullscreen();
                    }
                    try {
                        await screen.orientation.unlock();
                    } catch (orientError) {
                        console.log('Orientation unlock not supported');
                    }
                } catch (err) {
                    console.error('Exit fullscreen error:', err);
                }
            }
        }

        fullscreenBtn.addEventListener('click', toggleFullscreen);
        fullscreenBtn.addEventListener('touchstart', toggleFullscreen);

        function updateFullscreenIcon() {
            const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
            if (isFullscreen) {
                fullscreenIcon.className = 'fas fa-compress';
            } else {
                fullscreenIcon.className = 'fas fa-expand';
            }
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
            const scriptURL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec'; // replace
            try {
                const res = await fetch(scriptURL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(formObject).toString() });
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
});

// ===== LIGHTBOX (Photo Popup) =====
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