(function () {
  'use strict';

  const MOBILE_BREAKPOINT = 768;

  function setupMobileHeroElement() {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const bannerSection = document.getElementById('customBannerSection');
    const bannerHeader = document.getElementById('bannerHeader');

    if (!bannerSection || !bannerHeader) return;

    let mobileHeroContent = bannerSection.querySelector('.mobile-hero-wrapper');

    if (isMobile) {
      // Create element only if it doesn't already exist
      if (!mobileHeroContent) {
        // 1. Create main wrapper container
        mobileHeroContent = document.createElement('div');
        mobileHeroContent.className = 'mobile-hero-wrapper';

        // 2. Child Div 1: Text-Only Container (Hero Title & Hero Description)
        const mobileTopTextDiv = document.createElement('div');
        mobileTopTextDiv.className = 'mobile-hero-top-text';

        // Extract Title from Liquid markup
        const originalTitle = bannerSection.querySelector('.hero-title');
        if (originalTitle) {
          const titleClone = originalTitle.cloneNode(true);
          mobileTopTextDiv.appendChild(titleClone);
        }

        // Extract Description from Liquid markup
        const originalDescription = bannerSection.querySelector('.hero-description');
        if (originalDescription) {
          const descriptionClone = originalDescription.cloneNode(true);
          mobileTopTextDiv.appendChild(descriptionClone);
        }

        // 3. Child Div 2: Bottom Container (Shop Now with Background Image)
        const mobileShopBgDiv = document.createElement('div');
        mobileShopBgDiv.className = 'mobile-hero-shop-bg-container';

  
        // Extract Shop Now button from Liquid markup
        const originalShopBtn = bannerSection.querySelector('.btn-shop-now');
        if (originalShopBtn) {
          const shopBtnClone = originalShopBtn.cloneNode(true);
          mobileShopBgDiv.appendChild(shopBtnClone);
        }

        // Assemble the two child divs into the mobile hero container
        mobileHeroContent.appendChild(mobileTopTextDiv);
        mobileHeroContent.appendChild(mobileShopBgDiv);

        // Insert as 2nd child of custom-banner-section (immediately after #bannerHeader)
        if (bannerHeader.nextSibling) {
          bannerSection.insertBefore(mobileHeroContent, bannerHeader.nextSibling);
        } else {
          bannerSection.appendChild(mobileHeroContent);
        }
      }
    } else {
      // Remove dynamic element when returning to desktop screen size
      if (mobileHeroContent) {
        mobileHeroContent.remove();
      }
    }
  }

  // Initialize on load and on window resize
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setupMobileHeroElement();
  } else {
    document.addEventListener('DOMContentLoaded', setupMobileHeroElement);
  }

  window.addEventListener('resize', setupMobileHeroElement);
  window.addEventListener('orientationchange', setupMobileHeroElement);
})();