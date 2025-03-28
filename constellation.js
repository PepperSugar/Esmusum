// Star data for March 31, 2019
const starData = [
    { name: "Sirius", constellation: "Canis Major", magnitude: -1.46, ra: 101.2874, dec: -16.7161 },
    { name: "Canopus", constellation: "Carina", magnitude: -0.74, ra: 95.9880, dec: -52.6957 },
    { name: "Arcturus", constellation: "Boötes", magnitude: -0.05, ra: 213.9153, dec: 19.1824 },
    { name: "Vega", constellation: "Lyra", magnitude: 0.03, ra: 279.2347, dec: 38.7836 },
    { name: "Capella", constellation: "Auriga", magnitude: 0.08, ra: 79.1723, dec: 45.9981 },
    // Add more stars as needed
];

class ConstellationMap {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('starCanvas'),
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 5;
        this.controls.minDistance = 2;
        
        this.stars = [];
        this.init();
    }

    init() {
        // Create stars
        starData.forEach(star => {
            const geometry = new THREE.SphereGeometry(0.02, 32, 32);
            const material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 1 - (star.magnitude + 1.46) / 5 // Normalize brightness
            });
            const mesh = new THREE.Mesh(geometry, material);
            
            // Convert RA/Dec to 3D coordinates
            const phi = (90 - star.dec) * (Math.PI / 180);
            const theta = (star.ra) * (Math.PI / 180);
            mesh.position.x = 2 * Math.sin(phi) * Math.cos(theta);
            mesh.position.y = 2 * Math.sin(phi) * Math.sin(theta);
            mesh.position.z = 2 * Math.cos(phi);
            
            mesh.userData = star;
            this.stars.push(mesh);
            this.scene.add(mesh);
        });

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Position camera
        this.camera.position.z = 3;

        // Add click event listener
        this.renderer.domElement.addEventListener('click', this.onClick.bind(this));

        // Start animation
        this.animate();
    }

    onClick(event) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        // Calculate mouse position in normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(this.stars);
        
        if (intersects.length > 0) {
            const star = intersects[0].object.userData;
            this.showStarInfo(star);
        } else {
            this.hideStarInfo();
        }
    }

    showStarInfo(star) {
        const starInfo = document.querySelector('.star-info');
        document.getElementById('starName').textContent = star.name;
        document.getElementById('constellationName').textContent = star.constellation;
        starInfo.classList.add('visible');
    }

    hideStarInfo() {
        const starInfo = document.querySelector('.star-info');
        starInfo.classList.remove('visible');
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Rotate stars slowly
        this.stars.forEach(star => {
            star.rotation.y += 0.0001;
        });
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize constellation map when the page loads
window.addEventListener('load', () => {
    const constellationMap = new ConstellationMap();
    window.addEventListener('resize', () => constellationMap.onWindowResize());
}); 