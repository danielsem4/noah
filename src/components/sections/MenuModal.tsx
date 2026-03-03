import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import menuData from '@/data/menuData.json'

interface MenuItem {
  name: string
  description: string
  price: number
  notes: string
}

interface MenuCategory {
  category: string
  items: MenuItem[]
}

/* ─── Single menu item row ────────────────────────────────────────────── */
function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <div className="group flex items-start justify-between gap-4 py-3.5 border-b border-[#7A5030]/40 last:border-0 hover:bg-[#7A5030]/20 -mx-3 px-3 rounded-lg transition-colors duration-150">
      <div className="flex-1 min-w-0">
        <p
          className="text-[#E4E1D8] font-semibold text-sm sm:text-[15px] mb-0.5 leading-snug"
          style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
        >
          {item.name}
        </p>
        {item.description && (
          <p
            className="text-[#E4E1D8]/55 text-xs sm:text-sm leading-relaxed"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            {item.description}
          </p>
        )}
        {item.notes && (
          <p
            className="text-[#AD652E]/70 text-xs mt-1 italic"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            ✦ {item.notes}
          </p>
        )}
      </div>
      {/* Price tag */}
      <div className="shrink-0 mt-0.5">
        <span
          className="text-[#AD652E] font-bold text-base sm:text-lg ltr"
          style={{ fontFamily: "'Assistant', sans-serif" }}
        >
          ₪{item.price}
        </span>
      </div>
    </div>
  )
}

/* ─── Collapsible category section ───────────────────────────────────── */
function CategorySection({ category, defaultOpen = false }: { category: MenuCategory; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 py-3 px-4 rounded-xl bg-[#7A5030]/30 hover:bg-[#7A5030]/50 border border-[#7A5030]/50 hover:border-[#AD652E]/50 transition-all duration-200 cursor-pointer text-right"
      >
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#AD652E] shrink-0" />
          <h3
            className="text-[#E4E1D8] font-bold text-sm sm:text-base"
            style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
          >
            {category.category}
          </h3>
          <span
            className="text-[#E4E1D8]/40 text-xs bg-[#7A5030]/60 px-2 py-0.5 rounded-full"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            {category.items.length}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-[#AD652E]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-1 px-1">
              {category.items.map((item) => (
                <MenuItemRow key={item.name} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── The modal itself ────────────────────────────────────────────────── */
interface MenuModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function MenuModal({ open, onOpenChange }: MenuModalProps) {
  const categories = menuData as MenuCategory[]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* DialogContent already has brown (#5F3C20) background from dialog.tsx */}
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] flex flex-col">

        {/* ── Header ── */}
        <div className="shrink-0 relative">
          {/* Warm gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#7A5030]/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#AD652E]/40 to-transparent" />

          <div className="relative z-10 px-6 pt-9 pb-6">
            <DialogHeader>
              {/* Arch ornament above title */}
              <div className="flex justify-center mb-5">
                <div
                  className="w-14 h-16 bg-[#AD652E] flex items-center justify-center shadow-xl shadow-black/30"
                  style={{
                    borderTopLeftRadius: '9999px',
                    borderTopRightRadius: '9999px',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                  }}
                >
                  <span
                    className="text-[#E4E1D8] font-black text-xl"
                    style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
                  >
                    נח
                  </span>
                </div>
              </div>

              <DialogTitle
                className="text-2xl sm:text-3xl font-black text-center text-[#E4E1D8]"
                style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
              >
                התפריט שלנו
              </DialogTitle>
              <DialogDescription className="text-center text-[#E4E1D8]/50 mt-1 text-xs tracking-wide">
                המחירים כוללים מע&quot;מ
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* ── Category quick-scroll tabs ── */}
        <div className="shrink-0 px-4 pb-3 overflow-x-auto border-b border-[#7A5030]/40">
          <div className="flex gap-2 min-w-max py-1">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => {
                  document.getElementById(`mcat-${i}`)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                  })
                }}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-[#7A5030] text-[#E4E1D8]/65 hover:text-[#E4E1D8] hover:border-[#AD652E]/60 hover:bg-[#AD652E]/10 transition-all duration-150 whitespace-nowrap bg-transparent cursor-pointer"
                style={{ fontFamily: "'Assistant', sans-serif" }}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* ── Scrollable menu body ── */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          {categories.map((category, index) => (
            <div id={`mcat-${index}`} key={index}>
              <CategorySection category={category} defaultOpen={index === 0} />
            </div>
          ))}
        </div>

        {/* ── Footer note ── */}
        <div className="shrink-0 border-t border-[#7A5030]/40 px-6 py-4">
          <p
            className="text-[#E4E1D8]/40 text-xs text-center"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            לאלרגיות ובקשות מיוחדות, אנא פנו לצוות השירות שלנו
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
