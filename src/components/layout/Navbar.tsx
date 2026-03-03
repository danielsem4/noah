import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'בית',       href: '#hero'   },
  { label: 'גלריה',     href: '#gallery' },
  { label: 'להזמנות',  href: '#orders'  },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goto = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-light shadow-md shadow-[#82583B]/15' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* ── Logo ── */}
            <button
              onClick={() => goto('#hero')}
              className="flex items-center gap-3 cursor-pointer bg-transparent border-none"
            >
              {/* Amber badge */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#AD652E] flex items-center justify-center shadow-md shadow-[#AD652E]/30 flex-shrink-0">
                <span className="text-[#E4E1D8] font-bold text-sm sm:text-base" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>נח</span>
              </div>
              <div className="hidden sm:flex flex-col leading-tight text-right">
                <span className="text-[#000000] font-bold text-sm tracking-wide" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
                  קבוצת נח
                </span>
                <span className="text-[#82583B] text-[11px] font-medium">אירוח בע&quot;מ</span>
              </div>
            </button>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-10" aria-label="ניווט ראשי">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => goto(link.href)}
                  className="relative text-[#000000] hover:text-[#AD652E] font-medium text-sm transition-colors duration-200 group cursor-pointer bg-transparent border-none"
                  style={{ fontFamily: "'Assistant', sans-serif" }}
                >
                  {link.label}
                  {/* Amber underline on hover */}
                  <span className="absolute -bottom-1 right-0 w-0 h-[1.5px] bg-[#AD652E] transition-all duration-300 group-hover:w-full rounded-full" />
                </button>
              ))}
            </nav>

            {/* ── Mobile burger ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#5F3C20] hover:bg-[#AD652E]/10 transition-colors bg-transparent border-none cursor-pointer"
              aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-16 sm:top-20 right-0 left-0 z-40 glass-light border-t border-[#82583B]/20 shadow-xl shadow-[#82583B]/10 md:hidden"
          >
            <nav className="flex flex-col py-4 px-6 gap-0.5" aria-label="ניווט נייד">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => goto(link.href)}
                  className="text-right text-[#000000] hover:text-[#AD652E] font-semibold text-lg py-3 px-2 rounded-lg hover:bg-[#AD652E]/8 transition-all duration-200 bg-transparent border-none w-full cursor-pointer"
                  style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
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
