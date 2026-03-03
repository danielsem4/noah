import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { motion, AnimatePresence } from 'framer-motion'
import menuData from '@/data/menuData.json'
import logoSrc from '../../assets/optimized/logo.webp'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

interface MenuItem {
  name: string
  description: string
  price: number
  notes?: string
}

interface MenuCategory {
  category: string
  items: MenuItem[]
}

/* ─── Single item row ─────────────────────────────────────────────────── */
function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-black/7 last:border-0 hover:bg-black/[0.025] -mx-2 px-2 rounded-lg transition-colors duration-150">
      <div className="flex-1 min-w-0">
        <p
          className="text-black font-semibold text-sm sm:text-[15px] mb-0.5 leading-snug"
          style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
        >
          {item.name}
        </p>
        {item.description && (
          <p
            className="text-black/50 text-xs sm:text-sm leading-relaxed"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            {item.description}
          </p>
        )}
        {item.notes && (
          <p
            className="text-[#AD652E]/80 text-xs mt-1 italic"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            ✦ {item.notes}
          </p>
        )}
      </div>
      <span
        className="shrink-0 mt-0.5 text-[#AD652E] font-bold text-base sm:text-lg"
        style={{ fontFamily: "'Assistant', sans-serif" }}
      >
        ₪{item.price}
      </span>
    </div>
  )
}

/* ─── Category block — always visible, no accordion ──────────────────── */
function CategoryBlock({ cat, id }: { cat: MenuCategory; id: string }) {
  return (
    <div id={id} className="mb-7 scroll-mt-4">
      {/* Category heading with amber accent */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-5 bg-[#AD652E] rounded-full shrink-0" />
        <h3
          className="text-black font-bold text-base sm:text-lg"
          style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
        >
          {cat.category}
        </h3>
        <div className="h-px flex-1 bg-black/10" />
        <span
          className="text-black/35 text-xs shrink-0"
          style={{ fontFamily: "'Assistant', sans-serif" }}
        >
          {cat.items.length} מנות
        </span>
      </div>

      {/* Items */}
      <div className="px-1">
        {cat.items.map((item) => (
          <MenuItemRow key={item.name} item={item} />
        ))}
      </div>
    </div>
  )
}

/* ─── Modal ───────────────────────────────────────────────────────────── */
interface MenuModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function MenuModal({ open, onOpenChange }: MenuModalProps) {
  const categories = menuData as MenuCategory[]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] flex flex-col">
        <AnimatePresence>
          {open && (
            <motion.div
              className="flex flex-col h-full overflow-hidden"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              {/* ── Header ── */}
              <div className="shrink-0">
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#AD652E]/30 to-transparent" />

                <div className="px-6 pt-8 pb-5">
                  <DialogHeader>
                    {/* Logo circle */}
                    <motion.div variants={fadeUp} className="flex justify-center mb-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg shadow-black/15 border border-black/10">
                        <img src={logoSrc} alt="קבוצת נח" width={80} height={80} className="w-full h-full object-cover" />
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <DialogTitle
                        className="text-2xl sm:text-3xl font-black text-center text-black"
                        style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
                      >
                        התפריט שלנו
                      </DialogTitle>
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <DialogDescription className="text-center text-black/40 mt-1 text-xs tracking-wide">
                        המחירים כוללים מע&quot;מ
                      </DialogDescription>
                    </motion.div>
                  </DialogHeader>
                </div>
              </div>

              {/* ── Quick-jump tabs ── */}
              <motion.div variants={fadeUp} className="shrink-0 px-4 pb-3 overflow-x-auto border-b border-black/8">
                <div className="flex gap-2 min-w-max py-1">
                  {categories.map((cat, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        document
                          .getElementById(`mcat-${i}`)
                          ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                      }
                      className="px-3 py-1.5 rounded-full text-xs font-medium border border-black/15 text-black/60 hover:text-black hover:border-[#AD652E]/60 hover:bg-[#AD652E]/8 transition-all duration-150 whitespace-nowrap bg-transparent cursor-pointer"
                      style={{ fontFamily: "'Assistant', sans-serif" }}
                    >
                      {cat.category}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* ── Scrollable body — all categories always visible ── */}
              <motion.div variants={fadeUp} className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
                {categories.map((cat, i) => (
                  <CategoryBlock key={i} cat={cat} id={`mcat-${i}`} />
                ))}
              </motion.div>

              {/* ── Footer ── */}
              <motion.div variants={fadeUp} className="shrink-0 border-t border-black/8 px-6 py-4">
                <p
                  className="text-black/35 text-xs text-center"
                  style={{ fontFamily: "'Assistant', sans-serif" }}
                >
                  לאלרגיות ובקשות מיוחדות, אנא פנו לצוות השירות שלנו
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
