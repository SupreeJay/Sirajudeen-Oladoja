document.addEventListener('DOMContentLoaded', () => {
  // 1. Modal Trigger Logic (Open Pop-ups)
  const triggers = document.querySelectorAll('[data-popup-trigger]');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const popupId = trigger.getAttribute('data-popup-trigger');

      // Guard check ensures popupId is a valid string before calling getElementById
      if (popupId) {
        const targetModal = document.getElementById(popupId);

        if (targetModal) {
          closeAllModals(); // Close any currently open modal first
          targetModal.classList.add('is-active');
          targetModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
      }
    });
  });

  // 2. Close Modal Handlers (Overlay, Close Button)
  const closeButtons = document.querySelectorAll('[data-popup-close]');

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Close when pressing the 'Escape' key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Helper Function: Close All Modals
  function closeAllModals() {
    const activeModals = document.querySelectorAll('.grid-modal.is-active');
    activeModals.forEach((modal) => {
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = ''; // Restore page scrolling
  }

  // 3. Fallback Swatch Toggle Logic (for preview/dummy mode)
  const fallbackSwatches = document.querySelectorAll(
    '.modal-placeholder .swatch-btn, .modal-product-card > .modal-option-group .swatch-btn'
  );

  fallbackSwatches.forEach((swatch) => {
    swatch.addEventListener('click', () => {
      const container = swatch.closest('.color-swatch-container');
      if (container) {
        container
          .querySelectorAll('.swatch-btn')
          .forEach((btn) => btn.classList.remove('active'));
        swatch.classList.add('active');
      }
    });
  });
});