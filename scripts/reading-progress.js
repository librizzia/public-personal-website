document.addEventListener('DOMContentLoaded', () => {
    // Create and append the reading progress indicator
    const readingProgressContainer = document.createElement('div');
    readingProgressContainer.id = 'reading-progress';

    const readingProgressFill = document.createElement('div');
    readingProgressFill.id = 'reading-progress-fill';

    readingProgressContainer.appendChild(readingProgressFill);
    document.body.prepend(readingProgressContainer);

    // Reading progress logic
    const readingProgress = document.querySelector('#reading-progress-fill');
    const footerHeight = 150;

    document.addEventListener('scroll', function(e) {
        let w = (document.body.scrollTop || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight - footerHeight) * 100;
        readingProgress.style.setProperty('width', w + '%');
    });
});