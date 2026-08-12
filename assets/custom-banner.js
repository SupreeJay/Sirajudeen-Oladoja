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
  const header = document.getElementById('bannerHeader');

  if (!header) return;

  header.addEventListener('click', (event) => {
    const rect = header.getBoundingClientRect();

    // Relative click coordinates inside the header
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Coordinate boundaries based on layout dimensions:
    // minX = 16px (left padding)
    // maxX = 16px + 18px (width) = 34px
    // minY = 23px (top padding) + 4.5px (vertical centering offset in 19px content height) = 27.5px
    // maxY = 27.5px + 10px (height) = 37.5px
    const minX = 16;
    const maxX = 34;
    const minY = 27.5;
    const maxY = 37.5;

    const isInsideHamburger = 
      clickX >= minX && 
      clickX <= maxX && 
      clickY >= minY && 
      clickY <= maxY;

    if (isInsideHamburger) {
      alert('Hamburger Menu Clicked');

      header.classList.toggle('is-active');

      const bannerModal = document.getElementById('bannerModal');
      if (bannerModal) {
        bannerModal.classList.toggle('is-visible', header.classList.contains('is-active'));
      }
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