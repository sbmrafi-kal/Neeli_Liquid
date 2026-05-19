(function () {
  function clampIndex(index, length) {
    if (length <= 0) return 0;
    if (index < 0) return length - 1;
    if (index >= length) return 0;
    return index;
  }

  function initCarousel(root) {
    const slides = Array.from(root.querySelectorAll('[data-theme-carousel-slide]'));
    const thumbs = Array.from(root.querySelectorAll('[data-theme-carousel-thumb]'));
    const prev = root.querySelector('[data-theme-carousel-prev]');
    const next = root.querySelector('[data-theme-carousel-next]');
    if (!slides.length) return;

    let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
    if (current < 0) current = 0;
    let timer = null;

    function setActive(nextIndex) {
      current = clampIndex(nextIndex, slides.length);
      slides.forEach((slide, index) => slide.classList.toggle('is-active', index === current));
      thumbs.forEach((thumb, index) => thumb.classList.toggle('is-active', index === current));
    }

    function start() {
      if (timer || root.dataset.neeliAutoplay !== 'true') return;
      const interval = Number(root.dataset.neeliInterval || 4800);
      timer = window.setInterval(() => setActive(current + 1), interval);
    }

    function stop() {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    }

    if (prev) prev.addEventListener('click', () => setActive(current - 1));
    if (next) next.addEventListener('click', () => setActive(current + 1));
    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const index = Number(thumb.getAttribute('data-theme-carousel-thumb'));
        if (!Number.isNaN(index)) setActive(index);
      });
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    setActive(current);
    start();
  }

  function initReveal() {
    const elements = Array.from(document.querySelectorAll('.theme-reveal'));
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    elements.forEach((element) => observer.observe(element));
  }

  function boot() {
    document.querySelectorAll('[data-theme-carousel]').forEach(initCarousel);
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
