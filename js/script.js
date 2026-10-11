/**
 * MAS WIS: bangun dan renovasi
 * Main Interactive Script
 * Strict Vanilla JS with zero external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 01. Dynamic Copyright Year
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 02. Theme Toggle (Light / Dark Architectural Theme)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Initialize theme from storage or system preference
  const savedTheme = localStorage.getItem('maswis_theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlRoot.setAttribute('data-theme', 'dark');
  } else {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('maswis_theme', newTheme);
      themeToggleBtn.setAttribute('aria-label', `Ubah ke tema ${newTheme === 'light' ? 'gelap' : 'terang'}`);
    });
  }

  // --------------------------------------------------------------------------
  // 03. Sticky Header Scroll Effect
  // --------------------------------------------------------------------------
  const header = document.getElementById('navbar');
  const handleScrollHeader = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // --------------------------------------------------------------------------
  // 04. Mobile Drawer Navigation
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta-btn');

  const openMobileMenu = () => {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close drawer when any mobile link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // --------------------------------------------------------------------------
  // 05. Hero Video Play / Pause Toggle
  // --------------------------------------------------------------------------
  const videoElement = document.getElementById('hero-video');
  const videoToggleBtn = document.getElementById('video-toggle');

  if (videoElement && videoToggleBtn) {
    videoToggleBtn.addEventListener('click', () => {
      if (videoElement.paused) {
        videoElement.play().then(() => {
          videoToggleBtn.classList.remove('paused');
          videoToggleBtn.setAttribute('aria-label', 'Jeda video latar belakang');
        }).catch(err => {
          console.warn('Playback error:', err);
        });
      } else {
        videoElement.pause();
        videoToggleBtn.classList.add('paused');
        videoToggleBtn.setAttribute('aria-label', 'Putar video latar belakang');
      }
    });

    // Handle initial state if browser autoplay policy paused it
    videoElement.addEventListener('pause', () => {
      videoToggleBtn.classList.add('paused');
    });
    videoElement.addEventListener('play', () => {
      videoToggleBtn.classList.remove('paused');
    });
  }

  // --------------------------------------------------------------------------
  // 06. Accessible Lightbox Modal for Project Documentation
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('project-lightbox');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxWaBtn = document.getElementById('lightbox-wa-btn');

  let lastActiveTrigger = null;

  const openLightbox = (imgSrc, title, desc, triggerBtn) => {
    if (!lightboxModal || !lightboxImg) return;
    lastActiveTrigger = triggerBtn;

    lightboxImg.src = imgSrc;
    lightboxImg.alt = `Dokumentasi foto penuh: ${title}`;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = desc;

    // Generate contextual WhatsApp consultation URL
    if (lightboxWaBtn) {
      const waMsg = `Halo Mas Wisnu, saya melihat foto dokumentasi "${title}" di website. Bisakah saya berkonsultasi mengenai estimasi dan pengerjaan untuk proyek serupa?`;
      lightboxWaBtn.href = `https://wa.me/6282140000212?text=${encodeURIComponent(waMsg)}`;
    }

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for keyboard accessibility
    if (lightboxCloseBtn) {
      lightboxCloseBtn.focus();
    }
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore focus to triggering button (R-32 accessibility)
    if (lastActiveTrigger) {
      lastActiveTrigger.focus();
      lastActiveTrigger = null;
    }
  };

  // Attach event listeners to all project zoom buttons
  const zoomButtons = document.querySelectorAll('.project-zoom-btn');
  zoomButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-target-img');
      const title = btn.getAttribute('data-target-title') || 'Dokumentasi Proyek';
      const desc = btn.getAttribute('data-target-desc') || '';
      openLightbox(imgSrc, title, desc, btn);
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  // --------------------------------------------------------------------------
  // 07. Global Keyboard Event Handling (Escape Key Support)
  // --------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close lightbox if open
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
      // Close mobile drawer if open
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    }
  });

  // --------------------------------------------------------------------------
  // 08. Active Nav Link Scrollspy (Intersection Observer)
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }
});
