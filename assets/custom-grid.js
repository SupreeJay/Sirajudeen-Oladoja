document.addEventListener('DOMContentLoaded', () => {

  const triggers = document.querySelectorAll('[data-popup-trigger]');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const popupId = trigger.getAttribute('data-popup-trigger');

  
      if (popupId) {
        const targetModal = document.getElementById(popupId);

        if (targetModal) {
          closeAllModals(); 
          targetModal.classList.add('is-active');
          targetModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden'; 
        }
      }
    });
  });

  const closeButtons = document.querySelectorAll('[data-popup-close]');

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      closeAllModals();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  function closeAllModals() {
    const activeModals = document.querySelectorAll('.grid-modal.is-active');
    activeModals.forEach((modal) => {
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = '';
  }

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