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
    
    // Calculate exact click position relative to the header element
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Get exact computed values of ::before pseudo-element
    const beforeStyle = window.getComputedStyle(header, '::before');
    
    if (beforeStyle.content === 'none') return;

    // Parse computed values or fallback to known pixel values
    const beforeTop = parseFloat(beforeStyle.top) || 0;
    const beforeLeft = parseFloat(beforeStyle.left) || 0;
    const beforeWidth = parseFloat(beforeStyle.width) || 30;  // Adjust if your icon width is different
    const beforeHeight = parseFloat(beforeStyle.height) || 30; // Adjust if your icon height is different

    // Check if the click occurred strictly inside the ::before bounding area
    const isInsideBefore = 
      clickX >= beforeLeft && 
      clickX <= (beforeLeft + beforeWidth) &&
      clickY >= beforeTop && 
      clickY <= (beforeTop + beforeHeight);

    if (isInsideBefore) {
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