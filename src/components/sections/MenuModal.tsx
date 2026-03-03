import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UtensilsCrossed, ChevronDown } from 'lucide-react'
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

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group flex items-start justify-between gap-4 py-4 border-b border-[#3D2E1A]/60 last:border-0 hover:bg-[#251A0E]/50 -mx-3 px-3 rounded-lg transition-colors duration-200"
    >
      <div className="flex-1 min-w-0">
        <h4 className="text-[#F5EDD6] font-semibold text-sm sm:text-base mb-0.5">
          {item.name}
        </h4>
        {item.description && (
          <p className="text-[#8A7560] text-xs sm:text-sm leading-relaxed">
            {item.description}
          </p>
        )}
        {item.notes && (
          <p className="text-[#C8971A]/70 text-xs mt-1 italic">* {item.notes}</p>
        )}
      </div>
      <div className="flex-shrink-0 text-left">
        <span className="text-[#C8971A] font-bold text-base sm:text-lg ltr">
          ₪{item.price}
        </span>
      </div>
    </motion.div>
  )
}

function CategorySection({ category }: { category: MenuCategory }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 py-3 px-4 rounded-xl bg-gradient-to-l from-[#8B1A1A]/20 via-[#251A0E] to-[#251A0E] border border-[#3D2E1A] hover:border-[#C8971A]/40 transition-all duration-200 group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#C8971A]" />
          <h3 className="text-[#F5EDD6] font-bold text-base sm:text-lg">{category.category}</h3>
          <span className="text-[#8A7560] text-xs bg-[#3D2E1A] px-2 py-0.5 rounded-full">
            {category.items.length} מנות
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-[#C8971A]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-2 px-1">
              {category.items.map((item) => (
                <MenuItemCard key={item.name} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface MenuModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function MenuModal({ open, onOpenChange }: MenuModalProps) {
  const categories = menuData as MenuCategory[]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] p-0 flex flex-col bg-[#1A1108] border-[#3D2E1A] rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="flex-shrink-0 relative">
          {/* Header background */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#8B1A1A]/60 via-[#251A0E] to-[#251A0E]" />
          <div className="absolute bottom-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#C8971A]/40 to-transparent" />

          <div className="relative z-10 px-6 pt-8 pb-6">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8971A] to-[#8B1A1A] flex items-center justify-center shadow-xl shadow-[#C8971A]/20">
                  <UtensilsCrossed className="w-8 h-8 text-[#F5EDD6]" />
                </div>
              </div>
              <DialogTitle className="text-2xl sm:text-3xl font-black text-center">
                <span className="text-[#F5EDD6]">התפריט </span>
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
              </DialogTitle>
              <DialogDescription className="text-center text-[#8A7560] mt-1">
                המחירים כוללים מע&quot;מ
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex-shrink-0 px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = document.getElementById(`cat-${i}`)
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                }}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-[#3D2E1A] text-[#C8B896] hover:text-[#C8971A] hover:border-[#C8971A]/50 transition-all duration-150 whitespace-nowrap bg-transparent cursor-pointer"
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable menu content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6 space-y-0">
          {categories.map((category, index) => (
            <div id={`cat-${index}`} key={index}>
              <CategorySection category={category} />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="flex-shrink-0 border-t border-[#3D2E1A] px-6 py-4 bg-[#0F0A07]">
          <p className="text-[#8A7560] text-xs text-center">
            לאלרגיות ובקשות מיוחדות, אנא פנו לצוות השירות שלנו
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
