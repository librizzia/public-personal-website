// Simple theme switcher for theme-toggles classic toggle
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply the saved theme
  html.setAttribute('data-theme', currentTheme);
  
  // Update toggle state based on current theme
  if (currentTheme === 'dark') {
      themeToggle.classList.add('theme-toggle--toggled');
  } else {
      themeToggle.classList.remove('theme-toggle--toggled');
  }
  
  // Add click event listener
  themeToggle.addEventListener('click', function() {
      // Get current theme
      const currentTheme = html.getAttribute('data-theme');
      
      // Toggle theme
      if (currentTheme === 'dark') {
          html.setAttribute('data-theme', 'light');
          themeToggle.classList.remove('theme-toggle--toggled');
          localStorage.setItem('theme', 'light');
      } else {
          html.setAttribute('data-theme', 'dark');
          themeToggle.classList.add('theme-toggle--toggled');
          localStorage.setItem('theme', 'dark');
      }
  });
});