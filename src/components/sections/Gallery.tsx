import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// ── Main atmosphere images ────────────────────────────────────────────────
import c1 from '../../assets/carousel/carusale_1.jpeg'
import c2 from '../../assets/carousel/carusale_2.jpeg'
import c3 from '../../assets/carousel/carusale_3.jpeg'
import c4 from '../../assets/carousel/carusale_4.jpeg'
import c5 from '../../assets/carousel/carusale_5.jpeg'

// ── Food images via glob (handles Hebrew filenames automatically) ──────────
const _foodGlob = import.meta.glob<string>(
  '../../assets/carosuelFood/*.{jpg,png,jpeg}',
  { eager: true, import: 'default' }
)
const foodItems = Object.entries(_foodGlob)
  .map(([path, src]) => ({
    src,
    name: decodeURIComponent(path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? ''),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'he'))

// ── Config ────────────────────────────────────────────────────────────────
const ATM_SLIDES = [
  { src: c1, label: 'אווירה ייחודית' },
  { src: c2, label: 'קבוצת נח' },
  { src: c3, label: 'חוויה קולינרית' },
  { src: c4, label: 'מנות מיוחדות' },
  { src: c5, label: 'רגעים בלתי נשכחים' },
]

// 3× clone for infinite food scroll — start at middle copy
const FOOD_TOTAL = foodItems.length
const FOOD_EXT   = [...foodItems, ...foodItems, ...foodItems]
const FOOD_START = FOOD_TOTAL

const luxEase = [0.25, 0.46, 0.45, 0.94] as const

// ═══════════════════════════════════════════════════════════════════════════
// Carousel 1 — full-width atmosphere slider (infinite crossfade)
// ═══════════════════════════════════════════════════════════════════════════
function AtmosphereCarousel() {
  const [cur, setCur]   = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const N = ATM_SLIDES.length

  // Always advance from latest state — no stale closures
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCur(c => (c + 1) % N)
    }, 6000)
  }, [N])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const go = (idx: number) => {
    const next = ((idx % N) + N) % N
    setPrev(cur)
    setCur(next)
    startTimer()
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/40"
      style={{ height: 'clamp(240px, 44vw, 520px)' }}
    >
      {/* Previous image (stays underneath during crossfade) */}
      {prev !== null && (
        <img
          src={ATM_SLIDES[prev].src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Current image fades in on top */}
      <motion.div
        key={cur}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.95, ease: luxEase }}
        className="absolute inset-0"
        style={{ willChange: 'opacity, transform' }}
      >
        <img
          src={ATM_SLIDES[cur].src}
          alt={ATM_SLIDES[cur].label}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(10,5,2,0.80) 0%, rgba(10,5,2,0.15) 55%, transparent 100%)',
        }}
      />

      {/* Slide label */}
      <motion.div
        key={`label-${cur}`}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: luxEase }}
        className="absolute bottom-12 sm:bottom-14 right-5 sm:right-10 z-10"
      >
        <p
          className="text-[#E4E1D8] font-bold"
          style={{
            fontFamily: "'Frank Ruhl Libre', serif",
            fontSize: 'clamp(1.15rem, 2.8vw, 2.1rem)',
            textShadow: '0 2px 24px rgba(0,0,0,0.6)',
          }}
        >
          {ATM_SLIDES[cur].label}
        </p>
        <div className="mt-2 w-9 h-0.5 bg-[#AD652E] rounded-full" />
      </motion.div>

      {/* Prev arrow (right side — RTL) */}
      <button
        onClick={() => go(cur - 1)}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border border-white/20 hover:border-[#AD652E]/70 bg-black/20 hover:bg-[#AD652E]/70 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="הקודם"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>

      {/* Next arrow (left side — RTL) */}
      <button
        onClick={() => go(cur + 1)}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border border-white/20 hover:border-[#AD652E]/70 bg-black/20 hover:bg-[#AD652E]/70 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="הבא"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {ATM_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-500 ${
              i === cur
                ? 'w-7 h-2 bg-[#AD652E]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`שקופית ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Carousel 2 — food dishes, truly infinite using 3× clone + silent jump
// ═══════════════════════════════════════════════════════════════════════════
function FoodCarousel() {
  const [idx, setIdx]         = useState(FOOD_START)
  const [instant, setInstant] = useState(false)
  const [perPage, setPerPage] = useState(4)
  const [cardWidth, setCardWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const GAP = 16 // px, maps to gap-4

  // Responsive card count + card width calculation
  useLayoutEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const pp = vw < 480 ? 2 : vw < 768 ? 3 : vw < 1100 ? 4 : 4
      setPerPage(pp)
      if (containerRef.current) {
        const cw = containerRef.current.offsetWidth
        setCardWidth((cw - GAP * (pp - 1)) / pp)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Reset to start of middle copy when perPage changes
  useEffect(() => { setIdx(FOOD_START) }, [perPage])

  const trackX = cardWidth > 0 ? -(idx * (cardWidth + GAP)) : 0

  // After each animated transition, silently jump if near clone boundary
  const onAnimComplete = useCallback(() => {
    if (instant) return // already in a jump — skip
    if (idx < FOOD_TOTAL) {
      setInstant(true)
      setIdx(idx + FOOD_TOTAL)
    } else if (idx >= FOOD_TOTAL * 2) {
      setInstant(true)
      setIdx(idx - FOOD_TOTAL)
    }
  }, [instant, idx])

  // Re-enable animation 1 frame after instant jump
  useEffect(() => {
    if (!instant) return
    const raf = requestAnimationFrame(() => setInstant(false))
    return () => cancelAnimationFrame(raf)
  }, [instant])

  const prev = () => { if (!instant) setIdx(i => i - 1) }
  const next = () => { if (!instant) setIdx(i => i + 1) }

  return (
    <div className="relative px-7 sm:px-9">
      {/* Prev arrow — right side (RTL) */}
      <button
        onClick={prev}
        className="absolute right-0 top-[42%] -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#2A1508]/80 hover:bg-[#AD652E] border border-[#AD652E]/30 hover:border-[#AD652E] shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="הקודם"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#E4E1D8]" />
      </button>

      {/* Track container */}
      <div className="overflow-hidden" ref={containerRef}>
        <motion.div
          className="flex"
          animate={{ x: trackX }}
          transition={instant ? { duration: 0 } : { duration: 0.6, ease: luxEase }}
          onAnimationComplete={onAnimComplete}
          style={{ gap: GAP, willChange: 'transform' }}
        >
          {FOOD_EXT.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center group"
              style={{ width: cardWidth > 0 ? cardWidth : `calc(${100 / perPage}% - ${GAP * (perPage - 1) / perPage}px)` }}
            >
              {/* Arch image */}
              <div
                className="relative overflow-hidden w-full"
                style={{
                  borderTopLeftRadius: '9999px',
                  borderTopRightRadius: '9999px',
                  borderBottomLeftRadius: '12px',
                  borderBottomRightRadius: '12px',
                  aspectRatio: '3/4',
                  border: '1.5px solid rgba(173,101,46,0.25)',
                  transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.45s',
                  willChange: 'transform',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(10,5,2,0.5)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.transform = ''
                  ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                }}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{
                    background: 'linear-gradient(to top, rgba(10,5,2,0.65) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Dish name */}
              <div className="mt-2.5 text-center px-1">
                <p
                  className="text-[#C8B89A] font-medium leading-snug"
                  style={{
                    fontFamily: "'Frank Ruhl Libre', serif",
                    fontSize: 'clamp(0.65rem, 1.1vw, 0.8rem)',
                  }}
                >
                  {item.name}
                </p>
                <div className="mt-1 h-px w-0 bg-[#AD652E] mx-auto rounded-full transition-all duration-400 group-hover:w-8" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Next arrow — left side (RTL) */}
      <button
        onClick={next}
        className="absolute left-0 top-[42%] -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#2A1508]/80 hover:bg-[#AD652E] border border-[#AD652E]/30 hover:border-[#AD652E] shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="הבא"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#E4E1D8]" />
      </button>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Gallery section
// ═══════════════════════════════════════════════════════════════════════════
export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #160C04 0%, #0E0702 100%)' }}
    >
      {/* Warm glow accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[#AD652E]/6 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-[#82583B]/6 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: luxEase }}
          className="text-center mb-12 sm:mb-16"
        >
          <span
            className="inline-flex items-center gap-2 border border-[#AD652E]/45 rounded-full px-4 py-1.5 text-[#AD652E] text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            ✦ &nbsp;גלריה&nbsp; ✦
          </span>
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#E4E1D8',
            }}
          >
            הטעמים{' '}
            <span style={{ color: '#AD652E' }}>שלנו</span>
          </h2>
          <p
            className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Assistant', sans-serif", color: '#A07355' }}
          >
            כל צלחת היא יצירת אמנות. גלו את עולם הטעמים שיצרנו עבורכם.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* ── Carousel 1: Atmosphere ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: luxEase }}
          className="mb-24 sm:mb-28"
        >
          <AtmosphereCarousel />
        </motion.div>

        {/* ── Carousel 2: Food dishes ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: luxEase }}
        >
          {/* Sub-header */}
          <div className="text-center mb-10 sm:mb-12">
            <span
              className="inline-flex items-center gap-2 border border-[#AD652E]/45 rounded-full px-4 py-1.5 text-[#AD652E] text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ fontFamily: "'Assistant', sans-serif" }}
            >
              ✦ &nbsp;התפריט שלנו&nbsp; ✦
            </span>
            <h3
              style={{
                fontFamily: "'Frank Ruhl Libre', serif",
                fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)',
                fontWeight: 700,
                color: '#E4E1D8',
              }}
            >
              מנות{' '}
              <span style={{ color: '#AD652E' }}>מיוחדות</span>
            </h3>
          </div>

          <FoodCarousel />
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mt-20"
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#82583B]/35" />
          <span className="text-[#AD652E]/60 text-lg select-none">✦</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#82583B]/35" />
        </motion.div>
      </div>
    </section>
  )
}
