import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowRight, Check } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { SERVICES } from '../../constants/services';
// logo image placeholder (currently text-only)


// Custom SVG Social Icons (since brand icons are removed in recent Lucide versions)
function LinkedinIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function Footer() {
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91 98245 96906');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-green-950 text-white border-t border-gold-400/15">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & About */}
          <div className="flex flex-col gap-6">
            <Link to={ROUTES.HOME} onClick={(e) => {
              if (location.pathname === ROUTES.HOME) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }} className="flex items-center gap-2 group self-start">
              <img src="/images/logo.png" alt="MK Investors Logo" className="h-16 w-auto object-contain transition-transform duration-250 group-hover:scale-105" />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              MK Investors is a premier financial advisory service dedicated to simplifying financial planning, wealth generation, strategic investments, and reliable insurance planning.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/sbs-financials/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-green-700/20 hover:bg-gold-400 hover:text-green-950 flex items-center justify-center text-gold-400 transition-all duration-250 border border-gold-400/10"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="https://www.facebook.com/share/1ETodRg3J2/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-green-700/20 hover:bg-gold-400 hover:text-green-950 flex items-center justify-center text-gold-400 transition-all duration-250 border border-gold-400/10"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://www.instagram.com/sbsfinancial?igsh=MW01ZG9pM29obW0xbg=="
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-green-700/20 hover:bg-gold-400 hover:text-green-950 flex items-center justify-center text-gold-400 transition-all duration-250 border border-gold-400/10"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://x.com/services5272"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-green-700/20 hover:bg-gold-400 hover:text-green-950 flex items-center justify-center text-gold-400 transition-all duration-250 border border-gold-400/10 font-bold text-xs"
                aria-label="Twitter (X)"
              >
                𝕏
              </a>
              <a
                href="https://youtube.com/@sbsfinancials?si=dKQ9457BVXpHwCHK"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-green-700/20 hover:bg-gold-400 hover:text-green-950 flex items-center justify-center text-gold-400 transition-all duration-250 border border-gold-400/10"
                aria-label="YouTube"
              >
                <YoutubeIcon size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className="text-gold-400 font-bold text-base tracking-wider relative after:content-[''] after:block after:w-8 after:h-0.5 after:bg-gold-400 after:mt-2">
              QUICK LINKS
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', path: ROUTES.HOME },
                { label: 'About Us', path: ROUTES.ABOUT },
                { label: 'Services', path: ROUTES.SERVICES },
                { label: 'Products', path: ROUTES.PRODUCTS },
                { label: 'Calculators', path: ROUTES.CALCULATORS },
                { label: 'Contact Us', path: ROUTES.CONTACT },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={(e) => {
                      if (location.pathname === link.path) {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-300 hover:text-gold-400 text-sm flex items-center gap-1.5 transition-colors duration-200 group"
                  >
                    <ArrowRight size={12} className="text-gold-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="flex flex-col gap-5">
            <h3 className="text-gold-400 font-bold text-base tracking-wider relative after:content-[''] after:block after:w-8 after:h-0.5 after:bg-gold-400 after:mt-2">
              OUR SERVICES
            </h3>
            <ul className="grid grid-cols-1 gap-2.5">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    to={service.href}
                    onClick={() => {
                      const [path, hash] = service.href.split('#');
                      if (location.pathname === path && hash) {
                        const element = document.getElementById(hash);
                        if (element) {
                          setTimeout(() => {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }
                      }
                    }}
                    className="text-gray-300 hover:text-gold-400 text-sm flex items-center gap-1.5 transition-colors duration-200 group"
                  >
                    <ArrowRight size={12} className="text-gold-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="line-clamp-1">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-5">
            <h3 className="text-gold-400 font-bold text-base tracking-wider relative after:content-[''] after:block after:w-8 after:h-0.5 after:bg-gold-400 after:mt-2">
              CONTACT INFO
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold-400 shrink-0 mt-0.5" />
                <a href="https://maps.google.com/maps?q=Murlidhar+marketing,+bhavani+mandir+road,+main+bazar,+madhavpur-362230" target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:text-gold-400 transition-colors duration-200">
                  Murlidhar marketing, bhavani mandir road,<br />main bazar, madhavpur - 362230
                </a>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer w-fit" onClick={handleCopyPhone}>
                {copied ? <Check size={18} className="text-green-500 shrink-0" /> : <Phone size={18} className="text-gold-400 shrink-0 group-hover:text-green-500 transition-colors duration-200" />}
                <span className={`transition-colors duration-200 ${copied ? 'text-green-500' : 'group-hover:text-white'}`}>
                  {copied ? 'Copied!' : '+91 98245 96906'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold-400 shrink-0" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=manthankakkad50@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors duration-200">
                  manthankakkad50@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-gold-400 shrink-0 mt-0.5" />
                <span>
                  Mon - Sat: 10:00 AM - 8:00 PM<br />
                  <span className="text-xs text-gray-400">Sun: On Advance Appointment Basis</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gold-400/10 py-6 bg-green-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} MK Investors. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to={ROUTES.HOME} className="hover:text-gold-400 transition-colors duration-200">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link to={ROUTES.HOME} className="hover:text-gold-400 transition-colors duration-200">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
