(function () {
  'use strict';

  const MOBILE_BREAKPOINT = 768;

  /* ========================================================
     1. MOBILE HERO SETUP
     ======================================================== */
  function setupMobileHeroElement() {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const bannerSection = document.getElementById('customBannerSection');
    const bannerHeader = document.getElementById('bannerHeader');
    const footerTagline = document.getElementById('footerTagline');

    if (!bannerSection || !bannerHeader || !footerTagline) return;

    let mobileHeroContent = bannerSection.querySelector('.mobile-hero-wrapper');

    if (isMobile) {
      footerTagline.innerText = 'SUSTAINABLE, ETHICALLY MADE ACTIVEWEAR';

      if (!mobileHeroContent) {
        // Create main wrapper container
        mobileHeroContent = document.createElement('div');
        mobileHeroContent.className = 'mobile-hero-wrapper';

        // Child Div 1: Top Text Container
        const mobileTopTextDiv = document.createElement('div');
        mobileTopTextDiv.className = 'mobile-hero-top-text';

        // Extract Title from Liquid markup
        const originalTitle = bannerSection.querySelector('.hero-title');
        if (originalTitle) {
          const titleClone = originalTitle.cloneNode(true);
          mobileTopTextDiv.appendChild(titleClone);
        }

        // Create mobile description
        const newTitle = document.createElement('div');
        newTitle.className = 'hero-description-mobile';
        newTitle.textContent = 'Discover Joy: Your Ultimate Holiday Gift Destination.';
        mobileTopTextDiv.appendChild(newTitle);

        // Child Div 2: Bottom Shop Now Container
        const mobileShopBgDiv = document.createElement('div');
        mobileShopBgDiv.className = 'mobile-hero-shop-bg-container';

        const originalShopBtn = bannerSection.querySelector('.btn-shop-now');
        if (originalShopBtn) {
          const shopBtnClone = originalShopBtn.cloneNode(true);
          mobileShopBgDiv.appendChild(shopBtnClone);
        }

        // Assemble child divs into mobile hero
        mobileHeroContent.appendChild(mobileTopTextDiv);
        mobileHeroContent.appendChild(mobileShopBgDiv);

        // Insert immediately after #bannerHeader
        if (bannerHeader.nextSibling) {
          bannerSection.insertBefore(mobileHeroContent, bannerHeader.nextSibling);
        } else {
          bannerSection.appendChild(mobileHeroContent);
        }
      }
    } else {
      // Remove dynamic element when returning to desktop view
      if (mobileHeroContent) {
        mobileHeroContent.remove();
      }
    }
  }

  /* ========================================================
     2. HAMBURGER (::before) CLICK EVENT LISTENER
     ======================================================== */
function setupHeaderClick() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const header = document.getElementById('bannerHeader');
  const bannerModal = document.getElementById('bannerModal');

  if (!hamburgerBtn || !header) return;

  hamburgerBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevents click bubbling

    // Toggle active state on header & button
    const isActive = hamburgerBtn.classList.toggle('is-active');
    header.classList.toggle('is-active', isActive);

    // Toggle visibility of the modal
    if (bannerModal) {
      bannerModal.classList.toggle('is-visible', isActive);
    }
  });

  // Close modal when clicking outside
  document.addEventListener('click', (event) => {
    const targetNode = event.target;

    // Use runtime instanceof check for standard JavaScript
    if (
      bannerModal &&
      targetNode instanceof Node &&
      !hamburgerBtn.contains(targetNode) &&
      !bannerModal.contains(targetNode)
    ) {
      hamburgerBtn.classList.remove('is-active');
      header.classList.remove('is-active');
      bannerModal.classList.remove('is-visible');
    }
  });
}
  /* ========================================================
     3. INITIALIZATION & EVENT LISTENERS
     ======================================================== */
  function init() {
    setupMobileHeroElement();
    setupHeaderClick();
  }

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  window.addEventListener('resize', setupMobileHeroElement);
  window.addEventListener('orientationchange', setupMobileHeroElement);

})();