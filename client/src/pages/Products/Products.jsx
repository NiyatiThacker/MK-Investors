import { Link, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { PRODUCTS } from '../../constants/products';
import { ROUTES } from '../../constants/routes';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Stat counter sub-component for premium scroll feel
function StatItem({ value, label, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = itemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

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
  }, [value, hasAnimated]);

  const formattedDisplay = typeof displayValue === 'number'
    ? displayValue.toLocaleString('en-IN')
    : displayValue;

  return (
    <div ref={itemRef} className="flex flex-col items-center justify-center p-4 text-center px-4">
      <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2 font-sans tracking-tight">
        {formattedDisplay}{suffix}
      </div>
      <div className="text-gray-300 text-sm md:text-base font-medium tracking-wide">
        {label}
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

function Products() {
  const location = useLocation();

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const multiplier = 8; // Gentle 3D rotation multiplier
    const rotateY = (x / rect.width - 0.5) * multiplier;
    const rotateX = (y / rect.height - 0.5) * -multiplier;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    
    // Set custom properties to feed the radial hover glow in CSS
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const productStats = {
    'equity-mf': [
      { value: '15%', type: 'Target' },
      { value: 'High', type: 'Equity' },
      { value: '5Yr+', type: 'Horizon' }
    ],
    'debt-mf': [
      { value: '7.5%', type: 'Yield' },
      { value: 'Low', type: 'Risk' },
      { value: '3Yr+', type: 'Horizon' }
    ],
    'sip': [
      { value: '₹500', type: 'Min' },
      { value: 'SIP', type: 'Mode' },
      { value: 'Comp.', type: 'Benefit' }
    ],
    'term-insurance': [
      { value: '₹2Cr', type: 'Cover' },
      { value: 'Zero', type: 'Risk' },
      { value: 'Life', type: 'Type' }
    ],
    'health-insurance': [
      { value: '10K+', type: 'Hospitals' },
      { value: 'Cash', type: 'Less' },
      { value: 'Medic.', type: 'Type' }
    ],
    'nps': [
      { value: '80C', type: 'Tax' },
      { value: 'Retire', type: 'Goal' },
      { value: 'Govt', type: 'Backed' }
    ],
    'elss': [
      { value: '3Yr', type: 'Lock-in' },
      { value: '80C', type: 'Tax' },
      { value: 'Equity', type: 'Type' }
    ],
    'business-loan': [
      { value: '10.5%', type: 'Rate' },
      { value: 'Fast', type: 'Approval' },
      { value: 'Coll.', type: 'Free' }
    ],
    'home-loan': [
      { value: '8.5%', type: 'Rate' },
      { value: '30Yr', type: 'Max' },
      { value: 'Home', type: 'Asset' }
    ],
    'fixed-income': [
      { value: '7.8%', type: 'Guar.' },
      { value: 'None', type: 'Risk' },
      { value: 'Fixed', type: 'Type' }
    ]
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const getServiceCategory = (productId) => {
    const map = {
      'equity-mf': 'Mutual Fund & SIP Advisory',
      'debt-mf': 'Mutual Fund & SIP Advisory',
      'sip': 'Mutual Fund & SIP Advisory',
      'term-insurance': 'Insurance Solutions',
      'health-insurance': 'Insurance Solutions',
      'nps': 'Retirement Planning',
      'elss': 'Tax Planning',
      'business-loan': 'Corporate & Retail Loans',
      'home-loan': 'Corporate & Retail Loans',
      'fixed-income': 'Investment Management'
    };
    return map[productId] || 'Financial Planning';
  };

  return (
    <div className="bg-green-950 pb-24 relative overflow-hidden min-h-screen">
      {/* Dynamic Background Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-white/5 to-white/10 blur-[100px] animate-float"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-white/5 to-white/8 blur-[100px] animate-float-delayed"></div>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-white/2 to-white/5 blur-[120px] animate-float-slow"></div>
      </div>

      {/* 1. Hero Section */}
      <section className="relative bg-transparent text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        {/* Underlying Background Image with Dark Color Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/products-hero-bg.png" 
            className="w-full h-full object-cover opacity-65" 
            alt="MK Investors Products Hero Background"
          />
          {/* Tint overlay matching the Products page deep bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-950/85 via-green-900/60 to-green-950/85 mix-blend-multiply"></div>
          {/* Bottom fade out to match the page background */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-transparent"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-10 shadow-sm">
            Premium Financial Products
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-8">
            Discover Our <span className="text-gold-400 relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-1 after:bg-gold-400/40">Products</span>
          </h1>

          <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-3xl mx-auto">
            Explore MK Investors' curated selection of high-performance financial products, tailored to maximize your growth and protect your wealth.
          </p>
        </motion.div>
        
        {/* Decorative Gold Bottom Wave Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent"></div>
      </section>

      {/* 2. Products Layout Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 relative inline-block"
          >
            Our Key Products
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-gold-400 rounded"></div>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-300 text-lg mt-8 leading-relaxed"
          >
            High-conviction financial assets curated by our investment analysts for optimal returns and long-term security.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {PRODUCTS.map((product) => {
            const IconComponent = Icons[product.icon] || Icons.Box;
            const imgPath = `/images/products/${product.id}.jpg`;
            const stats = productStats[product.id] || [
              { value: 'High', type: 'Growth' },
              { value: 'None', type: 'Lock-in' },
              { value: 'Fid.', type: 'Type' }
            ];

            return (
              <motion.div 
                variants={itemVariants} 
                key={product.id} 
                id={product.id} 
                className="glass-product-card scroll-mt-24"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="glass-card-content">
                  {/* Category tag */}
                  <span className="absolute top-4 right-4 z-20 bg-gold-400/20 border border-gold-400/30 text-gold-300 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {product.category}
                  </span>

                  {/* Image container */}
                  <div className="glass-card-image">
                    <img src={imgPath} alt={product.name} />
                  </div>

                  {/* Title */}
                  <h3 className="glass-card-title">{product.name}</h3>

                  {/* Text Description */}
                  <p className="glass-card-text">{product.description}</p>

                  {/* Dynamic Stats Row */}
                  <div className="glass-card-stats">
                    {stats.map((stat, sIdx) => (
                      <div key={sIdx} className="glass-stat">
                        <span className="glass-value">{stat.value}</span>
                        <span className="glass-type">{stat.type}</span>
                      </div>
                    ))}
                  </div>

                  {/* Invest Button */}
                  <Link 
                    to={ROUTES.CONTACT} 
                    state={{ subject: getServiceCategory(product.id) }} 
                    className="glass-card-button text-center w-full flex items-center justify-center gap-1.5"
                  >
                    <span>Invest Now</span>
                    <Icons.ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}

export default Products;
