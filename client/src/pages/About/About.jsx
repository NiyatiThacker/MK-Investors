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
    <div className="bg-white">
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
            About <span className="text-gold-400 font-extrabold relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-1 after:bg-gold-400/40">SBS Investments</span>
          </h1>
          <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Empowering financial futures through expert investment guidance and innovative solutions
          </p>
        </motion.div>

        {/* Decorative Gold Bottom Wave Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-40"></div>
      </section>

      {/* 2. Company Story */}
      <section className="section-pad bg-white">
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
              Founded in 2010, SBS Investments has built a reputation as one of the most trusted and experienced financial advisory firms. At SBS Investments, we believe financial planning is more than just numbers — it's about empowering individuals to make informed decisions for a secure and prosperous future. 
            </p>
            <p className="text-ink-muted text-body-lg">
              Our mission is to guide clients through every step of their financial journey with clarity, confidence, and a personalized approach, ensuring long-term wealth creation and financial independence.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="lg:w-1/2 w-full">
             <div className="w-full aspect-video bg-green-100/50 rounded-card border border-green-700/10 flex items-center justify-center shadow-sm">
                <Icons.Image className="text-green-700/20 w-16 h-16" />
                <span className="sr-only">Company Photo Container</span>
             </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. Founder Section */}
      <section className="section-pad bg-green-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title section-title-accent inline-block">Meet Our Founder</h2>
          </div>
          <div className="bg-white rounded-card border border-green-700/5 shadow-sm p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center md:items-start">
            <div className="md:w-1/3 flex flex-col items-center">
               <div className="w-48 h-48 rounded-full bg-green-50 border-4 border-gold-400/20 flex items-center justify-center mb-6 shadow-md overflow-hidden">
                  <Icons.User className="text-green-700/20 w-24 h-24" />
                  <span className="sr-only">Founder Photo Container</span>
               </div>
               <div className="flex gap-4">
                 <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-gold-400 hover:text-white transition-colors cursor-pointer"><Icons.Globe size={18} /></div>
                 <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-gold-400 hover:text-white transition-colors cursor-pointer"><Icons.Mail size={18} /></div>
                 <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-gold-400 hover:text-white transition-colors cursor-pointer"><Icons.Phone size={18} /></div>
                 <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-gold-400 hover:text-white transition-colors cursor-pointer"><Icons.MessageSquare size={18} /></div>
               </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-green-950 mb-2">Founder Name</h3>
              <p className="text-gold-600 font-semibold mb-6 uppercase tracking-wider text-sm">Founder, SBS Investments</p>
              <p className="text-ink-muted text-body-lg mb-6 leading-relaxed">
                The visionary founder of SBS Investments is a certified financial advisor with extensive experience in mutual funds, SIPs, wealth planning, and portfolio management. The philosophy is simple yet powerful: financial independence comes from knowledge, discipline, and smart planning.
              </p>
              <p className="text-ink-muted text-body-lg mb-6 leading-relaxed">
                Beyond client advisory, there is a deep passion for financial education, frequently engaging in sharing practical wealth-building strategies to shape the next generation of financially savvy professionals.
              </p>
              <blockquote className="border-l-4 border-gold-400 pl-6 py-4 bg-green-50/50 italic text-green-950 font-medium rounded-r-lg">
                "I started SBS Investments with a simple belief: that every individual deserves honest, personalized financial advice. Today, we're proud to serve clients across India and abroad with the same passion and integrity."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Stats Bar */}
      <section className="bg-green-950 border-y border-gold-400/15 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-gold-400/10">
            <StatItem value="15" label="Years Experience" suffix="+" />
            <StatItem value="5000" label="Happy Clients" suffix="+" />
            <StatItem value="98" label="Client Retention Ratio" suffix="%" />
            <StatItem value="18" label="Average Annual Growth" suffix="%" />
          </div>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="section-pad bg-white">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title section-title-accent inline-block">Our Core Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Transparency', desc: 'Complete transparency in all our investment strategies and fee structures.', icon: Icons.Eye },
              { title: 'Trust', desc: 'Building long-term relationships based on trust and consistent performance.', icon: Icons.ShieldCheck },
              { title: 'Excellence', desc: 'Striving for excellence in every aspect of our investment services.', icon: Icons.Star },
              { title: 'Security', desc: 'Ensuring the highest level of security for your investments and data.', icon: Icons.Lock },
            ].map((v, i) => (
              <motion.div variants={itemVariants} key={i} className="card flex flex-col items-center text-center border-t-4 border-t-transparent hover:border-t-gold-400 transition-colors duration-300 shadow-sm hover:shadow-md">
                <div className="p-4 bg-green-100 text-green-700 rounded-full mb-6">
                  <v.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-green-950 mb-3">{v.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 6. Team & Seminars & Achievements */}
      <section className="section-pad bg-green-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Team */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title section-title-accent inline-block">Team SBS Investments</h2>
            </div>
            <div className="bg-white p-8 rounded-card border border-green-700/5 shadow-sm">
              <div className="w-full h-80 md:h-96 bg-green-50 rounded-xl mb-8 flex items-center justify-center border border-green-700/10 overflow-hidden">
                 <Icons.Users className="text-green-700/20 w-24 h-24" />
                 <span className="sr-only">Team Photo Container</span>
              </div>
              <p className="text-ink-muted text-body-lg text-center max-w-4xl mx-auto leading-relaxed">
                At SBS Investments, our strength lies in our dedicated and skilled team. Each member shares the same commitment to client success, bringing expertise in investment advisory, financial planning, and client education. From portfolio strategists to relationship managers, Team SBS Investments works seamlessly to ensure every client receives personalized attention and actionable financial guidance.
              </p>
            </div>
          </div>

          {/* Seminars */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title section-title-accent inline-block">Investment Awareness Seminars</h2>
            </div>
            
            <div className="space-y-12">
              {/* Seminar Row 1 */}
              <div className="flex flex-col lg:flex-row gap-8 items-center bg-white p-6 md:p-8 rounded-card border border-green-700/5 shadow-sm hover:shadow-md transition-shadow">
                 <div className="lg:w-1/2 w-full order-2 lg:order-1">
                    <div className="flex items-start gap-4">
                       <div className="p-3 bg-gold-400/20 text-gold-600 rounded-lg shrink-0 mt-1">
                         <Icons.Mic size={24} />
                       </div>
                       <div>
                         <h3 className="text-xl font-bold text-green-950 mb-3">Personal Finance Workshop</h3>
                         <p className="text-ink-muted text-body-lg leading-relaxed">
                           SBS Investments takes pride in spreading financial literacy beyond portfolios. We regularly organize investment awareness seminars for corporates, professionals, and students.
                         </p>
                       </div>
                    </div>
                 </div>
                 <div className="lg:w-1/2 w-full order-1 lg:order-2">
                    <div className="w-full aspect-video bg-green-50 rounded-xl flex flex-col items-center justify-center border border-green-700/10 shadow-sm overflow-hidden relative group">
                       <Icons.Presentation className="text-green-700/20 w-16 h-16 transition-transform duration-500 group-hover:scale-110" />
                       <span className="sr-only">Personal Finance Workshop Photo Container</span>
                    </div>
                 </div>
              </div>

              {/* Seminar Row 2 */}
              <div className="flex flex-col lg:flex-row-reverse gap-8 items-center bg-white p-6 md:p-8 rounded-card border border-green-700/5 shadow-sm hover:shadow-md transition-shadow">
                 <div className="lg:w-1/2 w-full order-2 lg:order-1">
                    <div className="flex items-start gap-4">
                       <div className="p-3 bg-gold-400/20 text-gold-600 rounded-lg shrink-0 mt-1">
                         <Icons.BookOpen size={24} />
                       </div>
                       <div>
                         <h3 className="text-xl font-bold text-green-950 mb-3">College Investment Seminar</h3>
                         <p className="text-ink-muted text-body-lg leading-relaxed">
                           We are often invited by colleges and management institutes to share practical insights on finance and investment, empowering MBA students and young professionals to make intelligent financial decisions for long-term growth.
                         </p>
                       </div>
                    </div>
                 </div>
                 <div className="lg:w-1/2 w-full order-1 lg:order-2">
                    <div className="w-full aspect-video bg-green-50 rounded-xl flex flex-col items-center justify-center border border-green-700/10 shadow-sm overflow-hidden relative group">
                       <Icons.GraduationCap className="text-green-700/20 w-16 h-16 transition-transform duration-500 group-hover:scale-110" />
                       <span className="sr-only">College Investment Seminar Photo Container</span>
                    </div>
                 </div>
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
      <section className="section-pad bg-white">
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
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gold-400 text-white font-bold text-lg shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {s.step}
                </div>
                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white rounded-card border border-green-700/10 shadow-sm hover:shadow-md hover:border-gold-400 transition-all duration-300 overflow-hidden group/card">
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
      <section className="section-pad bg-green-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title section-title-accent inline-block">Why Choose SBS Investments?</h2>
            <p className="text-ink-muted text-body-lg mt-4">
              Choosing SBS Investments means choosing a partner committed to your financial growth and empowerment. We combine personalized strategies, transparency, and proven expertise to help clients achieve their financial goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div className="bg-white p-8 rounded-card border border-green-700/5 shadow-sm text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="text-4xl mb-4 bg-green-50 w-16 h-16 mx-auto flex items-center justify-center rounded-full">💼</div>
                <h3 className="font-bold text-green-950 mb-3 text-lg">Personalized Strategies</h3>
                <p className="text-ink-muted text-sm leading-relaxed">Tailored investment plans based on your unique financial goals and risk profile.</p>
             </div>
             <div className="bg-white p-8 rounded-card border border-green-700/5 shadow-sm text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="text-4xl mb-4 bg-green-50 w-16 h-16 mx-auto flex items-center justify-center rounded-full">🔍</div>
                <h3 className="font-bold text-green-950 mb-3 text-lg">Complete Transparency</h3>
                <p className="text-ink-muted text-sm leading-relaxed">Clear communication and transparent processes in all our investment recommendations.</p>
             </div>
             <div className="bg-white p-8 rounded-card border border-green-700/5 shadow-sm text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="text-4xl mb-4 bg-green-50 w-16 h-16 mx-auto flex items-center justify-center rounded-full">🏆</div>
                <h3 className="font-bold text-green-950 mb-3 text-lg">Proven Expertise</h3>
                <p className="text-ink-muted text-sm leading-relaxed">15+ years of experience delivering consistent results for our valued clients.</p>
             </div>
             <div className="bg-white p-8 rounded-card border border-green-700/5 shadow-sm text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="text-4xl mb-4 bg-green-50 w-16 h-16 mx-auto flex items-center justify-center rounded-full">🌍</div>
                <h3 className="font-bold text-green-950 mb-3 text-lg">NRI Specialization</h3>
                <p className="text-ink-muted text-sm leading-relaxed">Recognized as trusted NRI investment advisors delivering global solutions.</p>
             </div>
          </div>
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
      <section className="bg-white py-20 px-4 md:px-8 text-center relative overflow-hidden border-t border-gold-400/10">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-950 tracking-tight">Connect With Us</h2>
          <p className="text-ink-muted mb-10 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            Your financial future deserves expert guidance and strategic planning. Connect with SBS Investments today and take the first step toward financial empowerment, long-term growth, and wealth creation.
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
