/* ============================================
   YHACK '26 — ANIMATIONS & INTERACTIONS
   GSAP + ScrollTrigger + Dynamic Content
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ============================================
  // DATA
  // ============================================
  const coordinators = [
    { name: 'Coordinator 1', role: 'Lead Organizer', initials: 'C1' },
    { name: 'Coordinator 2', role: 'Technical Head', initials: 'C2' },
    { name: 'Coordinator 3', role: 'Event Manager', initials: 'C3' },
    { name: 'Coordinator 4', role: 'Operations', initials: 'C4' },
  ];

  const prevEvents = [
    { name: 'YHack \'24 — Hackathon', year: '2024', color: '#D61116' },
    { name: 'Robo Wars Championship', year: '2024', color: '#1a1a1a' },
    { name: 'Circuit Design Sprint', year: '2023', color: '#D61116' },
    { name: 'AI/ML Workshop', year: '2023', color: '#1a1a1a' },
    { name: 'YHack \'22 — Build Night', year: '2022', color: '#D61116' },
    { name: 'IEEE Tech Symposium', year: '2022', color: '#1a1a1a' },
  ];

  // ============================================
  // POPULATE COORDINATORS
  // ============================================
  const coordGrid = document.getElementById('coordinators-grid');
  if (coordGrid) {
    coordinators.forEach(c => {
      const card = document.createElement('div');
      card.className = 'coordinator-card';
      card.innerHTML = `
        <div class="coordinator-avatar">${c.initials}</div>
        <div class="coordinator-name">${c.name}</div>
        <div class="coordinator-role">${c.role}</div>
      `;
      coordGrid.appendChild(card);
    });
  }

  // ============================================
  // POPULATE PREVIOUS EVENTS
  // ============================================
  const prevGrid = document.getElementById('prev-events-grid');
  if (prevGrid) {
    prevEvents.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'prev-event-card';
      // Generate a colored placeholder image using SVG
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
          <rect width="400" height="300" fill="${ev.color}"/>
          <rect x="0" y="0" width="400" height="300" fill="url(#g-${ev.year})"/>
          <defs>
            <linearGradient id="g-${ev.year}" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="${ev.color}" stop-opacity="1"/>
              <stop offset="1" stop-color="#080808" stop-opacity="0.7"/>
            </linearGradient>
          </defs>
          <text x="200" y="140" text-anchor="middle" fill="#F1ECE2" font-family="sans-serif" font-weight="900" font-size="28" opacity="0.4">YHack</text>
          <text x="200" y="175" text-anchor="middle" fill="#F1ECE2" font-family="monospace" font-size="14" opacity="0.3">${ev.year}</text>
          <line x1="20" y1="260" x2="120" y2="260" stroke="#F1ECE2" stroke-width="2" opacity="0.2"/>
          <circle cx="350" cy="50" r="30" fill="none" stroke="#F1ECE2" stroke-width="1" opacity="0.15"/>
        </svg>
      `;
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);

      card.innerHTML = `
        <img src="${url}" alt="${ev.name}">
        <div class="prev-event-overlay">
          <div class="prev-event-name">${ev.name}</div>
          <div class="prev-event-year">${ev.year}</div>
        </div>
      `;
      prevGrid.appendChild(card);
    });
  }

  // ============================================
  // LOADING SCREEN
  // ============================================
  const loader = document.getElementById('loader');
  const loaderLine = document.getElementById('loader-line');
  const loaderCounter = document.getElementById('loader-counter');
  const loaderText = document.getElementById('loader-text');
  const loaderChars = loaderText.querySelectorAll('span');

  gsap.fromTo(loaderChars,
    { y: 60, opacity: 0, rotateX: -90 },
    { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)' }
  );

  let counter = { val: 0 };
  gsap.to(counter, {
    val: 100, duration: 2.2, ease: 'power2.inOut',
    onUpdate: () => {
      loaderCounter.textContent = String(Math.floor(counter.val)).padStart(3, '0');
    }
  });

  gsap.to(loaderLine, { width: '100%', duration: 2.2, ease: 'power2.inOut' });

  const loaderTl = gsap.timeline({ delay: 2.5 });
  loaderTl
    .to(loaderChars, { y: -80, opacity: 0, duration: 0.4, stagger: 0.04, ease: 'power2.in' })
    .to([loaderLine.parentElement, loaderCounter], { opacity: 0, duration: 0.3 }, '-=0.2')
    .to(loader, {
      yPercent: -100, duration: 0.8, ease: 'power3.inOut',
      onComplete: () => { loader.style.display = 'none'; animateHero(); ScrollTrigger.refresh(); }
    });

  // ============================================
  // HERO ENTRANCE
  // ============================================
  function animateHero() {
    const tl = gsap.timeline();

    tl.to('.hero-headline .line-inner', { y: 0, duration: 1, stagger: 0.12, ease: 'power4.out' });
    tl.to('.hero-subline', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
    tl.to('.hero-cta-group', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
    tl.to('.hero-stats', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    tl.to('.scroll-indicator', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2');
    tl.from('.hero-artwork', { scale: 1.3, opacity: 0, duration: 1.2, ease: 'power3.out' }, 0.3);
    tl.to('.geo-float', { opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, '-=0.8');
    tl.to('.tech-marker', { opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.6');
  }

  // Scribble activation
  setTimeout(() => {
    const el = document.querySelector('.scribble-line');
    if (el) el.classList.add('active');
  }, 3800);

  // ============================================
  // BARCODE GENERATOR
  // ============================================
  const barcodeEl = document.getElementById('barcode');
  if (barcodeEl) {
    for (let i = 0; i < 30; i++) {
      const bar = document.createElement('span');
      bar.style.height = (Math.random() * 16 + 8) + 'px';
      if (Math.random() > 0.7) bar.style.width = '3px';
      barcodeEl.appendChild(bar);
    }
  }

  // ============================================
  // CUSTOM CURSOR
  // ============================================
  const cursor = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  const hoverTargets = document.querySelectorAll('a, button, .event-card, .about-card, .btn-primary, .btn-secondary, .nav-cta, .perk-card, .coordinator-card, .prev-event-card, .track-card, .prize-card, .faq-question, .facility-item, .special-award-chip');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  if ('ontouchstart' in window) cursor.style.display = 'none';

  // ============================================
  // PARALLAX ON HERO
  // ============================================
  const heroArtwork = document.getElementById('hero-artwork');
  const geoElements = document.querySelectorAll('.geo-float');
  const floatSymbols = document.querySelectorAll('.float-symbol');

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    if (heroArtwork) gsap.to(heroArtwork, { x: x * 15, y: y * 10, duration: 1.2, ease: 'power2.out' });

    geoElements.forEach((el, i) => {
      gsap.to(el, { x: x * (i + 1) * 8, y: y * (i + 1) * 8, duration: 1.5, ease: 'power2.out' });
    });

    floatSymbols.forEach((el, i) => {
      gsap.to(el, { x: x * (i + 1) * -5, y: y * (i + 1) * -5, duration: 2, ease: 'power2.out' });
    });
  });

  // ============================================
  // SCROLL-TRIGGERED ANIMATIONS
  // ============================================

  // Artwork parallax
  gsap.to('.hero-artwork', {
    yPercent: 15, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });

  // About section
  gsap.fromTo('.about-title-block', 
    { x: -60, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '#about', start: 'top 70%' } }
  );

  gsap.fromTo('.about-card', 
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.about-cards', start: 'top 75%' } }
  );

  // IEEE RAS cards
  gsap.fromTo('.ieee-card', 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '#ieee-ras', start: 'top 70%' } }
  );

  // Perks
  gsap.fromTo('.perk-card', 
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '#perks', start: 'top 75%' } }
  );

  // Tracks
  gsap.fromTo('.track-card', 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '#tracks', start: 'top 75%' } }
  );

  // Prize pool
  gsap.fromTo('.prize-total', 
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#prizes', start: 'top 75%' } }
  );

  gsap.fromTo('.prize-card', 
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.prize-grid', start: 'top 80%' } }
  );

  gsap.fromTo('.special-award-chip', 
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.special-awards', start: 'top 85%' } }
  );

  // Timeline
  gsap.fromTo('.timeline-item', 
    { x: -40, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.schedule-layout', start: 'top 75%' } }
  );

  // Details
  gsap.fromTo('.detail-block', 
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '#details', start: 'top 75%' } }
  );

  // Facilities
  gsap.fromTo('.facility-item', 
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '#facilities', start: 'top 80%' } }
  );

  // Previous events
  gsap.fromTo('.prev-event-card', 
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '#prev-events', start: 'top 75%' } }
  );

  // Coordinators
  gsap.fromTo('.coordinator-card', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '#team', start: 'top 75%' } }
  );

  // Countdown
  gsap.fromTo('.countdown-left', 
    { x: -60, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#countdown', start: 'top 80%' } }
  );

  gsap.fromTo('.countdown-num', 
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.countdown-right', start: 'top 80%' } }
  );

  // FAQ
  gsap.fromTo('.faq-item', 
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '#faq', start: 'top 80%' } }
  );

  // Sponsors
  gsap.fromTo('.sponsor-tier', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '#sponsors', start: 'top 80%' } }
  );

  // Footer
  gsap.fromTo('.footer-grid > *', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.footer-section', start: 'top 85%' } }
  );

  // ============================================
  // HOVER DISTORTION — ARTWORK
  // ============================================
  const artworkContainer = document.getElementById('artwork-container');
  if (artworkContainer) {
    artworkContainer.addEventListener('mousemove', (e) => {
      const rect = artworkContainer.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      gsap.to(heroArtwork, { rotateY: x * 3, rotateX: -y * 3, transformPerspective: 1000, duration: 0.6, ease: 'power2.out' });
    });
    artworkContainer.addEventListener('mouseleave', () => {
      gsap.to(heroArtwork, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power2.out' });
    });
  }

  // ============================================
  // HOVER DISTORTION — HEADLINE
  // ============================================
  document.querySelectorAll('.hero-headline .line-inner').forEach(line => {
    line.addEventListener('mouseenter', () => {
      gsap.to(line, { skewX: -3, scale: 1.02, color: '#D61116', duration: 0.3, ease: 'power2.out' });
    });
    line.addEventListener('mouseleave', () => {
      gsap.to(line, { skewX: 0, scale: 1, color: '', duration: 0.4, ease: 'power2.out' });
    });
  });

  // ============================================
  // COUNTDOWN TIMER — Updated to Aug 7, 2026
  // ============================================
  const targetDate = new Date('2026-08-07T09:00:00+05:30');

  function updateCountdown() {
    const diff = targetDate - new Date();
    if (diff <= 0) return;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
    document.getElementById('cd-hrs').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ============================================
  // MAGNETIC BUTTONS
  // ============================================
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - rect.left - rect.width / 2) * 0.25,
        y: (e.clientY - rect.top - rect.height / 2) * 0.25,
        duration: 0.3, ease: 'power2.out'
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });

  // ============================================
  // NAV SCROLL BEHAVIOR
  // ============================================
  let lastScroll = 0;
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    if (curr > 100) {
      nav.style.padding = '12px 40px';
      nav.style.background = 'rgba(8,8,8,0.85)';
      nav.style.backdropFilter = 'blur(10px)';
      nav.style.mixBlendMode = 'normal';
    } else {
      nav.style.padding = '20px 40px';
      nav.style.background = 'transparent';
      nav.style.backdropFilter = 'none';
      nav.style.mixBlendMode = 'difference';
    }
    nav.style.transform = (curr > lastScroll && curr > 200) ? 'translateY(-100%)' : 'translateY(0)';
    lastScroll = curr;
  });

  // ============================================
  // HAMBURGER MENU
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');

  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    mobileOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  // FAQ ACCORDION
  // ============================================
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
        faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ============================================
  // GLITCH EFFECT ON LOGO
  // ============================================
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    setInterval(() => {
      if (Math.random() > 0.92) {
        logo.style.textShadow = '2px 0 #D61116, -2px 0 #00ffff';
        setTimeout(() => { logo.style.textShadow = 'none'; }, 100);
        setTimeout(() => { logo.style.textShadow = '-1px 0 #D61116, 1px 0 #00ffff'; }, 150);
        setTimeout(() => { logo.style.textShadow = 'none'; }, 200);
      }
    }, 300);
  }

  // ============================================
  // SMOOTH ANCHOR SCROLLING
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      e.preventDefault();
      const target = document.querySelector(id);
      if (target) gsap.to(window, { scrollTo: { y: target, offsetY: 80 }, duration: 1.2, ease: 'power3.inOut' });
    });
  });

  // ============================================
  // TEXT SCRAMBLE ON TRACK CARDS & PERK TITLES
  // ============================================
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコ0123456789@#$%';

  document.querySelectorAll('.track-name').forEach(el => {
    const original = el.textContent;
    el.parentElement.addEventListener('mouseenter', () => {
      let iterations = 0;
      const interval = setInterval(() => {
        el.textContent = original.split('').map((c, i) => {
          if (i < iterations) return original[i];
          if (c === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        iterations += 0.5;
        if (iterations >= original.length) { clearInterval(interval); el.textContent = original; }
      }, 30);
    });
  });

  document.querySelectorAll('.perk-title').forEach(el => {
    const original = el.textContent;
    el.parentElement.addEventListener('mouseenter', () => {
      let iterations = 0;
      const interval = setInterval(() => {
        el.textContent = original.split('').map((c, i) => {
          if (i < iterations) return original[i];
          if (c === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        iterations += 0.5;
        if (iterations >= original.length) { clearInterval(interval); el.textContent = original; }
      }, 30);
    });
  });

  // ============================================
  // FLOATING NUMBER LABELS
  // ============================================
  document.querySelectorAll('.num-label').forEach(label => {
    gsap.to(label, {
      y: -10 + Math.random() * 20, duration: 3 + Math.random() * 2,
      repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
  });

  document.querySelectorAll('.coord-marker').forEach(marker => {
    gsap.to(marker, {
      opacity: 0.15 + Math.random() * 0.3, duration: 2 + Math.random() * 3,
      repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
  });

  // ============================================
  // BUTTON RIPPLE
  // ============================================
  const btnRegister = document.getElementById('btn-register');
  if (btnRegister) {
    btnRegister.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute; border-radius: 50%; background: rgba(214,17,22,0.4);
        width: 10px; height: 10px; left: ${e.offsetX}px; top: ${e.offsetY}px;
        transform: translate(-50%, -50%) scale(0); pointer-events: none; z-index: 2;
      `;
      this.appendChild(ripple);
      gsap.to(ripple, { scale: 20, opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: () => ripple.remove() });
    });
  }

});
