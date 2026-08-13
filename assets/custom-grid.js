document.addEventListener('DOMContentLoaded', function () {
  // Delegate trigger event listening to document level to support dynamically rendered sections
  document.addEventListener('click', function (event) {
    
    // Open modal trigger
    const triggerBtn = event.target.closest('[data-popup-trigger]');
    if (triggerBtn) {
      const popupId = triggerBtn.getAttribute('data-popup-trigger');
      const modal = document.getElementById(popupId);
      if (modal) {
        modal.classList.add('is-active');
        modal.setAttribute('aria-hidden', 'false');
      }
    }

    // Close modal trigger
    const closeBtn = event.target.closest('[data-popup-close]');
    if (closeBtn) {
      const modal = closeBtn.closest('.grid-modal');
      if (modal) {
        modal.classList.remove('is-active');
        modal.setAttribute('aria-hidden', 'true');
      }
    }
  });

  // Support ESC key to close active modal
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      const activeModal = document.querySelector('.grid-modal.is-active');
      if (activeModal) {
        activeModal.classList.remove('is-active');
        activeModal.setAttribute('aria-hidden', 'true');
      }
    }
  });
});