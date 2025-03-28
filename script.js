// Set the anniversary date
const anniversaryDate = new Date('2019-03-31T00:00:00');

// Music player functionality
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Function to handle music playback
function handleMusic() {
    if (!isMobile) {
        // Try to autoplay on desktop
        bgMusic.play().catch(error => {
            console.log("Autoplay prevented:", error);
            musicToggle.classList.add('muted');
        });
    } else {
        // On mobile, start muted
        musicToggle.classList.add('muted');
    }
}

// Toggle music playback
musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.remove('muted');
        musicToggle.querySelector('i').classList.remove('fa-volume-mute');
        musicToggle.querySelector('i').classList.add('fa-volume-up');
    } else {
        bgMusic.pause();
        musicToggle.classList.add('muted');
        musicToggle.querySelector('i').classList.remove('fa-volume-up');
        musicToggle.querySelector('i').classList.add('fa-volume-mute');
    }
});

// Initialize music player
handleMusic();

// Timeline animation functionality
function handleTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize timeline animations when the page loads
window.addEventListener('load', () => {
    handleTimelineAnimation();
});

// Timer functionality
function updateTimer() {
    const startDate = new Date('2019-03-31T11:31:00');
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
}

// Update timer every minute
updateTimer();
setInterval(updateTimer, 60000);

// Create floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.opacity = Math.random();
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.querySelector('.floating-hearts').appendChild(heart);

    // Remove heart after animation
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// Create hearts periodically
setInterval(createHeart, 300);

// Create initial hearts
for (let i = 0; i < 5; i++) {
    createHeart();
}

// Add smooth scrolling for better navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Random Memories functionality
const randomMemoriesBtn = document.getElementById('randomMemories');
const randomMemoriesContainer = document.getElementById('randomMemoriesContainer');

// List of all available JPG images
const imageFiles = [
    'thumb_thumb_WIN_20220221_19_09_15_Pro.jpg',
    'thumb_thumb_WIN_20220221_19_09_11_Pro.jpg',
    'thumb_thumb_XPQZ9189.JPG',
    'thumb_thumb_WhatsApp Image 2022-03-26 at 16.52.18 (9).jpeg',
    'thumb_thumb_WhatsApp Image 2022-03-26 at 16.49.04 (3).jpeg',
    'thumb_thumb_WhatsApp Image 2022-03-26 at 16.49.03 (1).jpeg',
    'thumb_thumb_WhatsApp Image 2022-03-26 at 16.49.03 (9) - Copy.jpeg',
    'thumb_thumb_IMG_8643.JPG',
    'thumb_thumb_IMG_8612.JPG',
    'thumb_thumb_IMG_8100.JPG',
    'thumb_thumb_IMG_8317.JPG',
    'thumb_thumb_IMG_6664.JPG',
    'thumb_thumb_IMG_6341.JPG',
    'thumb_thumb_IMG_5131.JPG',
    'thumb_thumb_IMG_5611.JPG',
    'thumb_thumb_IMG_4133.JPG',
    'thumb_thumb_IMG_20190503_230217.jpg',
    'thumb_thumb_IMG_20220210_204418.jpg',
    'thumb_thumb_IMG_1476.JPG',
    'thumb_thumb_IMG_1068.JPG',
    'thumb_thumb_IMG_1081.JPG',
    'thumb_thumb_IMG-20190504-WA0135.jpg',
    'thumb_thumb_IMG-20200307-WA0022.jpg',
    'thumb_thumb_IMG-20190504-WA0089.jpg',
    'thumb_thumb_IMG-20190504-WA0091.jpg',
    'thumb_thumb_IMG-20190504-WA0052.jpg',
    'thumb_thumb_IMG-20190504-WA0023.jpg',
    'thumb_thumb_IMG-20190504-WA0040.jpg',
    'thumb_thumb_IMG-20190504-WA0030.jpg',
    'thumb_thumb_0193a5df-254f-423d-86d2-a9d07dd71f6f.jpg',
    'thumb_thumb_IMG-20190504-WA0039.jpg',
    'thumb_thumb_b3c3719c-7921-4136-9754-012576f99794.jpg',
    'thumb_thumb_c6db6739-a7e4-402e-9b5c-6b5f1151b636.jpg',
    'thumb_thumb_FFNK3784.JPG',
    'thumb_thumb_9e92f4a3-5090-436a-a1a5-ddf8d3d22247.jpg',
    'thumb_thumb_69bb7032-43c3-42b4-a50e-50a367b2ceaa.jpg',
    'thumb_thumb_99a02c97-85df-4874-8cb7-39140efc9bf2.jpg',
    'thumb_IMG_8643.JPG',
    'thumb_IMG_8612.JPG',
    'thumb_IMG_8100.JPG',
    'thumb_IMG_8317.JPG',
    'thumb_IMG_6664.JPG',
    'thumb_IMG_6341.JPG',
    'thumb_IMG_5131.JPG',
    'thumb_IMG_5611.JPG',
    'thumb_IMG_4133.JPG',
    'thumb_IMG_20190503_230217.jpg',
    'thumb_IMG_20220210_204418.jpg',
    'thumb_IMG_1476.JPG',
    'thumb_IMG_1068.JPG',
    'thumb_IMG_1081.JPG',
    'thumb_IMG-20190504-WA0135.jpg',
    'thumb_IMG-20200307-WA0022.jpg',
    'thumb_IMG-20190504-WA0089.jpg',
    'thumb_IMG-20190504-WA0091.jpg',
    'thumb_IMG-20190504-WA0052.jpg',
    'thumb_IMG-20190504-WA0023.jpg',
    'thumb_IMG-20190504-WA0040.jpg',
    'thumb_IMG-20190504-WA0030.jpg',
    'thumb_IMG-20190504-WA0039.jpg'
];

function getRandomImages(count = 5) {
    const shuffled = [...imageFiles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function createMemoryItem(imagePath) {
    const item = document.createElement('div');
    item.className = 'random-memory-item';
    
    const img = document.createElement('img');
    img.src = `images/${imagePath}`;
    img.alt = 'Memory';
    
    // Add error handling for broken images
    img.onerror = () => {
        const placeholder = document.createElement('div');
        placeholder.className = 'memory-placeholder';
        placeholder.innerHTML = '<i class="fas fa-image"></i>';
        item.innerHTML = ''; // Clear the broken image
        item.appendChild(placeholder);
    };
    
    item.appendChild(img);
    return item;
}

function showRandomMemories() {
    // Clear previous images
    randomMemoriesContainer.innerHTML = '';
    
    // Add sparkle animation to button
    randomMemoriesBtn.classList.add('sparkle');
    setTimeout(() => randomMemoriesBtn.classList.remove('sparkle'), 500);
    
    // Get random images
    const randomImages = getRandomImages();
    
    // Create and append new items
    randomImages.forEach((imagePath, index) => {
        const item = createMemoryItem(imagePath);
        randomMemoriesContainer.appendChild(item);
        
        // Add delay for each item's animation
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 200);
    });
    
    // Show container with animation
    randomMemoriesContainer.classList.add('visible');
}

randomMemoriesBtn.addEventListener('click', showRandomMemories);

// Love Reasons Section
const reasons = [
    "Gecenin bir yarısı saçma sapan şeylere gülüp, sonra neden güldüğümüzü unutsak bile gülmeye devam ediyoruz.",
    "Tüm gün sana 'bunu alayım mı, bunu mu giyeyim?' diye sorup, sen karar verdikten sonra tam tersini yapmama rağmen hala sabırla benimle ilgileniyorsun.",
    "Yanımda olduğunda her şey daha güzel, daha eğlenceli ve daha anlamlı oluyor.",
    "Film/dizi izlerken 'Telefonuma bakmayacağım' diyorsun ama 5 dakika sonra hikayeyi bana soruyorsun.",
    "Sabahları uykulu halinle bile tatlı olmayı başarabiliyorsun.",
    "Aynı esprileri defalarca anlatıp hâlâ komik buluyorsun ve ben de her seferinde gülüyorum.",
    "Telefonum %1 şarjdayken bile benim için en önemli mesajı atmayı başarıyorsun.",
    "Ben hastayken benden daha çok panik yapıyorsun.",
    "Yanımdayken saatler su gibi akıp gidiyor ama sen gidince zaman duruyor gibi hissediyorum.",
    "Saçma şeylere bile moralim bozulunca beni rahatlatmak için elinden geleni yapıyorsun.",
    "Aynı şeyi defalarca anlatmana rağmen her seferinde ilk kez duyuyormuşum gibi dinliyorum çünkü sesini duymak hoşuma gidiyor.",
    "Her şeyden önce, çünkü sen sensin ve seni olduğun gibi seviyorum."
];

let currentIndex = 0;
let autoScrollInterval;

const reasonText = document.getElementById('currentReason');

function showReason(index) {
    reasonText.classList.remove('visible');
    setTimeout(() => {
        reasonText.textContent = reasons[index];
        reasonText.classList.add('visible');
    }, 500);
}

function nextReason() {
    currentIndex = (currentIndex + 1) % reasons.length;
    showReason(currentIndex);
}

// Start automatic cycling
autoScrollInterval = setInterval(nextReason, 5000);

// Show first reason
showReason(0); 