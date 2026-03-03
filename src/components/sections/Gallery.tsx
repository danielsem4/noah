import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

// Placeholder gradient images since actual assets may not be present
// Each entry has a label and a gradient for visual variety
const galleryItems = [
  {
    id: 1,
    label: 'מנות ראשונות',
    gradient: 'from-[#8B1A1A] via-[#C8971A]/30 to-[#2E2010]',
    src: new URL('../../assets/carousel/1.svg', import.meta.url).href,
    emoji: '🥗',
  },
  {
    id: 2,
    label: 'גריל טרי',
    gradient: 'from-[#5C0F0F] via-[#8B1A1A]/40 to-[#251A0E]',
    src: new URL('../../assets/carousel/2.svg', import.meta.url).href,
    emoji: '🔥',
  },
  {
    id: 3,
    label: 'מנות עיקריות',
    gradient: 'from-[#9A6F10] via-[#C8971A]/20 to-[#1A1108]',
    src: new URL('../../assets/carousel/3.svg', import.meta.url).href,
    emoji: '🍖',
  },
  {
    id: 4,
    label: 'קינוחים',
    gradient: 'from-[#2E2010] via-[#C8971A]/15 to-[#8B1A1A]/30',
    src: new URL('../../assets/carousel/4.svg', import.meta.url).href,
    emoji: '🍮',
  },
  {
    id: 5,
    label: 'אווירת המסעדה',
    gradient: 'from-[#1A1108] via-[#8B1A1A]/20 to-[#C8971A]/20',
    src: new URL('../../assets/carousel/5.svg', import.meta.url).href,
    emoji: '✨',
  },
]

function GalleryCard({
  item,
  index,
}: {
  item: (typeof galleryItems)[0]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className="group relative overflow-hidden rounded-2xl bg-[#1A1108] border border-[#3D2E1A] cursor-pointer"
    >
      {/* Image with fallback gradient */}
      <div className="relative overflow-hidden aspect-square sm:aspect-[4/3]">
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            // Hide broken image and show gradient fallback
            const target = e.currentTarget as HTMLImageElement
            target.style.display = 'none'
            const fallback = target.nextElementSibling as HTMLElement
            if (fallback) fallback.style.display = 'flex'
          }}
        />
        {/* Gradient fallback */}
        <div
          className={`hidden w-full h-full absolute inset-0 bg-gradient-to-br ${item.gradient} items-center justify-center`}
        >
          <span className="text-5xl sm:text-6xl select-none">{item.emoji}</span>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A07]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Label */}
      <div className="p-4">
        <p className="text-[#F5EDD6] font-semibold text-sm">{item.label}</p>
        <div className="mt-1.5 h-0.5 w-0 bg-gradient-to-l from-[#C8971A] to-[#E4B84A] transition-all duration-300 group-hover:w-full rounded-full" />
      </div>

      {/* Corner accent */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-[#C8971A]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Camera className="w-3.5 h-3.5 text-[#C8971A]" />
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 bg-[#0F0A07] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#3D2E1A] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0703] via-[#0F0A07] to-[#0A0703]" />
      <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-[#8B1A1A]/6 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-[#C8971A]/10 border border-[#C8971A]/30 rounded-full px-4 py-1.5 text-[#C8971A] text-sm font-medium mb-4">
            <Camera className="w-3.5 h-3.5" />
            גלריה
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5EDD6] mb-4">
            הטעמים{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C8971A 0%, #E4B84A 50%, #C8971A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              שלנו
            </span>
          </h2>
          <p className="text-[#8A7560] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            כל צלחת היא יצירת אמנות. גלו את עולם הטעמים שיצרנו עבורכם.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Grid — masonry-like layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={
                /* Make item 1 and 4 span 2 columns on lg for visual variety */
                index === 0
                  ? 'lg:col-span-2 lg:row-span-1'
                  : index === 3
                    ? 'sm:col-span-2 lg:col-span-1'
                    : ''
              }
            >
              <GalleryCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#3D2E1A] to-transparent" />
    </section>
  )
}
