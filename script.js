document.addEventListener('DOMContentLoaded', () => {
    // Fade In Effect for Sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      section.style.opacity = 0;  // Start with invisible sections
      section.style.transform = 'translateY(20px)';  // Start slightly down
      section.style.transition = 'opacity 1s ease, transform 1s ease';
    });
  
    setTimeout(() => {
      sections.forEach((section) => {
        section.style.opacity = 1;  // Fade in
        section.style.transform = 'translateY(0)';  // Move to original position
      });
    }, 200);
  
    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        const targetId = link.getAttribute('href').substring(1); // Get target section ID
        const targetSection = document.getElementById(targetId);
        
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  });
  