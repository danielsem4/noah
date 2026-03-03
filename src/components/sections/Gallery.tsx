import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// ── Atmosphere images ─────────────────────────────────────────────────────
import c1 from '../../assets/carousel/carusale_1.jpeg'
import c2 from '../../assets/carousel/carusale_2.jpeg'
import c3 from '../../assets/carousel/carusale_3.jpeg'
import c4 from '../../assets/carousel/carusale_4.jpeg'
import c5 from '../../assets/carousel/carusale_5.jpeg'

// ── Food images — covers lowercase AND uppercase extensions (.jpg / .JPG) ─
const _glob = import.meta.glob<string>(
  [
    '../../assets/carosuelFood/*.{jpg,jpeg,png}',
    '../../assets/carosuelFood/*.{JPG,JPEG,PNG}',
  ],
  { eager: true, import: 'default' }
)

const foodItems = Object.entries(_glob)
  .map(([path, src]) => ({
    src,
    name: decodeURIComponent(path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? ''),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'he'))

const ATM_SLIDES = [
  { src: c1, label: 'אווירה ייחודית' },
  { src: c2, label: 'קבוצת נח' },
  { src: c3, label: 'חוויה קולינרית' },
  { src: c4, label: 'מנות מיוחדות' },
  { src: c5, label: 'רגעים בלתי נשכחים' },
]

const EASE = [0.25, 0.46, 0.45, 0.94] as const
const GAP  = 14  // px gap between food cards

// ═══════════════════════════════════════════════════════════════════════════
// Atmosphere carousel (crossfade, auto-advances)
// ═══════════════════════════════════════════════════════════════════════════
function AtmosphereCarousel() {
  const [cur, setCur]   = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const N = ATM_SLIDES.length

  const startTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => setCur(c => (c + 1) % N), 6000)
  }, [N])

  useEffect(() => { startTimer(); return () => { if (timer.current) clearInterval(timer.current) } }, [startTimer])

  const go = (i: number) => { setPrev(cur); setCur(((i % N) + N) % N); startTimer() }

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/40"
      style={{ height: 'clamp(220px, 44vw, 520px)' }}>
      {prev !== null && (
        <img src={ATM_SLIDES[prev].src} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <motion.div key={cur} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE }} className="absolute inset-0" style={{ willChange: 'opacity,transform' }}>
        <img src={ATM_SLIDES[cur].src} alt={ATM_SLIDES[cur].label} className="w-full h-full object-cover" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top,rgba(10,5,2,.82) 0%,rgba(10,5,2,.14) 55%,transparent 100%)' }} />

      <motion.div key={`l${cur}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
        className="absolute bottom-12 sm:bottom-14 right-5 sm:right-10 z-10">
        <p className="text-[#E4E1D8] font-bold"
          style={{ fontFamily:"'Frank Ruhl Libre',serif", fontSize:'clamp(1.1rem,2.8vw,2rem)', textShadow:'0 2px 24px rgba(0,0,0,.6)' }}>
          {ATM_SLIDES[cur].label}
        </p>
        <div className="mt-2 w-9 h-0.5 bg-[#AD652E] rounded-full" />
      </motion.div>

      <button onClick={() => go(cur - 1)} aria-label="הקודם"
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border border-white/20 hover:border-[#AD652E]/70 bg-black/25 hover:bg-[#AD652E]/70 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95">
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>
      <button onClick={() => go(cur + 1)} aria-label="הבא"
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border border-white/20 hover:border-[#AD652E]/70 bg-black/25 hover:bg-[#AD652E]/70 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95">
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {ATM_SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)} aria-label={`שקופית ${i + 1}`}
            className={`rounded-full transition-all duration-500 ${i === cur ? 'w-7 h-2 bg-[#AD652E]' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`} />
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Food carousel — rectangular cards, infinite wrap, touch-swipe
// ═══════════════════════════════════════════════════════════════════════════
function FoodCarousel() {
  const [idx, setIdx]         = useState(0)
  const [perPage, setPerPage] = useState(4)
  const [cardW, setCardW]     = useState(0)  // 0 = not measured yet
  const [animate, setAnimate] = useState(false)  // false until first measure
  const containerRef = useRef<HTMLDivElement>(null)
  const touchX       = useRef<number | null>(null)

  // Measure container and derive card width
  useLayoutEffect(() => {
    const measure = () => {
      const vw = window.innerWidth
      const pp = vw < 500 ? 2 : vw < 800 ? 3 : 4
      if (containerRef.current) {
        const cw = containerRef.current.offsetWidth
        const w  = (cw - GAP * (pp - 1)) / pp
        setPerPage(pp)
        setCardW(w)
        setAnimate(true)  // enable animation only after we have real dimensions
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Reset to first item (no animation) when layout changes
  const prevPerPage = useRef(perPage)
  useEffect(() => {
    if (prevPerPage.current !== perPage) {
      prevPerPage.current = perPage
      setAnimate(false)
      setIdx(0)
      // Re-enable animation after the instant reset renders
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    }
  }, [perPage])

  const total  = foodItems.length
  const maxIdx = Math.max(0, total - perPage)

  // Navigate — reads current idx directly, NO stale closure, NO side-effects in updater
  const goTo = (next: number) => {
    // Wrap around: instant jump (no animation) then re-enable
    if (next < 0 || next > maxIdx) {
      setAnimate(false)
      setIdx(next < 0 ? maxIdx : 0)
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    } else {
      setAnimate(true)
      setIdx(next)
    }
  }

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchX.current === null) return
    const diff = touchX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) goTo(idx + (diff > 0 ? 1 : -1))
    touchX.current = null
  }

  // Track x: only translate when we have a real card width
  const x = cardW > 0 ? -(idx * (cardW + GAP)) : 0

  return (
    <div className="relative">
      {/* Prev arrow — right side in RTL */}
      <button onClick={() => goTo(idx - 1)} aria-label="הקודם"
        className="absolute right-0 top-[38%] -translate-y-1/2 -translate-x-1 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#1C0A02] hover:bg-[#AD652E] border border-[#AD652E]/40 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95">
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#E4E1D8]" />
      </button>

      {/* Track */}
      <div ref={containerRef} className="overflow-hidden mx-10 sm:mx-11"
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <motion.div className="flex" style={{ gap: GAP, willChange: 'transform' }}
          animate={{ x }}
          transition={{ duration: animate ? 0.52 : 0, ease: EASE }}>
          {foodItems.map((item, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col group"
              style={{ width: cardW > 0 ? cardW : 0 }}>

              {/* Rectangle card */}
              <div className="relative overflow-hidden w-full rounded-xl"
                style={{
                  aspectRatio: '3/4',
                  border: '1.5px solid rgba(173,101,46,0.25)',
                  transition: 'transform .4s cubic-bezier(.25,.46,.45,.94), box-shadow .4s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-5px)'
                  el.style.boxShadow = '0 16px 32px rgba(0,0,0,.55)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = ''
                  el.style.boxShadow = ''
                }}>
                <img src={item.src} alt={item.name} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top,rgba(10,5,2,.6) 0%,transparent 55%)' }} />
              </div>

              {/* Dish name */}
              <p className="mt-2 text-center text-[#C8B89A] font-medium leading-snug px-0.5"
                style={{ fontFamily:"'Frank Ruhl Libre',serif", fontSize:'clamp(.68rem,1.4vw,.82rem)' }}>
                {item.name}
              </p>
              <div className="mt-1 h-px w-0 group-hover:w-7 bg-[#AD652E] mx-auto rounded-full transition-all duration-300" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Next arrow — left side in RTL */}
      <button onClick={() => goTo(idx + 1)} aria-label="הבא"
        className="absolute left-0 top-[38%] -translate-y-1/2 translate-x-1 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#1C0A02] hover:bg-[#AD652E] border border-[#AD652E]/40 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95">
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#E4E1D8]" />
      </button>

      {/* Counter */}
      <p className="text-center text-[#AD652E]/50 text-xs mt-4"
        style={{ fontFamily:"'Assistant',sans-serif" }}>
        {idx + 1}–{Math.min(idx + perPage, total)} / {total}
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Gallery section
// ═══════════════════════════════════════════════════════════════════════════
export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#160C04 0%,#0E0702 100%)' }}>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[#AD652E]/6 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-[#82583B]/6 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 border border-[#AD652E]/45 rounded-full px-4 py-1.5 text-[#AD652E] text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ fontFamily:"'Assistant',sans-serif" }}>
            ✦ &nbsp;גלריה&nbsp; ✦
          </span>
          <h2 className="mb-4"
            style={{ fontFamily:"'Frank Ruhl Libre',serif", fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:700, color:'#E4E1D8' }}>
            הטעמים <span style={{ color:'#AD652E' }}>שלנו</span>
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily:"'Assistant',sans-serif", color:'#A07355' }}>
            כל צלחת היא יצירת אמנות. גלו את עולם הטעמים שיצרנו עבורכם.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Carousel 1 */}
        <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.75, ease: EASE }}
          className="mb-24 sm:mb-28">
          <AtmosphereCarousel />
        </motion.div>

        {/* Carousel 2 */}
        <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.75, ease: EASE }}>

          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 border border-[#AD652E]/45 rounded-full px-4 py-1.5 text-[#AD652E] text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ fontFamily:"'Assistant',sans-serif" }}>
              ✦ &nbsp;התפריט שלנו&nbsp; ✦
            </span>
            <h3 style={{ fontFamily:"'Frank Ruhl Libre',serif", fontSize:'clamp(1.5rem,3.5vw,2.6rem)', fontWeight:700, color:'#E4E1D8' }}>
              מנות <span style={{ color:'#AD652E' }}>מיוחדות</span>
            </h3>
          </div>

          <FoodCarousel />
        </motion.div>

        {/* Ornament */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }} className="flex items-center justify-center gap-3 mt-20">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#82583B]/35" />
          <span className="text-[#AD652E]/60 text-lg select-none">✦</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#82583B]/35" />
        </motion.div>
      </div>
    </section>
  )
}
