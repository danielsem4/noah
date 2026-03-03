import { motion } from 'framer-motion'

const galleryItems = [
  {
    id: 1,
    label: 'מנות ראשונות',
    sub: 'ממרחים וסלטים',
    src: new URL('../../assets/carousel/1.svg', import.meta.url).href,
    fallbackBg: 'linear-gradient(160deg, #82583B 0%, #AD652E 60%, #5F3C20 100%)',
    emoji: '🥗',
  },
  {
    id: 2,
    label: 'גריל טרי',
    sub: 'מהאש אל השולחן',
    src: new URL('../../assets/carousel/2.svg', import.meta.url).href,
    fallbackBg: 'linear-gradient(160deg, #5F3C20 0%, #AD652E 60%, #82583B 100%)',
    emoji: '🔥',
  },
  {
    id: 3,
    label: 'מנות עיקריות',
    sub: 'בשר, עוף ודגים',
    src: new URL('../../assets/carousel/3.svg', import.meta.url).href,
    fallbackBg: 'linear-gradient(160deg, #AD652E 0%, #5F3C20 60%, #82583B 100%)',
    emoji: '🍖',
  },
  {
    id: 4,
    label: 'קינוחים',
    sub: 'המתקת הסיום',
    src: new URL('../../assets/carousel/4.svg', import.meta.url).href,
    fallbackBg: 'linear-gradient(160deg, #82583B 0%, #5F3C20 60%, #AD652E 100%)',
    emoji: '🍮',
  },
  {
    id: 5,
    label: 'אווירה',
    sub: 'חמימות וקסם',
    src: new URL('../../assets/carousel/5.svg', import.meta.url).href,
    fallbackBg: 'linear-gradient(160deg, #5F3C20 0%, #82583B 60%, #AD652E 100%)',
    emoji: '✨',
  },
]

/** Individual arch-shaped gallery card */
function ArchCard({
  item,
  index,
  featured = false,
}: {
  item: (typeof galleryItems)[0]
  index: number
  featured?: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: 'easeOut' }}
      className="group flex flex-col items-center"
    >
      {/* ── Arch image container ── */}
      <div
        className={`relative overflow-hidden w-full transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#82583B]/25 group-hover:-translate-y-2 ${
          featured ? 'max-w-[240px] sm:max-w-[280px]' : 'max-w-[200px] sm:max-w-[220px]'
        }`}
        style={{
          /* Classic arch: semicircle top, flat-ish bottom */
          borderTopLeftRadius: '9999px',
          borderTopRightRadius: '9999px',
          borderBottomLeftRadius: '14px',
          borderBottomRightRadius: '14px',
          aspectRatio: featured ? '3/4' : '3/4',
          border: '2px solid rgba(130,88,59,0.25)',
        }}
      >
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement
            img.style.display = 'none'
            const fallback = img.nextElementSibling as HTMLElement
            if (fallback) fallback.style.display = 'flex'
          }}
        />
        {/* Gradient fallback */}
        <div
          className="hidden w-full h-full absolute inset-0 items-center justify-center"
          style={{ background: item.fallbackBg }}
        >
          <span className="text-4xl sm:text-5xl select-none drop-shadow-sm">{item.emoji}</span>
        </div>

        {/* Hover overlay — softened amber tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#5F3C20]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Hover label inside arch */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span
            className="bg-[#E4E1D8]/90 text-[#5F3C20] text-xs font-bold px-3 py-1 rounded-full tracking-wide backdrop-blur-sm"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            {item.sub}
          </span>
        </div>
      </div>

      {/* ── Card label below the arch ── */}
      <div className="mt-4 text-center">
        <p
          className="text-[#000000] font-semibold text-base"
          style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
        >
          {item.label}
        </p>
        {/* Thin amber underline that expands on hover */}
        <div className="mt-1.5 h-[1.5px] w-0 bg-[#AD652E] mx-auto rounded-full transition-all duration-400 group-hover:w-10" />
      </div>
    </motion.article>
  )
}

export default function Gallery() {
  const featured = galleryItems[0]
  const rest     = galleryItems.slice(1)

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 bg-[#E4E1D8] overflow-hidden"
    >
      {/* Subtle warm glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-8 w-72 h-72 rounded-full bg-[#AD652E]/5 blur-[70px]" />
        <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full bg-[#82583B]/5 blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span
            className="inline-flex items-center gap-2 border border-[#AD652E]/40 rounded-full px-4 py-1.5 text-[#AD652E] text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            ✦ &nbsp;גלריה&nbsp; ✦
          </span>
          <h2
            className="text-[#000000] mb-4"
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
            }}
          >
            הטעמים{' '}
            <span style={{ color: '#AD652E' }}>שלנו</span>
          </h2>
          <p
            className="text-[#82583B] text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            כל צלחת היא יצירת אמנות. גלו את עולם הטעמים שיצרנו עבורכם.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* ── Arch-gallery layout ──
            Desktop: featured arch (larger) centred, others flanking
            Mobile: 2-column grid of arches
        ── */}
        <div className="flex flex-col items-center gap-12">

          {/* Top row: featured + 2 flanking arches on desktop */}
          <div className="w-full flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16 items-end">
            {/* Left flanker (index 1) */}
            <div className="hidden sm:block">
              <ArchCard item={rest[0]} index={1} />
            </div>

            {/* Featured (larger) */}
            <ArchCard item={featured} index={0} featured />

            {/* Right flanker (index 2) */}
            <div className="hidden sm:block">
              <ArchCard item={rest[1]} index={2} />
            </div>

            {/* Mobile: show index 1 and 2 in row */}
            <div className="sm:hidden flex gap-6">
              <ArchCard item={rest[0]} index={1} />
              <ArchCard item={rest[1]} index={2} />
            </div>
          </div>

          {/* Bottom row: remaining 2 arches */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-20">
            <ArchCard item={rest[2]} index={3} />
            <ArchCard item={rest[3]} index={4} />
          </div>
        </div>

        {/* ── Decorative bottom ornament ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mt-16"
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#82583B]/30" />
          <span className="text-[#AD652E]/50 text-lg select-none">✦</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#82583B]/30" />
        </motion.div>
      </div>
    </section>
  )
}
