import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '../../constants/routes';
import { SERVICES } from '../../constants/services';
import { PRODUCTS } from '../../constants/products';

// Stat counter sub-component for premium scroll feel
function StatItem({ value, label, prefix = '', suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value.replace(/,/g, ''));
    if (isNaN(end)) {
      setTimeout(() => setDisplayValue(value), 0);
      return;
    }
    const duration = 1200;
    const increment = end / (duration / 16); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setDisplayValue(end);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  const formattedDisplay = typeof displayValue === 'number'
    ? displayValue.toLocaleString('en-IN')
    : displayValue;

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gold-400 mb-2 font-sans tracking-tight">
        {prefix}{formattedDisplay}{suffix}
      </div>
      <div className="text-gray-300 text-sm md:text-base font-medium tracking-wide">
        {label}
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  {
    stars: 5,
    text: "Much easier to install and use than most plug-ins and as a solo founder I really really love that free tier at first! We all need to start somewhere.",
    name: "Maria Petrenko",
    date: "Mar 19, 2026",
    avatar: "https://ui-avatars.com/api/?name=Maria+Petrenko&background=0D8ABC&color=fff",
  },
  {
    stars: 5,
    text: "Very easy to implement, adjust and deploy the widgets. The widgets looks great and the dashboard is super user friendly! I ran into a minor issue and the support team was very quick...",
    name: "Tim Lestander",
    date: "Jan 8, 2026",
    avatar: "https://ui-avatars.com/api/?name=Tim+Lestander&background=555&color=fff",
  },
  {
    stars: 5,
    text: "This is exactly what I was looking for. I wouldn't say I'm completely technically adept but needed a solid reliable solution. Was very easy to implement...",
    name: "Priya Mehta",
    date: "Dec 4, 2025",
    avatar: "https://ui-avatars.com/api/?name=Priya+Mehta&background=random",
  },
  {
    stars: 5,
    text: "MK Investors has transformed my portfolio. Their SIP recommendations are spot-on, and their ongoing rebalancing advice has kept me on track.",
    name: "Rajesh Patel",
    date: "Mar 19, 2026",
    avatar: "https://ui-avatars.com/api/?name=Rajesh+Patel&background=random",
  },
  {
    stars: 5,
    text: "Extremely professional tax planning advice. Saved me significant tax using customized ELSS options while building long-term equity wealth.",
    name: "Amit Sharma",
    date: "Jan 8, 2026",
    avatar: "https://ui-avatars.com/api/?name=Amit+Sharma&background=random",
  }
];

/* ═══════════════════════════════════════════════════════
   PREMIUM HERO — Two-Panel Flip Transition
   Inspired by desaisachin.com/index.html
   ═══════════════════════════════════════════════════════ */

const EASE_PREMIUM = [0.25, 0.1, 0.25, 1.0];
const EASE_CINEMATIC = [0.76, 0, 0.24, 1];

/* Rotating Phrases */
const ROTATING_PHRASES = [
  "Disciplined SIP Strategies for Compound Wealth",
  "Tax-Optimized ELSS & Equity Portfolios",
  "Fiduciary Advisory Built on Absolute Trust",
  "Data-Driven Rebalancing for Volatile Markets",
  "Customized Insurance & Capital Shielding",
];

/* RotatingPhrase — AnimatePresence cycling */
function RotatingPhrase() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % ROTATING_PHRASES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[32px] md:h-[38px] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.p
          key={ROTATING_PHRASES[index]}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="absolute inset-0 text-white/60 text-sm md:text-base font-semibold tracking-wide whitespace-nowrap"
          style={{ fontFamily: 'var(--font-asap)' }}
        >
          {ROTATING_PHRASES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* HeroSection — Two-panel with slide-up reveal */
function HeroSection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const handleToggleReveal = useCallback(() => {
    setIsRevealed(prev => !prev);
  }, []);

  // Stagger variants for headline entrance
  const headlineContainer = {
    hidden: {},
    visible: {
      transition: { delayChildren: 0.8, staggerChildren: 0.15 }
    }
  };
  const headlineChild = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_PREMIUM } }
  };

  return (
    <section className="relative h-[100vh] min-h-[640px] w-full bg-black select-none overflow-hidden">
      {/* ─── BASE: BLACK PANEL (always present in background) ─── */}
      <div 
        className="absolute inset-0 w-full h-full bg-black text-white flex items-center cursor-pointer"
        onClick={handleToggleReveal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Caricature portrait */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[82%] w-[42%] max-w-[380px] md:max-w-[480px] z-[5] flex items-center justify-center pointer-events-none pr-4 md:pr-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1.2, ease: EASE_PREMIUM, delay: 0.4 }}
        >
          <img
            src="/images/hero-portrait.png"
            alt="Hero Caricature"
            className="h-full w-auto object-contain filter brightness-100 contrast-105"
          />
        </motion.div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-16 z-10 flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 lg:gap-10">

            {/* Staggered hello! headline */}
            <motion.div
              className="text-[80px] md:text-[120px] lg:text-[150px] font-light leading-none tracking-tighter select-none flex-shrink-0 flex items-center"
              style={{ fontFamily: 'var(--font-asap)' }}
              variants={headlineContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={headlineChild}
                style={{ WebkitTextStroke: '2.5px rgba(255,255,255,0.85)', color: 'transparent' }}
                className="will-change-transform"
              >
                hell
              </motion.span>
              <motion.span
                variants={headlineChild}
                className="inline-block w-[0.32em] h-[0.32em] rounded-full bg-white mx-[0.06em] translate-y-[0.08em] will-change-transform"
              />
              <motion.span
                variants={headlineChild}
                style={{ WebkitTextStroke: '2.5px rgba(255,255,255,0.85)', color: 'transparent' }}
                className="will-change-transform"
              >
                !
              </motion.span>
            </motion.div>

            {/* Quote column */}
            <div className="max-w-2xl">
              <motion.p
                className="text-white/80 text-xl md:text-[27px] lg:text-[32px] font-normal leading-[1.35] md:leading-[1.4]"
                style={{ fontFamily: 'var(--font-asap)', letterSpacing: '-0.02em' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 0.8 }}
              >
                Aap log mujhe<br className="hidden md:inline" /> dhoondh rahe ho aur main aap ka<br className="hidden md:inline" /> yahaan intezzar kar raha hoon
              </motion.p>
            </div>

          </div>
        </div>

        {/* Bottom-left "Hello નમસ્તે" — appears on hover, includes custom tooltip */}
        <motion.div
          className="absolute bottom-10 left-6 md:bottom-14 md:left-16 z-20"
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 16,
          }}
          transition={{ duration: 0.45, ease: EASE_PREMIUM }}
          onMouseEnter={() => setIsLinkHovered(true)}
          onMouseLeave={() => setIsLinkHovered(false)}
        >
          <div className="relative">
            {/* Custom Tooltip */}
            <AnimatePresence>
              {isLinkHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute bottom-full left-0 mb-3 bg-white text-black text-xs font-semibold px-3 py-1.5 rounded shadow-lg border border-gray-200 pointer-events-none whitespace-nowrap z-30"
                  style={{ fontFamily: 'var(--font-asap)' }}
                >
                  Click to explore our vision
                  <div className="absolute top-full left-6 w-2 h-2 bg-white border-r border-b border-gray-200 rotate-45 -translate-y-1" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col items-start gap-1.5">
              <span
                className="text-white text-2xl md:text-3xl font-medium tracking-wide"
                style={{ fontFamily: 'var(--font-asap)' }}
              >
                Hello નમસ્તે
              </span>
              <div className="w-10 h-[1px] bg-white/40" />
              <span
                className="text-white/40 text-xs tracking-wider uppercase mt-1 animate-pulse"
                style={{ fontFamily: 'var(--font-asap)' }}
              >
                Click anywhere to explore
              </span>
            </div>
          </div>
        </motion.div>

        {/* Subtle bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/8" />
      </div>

      {/* ─── OVERLAY: WHITE PANEL (slides up from bottom on click) ─── */}
      <motion.div 
        className="absolute top-[80px] left-0 right-0 bottom-0 h-[calc(100%-80px)] w-full bg-white text-gray-800 flex flex-col items-center justify-center cursor-pointer px-6 z-25"
        initial={{ y: '100%' }}
        animate={{ y: isRevealed ? '0%' : '100%' }}
        transition={{ duration: 0.75, ease: EASE_CINEMATIC }}
        onClick={handleToggleReveal}
      >
        {/* Centered content — matching the reference white page */}
        <div className="text-center max-w-2xl mx-auto">
          {/* Title */}
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-asap)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.3 }}
          >
            Hello નમસ્તે
          </motion.h2>

          {/* Divider */}
          <motion.div
            className="w-12 h-[2px] bg-gray-900 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={isRevealed ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, ease: EASE_PREMIUM, delay: 0.5 }}
          />

          {/* Description matching exact line structure of reference */}
          <div className="space-y-1">
            <motion.p
              className="text-gray-500 text-base md:text-lg leading-relaxed font-normal"
              style={{ fontFamily: 'var(--font-asap)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.6 }}
            >
              We address the financial and functional aspects
            </motion.p>
            <motion.p
              className="text-gray-500 text-base md:text-lg leading-relaxed font-normal"
              style={{ fontFamily: 'var(--font-asap)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.7 }}
            >
              of communicating wealth and planning, shaping the idea
            </motion.p>
            <motion.p
              className="text-gray-500 text-base md:text-lg leading-relaxed font-normal mb-12"
              style={{ fontFamily: 'var(--font-asap)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.8 }}
            >
              of creating portfolios that connect people to growth.
            </motion.p>
          </div>

          {/* Service category links — matching reference's nav arrows */}
          <motion.div
            className="flex items-center justify-center gap-0 mt-8"
            style={{ fontFamily: 'var(--font-asap)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 1.0 }}
          >
            <Link
              to={ROUTES.SERVICES}
              className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors duration-300 text-sm md:text-base font-medium px-4 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Icons.ChevronLeft size={16} />
              <span>Wealth Advisory</span>
            </Link>
            <div className="w-[1px] h-6 bg-gray-300" />
            <Link
              to={ROUTES.PRODUCTS}
              className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors duration-300 text-sm md:text-base font-medium px-4 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Investment Products</span>
              <Icons.ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Back hint at bottom */}
        <motion.p
          className="absolute bottom-8 text-gray-400 text-xs tracking-wider uppercase"
          style={{ fontFamily: 'var(--font-asap)' }}
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
        >
          Click to go back
        </motion.p>
      </motion.div>
    </section>
  );
}

function Home() {
  const midIndex = Math.floor((SERVICES.length - 1) / 2); // Dynamically find the midpoint card
  const [activeIndex, setActiveIndex] = useState(midIndex);
  const scrollContainerRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Delay slightly to ensure browser has rendered elements and layout is complete
      setTimeout(() => {
        const cardWidth = container.querySelector('.scroll-snap-item')?.clientWidth || 320;
        const gap = 16; // 1rem is 16px
        // Scroll to center the midpoint card
        container.scrollLeft = midIndex * (cardWidth + gap);
        setActiveIndex(midIndex);
      }, 100);
    }
  }, []);

  const handleScroll = (e) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const viewportCenter = scrollLeft + container.clientWidth / 2;
    const items = container.querySelectorAll('.scroll-snap-item');
    let minDistance = Infinity;
    let activeIdx = midIndex;

    items.forEach((item, idx) => {
      const itemCenter = item.offsetLeft + item.clientWidth / 2;
      const distance = Math.abs(viewportCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        activeIdx = idx;
      }
    });

    setActiveIndex(activeIdx);
  };

  const serviceImages = {
    'financial-planning': '/images/services/financial-planning.jpg',
    'retirement-planning': '/images/services/retirement-planning.jpg',
    'investment-management': '/images/services/investment-management.jpg',
    'mutual-fund-sip': '/images/services/mutual-fund-sip.jpg',
    'tax-planning': '/images/services/tax-planning.jpg',
    'corporate-retail-loans': '/images/services/corporate-retail-loans.jpg',
    'insurance-solutions': '/images/services/insurance-solutions.jpg',
    'nri-investment': '/images/services/nri-investment.jpg',
    'portfolio-review': '/images/services/portfolio-review.jpg',
    'estate-planning': '/images/services/estate-planning.jpg'
  };

  // Extract 3 main products for the featured product strip
  const featuredProducts = PRODUCTS.filter(p => ['equity-mf', 'sip', 'elss'].includes(p.id));

  return (
    <div className="bg-soft-purple">
      {/* 1. Premium Two-Panel Hero */}
      <HeroSection />



      {/* 3. What We Offer (Services Preview) */}
      <section className="section-pad bg-green-950 text-white relative overflow-hidden py-24">
        {/* Abstract Grid Pattern Decor */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid-pattern z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-4">
            <h2 className="section-title section-title-accent inline-block text-white">What We Offer</h2>
            <p className="text-gray-300 text-body-lg mt-4">
              Explore our core wealth advisory services designed to simplify financial planning and help you make confident investment decisions.
            </p>
          </div>
        </div>

        {/* Horizontal Scroll Snap Container */}
        <div className="w-full relative z-10">
          <ul ref={scrollContainerRef} className="scroll-snap-x" onScroll={handleScroll}>
            {SERVICES.map((service, idx) => {
              const IconComponent = Icons[service.icon];
              const bgImage = serviceImages[service.id] || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80';
              return (
                <li key={service.id} className="scroll-snap-item">
                  <article
                    className={`service-scroll-card flex flex-col justify-between h-full p-6 text-white group ${idx === activeIndex ? 'service-scroll-card-active' : ''}`}
                    style={{ '--bg-image': `url(${bgImage})` }}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start w-full relative z-10">
                      <div className="p-3 bg-white/10 backdrop-blur-md text-gold-400 rounded-xl border border-white/10 shadow-sm">
                        {IconComponent ? <IconComponent size={24} /> : <Icons.HelpCircle size={24} />}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-gold-400/90 font-bold bg-green-950/80 px-2.5 py-1 rounded-full border border-gold-400/10">
                        Advisory
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3 relative z-10">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight service-card-reveal overflow-hidden">
                        <span>{service.title}</span>
                      </h3>
                      <p className="text-gray-200 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="pt-2 relative z-10 w-full">
                      <Link
                        to={service.href}
                        className="btn-primary w-full py-2.5 px-4 text-xs font-bold text-center flex items-center justify-center gap-1.5 rounded-lg shadow-md border border-gold-400/25 transition-all duration-300"
                      >
                        <span>Learn More</span>
                        <Icons.ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="section-pad bg-gradient-to-b from-[#F7F9F6] to-white relative overflow-hidden">
        {/* Subtle background blob */}
        <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-gold-400/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-600 text-xs font-bold tracking-widest uppercase">
                WHY MK INVESTORS
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-green-950 tracking-tight leading-tight">
                Fiduciary Wealth Management Built on Absolute Trust
              </h2>
              <p className="text-ink-muted text-body-lg leading-relaxed">
                We reject standard, pre-packaged portfolios. At MK Investors, every plan we formulate is uniquely aligned with your specific life milestones, backed by rigorous research and transparent advice.
              </p>

              {/* Credentials counter */}
              <div className="pt-6 border-t border-green-900/10 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-extrabold text-green-950 font-sans tracking-tight mb-1">CFP®</div>
                  <div className="text-ink-muted text-xs font-medium uppercase tracking-wider">Certified Planning</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-green-950 font-sans tracking-tight mb-1">100%</div>
                  <div className="text-ink-muted text-xs font-medium uppercase tracking-wider">Fiduciary Duty</div>
                </div>
              </div>
            </div>

            {/* Right Cards Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {[
                {
                  id: '01',
                  title: 'Certified Advisory & Fiduciary standards',
                  desc: 'Our wealth advisors adhere to strict fiduciary standards, putting your investment safety and financial success above all else.',
                  icon: Icons.ShieldCheck,
                  delay: 0.1
                },
                {
                  id: '02',
                  title: 'Tailored Milestones & Personalization',
                  desc: 'We form strategic investment strategies based on your unique financial goals, tax profile, and retirement roadmap.',
                  icon: Icons.TrendingUp,
                  delay: 0.2
                },
                {
                  id: '03',
                  title: 'Data-Driven Market Navigation',
                  desc: 'We utilize dynamic rebalancing and data-driven indicators to navigate volatility, protecting and compounding your capital.',
                  icon: Icons.History,
                  delay: 0.3
                }
              ].map((item) => {
                const IconComp = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: item.delay }}
                    className="premium-why-card"
                  >
                    <span className="why-card-number">{item.id}</span>
                    <div className="flex gap-5 items-start">
                      <div className="why-card-icon-wrap shrink-0">
                        <IconComp size={24} />
                      </div>
                      <div className="space-y-1.5 pr-8">
                        <h3 className="text-lg font-bold text-green-950 tracking-tight">{item.title}</h3>
                        <p className="text-ink-muted text-xs md:text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 5. Featured Products Strip */}
      <section className="section-pad bg-gradient-to-br from-green-950 via-green-900 to-green-950 border-t border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title section-title-accent inline-block text-white">Featured Products</h2>
            <p className="text-gray-300 text-body-lg mt-4">
              Explore high-conviction financial assets curated by our investment analysts for optimal returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, idx) => {
              const IconComponent = Icons[product.icon] || Icons.TrendingUp;
              const productImage = `/images/products/${product.id}.jpg`;
              
              const cardVariants = {
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, delay: idx * 0.1 }
                }
              };

              const titleVariants = {
                hidden: { opacity: 1 },
                visible: { 
                  opacity: isTouch ? 0 : 1,
                  transition: { duration: 0.4, ease: "easeOut", delay: idx * 0.1 }
                }
              };

              const contentVariants = {
                hidden: { y: "100%" },
                visible: { 
                  y: isTouch ? 0 : "100%",
                  transition: { duration: 0.5, ease: "easeOut", delay: idx * 0.1 }
                }
              };

              return (
                <motion.div
                  key={product.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-50px" }}
                  variants={cardVariants}
                  className="product-hover-card"
                >
                  <div className="product-card-image-wrap">
                    <img
                      src={productImage}
                      alt={product.name}
                      className="product-card-bg-img"
                    />

                    {/* Category Tag overlay on image */}
                    <span className="absolute top-4 right-4 z-20 bg-gold-400 text-green-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {product.category}
                    </span>

                    {/* Dark gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 z-10"></div>

                    {/* Title Overlay (visible before hover) */}
                    <motion.div
                      className="product-card-title-overlay absolute bottom-0 left-0 right-0 p-6 z-15 text-white transition-opacity duration-300"
                      variants={titleVariants}
                    >
                      <h3 className="text-xl font-bold tracking-tight text-white mb-1 drop-shadow-md">
                        {product.name}
                      </h3>
                      <p className="text-gold-400 text-xs font-semibold drop-shadow-md">
                        {product.highlight}
                      </p>
                    </motion.div>
                  </div>

                  {/* Sliding Card Content (slides up on hover) */}
                  <motion.div
                    className="product-card-content flex flex-col justify-between h-auto"
                    variants={contentVariants}
                  >
                    <div>
                      <div className="flex gap-2.5 items-center mb-3">
                        <div className="p-2 bg-green-950/5 text-green-700 rounded-lg">
                          <IconComponent size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">
                          Featured Product
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-green-950 mb-2">{product.name}</h3>
                      <p className="text-ink-muted text-xs leading-relaxed mb-4">{product.description}</p>

                      {/* Highlight bar */}
                      <div className="bg-green-50 rounded-lg px-3.5 py-2 mb-5 text-green-950 text-xs font-semibold border-l-2 border-green-700">
                        {product.highlight}
                      </div>
                    </div>

                    <Link
                      to={`${ROUTES.PRODUCTS}#${product.id}`}
                      className="text-green-700 hover:text-green-950 font-semibold text-xs flex items-center gap-1 group transition-colors duration-250"
                    >
                      <span>View Details</span>
                      <Icons.ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      {/* 7. Testimonials */}
      <section className="py-24 bg-green-50 relative overflow-hidden border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <h2 className="section-title section-title-accent inline-block">What Our Clients Say</h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Real testimonials from satisfied individuals who have reached financial freedom with our advice.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-hidden group py-4">
          {/* Fade Masks */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-green-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-green-50 to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-marquee gap-6 px-3">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <div
                key={idx}
                className="w-[300px] md:w-[400px] flex-shrink-0 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                      <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                    </div>
                    {/* Google Logo */}
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.stars)].map((_, i) => (
                      <Icons.Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {t.text}
                  </p>
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  {t.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact CTA Strip */}
      <section className="bg-green-950 text-white py-16 px-4 md:px-8 text-center relative overflow-hidden border-t border-gold-400/10">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-3.5xl font-bold mb-4">Ready to Secure Your Wealth?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Book a complimentary introductory advisory session with one of our certified wealth planning experts.
          </p>
          <Link to={ROUTES.CONTACT} className="btn-primary px-8 py-3.5 inline-flex items-center gap-2 group shadow-lg shadow-gold-400/10">
            <span>Book Consultation</span>
            <Icons.Calendar size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
