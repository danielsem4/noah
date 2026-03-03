import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, UtensilsCrossed, Star } from 'lucide-react'
import WaveDivider from '@/components/ui/WaveDivider'
import MenuModal from './MenuModal'

/* ── Contact card ─────────────────────────────────────────────────────── */
function ContactCard({
  href,
  icon,
  label,
  number,
  iconColor,
  target,
}: {
  href: string
  icon: React.ReactNode
  label: string
  number: string
  iconColor: string
  target?: string
}) {
  return (
    <a
      href={href}
      target={target}
      rel={target ? 'noopener noreferrer' : undefined}
      className="group flex flex-col items-center gap-4 p-7 rounded-2xl bg-[#E4E1D8] border border-[#82583B]/20 hover:border-[#AD652E]/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#82583B]/15"
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${iconColor} group-hover:scale-110`}
      >
        {icon}
      </div>
      <div className="text-center">
        <p
          className="text-[#82583B] text-xs mb-1 font-medium"
          style={{ fontFamily: "'Assistant', sans-serif" }}
        >
          {label}
        </p>
        <p
          className="text-[#000000] font-bold text-lg ltr"
          style={{ fontFamily: "'Assistant', sans-serif" }}
        >
          {number}
        </p>
      </div>
    </a>
  )
}

export default function Orders() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* ── Wave divider from Gallery (#E4E1D8) into Orders (#D4CFC5) ── */}
      <WaveDivider fill="#D4CFC5" bg="#E4E1D8" />

      <section
        id="orders"
        className="relative py-24 sm:py-36 bg-[#D4CFC5] overflow-hidden"
      >
        {/* Subtle warm grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Amber glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#AD652E]/8 blur-[120px] pointer-events-none" />

        {/* Decorative concentric arcs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#AD652E]/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#82583B]/8 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span
              className="inline-flex items-center gap-2 border border-[#AD652E]/40 rounded-full px-4 py-1.5 text-[#AD652E] text-xs font-semibold tracking-widest uppercase"
              style={{ fontFamily: "'Assistant', sans-serif" }}
            >
              ✦ &nbsp;הזמנות&nbsp; ✦
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-[#000000] leading-tight mb-5"
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              fontWeight: 700,
            }}
          >
            רוצים לאכול{' '}
            <span style={{ color: '#AD652E' }}>אצלנו?</span>
          </motion.h2>

          {/* Sub-heading */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#82583B] text-base sm:text-lg mb-3"
            style={{ fontFamily: "'Assistant', sans-serif" }}
          >
            להזמנות חייגו למספר
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="section-divider mb-12"
          />

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <ContactCard
                href="tel:+972549605860"
                icon={<Phone className="w-6 h-6 text-[#AD652E]" />}
                iconColor="bg-[#AD652E]/10 border-[#AD652E]/25 group-hover:bg-[#AD652E]/20"
                label="להזמנות חייגו"
                number="054-960-5860"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.4 }}
            >
              <ContactCard
                href="https://wa.me/972549605860"
                icon={<MessageCircle className="w-6 h-6 text-[#25D366]" />}
                iconColor="bg-[#25D366]/10 border-[#25D366]/25 group-hover:bg-[#25D366]/20"
                label="צרו קשר בווצאפ"
                number="054-960-5860"
                target="_blank"
              />
            </motion.div>
          </div>

          {/* Star rating */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-1.5 mb-10"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#AD652E] fill-[#AD652E]" />
            ))}
            <span
              className="text-[#82583B] text-sm mr-2"
              style={{ fontFamily: "'Assistant', sans-serif" }}
            >
              מצוין ב-Google
            </span>
          </motion.div>

          {/* Menu CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <p
              className="text-[#82583B] text-sm mb-2"
              style={{ fontFamily: "'Assistant', sans-serif" }}
            >
              רוצים לראות מה יש לנו?
            </p>
            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center justify-center gap-3 h-14 px-12 rounded-xl bg-[#5F3C20] text-[#E4E1D8] font-bold text-lg hover:bg-[#82583B] transition-all duration-250 shadow-xl shadow-[#5F3C20]/30 hover:shadow-[#5F3C20]/50 hover:-translate-y-1 active:translate-y-0"
              style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
            >
              <UtensilsCrossed className="w-5 h-5" />
              תפריט
            </button>
          </motion.div>
        </div>
      </section>

      <MenuModal open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  )
}
