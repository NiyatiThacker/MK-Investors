import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, PhoneCall } from 'lucide-react';
import { motion, LayoutGroup, useMotionValue, animate } from 'framer-motion';
import { ROUTES } from '../../constants/routes';
import { SERVICES } from '../../constants/services';
import ServicesDropdown from './ServicesDropdown';

// You can change this string to select the visual style of the floating object:
// 'coins' (default double gold coins ₹ & $), 'chart' (ascending stock trendline chart), 'sparkle' (glowing diamond sparkle), 'bull' (market bull outline)
const FLOATING_OBJECT_TYPE = 'coins';

// Option 1: Double Gold Coins (Rupee & Dollar)
function FinanceLogoAnimation({ size = 36 }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-md animate-pulse" />
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Dollar Coin (Back-left) */}
        <div
          className="absolute w-[60%] h-[60%] left-0 bottom-1 rounded-full border border-gold-600/30 shadow-lg flex items-center justify-center bg-gradient-to-br from-gold-400 to-gold-600 animate-coin-flip"
          style={{
            animationDelay: '1.5s',
            perspective: '1000px',
            transformOrigin: 'center'
          }}
        >
          <span className="text-[10px] font-black text-green-950 select-none">$</span>
        </div>

        {/* Rupee Coin (Front-right) */}
        <div
          className="absolute w-[68%] h-[68%] right-0 top-1 rounded-full border-2 border-gold-600/50 shadow-xl flex items-center justify-center bg-gradient-to-br from-gold-400 to-gold-600 animate-coin-flip"
          style={{
            perspective: '1000px',
            transformOrigin: 'center'
          }}
        >
          <span className="text-xs font-black text-green-950 select-none">₹</span>
        </div>
      </div>
    </div>
  );
}

// Graphic Selector wrapper
function FloatingFinanceObject({ size = 36 }) {
  if (FLOATING_OBJECT_TYPE === 'chart') {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Glowing background */}
        <div className="absolute inset-0 bg-gold-400/25 rounded-full blur-md animate-pulse" />

        {/* Trendline SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[85%] h-[85%] text-gold-400 drop-shadow-[0_0_8px_rgba(221,161,109,0.8)]"
        >
          {/* Ascending Trend Line */}
          <path d="M3 19L9 13L14 17L21 8" />

          {/* Upward Arrow indicator */}
          <polyline points="15 8 21 8 21 14" />

          {/* Glowing node at the peak */}
          <circle cx="21" cy="8" r="2.5" fill="#DDA16D" stroke="#1B0634" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (FLOATING_OBJECT_TYPE === 'sparkle') {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 bg-gold-400/25 rounded-full blur-md animate-pulse" />
        <svg viewBox="0 0 24 24" className="w-[85%] h-[85%] text-gold-400 fill-current filter drop-shadow-[0_0_8px_rgba(221,161,109,0.8)]">
          <path d="M12 2c.2 4.4 3.6 7.8 8 8-.2.2-3.6 3.6-8 8c-.2-.2-3.6-3.6-8-8 .2-.2 3.6-3.6 8-8z" />
        </svg>
      </div>
    );
  }

  if (FLOATING_OBJECT_TYPE === 'arrow-coin') {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-md animate-pulse" />
        <div className="w-full h-full rounded-full border border-gold-600/50 bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1B0634" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
    );
  }

  if (FLOATING_OBJECT_TYPE === 'bull') {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-md animate-pulse" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[80%] h-[80%] text-gold-400 drop-shadow-[0_2px_8px_rgba(221,161,109,0.4)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v4m0 0l-3-3m3 3l3-3m-7 8c0 1.1-.9 2-2 2H5a2 2 0 01-2-2v-3c0-1.1.9-2 2-2h1m11 7c0 1.1.9 2 2 2h1a2 2 0 002-2v-3c0-1.1-.9-2-2-2h-1M9 16h6m-9 4h12" />
        </svg>
      </div>
    );
  }

  // Default: coins
  return <FinanceLogoAnimation size={size} />;
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMouseInMenu, setIsMouseInMenu] = useState(false);
  const location = useLocation();

  const trackRef = useRef(null);
  const navItemsRef = useRef([]);
  const x = useMotionValue(-60);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsServicesDropdownOpen(false);
      setIsMobileServicesOpen(false);
    }, 0);
  }, [location]);

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  const handleLinkClick = (path, e) => {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'About Us', path: ROUTES.ABOUT },
    { name: 'Services', path: '/services', isDropdown: true },
    { name: 'Products', path: ROUTES.PRODUCTS },
    { name: 'Calculators', path: ROUTES.CALCULATORS },
    { name: 'Contact Us', path: ROUTES.CONTACT }
  ];

  const getActiveIndex = () => {
    if (location.pathname === ROUTES.HOME) return 0;
    if (location.pathname === ROUTES.ABOUT) return 1;
    if (location.pathname.startsWith('/services')) return 2;
    if (location.pathname === ROUTES.PRODUCTS) return 3;
    if (location.pathname === ROUTES.CALCULATORS) return 4;
    if (location.pathname === ROUTES.CONTACT) return 5;
    return -1;
  };

  const activeIndex = getActiveIndex();
  const focusIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  // Programmatic Horizontal Animation loop (11 seconds)
  useEffect(() => {
    if (!trackRef.current) return;

    let controls;

    const startAnimation = () => {
      if (controls) controls.stop();
      const width = trackRef.current.offsetWidth;

      // Animate from -60px (off-screen left of logo) to width + 60px (off-screen right of menu)
      controls = animate(x, [-60, width + 60], {
        duration: 11,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop'
      });
    };

    startAnimation();

    window.addEventListener('resize', startAnimation);
    return () => {
      if (controls) controls.stop();
      window.removeEventListener('resize', startAnimation);
    };
  }, []);

  // Sync Collision Check: Trigger link hover highlights as the object floats behind them
  useEffect(() => {
    const unsubscribe = x.on('change', (latestX) => {
      if (isMouseInMenu || !trackRef.current) return;

      const trackRect = trackRef.current.getBoundingClientRect();
      const objectAbsoluteX = trackRect.left + latestX + 18; // 18 is half of size 36

      // Get bounds of the navigation items container
      const firstItem = navItemsRef.current[0];
      const lastItem = navItemsRef.current[navItemsRef.current.length - 1];

      if (firstItem && lastItem) {
        const firstRect = firstItem.getBoundingClientRect();
        const lastRect = lastItem.getBoundingClientRect();

        // If outside the links area, reset to active tab
        if (objectAbsoluteX < firstRect.left || objectAbsoluteX > lastRect.right) {
          setHoveredIndex(null);
          return;
        }
      }

      let matchedIndex = null;

      for (let i = 0; i < navItemsRef.current.length; i++) {
        const itemEl = navItemsRef.current[i];
        if (itemEl) {
          const rect = itemEl.getBoundingClientRect();
          if (objectAbsoluteX >= rect.left && objectAbsoluteX <= rect.right) {
            matchedIndex = i;
            break;
          }
        }
      }

      // Only update when we successfully match a link to avoid flickering in gaps
      if (matchedIndex !== null) {
        setHoveredIndex(matchedIndex);
      }
    });

    return () => unsubscribe();
  }, [isMouseInMenu]);

  return (
    <LayoutGroup id="navbar-layout">
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-350 ${isScrolled
          ? 'bg-black lg:bg-black/90 lg:backdrop-blur-md shadow-navbar py-3 border-b border-white/5'
          : 'bg-black py-5'
          }`}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Continuous Floating Coins Track (starts from logo bg and moves rightwards) */}
          <div
            ref={trackRef}
            className="absolute inset-y-0 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 overflow-hidden pointer-events-none z-0"
          >
            <div className="relative w-full h-full">
              {/* Outer Container (Horizontal Travel via Framer Motion) */}
              <motion.div
                style={{ x }}
                className="absolute top-1/2 -translate-y-1/2"
              >
                {/* Inner Container (Vertical Bobbing & Rotation via CSS) */}
                <div className="animate-vertical-bob">
                  <FloatingFinanceObject size={36} />
                </div>
              </motion.div>
            </div>
          </div>

          <div
            className="relative z-10 flex items-center justify-between h-16"
            onMouseEnter={() => setIsMouseInMenu(true)}
            onMouseLeave={() => {
              setIsMouseInMenu(false);
              setHoveredIndex(null);
            }}
          >
            {/* Logo */}
            <Link to={ROUTES.HOME} onClick={(e) => handleLinkClick(ROUTES.HOME, e)} className="flex items-center group">
              <img src="/images/logo.png" alt="MK Investors Logo" className="h-24 md:h-36 w-auto object-contain transition-transform duration-250 group-hover:scale-105" />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1.5 animate-fade-in">
              {navItems.map((item, index) => {
                const isFocused = focusIndex === index;

                if (item.isDropdown) {
                  return (
                    <div
                      key={index}
                      ref={(el) => (navItemsRef.current[index] = el)}
                      className="relative py-2"
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                        setIsServicesDropdownOpen(true);
                      }}
                      onMouseLeave={() => {
                        setIsServicesDropdownOpen(false);
                      }}
                    >
                      <button
                        className={`relative z-10 flex items-center gap-1 text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none cursor-pointer px-4 py-1.5 ${isFocused
                          ? 'text-gold-400 scale-[1.04] drop-shadow-[0_0_8px_rgba(221,161,109,0.45)]'
                          : 'text-white/70 hover:text-white'
                          }`}
                      >
                        <span>Services</span>
                        <ChevronDown size={14} className={`transition-transform duration-250 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <ServicesDropdown
                        isOpen={isServicesDropdownOpen}
                        onClose={() => setIsServicesDropdownOpen(false)}
                      />
                    </div>
                  );
                }

                return (
                  <div
                    key={index}
                    ref={(el) => (navItemsRef.current[index] = el)}
                    className="relative py-2"
                    onMouseEnter={() => setHoveredIndex(index)}
                  >
                    <Link
                      to={item.path}
                      onClick={(e) => handleLinkClick(item.path, e)}
                      className={`relative z-10 block text-sm font-semibold tracking-wide transition-all duration-300 px-4 py-1.5 ${isFocused
                        ? 'text-gold-400 scale-[1.04] drop-shadow-[0_0_8px_rgba(221,161,109,0.45)]'
                        : 'text-white/70 hover:text-white'
                        }`}
                    >
                      {item.name}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Desktop Right CTA Button */}
            <div className={`hidden lg:flex items-center ${location.pathname === ROUTES.CONTACT ? 'invisible pointer-events-none' : ''}`}>
              <Link to={ROUTES.CONTACT} onClick={(e) => handleLinkClick(ROUTES.CONTACT, e)} className="btn-nav-cta flex items-center gap-2 text-sm px-5 py-2">
                <PhoneCall size={16} />
                <span>Get in Touch</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-gold-400 focus:outline-none cursor-pointer p-2 rounded-md hover:bg-green-700/20"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Backdrop Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Drawer Slide-in Menu */}
        <div
          className={`fixed inset-y-0 right-0 w-80 bg-black lg:bg-black/95 backdrop-blur-md border-l border-white/5 shadow-2xl p-6 z-50 transform transition-transform duration-350 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gold-400/15">
            <img src="/images/logo.png" alt="MK Investors Logo" className="h-18 w-auto object-contain" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-gold-400 focus:outline-none cursor-pointer p-1 rounded-md"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-140px)]">
            <Link
              to={ROUTES.HOME} onClick={(e) => handleLinkClick(ROUTES.HOME, e)}
              className={`text-base font-semibold py-1.5 transition-colors duration-250 ${isLinkActive(ROUTES.HOME) ? 'text-gold-400 border-l-2 border-gold-400 pl-2' : 'text-white/70 hover:text-white'
                }`}
            >
              Home
            </Link>

            <Link
              to={ROUTES.ABOUT} onClick={(e) => handleLinkClick(ROUTES.ABOUT, e)}
              className={`text-base font-semibold py-1.5 transition-colors duration-250 ${isLinkActive(ROUTES.ABOUT) ? 'text-gold-400 border-l-2 border-gold-400 pl-2' : 'text-white/70 hover:text-white'
                }`}
            >
              About Us
            </Link>

            {/* Mobile Services Accordion */}
            <div className="flex flex-col">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className={`flex items-center justify-between text-base font-semibold py-1.5 transition-colors duration-250 focus:outline-none cursor-pointer ${location.pathname.startsWith('/services') ? 'text-gold-400' : 'text-white/70 hover:text-white'
                  }`}
              >
                <span>Services</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-250 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isMobileServicesOpen && (
                <div className="pl-4 mt-2 border-l border-gold-400/20 flex flex-col gap-3">
                  <Link
                    to={ROUTES.SERVICES}
                    className="text-sm text-white/70 hover:text-white py-1 transition-colors duration-250 font-medium"
                  >
                    All Services Overview
                  </Link>
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      to={service.href}
                      onClick={(e) => {
                        setIsMobileServicesOpen(false);
                        setIsMobileMenuOpen(false);
                        const [path, hash] = service.href.split('#');
                        if (window.location.pathname === path && hash) {
                          const el = document.getElementById(hash);
                          if (el) {
                            e.preventDefault();
                            el.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                      className={`text-sm py-1 transition-colors duration-250 ${window.location.pathname === service.href.split('#')[0] ? 'text-gold-400' : 'text-white/70 hover:text-white'}`}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to={ROUTES.PRODUCTS} onClick={(e) => handleLinkClick(ROUTES.PRODUCTS, e)}
              className={`text-base font-semibold py-1.5 transition-colors duration-250 ${isLinkActive(ROUTES.PRODUCTS) ? 'text-gold-400 border-l-2 border-gold-400 pl-2' : 'text-white/70 hover:text-white'
                }`}
            >
              Products
            </Link>

            <Link
              to={ROUTES.CALCULATORS} onClick={(e) => handleLinkClick(ROUTES.CALCULATORS, e)}
              className={`text-base font-semibold py-1.5 transition-colors duration-250 ${isLinkActive(ROUTES.CALCULATORS) ? 'text-gold-400 border-l-2 border-gold-400 pl-2' : 'text-white/70 hover:text-white'
                }`}
            >
              Calculators
            </Link>

            <Link
              to={ROUTES.CONTACT} onClick={(e) => handleLinkClick(ROUTES.CONTACT, e)}
              className={`text-base font-semibold py-1.5 transition-colors duration-250 ${isLinkActive(ROUTES.CONTACT) ? 'text-gold-400 border-l-2 border-gold-400 pl-2' : 'text-white/70 hover:text-white'
                }`}
            >
              Contact Us
            </Link>

            {location.pathname !== ROUTES.CONTACT && (
              <Link
                to={ROUTES.CONTACT} onClick={(e) => handleLinkClick(ROUTES.CONTACT, e)}
                className="btn-primary flex items-center justify-center gap-2 mt-4 py-3"
              >
                <PhoneCall size={18} />
                <span>Get in Touch</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </LayoutGroup>
  );
}

export default Navbar;
