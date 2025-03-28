// Animation container
const animationContainer = document.createElement('div');
animationContainer.className = 'animation-container';
document.body.appendChild(animationContainer);

// Create SVG elements
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('class', 'animation-svg');
svg.setAttribute('width', '100%');
svg.setAttribute('height', '100%');
svg.setAttribute('style', 'position: fixed; top: 0; left: 0; pointer-events: none; z-index: 0;');
animationContainer.appendChild(svg);

// Animation settings
const settings = {
    hearts: {
        count: 20,
        speed: 1.5,
        size: 20,
        opacity: 0.4
    },
    stars: {
        count: 8,
        speed: 4,
        size: 3,
        opacity: 0.9
    },
    sparkles: {
        count: 30,
        size: 2,
        opacity: 0.8
    },
    enabled: true
};

// Create heart SVG
function createHeart() {
    const heart = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    heart.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
    heart.setAttribute('fill', '#ff6b6b');
    heart.setAttribute('opacity', settings.hearts.opacity);
    return heart;
}

// Create star SVG
function createStar() {
    const star = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    star.setAttribute('d', 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z');
    star.setAttribute('fill', '#ffd700');
    star.setAttribute('opacity', settings.stars.opacity);
    return star;
}

// Create sparkle SVG
function createSparkle() {
    const sparkle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    sparkle.setAttribute('r', settings.sparkles.size);
    sparkle.setAttribute('fill', '#ffffff');
    sparkle.setAttribute('opacity', settings.sparkles.opacity);
    return sparkle;
}

// Animate hearts
function animateHearts() {
    for (let i = 0; i < settings.hearts.count; i++) {
        const heart = createHeart();
        const x = Math.random() * 100;
        const y = 100 + Math.random() * 20;
        heart.setAttribute('transform', `translate(${x},${y}) scale(${settings.hearts.size / 100})`);
        
        const animation = heart.animate([
            { transform: `translate(${x},${y}) scale(${settings.hearts.size / 100}) opacity: ${settings.hearts.opacity}` },
            { transform: `translate(${x + (Math.random() - 0.5) * 20},${-20}) scale(${settings.hearts.size / 100}) opacity: 0` }
        ], {
            duration: 4000 + Math.random() * 2000,
            easing: 'ease-out',
            iterations: Infinity,
            delay: Math.random() * 3000
        });
        
        svg.appendChild(heart);
    }
}

// Animate shooting stars
function animateShootingStars() {
    for (let i = 0; i < settings.stars.count; i++) {
        const star = createStar();
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.setAttribute('transform', `translate(${x},${y}) scale(${settings.stars.size / 100})`);
        
        const animation = star.animate([
            { transform: `translate(${x},${y}) scale(${settings.stars.size / 100}) opacity: ${settings.stars.opacity}` },
            { transform: `translate(${x + 150},${y + 150}) scale(${settings.stars.size / 100}) opacity: 0` }
        ], {
            duration: 3000 + Math.random() * 1000,
            easing: 'ease-out',
            iterations: Infinity,
            delay: Math.random() * 8000
        });
        
        svg.appendChild(star);
    }
}

// Animate sparkles
function animateSparkles() {
    for (let i = 0; i < settings.sparkles.count; i++) {
        const sparkle = createSparkle();
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        sparkle.setAttribute('cx', x + '%');
        sparkle.setAttribute('cy', y + '%');
        
        const animation = sparkle.animate([
            { opacity: settings.sparkles.opacity, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(0.5)' },
            { opacity: settings.sparkles.opacity, transform: 'scale(1)' }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'ease-in-out',
            iterations: Infinity,
            delay: Math.random() * 3000
        });
        
        svg.appendChild(sparkle);
    }
}

// Toggle animations
function toggleAnimations() {
    settings.enabled = !settings.enabled;
    svg.style.display = settings.enabled ? 'block' : 'none';
}

// Initialize animations
function initAnimations() {
    animateHearts();
    animateShootingStars();
    animateSparkles();
}

// Use existing animation toggle button
document.getElementById('animationToggle').onclick = toggleAnimations;

// Start animations
initAnimations(); 