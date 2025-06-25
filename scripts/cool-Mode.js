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

// Add hover event listeners to toggle coolMode
avatarContainer.addEventListener('mouseenter', () => {
    console.log('Mouse entered avatar container. coolMode:', coolMode);
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
        coolMode = !coolMode; // Toggle coolMode state
        console.log(coolMode ? 'Entering cool mode. ' + coolMode : 'Exiting cool mode. ' + coolMode);
        updateSunglassesVisibility();
        updateGreeterStyles();
    }, 500); // 0.5 seconds delay
});

avatarContainer.addEventListener('mouseleave', () => {
    console.log('Mouse left avatar container. coolMode:', coolMode);
    clearTimeout(hoverTimeout);
});