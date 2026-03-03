import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, UtensilsCrossed } from 'lucide-react'

const navLinks = [
  { label: 'בית', href: '#hero' },
  { label: 'גלריה', href: '#gallery' },
  { label: 'להזמנות', href: '#orders' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-lg shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo — right side in RTL */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8971A] to-[#8B1A1A] flex items-center justify-center shadow-lg shadow-[#C8971A]/30">
                <UtensilsCrossed className="w-5 h-5 text-[#F5EDD6]" />
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-[#F5EDD6] font-bold text-base tracking-wide">קבוצת נח</span>
                <span className="text-[#C8971A] text-xs font-medium">אירוח בע&quot;מ</span>
              </div>
            </div>

            {/* Desktop nav links — left side in RTL */}
            <nav className="hidden md:flex items-center gap-8" aria-label="ניווט ראשי">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative text-[#C8B896] hover:text-[#F5EDD6] font-medium text-sm transition-colors duration-200 group cursor-pointer bg-transparent border-none"
                >
                  {link.label}
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gradient-to-l from-[#C8971A] to-[#E4B84A] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#C8B896] hover:text-[#F5EDD6] hover:bg-[#251A0E] transition-colors bg-transparent border-none cursor-pointer"
              aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-16 right-0 left-0 z-40 glass border-t border-[#3D2E1A] shadow-2xl shadow-black/60 md:hidden"
          >
            <nav className="flex flex-col py-4 px-6 gap-1" aria-label="ניווט נייד">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-right text-[#C8B896] hover:text-[#F5EDD6] font-medium text-lg py-3 px-2 rounded-lg hover:bg-[#251A0E] transition-all duration-200 bg-transparent border-none w-full cursor-pointer"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
