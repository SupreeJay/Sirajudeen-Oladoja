document.addEventListener('DOMContentLoaded', function () {
  const bannerSection = document.querySelector('.custom-banner-section');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');

  if (bannerSection && toggleBtn) {
    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const isOpen = bannerSection.classList.toggle('menu-open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      
    });
  }
});