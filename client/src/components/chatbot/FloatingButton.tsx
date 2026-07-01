import { motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

interface FloatingButtonProps {
  isOpen: boolean
  toggle: () => void
}

export default function FloatingButton({ isOpen, toggle }: FloatingButtonProps) {
  return (
    <div className="relative">
      {/* Pulsing Outer Ring (Only when closed) */}
      {!isOpen && (
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full bg-gold-400/40 z-0 pointer-events-none"
        />
      )}

      {/* Main Floating Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={!isOpen ? {
          y: [0, -6, 0]
        } : { y: 0 }}
        transition={!isOpen ? {
          y: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        } : {}}
        onClick={toggle}
        className="relative z-10 bg-gold-400 text-green-950 rounded-full p-4 shadow-[0_8px_30px_rgba(204,175,161,0.3)] flex items-center justify-center hover:bg-gold-600 transition-colors"
        aria-label="Toggle chat"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 0.85 : 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 15 }}
        >
          {isOpen ? (
            <X size={28} />
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
              {/* Custom Chat Bubble with rounded corners */}
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              {/* Midnight Navy line chart drawing itself inside the bubble */}
              <motion.path 
                d="M7 13l3-3 4 4 4-4" 
                stroke="#182238" 
                strokeWidth="2.5" 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              />
            </svg>
          )}
        </motion.div>
      </motion.button>
    </div>
  )
}
