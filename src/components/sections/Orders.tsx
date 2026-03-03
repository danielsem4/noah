import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, UtensilsCrossed, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MenuModal from './MenuModal'

export default function Orders() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <section
        id="orders"
        className="relative py-24 sm:py-36 overflow-hidden"
      >
        {/* Deep background */}
        <div className="absolute inset-0 bg-[#0A0703]" />

        {/* Rich layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B1A1A]/15 via-[#0A0703] to-[#C8971A]/8" />

        {/* Decorative large circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#C8971A]/8 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#C8971A]/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#C8971A]/3 blur-[120px] pointer-events-none" />

        {/* Top border gradient */}
        <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#C8971A]/50 to-transparent" />

        {/* Floating stars */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeInOut',
            }}
            className="absolute text-[#C8971A]/30"
            style={{
              top: `${15 + (i * 13) % 70}%`,
              left: `${5 + (i * 17) % 90}%`,
              fontSize: `${10 + (i % 3) * 4}px`,
            }}
          >
            ✦
          </motion.div>
        ))}

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-[#C8971A]/10 border border-[#C8971A]/30 rounded-full px-4 py-1.5 text-[#C8971A] text-sm font-medium">
              <Phone className="w-3.5 h-3.5" />
              הזמנות
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#F5EDD6] leading-tight mb-8"
          >
            רוצים לאכול{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C8971A 0%, #E4B84A 50%, #C8971A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              אצלנו?
            </span>
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="section-divider mb-10"
          />

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-12">

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="tel:+972549605860"
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#1A1108] border border-[#3D2E1A] hover:border-[#C8971A]/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C8971A]/10"
              >
                <div className="w-14 h-14 rounded-full bg-[#C8971A]/10 border border-[#C8971A]/30 flex items-center justify-center group-hover:bg-[#C8971A]/20 transition-colors duration-300">
                  <Phone className="w-6 h-6 text-[#C8971A]" />
                </div>
                <div>
                  <p className="text-[#8A7560] text-xs mb-1">להזמנות חייגו</p>
                  <p className="text-[#F5EDD6] font-bold text-lg ltr">054-960-5860</p>
                </div>
              </a>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="https://wa.me/972549605860"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#1A1108] border border-[#3D2E1A] hover:border-[#25D366]/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#25D366]/10"
              >
                <div className="w-14 h-14 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors duration-300">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <p className="text-[#8A7560] text-xs mb-1">צרו קשר בווצאפ</p>
                  <p className="text-[#F5EDD6] font-bold text-lg ltr">054-960-5860</p>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Stars rating visual */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-1.5 mb-8"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#C8971A] fill-[#C8971A]" />
            ))}
            <span className="text-[#8A7560] text-sm mr-2">מצוין ב-Google</span>
          </motion.div>

          {/* Menu CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-[#8A7560] text-sm mb-2">רוצים לראות מה יש לנו?</p>
            <Button
              size="xl"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-l from-[#C8971A] to-[#E4B84A] hover:from-[#E4B84A] hover:to-[#C8971A] text-[#0F0A07] font-black text-lg rounded-xl shadow-2xl shadow-[#C8971A]/30 hover:shadow-[#C8971A]/50 transition-all duration-300 hover:-translate-y-1 border-0"
            >
              <UtensilsCrossed className="w-6 h-6" />
              תפריט
            </Button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#3D2E1A] to-transparent" />
      </section>

      <MenuModal open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  )
}
