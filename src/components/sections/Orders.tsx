import { useState } from "react";
import { motion } from "framer-motion";
import { useSectionRefs } from "@/lib/SectionRefsContext";
import { Phone, UtensilsCrossed, Star } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <path
        d="M34.5 13.5C32.1 11.1 28.9 9.8 25.5 9.8C18.5 9.8 12.8 15.5 12.8 22.5C12.8 24.8 13.4 27 14.6 29L12.5 36.5L20.2 34.4C22.2 35.5 24.3 36.1 26.5 36.1C33.5 36.1 39.2 30.4 39.2 23.4C39.2 20 37.9 16.8 35.5 14.4L34.5 13.5ZM26.5 33.8C24.5 33.8 22.6 33.2 20.9 32.2L20.5 31.9L16 33.1L17.2 28.7L16.9 28.3C15.8 26.5 15.2 24.5 15.2 22.4C15.2 16.8 19.8 12.2 25.5 12.2C28.3 12.2 30.9 13.3 32.9 15.3C34.9 17.3 36 19.9 36 22.7C36 28.4 31.2 33.8 26.5 33.8ZM31.2 25C30.9 24.8 29.4 24.1 29.1 24C28.8 23.9 28.6 23.8 28.4 24.1C28.2 24.4 27.6 25 27.4 25.3C27.2 25.5 27.1 25.6 26.8 25.4C26.5 25.2 25.5 24.9 24.3 23.8C23.4 23 22.8 22 22.6 21.7C22.4 21.4 22.6 21.2 22.8 21C22.9 20.9 23.1 20.7 23.3 20.5C23.4 20.3 23.5 20.2 23.6 20C23.7 19.8 23.7 19.6 23.6 19.4C23.5 19.2 22.9 17.7 22.6 17.1C22.4 16.5 22.1 16.6 21.9 16.6H21.4C21.2 16.6 20.8 16.7 20.5 17C20.2 17.3 19.4 18 19.4 19.5C19.4 21 20.5 22.4 20.7 22.7C20.9 22.9 22.8 25.9 25.8 27.2C26.5 27.5 27.1 27.7 27.5 27.8C28.2 28 28.9 28 29.4 27.9C30 27.8 31.2 27.2 31.5 26.5C31.8 25.8 31.8 25.2 31.7 25.1L31.2 25Z"
        fill="white"
      />
    </svg>
  );
}
import WaveDivider from "@/components/ui/WaveDivider";
import MenuModal from "./MenuModal";

/* ── Contact card ─────────────────────────────────────────────────────── */
function ContactCard({
  href,
  icon,
  label,
  number,
  iconColor,
  target,
  ariaLabel,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  number: string;
  iconColor: string;
  target?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={target ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
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
  );
}

export default function Orders() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { registerRef } = useSectionRefs();

  return (
    <>
      {/* ── Wave divider from Gallery (#E4E1D8) into Orders (#D4CFC5) ── */}
      <WaveDivider fill="#D4CFC5" bg="#E4E1D8" />

      <section ref={registerRef("orders")} className="relative py-24 sm:py-36 bg-[#D4CFC5] overflow-hidden">
        {/* Subtle warm grain — hidden on mobile for performance */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 hidden sm:block"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
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
              className="inline-flex items-center gap-2 border border-[#7A4A2D]/40 rounded-full px-4 py-1.5 text-[#7A4A2D] text-xs font-semibold tracking-widest uppercase"
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
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-[#000000] leading-tight mb-5"
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              fontWeight: 700,
            }}
          >
            להזמנת משלוח
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-[#000000] leading-tight mb-5"
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              fontWeight: 700,
            }}
          >
            <span style={{ color: "#82583B" }}>חייגו או צרו קשר בווצאפ</span>
          </motion.h2>
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
                label=""
                number="054-960-5860"
                ariaLabel="התקשרו אלינו 054-960-5860"
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
                icon={<WhatsAppIcon className="w-7 h-7" />}
                iconColor="bg-[#25D366]/10 border-[#25D366]/25 group-hover:bg-[#25D366]/20"
                label=""
                number="054-960-5860"
                target="_blank"
                ariaLabel="שלחו הודעה בווטסאפ 054-960-5860"
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
              className="text-[#6B4A30] text-sm mr-2"
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
              className="text-[#6B4A30] text-sm mb-2"
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
  );
}
