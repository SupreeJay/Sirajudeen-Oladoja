(function () {
  const MOBILE_BREAKPOINT = 768;

  function initMobileLayout() {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

    if (isMobile) {
      applyMobileDOM();
    } else {
      removeMobileDOM();
    }
  }

  function applyMobileDOM() {
    if (document.getElementById('mobile-custom-banner')) return;

    // --- 1. NAVBAR SETUP ---
    const existingHeader = document.getElementById('bannerHeader');
    if (existingHeader) existingHeader.style.display = 'none';

    const mobileNavbar = document.createElement('nav');
    mobileNavbar.id = 'mobile-site-navbar';
    Object.assign(mobileNavbar.style, {
      width: '100%',
      maxWidth: '375.44px',
      height: '65px',
      display: 'flex',
      alignItems: 'center',
      gap: '78px',
      opacity: '1',
      padding: '23px 112px 23px 16px',
      background: '#F7F7F7',
      boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.15)',
      boxSizing: 'border-box',
      margin: '0 auto',
      position: 'relative',
      zIndex: '100'
    });

    // Hamburger Icon
    const hamburger = document.createElement('button');
    hamburger.id = 'mobile-hamburger-btn';
    hamburger.setAttribute('aria-label', 'Toggle Navigation');
    Object.assign(hamburger.style, {
      width: '18px',
      height: '10px',
      opacity: '1',
      borderTop: '2px solid #000000',
      borderBottom: '2px solid #000000',
      background: 'transparent',
      padding: '0',
      cursor: 'pointer',
      boxSizing: 'border-box',
      flexShrink: '0'
    });

    // Editable Logo Text
    const logoText = document.createElement('div');
    logoText.className = 'site-logo-text';
    
    const existingLogo = document.getElementById('brandTitle');
    logoText.innerText = existingLogo ? existingLogo.innerText.trim() : 'TISSO VISON';

    Object.assign(logoText.style, {
      width: 'auto',
      minWidth: '151.44px',
      height: '19px',
      opacity: '1',
      color: '#000000',
      fontFamily: 'Jost, sans-serif',
      fontSize: '16px',
      fontWeight: '700',
      lineHeight: '19px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    });

    mobileNavbar.appendChild(hamburger);
    mobileNavbar.appendChild(logoText);

    // --- 2. CUSTOM BANNER CONTAINER ---
    const mobileBanner = document.createElement('section');
    mobileBanner.id = 'mobile-custom-banner';
    Object.assign(mobileBanner.style, {
      width: '100%',
      maxWidth: '375.44px',
      height: '520px',
      opacity: '1',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#FFFFFF'
    });

    // --- 3. HERO CONTENT CONTAINER ---
    const heroContent = document.createElement('div');
    heroContent.id = 'mobile-hero-content';
    Object.assign(heroContent.style, {
      width: '375px',
      height: '421px',
      opacity: '1',
      background: '#FFFFFF',
      position: 'relative',
      margin: '0 auto'
    });

    // "The Gift Guide" Text
    const giftGuideTitle = document.createElement('h1');
    giftGuideTitle.innerText = 'The Gift Guide';
    Object.assign(giftGuideTitle.style, {
      width: '197px',
      height: '30px',
      opacity: '1',
      position: 'absolute',
      top: '49px',
      left: '88.78px',
      fontFamily: 'Jost, sans-serif',
      fontWeight: '500',
      fontSize: '30px',
      lineHeight: '100%',
      letterSpacing: '0px',
      textAlign: 'center',
      color: '#000000',
      margin: '0'
    });

    // "Discover Joy..." Text
    const giftGuideSubtitle = document.createElement('p');
    giftGuideSubtitle.innerText = 'Discover Joy: Your Ultimate Holiday Gift Destination.';
    Object.assign(giftGuideSubtitle.style, {
      width: '340px',
      height: '42px',
      opacity: '1',
      position: 'absolute',
      top: '103px',
      left: '16.78px',
      fontFamily: 'Jost, sans-serif',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '130%',
      letterSpacing: '0px',
      textAlign: 'center',
      color: '#000000',
      margin: '0'
    });

    // Combined Image & "Shop Now" Container
    const heroImgShopContainer = document.createElement('div');
    Object.assign(heroImgShopContainer.style, {
      width: '686px',
      height: '264px',
      opacity: '1',
      position: 'absolute',
      top: '157px',
      left: '-140px',
      backgroundImage: 'url("hero-background.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    });

    // "SHOP NOW" Button Overlay
    const shopNowBtn = document.createElement('a');
    shopNowBtn.href = '/collections/all';
    Object.assign(shopNowBtn.style, {
      width: '160px',
      height: '44px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      backgroundColor: '#000000',
      textDecoration: 'none',
      cursor: 'pointer',
      boxSizing: 'border-box'
    });

    // Shop Now Text
    const shopNowText = document.createElement('span');
    shopNowText.innerText = 'SHOP NOW';
    Object.assign(shopNowText.style, {
      width: '119px',
      height: '19px',
      opacity: '1',
      fontFamily: 'Jost, sans-serif',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '20.48px',
      letterSpacing: '0px',
      textAlign: 'center',
      textTransform: 'uppercase',
      color: '#F5F5F5'
    });

    // Shop Now Arrow
    const shopNowArrow = document.createElement('span');
    Object.assign(shopNowArrow.style, {
      width: '24px',
      height: '0px',
      opacity: '1',
      borderTop: '1.5px solid #F5F5F5',
      display: 'inline-block',
      position: 'relative'
    });

    shopNowBtn.appendChild(shopNowText);
    shopNowBtn.appendChild(shopNowArrow);
    heroImgShopContainer.appendChild(shopNowBtn);

    // Assemble Hero Section
    heroContent.appendChild(giftGuideTitle);
    heroContent.appendChild(giftGuideSubtitle);
    heroContent.appendChild(heroImgShopContainer);

    // --- 4. FOOTER DIV CONTAINER ---
    const mobileFooter = document.createElement('footer');
    mobileFooter.id = 'mobile-custom-footer';
    Object.assign(mobileFooter.style, {
      width: '100%',
      maxWidth: '375px',
      height: '34px',
      opacity: '1',
      padding: '10px 50px',
      background: '#F5F5F5',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)'
    });

    const footerText = document.createElement('p');
    footerText.innerText = 'SUSTAINABLE, ETHICALLY MADE ACTIVEWEAR';
    Object.assign(footerText.style, {
      width: '288px',
      height: '14px',
      opacity: '1',
      fontFamily: 'Jost, sans-serif',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '13.42px',
      letterSpacing: '0px',
      textAlign: 'center',
      color: '#000000',
      margin: '0'
    });

    mobileFooter.appendChild(footerText);

    // Assemble Banner Block
    mobileBanner.appendChild(heroContent);
    mobileBanner.appendChild(mobileFooter);

    // Mount to Document DOM
    document.body.prepend(mobileNavbar);
    if (existingHeader) {
      existingHeader.after(mobileBanner);
    } else {
      document.body.appendChild(mobileBanner);
    }
  }

  function removeMobileDOM() {
    const existingHeader = document.getElementById('siteHeader');
    if (existingHeader) existingHeader.style.display = '';

    const nav = document.getElementById('mobile-site-navbar');
    const banner = document.getElementById('mobile-custom-banner');

    if (nav) nav.remove();
    if (banner) banner.remove();
  }

  // Execution Listeners
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileLayout);
  } else {
    initMobileLayout();
  }
  
  window.addEventListener('resize', initMobileLayout);
})();