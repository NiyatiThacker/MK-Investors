import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
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
    text: "SBS Investments has transformed my portfolio. Their SIP recommendations are spot-on, and their ongoing rebalancing advice has kept me on track.",
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

function Home() {
  // Extract 4 main services for the preview section
  const previewServices = SERVICES.slice(0, 4);

  // Extract 3 main products for the featured product strip
  const featuredProducts = PRODUCTS.filter(p => ['equity-mf', 'sip', 'elss'].includes(p.id));

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-950 text-white pt-32 pb-24 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Abstract Gold Background Decor */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-400 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-400 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          {/* Gold Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/25 mb-6 animate-pulse">
            <span className="h-2 w-2 rounded-full bg-gold-400"></span>
            <span className="text-gold-400 text-xs md:text-sm font-semibold tracking-wider uppercase">
              Trusted Wealth Advisors
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Secure Your Future with <span className="text-gold-400 font-extrabold relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-1 after:bg-gold-400/40">Strategic</span> Wealth Investments
          </h1>

          <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            SBS Investments offers tailored portfolio advisory, mutual funds, tax planning, and customized loan solutions designed to protect and compound your wealth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ROUTES.CONTACT} className="btn-primary w-full sm:w-auto px-8 py-3.5 shadow-lg shadow-gold-400/15 flex items-center justify-center gap-2 group">
              <span>Get Started Today</span>
              <Icons.ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-250" />
            </Link>
            <Link to={ROUTES.SERVICES} className="btn-ghost-gold w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2">
              <span>Our Services</span>
              <Icons.Briefcase size={18} />
            </Link>
          </div>
        </div>

        {/* Decorative Gold Bottom Wave Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-40"></div>
      </section>

      {/* 2. Stats Bar */}
      <section className="bg-green-950 border-y border-gold-400/15 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-x divide-gold-400/10">
            <StatItem value="15" label="Years of Experience" suffix="+" />
            <StatItem value="5000" label="Clients Served" suffix="+" />
            <StatItem value="250" label="Assets Under Advisory (Cr)" prefix="₹ " suffix="+" />
            <StatItem value="10" label="Advisory Services" suffix="+" />
          </div>
        </div>
      </section>

      {/* 3. What We Offer (Services Preview) */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title section-title-accent inline-block">What We Offer</h2>
            <p className="text-ink-muted text-body-lg mt-4">
              Explore our core wealth advisory services designed to meet your individual and corporate financial goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {previewServices.map((service, idx) => {
              const IconComponent = Icons[service.icon];
              return (
                <motion.div 
                  key={service.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="card flex flex-col items-start border-l-4 border-green-700 hover:border-gold-400"
                >
                  <div className="p-3 bg-green-100 text-green-700 rounded-lg mb-5 transition-colors duration-350">
                    {IconComponent ? <IconComponent size={24} /> : <Icons.HelpCircle size={24} />}
                  </div>
                  <h3 className="text-xl font-bold text-green-950 mb-3">{service.title}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>
                  <Link to={service.href} className="text-green-700 hover:text-gold-600 font-semibold text-sm flex items-center gap-1 group transition-colors duration-250 mt-auto">
                    <span>Learn More</span>
                    <Icons.ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="section-pad bg-green-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title section-title-accent inline-block">Why Choose SBS Investments</h2>
            <p className="text-ink-muted text-body-lg mt-4">
              We stand apart through our client-first fiduciary commitment, customized portfolios, and proactive market advisory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1: Trust */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-card border border-green-700/5 shadow-sm text-center flex flex-col items-center hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 flex items-center justify-center mb-6">
                <Icons.ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-green-950 mb-3">Certified Advisory</h3>
              <p className="text-ink-muted text-sm leading-relaxed">
                Our wealth advisors adhere to professional fiduciary standards, putting your investment safety and financial success above all else.
              </p>
            </motion.div>

            {/* Value 2: Custom Strategy */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-card border border-green-700/5 shadow-sm text-center flex flex-col items-center hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 flex items-center justify-center mb-6">
                <Icons.TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold text-green-950 mb-3">Tailored Strategies</h3>
              <p className="text-ink-muted text-sm leading-relaxed">
                We reject standard pre-packaged investment portfolios. Every plan we formulate is uniquely aligned with your specific life milestones.
              </p>
            </motion.div>

            {/* Value 3: Experience */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-card border border-green-700/5 shadow-sm text-center flex flex-col items-center hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 flex items-center justify-center mb-6">
                <Icons.History size={28} />
              </div>
              <h3 className="text-xl font-bold text-green-950 mb-3">Proven Track Record</h3>
              <p className="text-ink-muted text-sm leading-relaxed">
                Over 15 years, we have successfully managed wealth through multiple bull and bear markets, providing steady, compound growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Featured Products Strip */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title section-title-accent inline-block">Featured Products</h2>
            <p className="text-ink-muted text-body-lg mt-4">
              Explore high-conviction financial assets curated by our investment analysts for optimal returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, idx) => {
              const IconComponent = Icons[product.icon] || Icons.TrendingUp;
              return (
                <motion.div 
                  key={product.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="card relative flex flex-col items-start border border-green-700/10 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <span className="absolute top-4 right-4 bg-gold-400/10 border border-gold-400/20 text-green-950 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {product.category}
                  </span>
                  <div className="p-3 bg-green-100 text-green-700 rounded-lg mb-5">
                    <IconComponent size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-green-950 mb-2">{product.name}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed mb-6 flex-grow">{product.description}</p>
                  
                  {/* Highlight bar */}
                  <div className="w-full bg-green-100/50 rounded-lg px-4 py-2.5 mb-6 text-green-950 text-xs md:text-sm font-semibold border-l-2 border-green-700">
                    {product.highlight}
                  </div>

                  <Link to={`${ROUTES.PRODUCTS}#${product.id}`} className="text-green-700 hover:text-gold-600 font-semibold text-sm flex items-center gap-1 group transition-colors duration-250 mt-auto">
                    <span>View Details</span>
                    <Icons.ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      {/* 7. Testimonials */}
      <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <h2 className="section-title section-title-accent inline-block">What Our Clients Say</h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Real testimonials from satisfied individuals who have reached financial freedom with our advice.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-hidden group py-4">
          {/* Fade Masks */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

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
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
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
