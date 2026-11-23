(() => {
  const menuButton = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');
  const closeMenu = () => {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => {
    if (menu.classList.contains('is-open') && !menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 650) closeMenu(); });

  const copyButton = document.querySelector('.copy-button');
  if (copyButton && navigator.clipboard) {
    copyButton.addEventListener('click', async () => {
      const text = '--color-primary: #8056F5;\n--radius-card: 12px;\n--space-unit: 8px;';
      try {
        await navigator.clipboard.writeText(text);
        copyButton.textContent = 'Copied!';
        window.setTimeout(() => { copyButton.textContent = 'Copy code'; }, 1400);
      } catch { copyButton.textContent = 'Select code manually'; }
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const initAnimations = () => {
    if (reducedMotion || !window.gsap) return;
    const gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
    gsap.from('.hero-copy > *', { opacity: 0, y: 18, duration: .75, stagger: .1, ease: 'power3.out', delay: .12 });
    gsap.from('.hero-art', { opacity: 0, scale: .88, duration: 1.1, ease: 'power3.out', delay: .25 });
    gsap.to('.platform', { y: -8, duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    if (!window.ScrollTrigger) return;
    gsap.utils.toArray('.section-heading, .product-intro, .feature-list article, .showcase-card, .quote-section, .blue-card, .review-card, .cta-section').forEach((element) => {
      gsap.from(element, {
        opacity: 0, y: 25, duration: .72, ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true }
      });
    });
    gsap.from('.brand-row span', { opacity: 0, y: 12, duration: .5, stagger: .08, scrollTrigger: { trigger: '.brand-row', start: 'top 92%', once: true } });
  };
  if (document.readyState === 'complete') initAnimations();
  else window.addEventListener('load', initAnimations, { once: true });
})();
