// ==============================================
// UPDATED: BLUR & FADE SCROLL REVEAL OBSERVER
// ==============================================
const revealElements = document.querySelectorAll('.reveal-blur');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});


// ==============================================
// MOBILE MENU TOGGLE
// ==============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        icon.className = navMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        document.querySelector('.menu-toggle i').className = 'fas fa-bars';
    });
});


// ==============================================
// YOUTUBE VIDEOS (Updated with Google Drive link)
// ==============================================
const videoData = {
    latest: [
        { title: "I made an Smart Dustbin", views: " ~ views", time: "Nov 15, 2025", duration: "06:39", img: "https://img.youtube.com/vi/0IS1TLAoP20/maxresdefault.jpg", videoId: "0IS1TLAoP20" }, 
        { 
            title: "Smart Dustbin (Google Drive)", 
            views: " ~ views", 
            time: "Dec 24, 2025", 
            duration: "0:22", 
            // ✅ FIX: Use a placeholder or your own image URL (Drive links don't work here)
            img: "https://drive.google.com/uc?export=view&id=1mqPevHltcYE6RMbaCL4gnB6btEgZ2lbS", 
            // ✅ Video link stays as Google Drive (This works perfectly in the modal)
            videoId: "https://drive.google.com/file/d/1FHy30LQgaTL6W3eBBr7tQbvfbS5Dpi68/view?usp=sharing" 
        }
    ],
    popular: [{ title: "Building a Functional Hubless Bicycle from Scratch!", views: "5.4M views", time: "1 year ago", duration: "11:20", img: "https://img.youtube.com/vi/P_4IT_zwojw/maxresdefault.jpg", videoId: "s_WCm5PMzmk" }, { title: "Transforming Old Junk into an Offroad Delivery Droid", views: "3.1M views", time: "8 months ago", duration: "15:20", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=350", videoId: "dQw4w9WgXcQ" }],
    playlist: [{ title: "Robotics Systems Full Engineering Playlists", views: "12 videos", time: "Updated Yesterday", duration: "PLAYLIST", img: "", videoId: "s_WCm5PMzmk" }, { title: "Electric Vehicle Concepts Complete Engineering Log", views: "8 videos", time: "Updated 2 weeks ago", duration: "PLAYLIST", img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=350", videoId: "dQw4w9WgXcQ" }],
    shorts: [{ title: "Testing the Hubless wheel load capacity!", views: "12M views", time: "5 days ago", duration: "0:58", img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=350", videoId: "s_WCm5PMzmk" }, { title: "When your robot learns to balance itself 😂", views: "8.4M views", time: "1 month ago", duration: "0:42", img: "https://images.unsplash.com/photo-1608962714026-af9a77909d38?auto=format&fit=crop&q=80&w=350", videoId: "dQw4w9WgXcQ" }]
};

function renderVideos(category) {
    const grid = document.getElementById('videoGrid');
    if(!grid) return; grid.innerHTML = ''; 
    videoData[category].forEach(vid => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `<div class="video-thumb js-video-play-btn" data-video-id="${vid.videoId}"><img src="${vid.img}" alt="${vid.title}"><div class="duration-badge">${vid.duration}</div><div class="thumb-play-icon"><i class="fas fa-play"></i></div></div><div class="video-details"><h4>${vid.title}</h4><div class="video-meta">${vid.views} &bull; ${vid.time}</div></div>`;
        grid.appendChild(card);
    });
}
function switchTab(category) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.getAttribute('onclick').includes(category)) btn.classList.add('active');
    });
    renderVideos(category);
}


// ==============================================
// MEDIA CARDS
// ==============================================
const mediaData = [
    { name: "संदेश", color: "#ffffff", icon: "fa-newspaper" },
    { name: "राजस्थान पत्रिका", color: "#ffffff", icon: "fa-pen-fancy" },
    { name: "दिव्य भास्कर", color: "#ffffff", icon: "fa-star" },
    { name: "ZEE NEWS", color: "#ffcc00", icon: "fa-tv" },
    { name: "ABP NEWS", color: "#ffffff", icon: "fa-broadcast" },
    { name: "आज तक", color: "#ff0000", icon: "fa-clock" }
];
function renderMediaCards() {
    const track = document.getElementById('mediaTrack');
    if(!track) return; track.innerHTML = ''; 
    const doubleData = [...mediaData, ...mediaData];
    doubleData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'media-card';
        let contentHtml = '';
        if (item.img) contentHtml = `<img src="${item.img}" alt="${item.name}">`;
        else if (item.icon) contentHtml = `<i class="fas ${item.icon}" style="font-size: 3.5rem; color: ${item.color || '#fff'};"></i>`;
        card.innerHTML = `<div class="media-img-wrap">${contentHtml}</div><div class="media-name">${item.name}</div>`;
        track.appendChild(card);
    });
}


// ==============================================
// TIMELINE
// ==============================================
const timelineContainer = document.querySelector('.timeline-container');
if (timelineContainer) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) timelineContainer.classList.add('active');
        });
    }, { threshold: 0.3 });
    observer.observe(timelineContainer);
}


// ==============================================
// 🎬 UPDATED VIDEO MODAL (Supports YouTube, MP4, and Google Drive)
// ==============================================
const modal = document.getElementById('videoModal');
const iframe = document.getElementById('videoIframe');
const videoElement = document.getElementById('videoElement');
const closeBtn = document.querySelector('.close-btn');

document.addEventListener('click', function(e) {
    const target = e.target.closest('.play-overlay, .js-video-play-btn');
    if (target) {
        e.stopPropagation(); 
        let videoId = target.getAttribute('data-video-id');
        if (!videoId) return;

        // 1. 🟠 Google Drive - Preview iframe mein chalao
        if (videoId.includes('drive.google.com')) {
            const match = videoId.match(/\/d\/([a-zA-Z0-9-_]+)/);
            if (match && match[1]) {
                const fileId = match[1];
                iframe.style.display = 'block';
                videoElement.style.display = 'none';
                videoElement.pause();
                videoElement.src = '';
                iframe.src = `https://drive.google.com/file/d/${fileId}/preview?autoplay=1`;
                modal.style.display = 'flex'; 
                return;
            }
        }

        // 2. 🔵 Instagram - Naye tab me open (Abhi ke liye)
        if (videoId.includes('instagram.com')) {
            window.open(videoId, '_blank');
            return;
        }

        // 3. 🟡 YouTube link (watch?v= ya youtu.be)
        if (videoId.includes('youtube.com/watch?v=') || videoId.includes('youtu.be/')) {
            try { 
                const urlParams = new URLSearchParams(new URL(videoId).search); 
                videoId = urlParams.get('v'); 
            } catch (error) { 
                const match = videoId.match(/[?&]v=([^&#]*)/);
                if (match) videoId = match[1];
            }
            
            iframe.style.display = 'block';
            videoElement.style.display = 'none';
            videoElement.pause();
            videoElement.src = '';
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
            modal.style.display = 'flex'; 
            return;
        }

        // 4. 🔴 Direct MP4 files (ends with .mp4)
        if (videoId.endsWith('.mp4')) {
            iframe.style.display = 'none';
            iframe.src = '';
            videoElement.style.display = 'block';
            videoElement.src = videoId;
            modal.style.display = 'flex'; 
            return;
        }

        // 5. 🟢 Plain YouTube Video IDs (length = 11)
        if (videoId.length === 11) {
            iframe.style.display = 'block';
            videoElement.style.display = 'none';
            videoElement.pause();
            videoElement.src = '';
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
            modal.style.display = 'flex'; 
        }
    }
});

function closeModal() { 
    iframe.src = ''; 
    videoElement.pause();
    videoElement.src = '';
    iframe.style.display = 'none';
    videoElement.style.display = 'none';
    modal.style.display = 'none'; 
}

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'flex') closeModal(); });


// ==============================================
// INSTAGRAM STORY
// ==============================================
const storyData = [
    { img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=150", title: "🏍️ AI Superbike Revolution", desc: "India's first custom-built AI-powered hubless wheel superbike. This engineering marvel uses advanced neural networks for self-balancing.", link: "https://en.wikipedia.org/wiki/Artificial_intelligence" },
    { img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=150", title: "🚀 Capsule EV Concept", desc: "A self-developed futuristic electric vehicle concept designed specifically for smart city pods. Eco-friendly and fully autonomous.", link: "https://en.wikipedia.org/wiki/Electric_vehicle" },
    { img: "https://images.unsplash.com/photo-1608962714026-af9a77909d38?auto=format&fit=crop&q=80&w=150", title: "🤖 Walking Robot Innovation", desc: "Our human-inspired mechanical robotic mobility system showcases advanced structural balancing layouts.", link: "https://en.wikipedia.org/wiki/Robot" }
];

const storyImage = document.getElementById('story-image');
const instantStory = document.getElementById('instant-story');
let imgIndex = 0;

if (storyImage) {
    setInterval(() => {
        imgIndex = (imgIndex + 1) % storyData.length;
        storyImage.style.opacity = '0';
        setTimeout(() => {
            storyImage.src = storyData[imgIndex].img;
            storyImage.style.opacity = '1';
        }, 300);
    }, 4000);
}

// Story Modal
const articleModal = document.getElementById('articleModal');
const closeArticleBtn = document.querySelector('.close-article-btn');
const articleTitle = document.getElementById('article-title');
const articleImg = document.getElementById('article-img');
const articleDesc = document.getElementById('article-desc');
const articleContent = document.getElementById('article-content');
const webviewContainer = document.getElementById('webview-container');
const webviewIframe = document.getElementById('webview-iframe');
const readMoreBtn = document.getElementById('read-more-btn');
const backToArticleBtn = document.getElementById('back-to-article-btn');

if (instantStory && articleModal) {
    instantStory.addEventListener('click', () => {
        const currentData = storyData[imgIndex];
        articleImg.src = currentData.img;
        articleTitle.innerText = currentData.title;
        articleDesc.innerText = currentData.desc;
        articleContent.style.display = 'block';
        webviewContainer.style.display = 'none';
        webviewIframe.src = '';
        articleModal.style.display = 'flex';
    });
}

readMoreBtn.addEventListener('click', () => {
    const currentData = storyData[imgIndex];
    if(currentData.link) {
        articleContent.style.display = 'none';
        webviewContainer.style.display = 'block';
        webviewIframe.src = currentData.link;
    }
});

backToArticleBtn.addEventListener('click', () => {
    webviewContainer.style.display = 'none';
    webviewIframe.src = '';
    articleContent.style.display = 'block';
});

if (closeArticleBtn && articleModal) {
    closeArticleBtn.addEventListener('click', () => {
        articleModal.style.display = 'none';
        webviewIframe.src = '';
    });
    window.addEventListener('click', (e) => {
        if (e.target === articleModal) {
            articleModal.style.display = 'none';
            webviewIframe.src = '';
        }
    });
}


// ==============================================
// CUSTOM CURSOR
// ==============================================
const cursor = document.getElementById('custom-cursor');
const trailContainer = document.getElementById('cursor-trail-container');
let trail = [];

for (let i = 0; i < 10; i++) {
    let dot = document.createElement('div');
    dot.className = 'trail-dot';
    trailContainer.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if(cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
});

function animateTrail() {
    let x = mouseX, y = mouseY;
    trail.forEach((dot, index) => {
        let nextDot = trail[index - 1];
        if (nextDot) {
            x += (nextDot.x - x) * 0.3;
            y += (nextDot.y - y) * 0.3;
        } else {
            x += (mouseX - x) * 0.4;
            y += (mouseY - y) * 0.4;
        }
        dot.x = x; dot.y = y;
        dot.el.style.left = x + 'px'; dot.el.style.top = y + 'px';
        let opacity = 0.7 - (index / trail.length) * 0.6;
        let size = 8 - (index / trail.length) * 5;
        dot.el.style.opacity = opacity;
        dot.el.style.width = size + 'px';
        dot.el.style.height = size + 'px';
    });
    requestAnimationFrame(animateTrail);
}
animateTrail();


// ==============================================
// 🎵 SOUND TOGGLE BUTTON LOGIC (Autoplay on First Scroll/Click)
// ==============================================
const bgMusic = document.getElementById('bg-music');
const soundBtn = document.getElementById('sound-btn');

function playAudio() {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            soundBtn.classList.remove('paused');
            soundBtn.classList.add('playing');
        }).catch((err) => console.log("Play error:", err));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    bgMusic.play().then(() => {
        soundBtn.classList.remove('paused');
        soundBtn.classList.add('playing');
    }).catch(() => {
        const firstInteraction = () => {
            playAudio();
            document.removeEventListener('scroll', firstInteraction);
            document.removeEventListener('click', firstInteraction);
            document.removeEventListener('touchstart', firstInteraction);
            document.removeEventListener('keydown', firstInteraction);
        };
        document.addEventListener('scroll', firstInteraction, { once: true });
        document.addEventListener('click', firstInteraction, { once: true });
        document.addEventListener('touchstart', firstInteraction, { once: true });
        document.addEventListener('keydown', firstInteraction, { once: true });
    });
});

soundBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            soundBtn.classList.remove('paused');
            soundBtn.classList.add('playing');
        }).catch(err => console.log("Playback error:", err));
    } else {
        bgMusic.pause();
        soundBtn.classList.remove('playing');
        soundBtn.classList.add('paused');
    }
});

if (bgMusic.paused) soundBtn.classList.add('paused');
else soundBtn.classList.add('playing');

bgMusic.addEventListener('play', () => {
    soundBtn.classList.remove('paused');
    soundBtn.classList.add('playing');
});
bgMusic.addEventListener('pause', () => {
    soundBtn.classList.remove('playing');
    soundBtn.classList.add('paused');
});


// ==============================================
// INITIAL LOAD
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    renderVideos('latest');
    renderMediaCards();
});

// ==============================================
// 🎬 AUTO YOUTUBE THUMBNAIL GENERATOR
// ==============================================
function autoLoadYoutubeThumbnails() {
    const playOverlays = document.querySelectorAll('.play-overlay');
    playOverlays.forEach(overlay => {
        const videoUrl = overlay.getAttribute('data-video-id');
        if (!videoUrl) return;

        let videoId = '';
        try {
            const url = new URL(videoUrl);
            videoId = url.searchParams.get('v');
        } catch (e) {
            const match = videoUrl.match(/[?&]v=([^&#]*)/);
            if (match) videoId = match[1];
        }
        // Agar ID 11 chars ki hai aur 'instagram/drive' nahi hai
        if (videoId && videoId.length === 11 && !videoUrl.includes('instagram') && !videoUrl.includes('drive.google')) {
            const projectImg = overlay.previousElementSibling;
            if (projectImg && projectImg.classList.contains('project-img')) {
                const img = projectImg.querySelector('img');
                if (img) {
                    img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                    img.onerror = function() {
                        this.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    };
                }
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', autoLoadYoutubeThumbnails);