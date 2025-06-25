// Add functionality to toggle sunglasses image on hover
const avatarContainer = document.querySelector('#avatar-container img');

// Create the sunglasses image element
const sunglassesImage = document.createElement('img');
sunglassesImage.src = './img/sunglasses.svg';
sunglassesImage.alt = 'Sunglasses';
sunglassesImage.style.position = 'absolute';
sunglassesImage.style.top = '0';
sunglassesImage.style.left = '0';
sunglassesImage.style.width = '100%';
sunglassesImage.style.height = '100%';
sunglassesImage.style.pointerEvents = 'none';
sunglassesImage.style.opacity = '0';
sunglassesImage.style.transition = 'opacity 0.3s ease-in-out';

// Append the sunglasses image to the avatar container
avatarContainer.parentElement.style.position = 'relative';
avatarContainer.parentElement.appendChild(sunglassesImage);

let coolMode = false;
let hoverTimeout;

// Function to update sunglasses visibility based on coolMode
function updateSunglassesVisibility() {
    sunglassesImage.style.opacity = coolMode ? '1' : '0';
}

// Update greeter section styles based on coolMode
function updateGreeterStyles() {
    const greeter = document.querySelector('.greeter');
    const secondParagraph = greeter.querySelectorAll('p')[0];

    if (coolMode) {
        secondParagraph.querySelectorAll('span').forEach((span, index) => {
            if (index !== 1 && index !== 3 && index !== 5 && index !== 6 && index !== 9) { // Add hidden class to non-target spans
                span.classList.add('hidden');
            } else {
                span.classList.add('highlight'); // Add highlight class to target spans
            }
        });
    } else {
        secondParagraph.querySelectorAll('span.hidden, span.highlight').forEach(span => {
            span.classList.add('transition'); // Add transition class
            setTimeout(() => {
                span.classList.remove('hidden', 'highlight', 'transition'); // Remove classes after 1 second
            }, 1000);
        });
    }
}

// Function to check if the screen is small
function isSmallScreen() {
    return window.innerWidth <= 768; // Adjust the breakpoint as needed
}

// Ensure toggleCoolMode is always active on smaller screens
function setupClickListenerForSmallScreens() {
    if (isSmallScreen()) {
        avatarContainer.removeEventListener('click', toggleCoolMode); // Remove any existing listener to avoid duplicates
        avatarContainer.addEventListener('click', toggleCoolMode);
        avatarContainer.removeEventListener('mouseenter', handleMouseEnter);
        avatarContainer.removeEventListener('mouseleave', handleMouseLeave);
    } else {
        avatarContainer.removeEventListener('click', toggleCoolMode);
        avatarContainer.addEventListener('mouseenter', handleMouseEnter);
        avatarContainer.addEventListener('mouseleave', handleMouseLeave);
    }
}

// Separate hover logic into functions
function handleMouseEnter() {
    console.log('Mouse entered avatar container. coolMode:', coolMode);
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
        coolMode = !coolMode; // Toggle coolMode state
        console.log(coolMode ? 'Entering cool mode. ' + coolMode : 'Exiting cool mode. ' + coolMode);
        updateSunglassesVisibility();
        updateGreeterStyles();
    }, 500); // 0.5 seconds delay
}

function handleMouseLeave() {
    console.log('Mouse left avatar container. coolMode:', coolMode);
    clearTimeout(hoverTimeout);
}

// Function to toggle coolMode
function toggleCoolMode() {
    console.log('Avatar clicked. coolMode:', coolMode);
    coolMode = !coolMode; // Toggle coolMode state
    updateSunglassesVisibility();
    updateGreeterStyles();
}

// Update hover event listeners
avatarContainer.addEventListener('mouseenter', handleMouseEnter);
avatarContainer.addEventListener('mouseleave', handleMouseLeave);

// Set up the listener on load and on resize
setupClickListenerForSmallScreens();
window.addEventListener('resize', setupClickListenerForSmallScreens);