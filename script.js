// ==============================================
// UPDATED: BLUR & FADE SCROLL REVEAL OBSERVER
// ==============================================
const revealElements = document.querySelectorAll('.reveal-blur');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target); // Ek baar effect hone ke baad hata do
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
        { title: "The Projects That Made History in India and the World!", views: " ~ ", time: "Nov 15, 2025", duration: "06:39", img: "https://img.youtube.com/vi/0IS1TLAoP20/maxresdefault.jpg", videoId: "0IS1TLAoP20" },
        { 
            title: "Futuristic Driverless Hubless Electric Bike", 
            views: " ~ views", 
            time: "Dec 24, 2025", 
            duration: "0:22", 
            // ✅ FIX: Use a placeholder or your own image URL (Drive links don't work here)
            img: "https://lh3.googleusercontent.com/rd-d/ALs6j_F0R3MfcqEyvwrvDUrFC3fnxOY98J0d0CahVWi9jnUUWqpyyFrw7pyTlhmDBULpeN5HWd5Z-zsgU1UVCF9aXAoyEFfM-AQnTt0EgFrHkEq9d0rQyM1A0E9q4m6wejVYsiFYgGtMcmO2KMe38Y7esLbY6uA3ZYLPCWLyu45QqZylDor6gXe8FKZIWE3k0lma1auxobG_njZ9M_7ZoBnJ-zGk75KxyuMMvG5_8A7vAS7dEv5n2yxWZMV5pXexz5tBL3_t1iWFv1KUdsjye3PwhAunZ9S5OO0w-py7tqlK0t9qcu7s5T4Df2mNangZpy-hv7rY9ZmlwSf7HA6aX9AgSkDdfAncM4SsEfyeXTRM1U2ikHgtkxTOuYKsLLuduAJmvpYbbumX4XOaQ9q7juDIQBOo_FoMf9kizQxD6auytbhpkUGGKlzx-PlovujKy31Qz9-Knjx0GHCkUJsKTVjFS2v435PQr1OG6i-iM_kveRgu8cHc9bW1t2RoEjuzVIaWrGkTYa6Db1LVJ0Loy2JVkYzvfJaLou0aKU5yWQLK14DIcwkYBHLoCyCacN7goXhyolL3Vx46SiNI4AN422S776EaAYw5s17lsFWB41AD-qLTEsFCjVqp8HMVCWLl_qK5gBIGCcHMscyraUsKMChx1EfJLbUC1fG4jzxLO53xFODVik0VwVckF2kRNTJ5bg60EawaDxJPMfhHrwZLF6paAFIkneE27mXIc22H5EurjzA9oZUCC7APpsUz2PZVcYLKmTFjAcwxxgYml6zC_MdUbuFmVdJGkMEDyqBcO-lkU_OPYqtJvqmw60dhVL0SZWASujKorzY4fpesBj93dnPpGh3Sv0pFn4X_5VelNk5_69xgedKlZmGEUPMYvf_OPiUhMZ1n5BmBobuVsBppQqdp8ucB4AEkQ3gxZn3rFRverL5h-SIfczZXkVMlT1VQ_QhUFbHgKHzEPBGyzojxN0DOyO7ICLqwiCylshJ83-b1m5M6YxP-qnRZdPo_zgxYPv89JmHAb3PrrREpXDlO-F0PpsDHk0vb6jKnUdW59ek2pDdIEiNRY-XHi2KL1XiGyejLM_4ajPUgezvvfhWx93qRbEF_93IQ=w1921-h914?auditContext=prefetch",  
            // ✅ Video link stays as Google Drive (This works perfectly in the modal)
            videoId: "YGBG_g4nI8Y" 
        }
    ],
    popular: [{ title: "Pakistani Reaction to 🇮🇳 Walking Robot 😱🔥", views: " ~ ", time: " Feb 20 ", duration: "00:31", img: "https://i.ibb.co/7tGvHZ5N/YT-TB.png", videoId: "AKrjvE8_A3E" }, { title: "Pakistani Reaction on Indian Future bike", views: " ~ ", time: " Oct 3 ", duration: "00:35", img: "https://i.ibb.co/Hp99BDXg/YT-TB2.png", videoId: "81g-9mzqngM" }],
    playlist: [{ title: "Robot Rickshaw Creative Science Project | News Report Style by India Today", views: " ~ ", time: "Updated", duration: " News ", img: "https://i.ibb.co/JRffvZ94/YT-TB3.png", videoId: "QmTgbgWWR54" }, { title: " Robot Rickshaw Creative Science Project | News Report Style by Asian News Internation ", views: " ~ ", time: "Updated", duration: " NEWS ", img: "https://i.ibb.co/xqfFLh2y/YT-TB4.png", videoId: "r7K8oYJwQ5o" }],
    shorts: [{ title: "News nation Ghost cycle gone viral… ", views: " ~ ", time: " Updated ", duration: " news ", img: "https://i.ibb.co/0wC7H0z/YT-TB5.png", videoId: "X8VKXKMohPg" }, { title: "Driverless Garuda AI-Bike #shorts #trending #viral", views: " ~ ", time: " Updated ", duration: " aajtak ", img: "https://i.ibb.co/TDsVSPN9/YT-TB6.png", videoId: "zuX9znkTtqg" }]
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
    { name: "USA TODAY", color: "#ffffff", img: "RE IMG/usa-today-logo-png_seeklogo-481935-removebg-preview.png" },
    { name: "TIMES NOW", color: "#ffffff",img: "RE IMG/Screenshot_2026-06-18_155404-removebg-preview.png" },
    { name: "THE TIMES OF INDIA", color: "#ffffff", img: "RE IMG/the-times-of-india-logo-png_seeklogo-398941-removebg-preview.png" },
    { name: "ZEE NEWS", color: "#ffcc00", img: "zee-logo.png" },
    { name: "ABP NEWS", color: "#ffffff", img: "RE IMG/ABP_News_logo.png" },
    { name: "AAJ TAK", color: "#ff0000", img: "RE IMG/imgbin-aaj-tak-india-television-channel-living-media-india-bpAZEskKkcVYaFZAk0uPrx3A4-removebg-preview.png" },
    {name: "AAJ TAK", color: "#ff0000", img: "RE IMG/News_18_India.png" },
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
        // 🔥 Ye 2 lines mobile par click ko force karengi:
        target.style.pointerEvents = 'auto'; 
        target.style.cursor = 'pointer';
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
    { img: "https://c.ndtvimg.com/2023-04/t7pih0lo_robot_625x300_13_April_23.jpg", title: "Pull A Rickshaw", desc: "Surat Students Design Robot That Can Pull A Rickshaw.", link: "https://www.ndtv.com/india-news/surat-students-design-robot-that-can-pull-a-rickshaw-3944411" },
    { img: "https://media.assettype.com/freepressjournal/2024-07/01de200c-cfac-4e09-8d57-c2153311e734/futuristiccar.jpg", title: "Tyreless Capsule Car", desc: "Tyreless Capsule Car: Surat's Engineering Students Redefine Future Mobility.", link: "https://www.freepressjournal.in/india/tyreless-capsule-car-surats-engineering-students-redefine-future-mobility" },
    { img: "https://resize.indiatv.in/resize/newbucket/1200_675/2024/04/untitled-design-2024-04-04t135301-1712218982.webp", title: "मीडिया पर एक दौड़ती हुई झोपड़ी का वीडियो वायरल हो रहा है।", desc: "कुछ और नहीं सुझा तो बना दी सड़क पर दौड़ने वाली झोपड़ी, Video सोशल मीडिया पर हो रहा है वायरल.", link: "https://www.indiatv.in/viral/news/if-nothing-else-could-be-suggested-so-boys-built-a-running-hut-on-the-road-video-is-going-viral-on-social-media-2024-04-04-1036013" },
    { img: "https://www.carblogindia.com/wp-content/uploads/2023/10/bajaj-pulsar-hubless-wheels-1024x576.jpg", title: "Homemade Bajaj Pulsar", desc: "This Homemade Bajaj Pulsar with Hubless Wheels Looks Sick", link: "https://www.carblogindia.com/homemade-bajaj-pulsar-hubless-wheels/" },
    { img: "https://img-cdn.publive.online/fit-in/1280x960/filters:format(webp)/startuppedia/media/media_files/2025/09/29/cs-web-2025-09-29-13-01-27.png", title: "Garuda bike Ai", desc: "Meet the 24-Year-Old College Student from Surat Who Built India’s First AI-Powered Driverless Superbike", link: "https://www.aajtak.in/auto/news/story/engineering-students-from-surat-developed-ai-powered-driverless-and-hubless-electric-bike-garuna-dskc-2314881-2025-08-21" },
    { img: "https://imgs.etvbharat.com/etvbharat/prod-images/23-04-2026/26532770_ghs2.png", title: " 'Ghost Cycle' That Pedals Itself", desc: "Surat innovator Shivam Maurya created a remote-controlled ‘Ghost Cycle’ with robotic legs that pedal themselves.' That Pedals Itself", link: "https://www.etvbharat.com/amp/en/technology/young-innovator-from-gujarat-unveils-ghost-cycle-that-pedals-itself-enn26042205666" },
    { img: "https://www.carblogindia.com/wp-content/uploads/2023/07/one-wheeled-electric-bike.jpg", title: "One Wheeled KTM", desc: "This Homemade One Wheeled KTM Runs 40 km in 1 Rupee", link: "https://www.carblogindia.com/homemade-one-wheeled-ktm/" },
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

// Auto Highlight Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 120) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

document.getElementById('year').textContent = new Date().getFullYear();

// YouTube Subscriber Counter (Use a free API like "youtube-subscriber-count")
async function getSubs() {
    try {
        const res = await fetch('https://api.countapi.xyz/get/youtube/@CreativeScienceOfficial'); // Apna Channel ID daalo
        const data = await res.json();
        if(data.value) document.querySelector('.stat-item h3').innerText = data.value + '+';
    } catch(e) { console.log("API limit hit"); }
}
getSubs();

/* ============================================================
   PWA (PROGRESSIVE WEB APP) REGISTRATION
   ============================================================ */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('PWA ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('PWA ServiceWorker registration failed:', error);
            });
    });
}
