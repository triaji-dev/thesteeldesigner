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

    // Intersection Observer for fade-in animations (re-using original JS logic)
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add a class for fade-in effect defined in CSS (simplified here)
          entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    }, observerOptions);

    document.querySelectorAll('section, .card, .workflow-step').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      observer.observe(el);
    });

    // Portfolio Infinite Scroll with staggered animation (re-using original JS logic)
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
        const threshold = document.body.offsetHeight - 500; // Adjusted threshold for better responsiveness
        if (scrollPosition >= threshold) {
          visibleCount = Math.min(visibleCount + batchSize, items.length);
          updateVisibility();
        }
      }

      // Initialize portfolio items styles for the observer logic
      items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        item.style.display = 'none'; // Ensure all are initially hidden
      });
      
      // Show initial batch
      visibleCount = Math.min(visibleCount, items.length);
      updateVisibility();

      window.addEventListener('scroll', onScroll);
      window.addEventListener('resize', onScroll); // Check visibility on resize too
    })();

    // Lightbox Modal with animations (re-using original JS logic)
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

    // Parallax effect for hero section (re-using original JS logic, adjusted for subtle effect)
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroRight = document.querySelector('.hero-right');
      // Only apply parallax on desktop/larger screens (optional check)
      if (heroRight && window.innerWidth > 1024) { 
        heroRight.style.transform = `translateY(${scrolled * 0.15}px)`; // Softer effect
      }
    });

    // Hero Background Image Carousel - changes every 3 seconds with slide effect
    (function() {
      const heroSection = document.querySelector('.hero');
      if (!heroSection) return;

      const bgImages = [
        './public/bgimages/193b5d4bf6079469ba784ae7808861de.jpg',
        './public/bgimages/1c01de8d9ddd829a0dc05d8a2e2d7565.jpg',
        './public/bgimages/4e9b9b46b6fe91ba78010ac7f9c61c3f.jpg',
        './public/bgimages/6d5b54c446d6b03f349d34c7c3931eea.jpg',
        './public/bgimages/79a39f8912adbdd2bf5e97d6a65f78f6.jpg',
        './public/bgimages/c60f56193cd15f03471f83ead26d6a25.jpg',
        './public/bgimages/ce6778fe353a896419f6e5bd781c7bad.jpg',
        './public/bgimages/d2448d62b044b01a783d7b13b6f0fa91.jpg',
        './public/bgimages/ee3f1b7cb0b62cafd507bac5b5bdc838.jpg'
      ];

      let currentIndex = 0;

      function changeBackgroundImage() {
        const nextIndex = (currentIndex + 1) % bgImages.length;
        
        // Set next image on ::after pseudo element
        heroSection.style.setProperty('--next-bg-image', `url('${bgImages[nextIndex]}')`);
        
        // Trigger transition
        heroSection.classList.add('transitioning');
        
        setTimeout(() => {
          // Update main background
          heroSection.style.backgroundImage = `url('${bgImages[nextIndex]}')`;  
          heroSection.classList.remove('transitioning');
          currentIndex = nextIndex;
        }, 1000);
      }

      // Set initial background
      heroSection.style.backgroundImage = `url('${bgImages[0]}')`;  

      // Change background every 3 seconds
      setInterval(changeBackgroundImage, 3000);
    })();