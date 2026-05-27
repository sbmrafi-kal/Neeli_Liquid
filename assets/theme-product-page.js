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
      if (timer || root.dataset.themeAutoplay !== 'true') return;
      const interval = Number(root.dataset.themeInterval || 4800);
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

  function initHeaderScroll() {
    const header = document.querySelector('.theme-site-header');
    if (!header) return;
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initThemeAccordions() {
    const items = Array.from(document.querySelectorAll('[data-theme-accordion-item]'));
    if (!items.length) return;

    items.forEach((item) => {
      const trigger = item.querySelector('[data-theme-accordion-trigger]');
      const content = item.querySelector('[data-theme-accordion-content]');
      if (!trigger || !content) return;

      let closeTimer = null;

      function setState(isOpen) {
        const state = isOpen ? 'open' : 'closed';
        if (closeTimer) {
          window.clearTimeout(closeTimer);
          closeTimer = null;
        }

        if (isOpen) {
          content.hidden = false;
        }

        item.dataset.state = state;
        trigger.dataset.state = state;
        content.dataset.state = state;
        trigger.setAttribute('aria-expanded', String(isOpen));

        if (!isOpen) {
          closeTimer = window.setTimeout(() => {
            if (item.dataset.state === 'closed') content.hidden = true;
          }, 220);
        }
      }

      const initiallyOpen = item.dataset.state === 'open';
      content.hidden = !initiallyOpen;
      setState(initiallyOpen);

      trigger.addEventListener('click', () => {
        setState(item.dataset.state !== 'open');
      });
    });
  }

  function initVariantSync() {
    const selects = Array.from(document.querySelectorAll('.theme-variant-select'));
    if (!selects.length) return;

    let isSyncing = false;

    selects.forEach((select) => {
      select.addEventListener('change', (e) => {
        if (isSyncing) return;
        isSyncing = true;

        const targetValue = e.target.value;
        
        // 1. Sync other selects to the same value
        selects.forEach((otherSelect) => {
          if (otherSelect !== select && otherSelect.value !== targetValue) {
            otherSelect.value = targetValue;
            // Trigger change event to keep other selectors in sync if nested
            otherSelect.dispatchEvent(new Event('change'));
          }
        });

        isSyncing = false;

        // 2. Parse selected option attributes
        const selectedOption = select.options[select.selectedIndex];
        if (!selectedOption) return;

        const price = selectedOption.getAttribute('data-price');
        const comparePrice = selectedOption.getAttribute('data-compare-price');
        const available = selectedOption.getAttribute('data-available') === 'true';

        // 3. Update all CTA buttons' price and text states
        const ctaButtons = Array.from(document.querySelectorAll('.cta-sheen'));
        ctaButtons.forEach((btn) => {
          // Update prices
          const newPriceEl = btn.querySelector('.theme-reorder-card__price-new');
          const oldPriceEl = btn.querySelector('.theme-reorder-card__price-old');
          
          if (newPriceEl && price) {
            newPriceEl.textContent = price;
          }
          
          if (oldPriceEl) {
            if (comparePrice && comparePrice.trim() !== '') {
              oldPriceEl.textContent = comparePrice;
              oldPriceEl.classList.remove('is-hidden');
            } else {
              oldPriceEl.classList.add('is-hidden');
            }
          }

          // Update availability state
          const textEl = btn.querySelector('.theme-reorder-btn-text');
          if (available) {
            btn.removeAttribute('disabled');
            if (textEl) {
              const isMobileText = textEl.closest('.theme-product-info-mobile') !== null;
              if (isMobileText) {
                textEl.textContent = 'REORDER NOW';
              } else {
                textEl.textContent = 'Reorder now';
              }
            }
          } else {
            btn.setAttribute('disabled', 'disabled');
            if (textEl) {
              textEl.textContent = 'Sold Out';
            }
          }
        });
      });
    });

    // Run once at start to initialize correct pricing from the pre-selected option
    const firstSelect = selects[0];
    if (firstSelect) {
      // Trigger a change to align initial UI states
      firstSelect.dispatchEvent(new Event('change'));
    }
  }

  function initVariantRadios() {
    const sections = Array.from(document.querySelectorAll('.theme-product-page'));
    if (!sections.length) return;

    sections.forEach((section) => {
      const radios = Array.from(section.querySelectorAll('.theme-variant-box__input'));
      if (!radios.length) return;

      const priceTargets = Array.from(section.querySelectorAll('.theme-reorder-btn__price-new, .theme-reorder-card__price-new, .theme-sticky-cart-bar__price, .theme-variant-box__price-new'));
      const oldPriceTargets = Array.from(section.querySelectorAll('.theme-reorder-btn__price-old, .theme-reorder-card__price-old, .theme-variant-box__price-old'));
      const actionButtons = Array.from(section.querySelectorAll('.theme-reorder-btn'));
      const titleTargets = Array.from(section.querySelectorAll('.theme-reorder-btn__title'));
      const labels = Array.from(section.querySelectorAll('.theme-variant-box'));

      function applyState() {
        const selected = radios.find((radio) => radio.checked) || radios[0];
        if (!selected) return;

        const price = selected.getAttribute('data-price') || '';
        const comparePrice = selected.getAttribute('data-compare-price') || '';
        const available = selected.getAttribute('data-available') === 'true';

        labels.forEach((label) => {
          const input = label.querySelector('.theme-variant-box__input');
          label.classList.toggle('is-selected', Boolean(input && input.checked));
        });

        priceTargets.forEach((node) => {
          node.textContent = price;
        });

        oldPriceTargets.forEach((node) => {
          if (comparePrice && comparePrice.trim()) {
            node.textContent = comparePrice;
            node.hidden = false;
          } else {
            node.hidden = true;
          }
        });

        actionButtons.forEach((button) => {
          button.disabled = !available;
        });

        titleTargets.forEach((node) => {
          node.textContent = available ? 'Add to Cart' : 'Sold Out';
        });
      }

      radios.forEach((radio) => {
        radio.addEventListener('change', applyState);
      });

      applyState();
    });
  }

  function boot() {
    document.documentElement.classList.add('theme-js-ready');
    document.querySelectorAll('[data-theme-carousel]').forEach(initCarousel);
    initReveal();
    initHeaderScroll();
    initThemeAccordions();
    initVariantSync();
    initVariantRadios();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
