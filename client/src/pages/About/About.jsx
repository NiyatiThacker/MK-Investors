import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { motion } from 'framer-motion';

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
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

function About() {
  return (
    <div className="bg-soft-purple">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-950 text-white pt-32 pb-24 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Abstract Gold Background Decor */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-400 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-400 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-8 shadow-sm animate-pulse">
            Trusted Investment Advisors
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            About <span className="text-gold-400 font-extrabold relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-1 after:bg-gold-400/40">MK Investors</span>
          </h1>
          <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Empowering financial futures through expert investment guidance and innovative solutions
          </p>
        </motion.div>

        {/* Decorative Gold Bottom Wave Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-40"></div>
      </section>

      {/* 2. Company Story */}
      <section className="section-pad bg-soft-purple">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12"
        >
          <motion.div variants={itemVariants} className="lg:w-1/2">
            <h2 className="section-title section-title-accent inline-block mb-6">Who We Are – Your Trusted Partner in Financial Growth</h2>
            <p className="text-ink-muted text-body-lg mb-4">
              At MK Investors, we believe that true wealth is built on trust. Our mission is to simplify financial planning and help you make confident investment decisions through honest advice and personalized solutions.
            </p>
            <p className="text-ink-muted text-body-lg">
              Every client has unique goals, and we take the time to understand yours before recommending the right investment, insurance, or wealth management strategy. With transparency, integrity, and a long-term approach, we're committed to being your trusted financial partner at every stage of your journey.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="lg:w-1/2 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-green-50/40 rounded-2xl border border-green-700/10 space-y-3 shadow-sm hover:border-green-950/40 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-green-950/5 text-green-950 flex items-center justify-center border border-green-950/10">
                  <Icons.Compass size={20} />
                </div>
                <h4 className="font-bold text-green-950 text-base tracking-tight">Goal-Oriented Advice</h4>
                <p className="text-ink-muted text-xs leading-relaxed">Portfolios tailored precisely to match child education, retirement, and family security timelines.</p>
              </div>
              <div className="p-6 bg-green-50/40 rounded-2xl border border-green-700/10 space-y-3 shadow-sm hover:border-green-950/40 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-green-950/5 text-green-950 flex items-center justify-center border border-green-950/10">
                  <Icons.TrendingUp size={20} />
                </div>
                <h4 className="font-bold text-green-950 text-base tracking-tight">Balanced Allocation</h4>
                <p className="text-ink-muted text-xs leading-relaxed">Strategic diversification across equities, debt, gold, and fixed-income to hedge against inflation.</p>
              </div>
              <div className="p-6 bg-green-50/40 rounded-2xl border border-green-700/10 space-y-3 shadow-sm hover:border-green-950/40 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-green-950/5 text-green-950 flex items-center justify-center border border-green-950/10">
                  <Icons.Activity size={20} />
                </div>
                <h4 className="font-bold text-green-950 text-base tracking-tight">Active Rebalancing</h4>
                <p className="text-ink-muted text-xs leading-relaxed">Continuous assessment and adjustment of portfolio holdings to lock in gains and limit downsides.</p>
              </div>
              <div className="p-6 bg-green-50/40 rounded-2xl border border-green-700/10 space-y-3 shadow-sm hover:border-green-950/40 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-green-950/5 text-green-950 flex items-center justify-center border border-green-950/10">
                  <Icons.Layers size={20} />
                </div>
                <h4 className="font-bold text-green-950 text-base tracking-tight">Tax Shielding</h4>
                <p className="text-ink-muted text-xs leading-relaxed">Utilizing structural deductions (ELSS, NPS) and capital gains harvesting to protect investment returns.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>      {/* 3. Founder Section */}
      <section className="section-pad bg-gradient-to-br from-green-950 to-green-900 text-white relative overflow-hidden">
        {/* Subtle blur highlights */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-400/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-700/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Founder Card Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border border-gold-400/30 bg-green-950/60 shadow-xl">
                {/* Gold frame decorations */}
                <div className="absolute inset-2 border border-gold-400/10 rounded-xl pointer-events-none"></div>
                
                {/* Subtle internal grid decoration */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
                
                {/* Premium executive portrait placeholder */}
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="p-4 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 shadow-inner">
                    <Icons.User size={44} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white tracking-tight">Manthan Kakkad</h4>
                    <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mt-1">Founder Executive Bio</p>
                  </div>
                </div>
              </div>

              {/* Floating Social Connection Block */}
              <div className="flex gap-4 mt-6">
                {[
                  { icon: Icons.Mail, href: "mailto:manthan@mkinvestors.com", title: "Email" },
                  { icon: Icons.Globe, href: "#", title: "Website" },
                  { icon: Icons.Phone, href: "tel:+919999999999", title: "Call" },
                  { icon: Icons.MessageSquare, href: "https://wa.me/919999999999", title: "WhatsApp" }
                ].map((soc, sIdx) => {
                  const SocIcon = soc.icon;
                  return (
                    <a 
                      key={sIdx} 
                      href={soc.href}
                      title={soc.title}
                      className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-green-950 transition-all duration-300 shadow-md hover:-translate-y-0.5"
                    >
                      <SocIcon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right: Biography details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-gold-400 uppercase tracking-widest text-xs md:text-sm font-bold block">ADVISORY LEADERSHIP</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
                  Manthan Kakkad
                </h2>
                <p className="text-gold-400 text-sm md:text-base font-bold tracking-wide uppercase">
                  Founder & Lead Financial Advisor, MK Investors
                </p>
              </div>

              <div className="w-16 h-1 bg-gold-400 rounded"></div>

              <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">
                <p>
                  Manthan Kakkad is a certified financial advisor with extensive experience in mutual funds, SIPs, retirement roadmaps, and customized loan solutions. Under his guidance, MK Investors operates on a simple, powerful philosophy: <strong className="text-white">true wealth compounding is a product of knowledge, discipline, and strategic asset allocation.</strong>
                </p>
                <p>
                  Manthan regularly conducts wealth workshops and financial literacy seminars, educating individuals and families on the mechanics of financial independence. He is dedicated to raising the standard of wealth advisory through strict fiduciary loyalty.
                </p>
              </div>

              {/* Professional Credentials List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                {[
                  "Fiduciary Standard Commitment",
                  "Certified Financial Planner Standards",
                  "AMFI Registered Mutual Fund Advisor",
                  "Tech-Driven Asset Allocation"
                ].map((cred, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-2.5 text-xs md:text-sm text-gray-200">
                    <Icons.CheckCircle2 size={16} className="text-gold-400 shrink-0" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>

              {/* Premium styled quote block */}
              <div className="relative pt-6 pl-8 border-l-2 border-gold-400/60 bg-white/5 p-6 rounded-r-2xl border border-white/5">
                <Icons.Quote size={40} className="absolute -top-3 left-4 text-gold-400/10 pointer-events-none" />
                <p className="italic text-white text-base md:text-lg font-medium leading-relaxed">
                  "Your goals inspire us. Your trust defines our commitment."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="section-pad bg-green-950 text-white relative overflow-hidden">
        {/* Subtle background glow blob */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-gold-400/5 blur-[120px]"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-gold-400 uppercase tracking-widest text-xs md:text-sm font-bold block mb-4">OUR PRINCIPLES</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight inline-block">
              Our Core Values
            </h2>
            <div className="w-16 h-1 bg-gold-400 mx-auto mt-6 rounded"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Transparency', desc: 'Complete transparency in all our investment strategies, performance reports, and fee structures.', icon: Icons.Eye },
              { title: 'Trust', desc: 'Building long-term relationships based on fiduciary trust, integrity, and consistent client success.', icon: Icons.ShieldCheck },
              { title: 'Excellence', desc: 'Striving for excellence in every aspect of our portfolio review and market advisory.', icon: Icons.Star },
              { title: 'Security', desc: 'Ensuring the highest level of asset security, compliance, and confidentiality for your investments.', icon: Icons.Lock },
            ].map((v, i) => {
              const IconComp = v.icon;
              return (
                <motion.div 
                  variants={itemVariants} 
                  key={i} 
                  className="glass-value-card flex flex-col items-center text-center"
                >
                  <div className="glass-value-icon">
                    <IconComp size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{v.title}</h3>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 6. Team & Seminars & Achievements */}
      <section className="section-pad bg-green-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Personal Commitment */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-green-900/10 p-8 md:p-10 rounded-2xl border border-green-700/10 text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold-400/5 rounded-full blur-xl"></div>
              
              <div className="w-12 h-12 rounded-full bg-green-950/5 text-green-950 flex items-center justify-center border border-green-950/10 mx-auto mb-6">
                <Icons.ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-green-950 mb-4 tracking-tight">My Personal Commitment</h3>
              <p className="text-ink-muted text-sm md:text-base leading-relaxed italic max-w-2xl mx-auto">
                "As your personal financial advisor, my commitment is to put your interests first, always. I believe in establishing a fiduciary relationship built on absolute transparency, detailed regular portfolio reviews, and continuous client education. By combining deep research, personalized asset allocation, and disciplined execution, I work directly with you to help turn your financial goals into realities."
              </p>
              <div className="mt-6 text-xs uppercase tracking-widest text-gold-600 font-bold">
                — Manthan Kakkad, Founder
              </div>
            </div>
          </div>



          {/* Achievements */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title section-title-accent inline-block">Our Achievements & Recognition</h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-12 items-center bg-white p-8 rounded-card border border-green-700/5 shadow-sm">
               <div className="lg:w-1/2 space-y-8">
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 text-green-700 rounded-full shrink-0"><Icons.Trophy size={24} /></div>
                    <p className="text-green-950 font-medium text-lg leading-relaxed pt-1">Featured in documentaries and news segments for client success stories.</p>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 text-green-700 rounded-full shrink-0"><Icons.Award size={24} /></div>
                    <p className="text-green-950 font-medium text-lg leading-relaxed pt-1">Invited as a guest speaker at premier management institutes for finance and investment sessions.</p>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 text-green-700 rounded-full shrink-0"><Icons.Handshake size={24} /></div>
                    <p className="text-green-950 font-medium text-lg leading-relaxed pt-1">Trusted by a growing base of working professionals, entrepreneurs, and high-net-worth clients.</p>
                 </div>
               </div>
               <div className="lg:w-1/2 w-full">
                  <div className="w-full aspect-[4/3] bg-green-50 rounded-xl flex flex-col items-center justify-center border border-green-700/10 shadow-inner relative overflow-hidden">
                     <Icons.Medal className="text-green-700/10 w-32 h-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                     <div className="z-10 text-center">
                       <Icons.Image className="text-green-700/30 w-16 h-16 mx-auto mb-4" />
                       <span className="text-green-950/50 font-semibold uppercase tracking-wider text-sm">Achievement Photo</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Our Approach */}
      <section className="section-pad bg-soft-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title section-title-accent inline-block">Our Approach</h2>
            <p className="text-ink-muted text-body-lg mt-4">Comprehensive financial solutions tailored to your needs</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-12 relative before:absolute before:inset-0 before:ml-6 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-green-100 before:via-gold-400/50 before:to-green-100">
            {[
              { step: 1, title: "Understanding the client's Financial Goal", image: "/images/approach_step1.png" },
              { step: 2, title: "Developing an Investment Strategy", image: "/images/approach_step2.png" },
              { step: 3, title: "Selecting Investment", image: "/images/approach_step3.png" },
              { step: 4, title: "Monitoring and adjusting the Portfolio", image: "/images/approach_step4.png" },
              { step: 5, title: "Providing ongoing advice and support", image: "/images/approach_step5.png" },
            ].map((s, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                {/* Step Circle */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-green-950 text-white font-bold text-lg shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {s.step}
                </div>
                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white rounded-card border border-green-700/10 shadow-sm hover:shadow-md hover:border-green-700 transition-all duration-300 overflow-hidden group/card">
                  <div className="w-full aspect-video bg-green-50 flex items-center justify-center border-b border-green-700/10 relative overflow-hidden">
                     <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-green-950/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 text-center bg-white relative z-10">
                    <h3 className="font-bold text-green-950 text-lg">{s.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Why Choose Us */}
      <section className="section-pad bg-gradient-to-b from-[#F7F9F6] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-600 uppercase tracking-widest text-xs md:text-sm font-bold block mb-4">OUR COMMITMENT</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-green-950 tracking-tight leading-tight inline-block">
              Why Choose MK Investors?
            </h2>
            <p className="text-ink-muted text-body-lg mt-6 leading-relaxed">
              Choosing MK Investors means partnering with a wealth advisor dedicated to your growth, safety, and long-term financial freedom.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: 'Personalized Strategies', desc: 'Tailored investment plans based on your unique financial goals, tax profile, and life milestones.', icon: Icons.Briefcase },
              { title: 'Complete Transparency', desc: 'Absolute transparency in advisory, zero hidden charges, and structured, clear communication.', icon: Icons.Search },
              { title: 'Active Optimization', desc: 'Utilizing modern portfolio theory, advanced analytics, and constant tracking to optimize returns and lower risk.', icon: Icons.Award },
              { title: 'NRI Specialization', desc: 'Recognized and trusted advisory delivering global financial and investment solutions for NRIs.', icon: Icons.Globe }
            ].map((v, i) => {
              const IconComp = v.icon;
              return (
                <motion.div 
                  variants={itemVariants} 
                  key={i} 
                  className="premium-outline-card flex flex-col items-center text-center"
                >
                  <div className="premium-outline-card-icon">
                    <IconComp size={24} />
                  </div>
                  <h3 className="font-bold text-green-950 mb-3 text-lg tracking-tight">{v.title}</h3>
                  <p className="text-ink-muted text-xs md:text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 9. Mission & Vision */}
      <section className="section-pad bg-green-950 text-white relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-card border border-gold-400/20 hover:bg-white/10 transition-colors duration-300">
               <div className="w-16 h-16 bg-gold-400/20 rounded-full flex items-center justify-center text-gold-400 mb-8 border border-gold-400/30">
                 <Icons.Rocket size={32} />
               </div>
               <h3 className="text-3xl font-bold mb-6 tracking-tight">Our Mission</h3>
               <p className="text-gray-300 leading-relaxed text-lg">
                 To deliver personalized financial strategies that help our clients build, protect, and grow their wealth—while fostering financial literacy and long-term confidence across generations.
               </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-card border border-gold-400/20 hover:bg-white/10 transition-colors duration-300">
               <div className="w-16 h-16 bg-gold-400/20 rounded-full flex items-center justify-center text-gold-400 mb-8 border border-gold-400/30">
                 <Icons.Eye size={32} />
               </div>
               <h3 className="text-3xl font-bold mb-6 tracking-tight">Our Vision</h3>
               <p className="text-gray-300 leading-relaxed text-lg">
                 To become the most trusted and client-first financial advisory firm, empowering individuals and families through transparent advice, strategic solutions, and lifelong relationships.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Contact CTA Strip */}
      <section className="bg-soft-purple py-20 px-4 md:px-8 text-center relative overflow-hidden border-t border-gold-400/10">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-950 tracking-tight">Connect With Us</h2>
          <p className="text-ink-muted mb-10 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            Your financial future deserves expert guidance and strategic planning. Connect with MK Investors today and take the first step toward financial empowerment, long-term growth, and wealth creation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ROUTES.CONTACT} className="btn-primary w-full sm:w-auto px-8 py-4 inline-flex items-center justify-center gap-2 group shadow-lg shadow-gold-400/15 text-lg">
              <span>Get Started Today</span>
              <Icons.ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
