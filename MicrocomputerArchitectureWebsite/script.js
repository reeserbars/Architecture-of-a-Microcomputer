// Elements
const startAudio = new Audio('audio/Pc_Bootup_Sound.mp3')
const bgAudio = new Audio('audio/homebg.mp3');
const muteButton = document.getElementById('mute-button');
const phallus = document.getElementById('phallus');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const componentsLink = document.querySelector('nav ul li a[href="components.html"]');
const iodevicesLink = document.querySelector('nav ul li a[href="iodevices.html"]');
const busesLink = document.querySelector('nav ul li a[href="buses.html"]')
const aboutUsLink = document.querySelector('nav ul li a[href="aboutus.html"]')
const popup = document.getElementById('popup');
const popupOkButton = document.getElementById('popup-ok');

// Preload images
const images = [
    'images/HomepageMascotSprites/spaced/ComputyEyesClosedBS.png',
    'images/HomepageMascotSprites/spaced/ComputyNoScreenBS.png',
    'images/HomepageMascotSprites/spaced/ComputyDefaultBS.png'
];

// Create Image objects to preload
images.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Audio Setup
bgAudio.loop = true;
bgAudio.preload = 'auto';
bgAudio.volume = 0.3; 
startAudio.volume = 0.3;

function playAudio() {
    bgAudio.play().catch(err => console.error('Audio play error:', err));
    document.removeEventListener('click', playAudio);
    document.removeEventListener('keydown', playAudio);
}

window.addEventListener('load', () => {
    bgAudio.play().catch(() => {
        console.log('Autoplay blocked; waiting for user interaction.');
    });

    setTimeout(() => {
        popup.style.display = 'flex'; // Show the popup
        phallus.classList.add('starting'); // Add zoom effect on page load
    }, 500);

    setTimeout(() => {
        popup.style.display = 'flex'; // Show the popup
    }, 500);

});

document.addEventListener('click', playAudio);
document.addEventListener('keydown', playAudio);

// Mute/Unmute Toggle
muteButton.addEventListener('click', () => {
    bgAudio.muted = !bgAudio.muted;
    muteButton.src = bgAudio.muted 
        ? 'images/Mute button/Sound Off.png' 
        : 'images/Mute button/Sound On.png';});

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    const layers = {
        treeLeftBack: document.getElementById('tree_left_back'),
        treeLeftFront: document.getElementById('tree_left_front'),
        treeRightBack: document.getElementById('tree_right_back'),
        treeRightFront: document.getElementById('tree_right_front')
    };

    layers.treeLeftBack.style.transform = `translate(${x * 4}px, ${y * 4}px)`;
    layers.treeLeftFront.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
    layers.treeRightBack.style.transform = `translate(${x * 4}px, ${y * 4}px)`;
    layers.treeRightFront.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
});

// Close Popup and Start Blinking
popupOkButton.addEventListener('click', () => {
    popup.style.display = 'none'; // Hide the popup
    phallus.classList.remove('starting'); // Remove the zoom effect
    startAudio.play();
    // Start the blinking effect after the popup is closed
    blinkEffect();
});

// Set the initial image (ensure visibility before blink starts)
phallus.style.backgroundImage = `url(images/HomepageMascotSprites/spaced/ComputyNoScreenBS.png)`;

// Blinking Animation (Changing Sprite)
let blinkInterval;

function blinkEffect() {
    blinkInterval = setInterval(() => {
        phallus.style.backgroundImage = `url(images/HomepageMascotSprites/spaced/ComputyEyesClosedBS.png)`;
        setTimeout(() => {
            phallus.style.backgroundImage = `url(images/HomepageMascotSprites/spaced/ComputyDefaultBS.png)`;
        }, 300);
    }, Math.floor(Math.random() * 4000) + 3000); // Random interval for blinking
}

// Stop blinking when phallus is clicked
phallus.addEventListener('click', (e) => {
    // Stop blinking
    clearInterval(blinkInterval);

    // Zoom and Redirect to the components page
    zoomAndRedirect('components.html');
});

// Zoom and Redirect Logic
function zoomAndRedirect(targetUrl) {
    phallus.classList.add('zoomed');

    setTimeout(() => {
        phallus.style.backgroundImage = `url(images/HomepageMascotSprites/spaced/ComputyNoScreenBS.png)`;
    }, 900);

    setTimeout(() => {
        window.location.href = targetUrl;
    }, 2000);
}

function slideAndRedirect(targetUrl) {
    phallus.classList.add('slide');

    setTimeout(() => {
        phallus.style.backgroundImage = `url(images/HomepageMascotSprites/spaced/ComputyNoScreenBS.png)`;
    }, 500);

    setTimeout(() => {
        window.location.href = targetUrl;
    }, 2000);
}


// Event Listeners for Links
componentsLink.addEventListener('click', (e) => {
    e.preventDefault();
    zoomAndRedirect('components.html');
});

iodevicesLink.addEventListener('click', (e) => {
    e.preventDefault();
    zoomAndRedirect('iodevices.html');
});

aboutUsLink.addEventListener('click', (e) => {
    e.preventDefault();
    slideAndRedirect('aboutus.html');
});

busesLink.addEventListener('click', (e) => {
    e.preventDefault();
    zoomAndRedirect('buses.html')
})