(function () {
  'use strict';
  const MOBILE_BREAKPOINT = 768;
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
  
function setupHeaderClick() {
  const header = document.getElementById('bannerHeader');

  if (!header) return;

  header.addEventListener('click', (event) => {
    const rect = header.getBoundingClientRect();

    // Click coordinates relative to header
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const isActive = header.classList.contains('is-active');

    // Dynamic bounding coordinates based on state
    const minX = isActive ? 14 : 16;
    const maxX = isActive ? 31 : 34;
    const minY = isActive ? 24 : 27.5;
    const maxY = isActive ? 41 : 37.5;

    const isInsideIcon = 
      clickX >= minX && 
      clickX <= maxX && 
      clickY >= minY && 
      clickY <= maxY;

    if (isInsideIcon) {
      // 1. Toggle header icon state
      const nextActiveState = header.classList.toggle('is-active');

      // 2. Toggle modal
      const bannerModal = document.getElementById('bannerModal');
      if (bannerModal) {
        bannerModal.classList.toggle('is-visible', nextActiveState);
      }

      // 3. Toggle overlay
      const bannerOverlay = document.querySelector('.mobile-banner-overlay');
      if (bannerOverlay) {
        bannerOverlay.classList.toggle('is-visible', nextActiveState);
      }

      // 4. Shift hero wrapper and footer position down
      const heroWrapper = document.querySelector('.mobile-hero-wrapper');
      const bannerFooter = document.querySelector('.custom-banner-section .banner-footer');

      if (heroWrapper) {
        heroWrapper.classList.toggle('is-shifted', nextActiveState);
      }
      if (bannerFooter) {
        bannerFooter.classList.toggle('is-shifted', nextActiveState);
      }
    }
  });

  // Reset positions ONLY when tapping completely outside the custom banner section, modal, or overlay
  document.addEventListener('click', (event) => {
    const bannerModal = document.getElementById('bannerModal');
    const bannerOverlay = document.querySelector('.mobile-banner-overlay');
    const bannerSection = document.querySelector('.custom-banner-section');
    const heroWrapper = document.querySelector('.mobile-hero-wrapper');
    const bannerFooter = document.querySelector('.custom-banner-section .banner-footer');
    
    const targetNode = event.target;

    if (!(targetNode instanceof Node)) return;

    // Check if the click occurred inside the header icon trigger area
    const isHeaderClick = header.contains(targetNode);
    // Check if the click occurred inside the overlay or modal
    const isModalClick = bannerModal && bannerModal.contains(targetNode);
    const isOverlayClick = bannerOverlay && bannerOverlay.contains(targetNode);
    // Check if the click occurred inside the general banner section (hero wrapper, footer, etc.)
    const isBannerSectionClick = bannerSection && bannerSection.contains(targetNode);

    // Only close if the click was OUTSIDE all banner areas
    if (!isHeaderClick && !isModalClick && !isOverlayClick && !isBannerSectionClick) {
      header.classList.remove('is-active');

      if (bannerModal) bannerModal.classList.remove('is-visible');
      if (bannerOverlay) bannerOverlay.classList.remove('is-visible');
      if (heroWrapper) heroWrapper.classList.remove('is-shifted');
      if (bannerFooter) bannerFooter.classList.remove('is-shifted');
    }
  });
}

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