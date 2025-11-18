// TheSteelDesigner.eu - Main JavaScript

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#hero-title') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .card, .workflow-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// Portfolio Infinite Scroll with staggered animation
(function() {
  const items = Array.from(document.querySelectorAll('.portfolio-item'));
  const batchSize = 6;
  let visibleCount = 9;

  function updateVisibility() {
    items.forEach((item, index) => {
      if (index < visibleCount) {
        item.style.display = 'block';
        // Stagger animation delay
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, (index % batchSize) * 80);
      }
    });
  }

  function onScroll() {
    if (visibleCount >= items.length) return;
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 300;
    if (scrollPosition >= threshold) {
      visibleCount = Math.min(visibleCount + batchSize, items.length);
      updateVisibility();
    }
  }

  // Initialize portfolio items
  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
  });

  updateVisibility();
  window.addEventListener('scroll', onScroll);
})();

// Lightbox Modal with animations
(function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.querySelector('.lightbox-close');
  const images = document.querySelectorAll('.portfolio-item img');

  function openLightbox(src, caption) {
    lightboxImage.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Trigger animation
    setTimeout(() => {
      lightbox.style.opacity = '1';
    }, 10);
  }

  function closeLightbox() {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
      lightboxImage.src = '';
      lightboxCaption.textContent = '';
    }, 300);
  }

  images.forEach(img => {
    img.addEventListener('click', () => {
      const caption = img.parentElement.querySelector('.portfolio-caption')?.textContent || '';
      openLightbox(img.src, caption);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
})();

// Add hover effect for floating buttons
document.querySelectorAll('.fab').forEach(fab => {
  fab.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.15) translateY(-4px)';
  });
  
  fab.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) translateY(0)';
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroRight = document.querySelector('.hero-right');
  if (heroRight && scrolled < 600) {
    heroRight.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Add number attributes to workflow steps
document.querySelectorAll('.workflow-step').forEach((step, index) => {
  step.setAttribute('data-number', index + 1);
});
