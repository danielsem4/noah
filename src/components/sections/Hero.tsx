import { motion } from 'framer-motion'
import { UtensilsCrossed, ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0F0A07]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A0D05]/80 via-[#0F0A07] to-[#0A0703]" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C8971A]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#8B1A1A]/8 blur-[80px] pointer-events-none" />

      {/* Decorative ornament dots */}
      <div className="absolute top-32 right-8 sm:right-16 w-1.5 h-1.5 rounded-full bg-[#C8971A]/40 animate-pulse" />
      <div
        className="absolute bottom-40 left-12 sm:left-24 w-1 h-1 rounded-full bg-[#C8971A]/30 animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div className="absolute top-1/3 left-8 w-0.5 h-20 bg-gradient-to-b from-transparent via-[#C8971A]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-24 sm:py-28">

          {/* Text side */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-3"
            >
              <span className="inline-flex items-center gap-2 bg-[#C8971A]/10 border border-[#C8971A]/30 rounded-full px-4 py-1.5 text-[#C8971A] text-sm font-medium">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                ברוכים הבאים
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl xl:text-6xl font-black text-[#F5EDD6] leading-tight mb-5"
            >
              ברוכים הבאים{' '}
              <br />
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #C8971A 0%, #E4B84A 50%, #C8971A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                למסעדה שלנו
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
              className="text-[#C8B896] text-lg sm:text-xl leading-relaxed max-w-lg mb-8"
            >
              חוויה קולינרית ייחודית המשלבת טעמים מסורתיים עם מגע מודרני.
              בואו לחוות אוכל אמיתי, אווירה חמה ואירוח בלתי נשכח.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <a
                href="#orders"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#orders')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-[#C8971A] text-[#0F0A07] font-bold text-base hover:bg-[#E4B84A] transition-all duration-200 shadow-lg shadow-[#C8971A]/25 hover:shadow-[#C8971A]/40 hover:-translate-y-0.5"
              >
                להזמנה עכשיו
              </a>
              <a
                href="#gallery"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg border border-[#5C4523] text-[#C8B896] font-medium text-base hover:border-[#C8971A] hover:text-[#F5EDD6] transition-all duration-200"
              >
                הגלריה שלנו
              </a>
            </motion.div>

            {/* Decorative divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-10 flex items-center gap-4 w-full max-w-xs"
            >
              <div className="h-px flex-1 bg-gradient-to-l from-[#C8971A]/40 to-transparent" />
              <span className="text-[#C8971A] text-xs font-medium tracking-widest uppercase">נח</span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#C8971A]/40 to-transparent" />
            </motion.div>
          </div>

          {/* Floating logo side */}
          <div className="flex items-center justify-center order-first lg:order-last">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C8971A]/20 to-[#8B1A1A]/20 blur-xl scale-125" />

              {/* Spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-[#C8971A]/20"
                style={{ margin: '-20px' }}
              />

              {/* Floating animation */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 4,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
              >
                <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-[#251A0E] via-[#1A1108] to-[#0F0A07] border-2 border-[#3D2E1A] flex items-center justify-center shadow-2xl shadow-[#C8971A]/10">
                  <div className="absolute inset-4 rounded-full border border-[#C8971A]/15" />
                  <div className="absolute inset-8 rounded-full border border-[#C8971A]/10" />

                  <div className="flex flex-col items-center gap-3 z-10">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#C8971A] via-[#A07010] to-[#8B1A1A] flex items-center justify-center shadow-xl shadow-[#C8971A]/30">
                      <UtensilsCrossed className="w-10 h-10 sm:w-12 sm:h-12 text-[#F5EDD6]" />
                    </div>
                    <div className="text-center">
                      <p className="text-[#F5EDD6] font-black text-2xl sm:text-3xl tracking-wider">נח</p>
                      <p
                        className="text-xs sm:text-sm font-medium tracking-widest"
                        style={{
                          background:
                            'linear-gradient(135deg, #C8971A 0%, #E4B84A 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        קבוצת נח אירוח
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[#8A7560] text-xs tracking-widest uppercase">גלול למטה</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-[#C8971A]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
