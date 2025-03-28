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
    'image_115.jpg',
    'image_114.jpg',
    'image_113.jpg',
    'image_112.jpg',
    'image_111.jpg',
    'image_110.jpg',
    'image_109.jpg',
    'image_108.jpg',
    'image_106.jpg',
    'image_105.jpg',
    'image_104.jpg',
    'image_102.jpg',
    'image_100.jpg',
    'image_97.jpg',
    'image_96.jpg',
    'image_95.jpg',
    'image_94.jpg',
    'image_93.jpg',
    'image_92.jpg',
    'image_91.jpg',
    'image_89.jpg',
    'image_87.jpg',
    'image_86.jpg',
    'image_85.jpg',
    'image_84.jpg',
    'image_83.jpg',
    'image_82.jpg',
    'image_81.jpg',
    'image_80.jpg',
    'image_79.jpg',
    'image_78.jpg',
    'image_77.jpg',
    'image_76.jpg',
    'image_74.jpg',
    'image_73.jpg',
    'image_72.jpg',
    'image_71.jpg',
    'image_70.jpg',
    'image_68.jpg',
    'image_67.jpg',
    'image_66.jpg',
    'image_65.jpg',
    'image_64.jpg',
    'image_63.jpg',
    'image_62.jpg',
    'image_61.jpg',
    'image_59.jpg',
    'image_58.jpg',
    'image_56.jpg',
    'image_55.jpg',
    'image_54.jpg',
    'image_52.jpg',
    'image_50.jpg',
    'image_49.jpg',
    'image_48.jpg',
    'image_47.jpg',
    'image_45.jpg',
    'image_44.jpg',
    'image_43.jpg',
    'image_42.jpg',
    'image_41.jpg',
    'image_40.jpg',
    'image_39.jpg',
    'image_38.jpg',
    'image_37.jpg',
    'image_34.jpg',
    'image_33.jpg',
    'image_32.jpg',
    'image_31.jpg',
    'image_30.jpg',
    'image_29.jpg',
    'image_28.jpg',
    'image_27.jpg',
    'image_26.jpg',
    'image_23.jpg',
    'image_20.jpg',
    'image_19.jpg',
    'image_18.jpg',
    'image_17.jpg',
    'image_16.jpg',
    'image_15.jpg',
    'image_192.jpg',
    'image_191.jpg',
    'image_197.jpg',
    'image_196.jpeg',
    'image_195.jpeg',
    'image_193.jpeg',
    'image_194.jpeg',
    'image_190.jpg',
    'image_189.jpg',
    'image_187.jpg',
    'image_188.jpg',
    'image_186.jpg',
    'image_185.jpg',
    'image_183.jpg',
    'image_184.jpg',
    'image_182.jpg',
    'image_180.jpg',
    'image_181.jpg',
    'image_179.jpg'
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