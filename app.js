/* Casa Loan - Interactive Behavior Script */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. DYNAMIC DATE FOR RECEIPT HEADER
  const dateElement = document.getElementById('receipt-date');
  if (dateElement) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    dateElement.textContent = `${day}/${month}/${year}`;
  }

  // 2. STICKY / SCROLLING RECEIPT HEADER EFFECT & FLOATING MENU TOGGLE
  const header = document.getElementById('receiptHeader');
  const toggleBtn = document.getElementById('navToggleBtn');
  const closeBtn = document.getElementById('receiptCloseBtn');
  
  // Track scroll position and window size to hide/show navigation
  function updateNavState() {
    const isMobile = window.innerWidth <= 768;
    const isScrolled = window.scrollY > 150;
    const isOpen = header.classList.contains('open');

    if (isMobile) {
      // On mobile:
      // - The header (drawer) should only be open if the user opened it.
      // - The toggle button should be visible if the menu is closed.
      header.classList.remove('scrolled'); // No scroll styling on mobile
      if (isOpen) {
        header.classList.remove('hidden');
        header.classList.add('open');
        toggleBtn.classList.remove('visible');
      } else {
        header.classList.add('hidden');
        header.classList.remove('open');
        toggleBtn.classList.add('visible'); // Always show button when closed on mobile
      }
    } else {
      // On desktop:
      // - Scroll-based visibility of header and toggle button.
      if (isScrolled) {
        header.classList.add('scrolled');
        if (isOpen) {
          header.classList.remove('hidden');
          toggleBtn.classList.remove('visible');
        } else {
          header.classList.add('hidden');
          toggleBtn.classList.add('visible');
        }
      } else {
        header.classList.remove('scrolled');
        header.classList.remove('hidden');
        header.classList.remove('open'); // On desktop, close open menu when scrolling back to top
        toggleBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', updateNavState);
  window.addEventListener('resize', updateNavState);

  // Initialize navigation state
  updateNavState();

  // Toggle button click to open/close menu receipt
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (header.classList.contains('hidden')) {
      header.classList.remove('hidden');
      header.classList.add('open');
    } else {
      header.classList.add('hidden');
      header.classList.remove('open');
    }
    updateNavState();
  });

  // Close button click to close menu receipt
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      header.classList.remove('open');
      header.classList.add('hidden');
      updateNavState();
    });
  }

  // Close receipt if user clicks outside of it while open
  document.addEventListener('click', (e) => {
    if (header.classList.contains('open') && !header.contains(e.target) && e.target !== toggleBtn) {
      header.classList.remove('open');
      header.classList.add('hidden');
      updateNavState();
    }
  });

  // Close receipt when a link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (header.classList.contains('open')) {
        header.classList.remove('open');
        header.classList.add('hidden');
        updateNavState();
      }
    });
  });

  // 3. MENU FILTERING SYSTEM WITH TRANSITION SUPPORT
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      menuItems.forEach(item => {
        // Simple scaling animation
        item.style.transform = 'scale(0.95)';
        item.style.opacity = '0';

        setTimeout(() => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.classList.remove('hidden');
            setTimeout(() => {
              item.style.transform = 'scale(1)';
              item.style.opacity = '1';
            }, 50);
          } else {
            item.classList.add('hidden');
          }
        }, 300);
      });
    });
  });

  // 4. INTERACTIVE POLAROID VIRTUAL LIKES
  const polaroidOverlays = document.querySelectorAll('.polaroid-overlay');
  
  polaroidOverlays.forEach(overlay => {
    const heartSpan = overlay.querySelector('.hearts');
    
    if (heartSpan) {
      let isLiked = false;
      // Extract original count
      const originalText = heartSpan.textContent;
      let count = parseInt(originalText.replace(/[^0-9]/g, ''), 10);
      
      heartSpan.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent trigger photo clicks
        
        if (!isLiked) {
          count++;
          heartSpan.innerHTML = `❤️ ${count}`;
          heartSpan.style.color = '#ff6f59';
          heartSpan.style.transform = 'scale(1.2)';
          isLiked = true;
          
          // Confetti or visual click effect simulation
          createMiniSparkle(e.clientX, e.clientY);
        } else {
          count--;
          heartSpan.innerHTML = `❤️ ${count}`;
          heartSpan.style.color = '#fbf7f4';
          heartSpan.style.transform = 'scale(1)';
          isLiked = false;
        }
        
        setTimeout(() => {
          heartSpan.style.transform = '';
        }, 150);
      });
    }
  });

  // Helper to create click visual sparkles
  function createMiniSparkle(x, y) {
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('div');
      sparkle.textContent = '🌶️';
      sparkle.style.position = 'fixed';
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.fontSize = '12px';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '9999';
      sparkle.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random() * 30;
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;

      document.body.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.style.transform = `translate(${targetX}px, ${targetY}px) scale(0)`;
        sparkle.style.opacity = '0';
      }, 10);

      setTimeout(() => {
        sparkle.remove();
      }, 600);
    }
  }

  // 5. POSTAL SHIPPING RESERVATION FORM SUBMISSION
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Animate button
      const sendBtn = contactForm.querySelector('.btn-postal-send');
      const originalBtnText = sendBtn.innerHTML;
      sendBtn.innerHTML = '⚡ ENVOI EN COURS...';
      sendBtn.disabled = true;

      // Simulate network request
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Hide form and show shipping label status
        sendBtn.innerHTML = originalBtnText;
        sendBtn.disabled = false;
        
        formFeedback.classList.remove('hidden');
        formFeedback.style.opacity = '0';
        formFeedback.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          formFeedback.style.transition = 'all 0.5s ease';
          formFeedback.style.opacity = '1';
          formFeedback.style.transform = 'translateY(0)';
        }, 10);

        // Hide success alert after 8 seconds and return to original form state
        setTimeout(() => {
          formFeedback.style.opacity = '0';
          setTimeout(() => {
            formFeedback.classList.add('hidden');
          }, 500);
        }, 8000);

      }, 1500);
    });
  }

  // 6. SMOOTH PAGE SCROLL NAV TICKET ADJUSTMENT
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Scroll with offset due to header
        let offset = 40;
        if (window.innerWidth <= 768) {
          offset = 120; // larger header block on mobile
        }
        
        const targetPos = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

});
