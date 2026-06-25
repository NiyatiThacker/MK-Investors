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
    <div className="bg-white pb-24">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-950 text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Abstract Gold Background Decor */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-400 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-400 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-10 shadow-sm animate-pulse">
            Premium Financial Products
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-8">
            Discover Our <span className="text-gold-400 relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-1 after:bg-gold-400/40">Products</span>
          </h1>

          <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-16">
            Explore SBS Investments' curated selection of high-performance financial products, tailored to maximize your growth and protect your wealth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-24 pt-8 md:pt-12 border-t border-gold-400/20 w-full max-w-2xl mx-auto">
             <StatItem value="99" label="Client Retention Ratio" suffix="%" />
             <StatItem value="800" label="Satisfied Clients" suffix="+" />
             <StatItem value="15" label="Years of Excellence" suffix="+" />
          </div>
        </motion.div>
        
        {/* Decorative Gold Bottom Wave Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-40"></div>
      </section>

      {/* 2. Products Layout Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-green-950 mb-6 relative inline-block"
          >
            Our Key Products
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-green-600 rounded"></div>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-ink-muted text-lg mt-8 leading-relaxed"
          >
            High-conviction financial assets curated by our investment analysts for optimal returns and long-term security.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PRODUCTS.map((product) => {
            const IconComponent = Icons[product.icon] || Icons.Box;

            return (
              <motion.div variants={itemVariants} key={product.id} id={product.id} className="bg-white rounded-xl shadow-sm border border-green-700/10 hover:border-gold-400 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col p-8 group scroll-mt-24">
                
                {/* Icon & Category */}
                <div className="flex justify-between items-start mb-6">
                  <div className="h-16 w-16 rounded-full bg-green-50 text-green-700 flex items-center justify-center group-hover:bg-green-700 group-hover:text-gold-400 transition-colors duration-300">
                    <IconComponent size={32} />
                  </div>
                  <span className="inline-block px-3 py-1 bg-gold-400/20 text-green-950 text-xs font-bold uppercase tracking-wider rounded">
                    {product.category}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-green-950 mb-4">{product.name}</h3>
                <p className="text-ink-muted text-base leading-relaxed mb-8 flex-grow">
                  {product.description}
                </p>
                
                {/* Highlight Feature */}
                <div className="mb-8 w-full bg-green-50 px-4 py-3 rounded-lg border-l-4 border-gold-400 shadow-sm">
                  <span className="font-semibold text-sm text-green-950">{product.highlight}</span>
                </div>

                {/* Invest Now Button -> Redirect to Contact */}
                <Link to={ROUTES.CONTACT} state={{ subject: getServiceCategory(product.id) }} className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-3 shadow-md shadow-green-700/10 group-hover:bg-gold-500 group-hover:text-green-950 transition-colors">
                  <span>Invest Now</span>
                  <Icons.ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}

export default Products;
