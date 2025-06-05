document.querySelectorAll('.skills-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const icon = card.querySelector('i');
    if (icon.classList.contains('plain')) {
      icon.classList.replace('plain', 'colored');
    }
  });

  card.addEventListener('mouseleave', () => {
    const icon = card.querySelector('i');
    if (icon.classList.contains('colored')) {
      icon.classList.replace('colored', 'plain');
    }
  });
});