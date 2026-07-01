import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import ChatWidget from './components/chatbot/ChatWidget';
import FloatingButton from './components/chatbot/FloatingButton';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary';

const Home = lazy(() => import('./pages/Home/Home'));
const Contact = lazy(() => import('./pages/contact/contact'));
const Calculator = lazy(() => import('./pages/calculator/calculator'));
const About = lazy(() => import('./pages/About/About'));
const Services = lazy(() => import('./pages/Services/Services'));
const Products = lazy(() => import('./pages/Products/Products'));

import { ROUTES } from './constants/routes';

// Scroll to top on route change helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Minimal Loading Fallback
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400 mb-4"></div>
      <p className="text-gray-400 text-sm tracking-widest uppercase font-semibold">Loading...</p>
    </div>
  );
}

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds on page load
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsChatOpen(prev => {
      const next = !prev;
      if (next) setShowTooltip(false);
      return next;
    });
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white text-ink-dark">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                
                {/* Main Pages */}
                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path={ROUTES.SERVICES} element={<Services />} />
                <Route path={ROUTES.PRODUCTS} element={<Products />} />
                <Route path={ROUTES.CALCULATORS} element={<Calculator />} />
                <Route path={ROUTES.CONTACT} element={<Contact />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <Toaster position="top-right" />

          {/* Chatbot UI */}
          <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end pointer-events-none">
            <div className="pointer-events-auto relative">
              <AnimatePresence>
                {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)} />}
              </AnimatePresence>

              {/* Welcome Tooltip bubble */}
              <AnimatePresence>
                {!isChatOpen && showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: [0, -4, 0] 
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{
                      y: {
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "easeInOut"
                      },
                      default: { duration: 0.3 }
                    }}
                    className="absolute bottom-[4px] right-0 bg-[#0f172a] text-white p-4 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.2)] border border-slate-700 w-64 flex flex-col items-start gap-1 text-sm font-sans"
                    style={{ transformOrigin: "bottom right" }}
                  >
                    {/* Close button */}
                    <button 
                      onClick={() => setShowTooltip(false)}
                      className="absolute top-2.5 right-2.5 text-slate-400 hover:text-white transition-colors"
                    >
                      <X size={14} />
                    </button>

                    <div className="font-semibold text-gold-400 flex items-center gap-1.5">
                      <span>Ask FinAI ✨</span>
                    </div>
                    <p className="text-slate-200 text-xs pr-2 leading-normal">
                      Need financial advice? Ask me about SIP, Mutual Funds, or Loans! 📈
                    </p>
                    
                     {/* Tooltip Arrow pointing down */}
                    <div className="absolute right-6 -bottom-1.5 w-3 h-3 bg-[#0f172a] border-r border-b border-slate-700 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-4 pointer-events-auto">
              <FloatingButton isOpen={isChatOpen} toggle={toggleChat} />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
