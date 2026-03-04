import { m } from 'framer-motion'
import { useSectionRefs } from '@/lib/SectionRefsContext'
import AtmosphereGallery from './AtmosphereGallery'
import FoodGallery from './FoodGallery'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export default function Gallery() {
  const { registerRef } = useSectionRefs()

  return (
    <section ref={registerRef('gallery')} className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#160C04 0%,#0E0702 100%)' }}>

      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[#AD652E]/6 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-[#82583B]/6 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
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
        </m.div>

        {/* Atmosphere Carousel */}
        <m.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.75, ease: EASE }}
          className="mb-24 sm:mb-28">
          <AtmosphereGallery />
        </m.div>

        {/* Food Carousel */}
        <m.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
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

          <FoodGallery />
        </m.div>

        {/* Ornament */}
        <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }} className="flex items-center justify-center gap-3 mt-20">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#82583B]/35" />
          <span className="text-[#AD652E]/60 text-lg select-none">✦</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#82583B]/35" />
        </m.div>
      </div>
    </section>
  )
}
