import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import WaveDivider from '@/components/ui/WaveDivider'

const quickLinks = [
  { label: 'בית',       href: '#hero'   },
  { label: 'גלריה',     href: '#gallery' },
  { label: 'להזמנות',  href: '#orders'  },
]

const openingHours = [
  { day: 'ראשון – חמישי', hours: '12:00 – 23:00' },
  { day: 'שישי',           hours: '12:00 – 16:00' },
  { day: 'שבת',            hours: '19:00 – 23:30' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-[#AD652E] font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2"
      style={{ fontFamily: "'Assistant', sans-serif" }}
    >
      {children}
    </h3>
  )
}

export default function Footer() {
  const goto = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Wave transition from orders (#E4E1D8) into footer (#5F3C20) */}
      <WaveDivider fill="#5F3C20" bg="#E4E1D8" />

      <footer className="relative bg-[#5F3C20] overflow-hidden" dir="rtl">
        {/* Subtle warm texture overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23AD652E' fill-opacity='1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* ── Brand column ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-13 h-13 rounded-full bg-[#AD652E] flex items-center justify-center shadow-lg shadow-black/30 flex-shrink-0">
                  <span className="text-[#E4E1D8] font-black text-xl" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>נח</span>
                </div>
                <div>
                  <p className="text-[#E4E1D8] font-bold text-lg leading-tight" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
                    קבוצת נח
                  </p>
                  <p className="text-[#AD652E] text-xs font-medium">אירוח בע&quot;מ</p>
                </div>
              </div>
              <p className="text-[#E4E1D8]/65 text-sm leading-relaxed" style={{ fontFamily: "'Assistant', sans-serif" }}>
                חוויה קולינרית ייחודית של טעמים מסורתיים עם נגיעה מודרנית.
                מסעדה, אירועים ושמחות.
              </p>
              {/* Amber thin rule */}
              <div className="mt-6 w-10 h-0.5 bg-[#AD652E]/60 rounded-full" />
            </motion.div>

            {/* ── Address ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <SectionLabel>
                <MapPin className="w-4 h-4 shrink-0" />
                כתובת
              </SectionLabel>
              <address className="not-italic text-[#E4E1D8]/75 text-sm leading-loose" style={{ fontFamily: "'Assistant', sans-serif" }}>
                <p>רחוב הראשי 12</p>
                <p>תל אביב-יפו</p>
                <p className="mt-2 text-[#E4E1D8]/45 text-xs">ניתן לחנות ברחוב החנייה</p>
              </address>
            </motion.div>

            {/* ── Opening hours ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              <SectionLabel>
                <Clock className="w-4 h-4 shrink-0" />
                שעות פתיחה
              </SectionLabel>
              <ul className="space-y-2.5" style={{ fontFamily: "'Assistant', sans-serif" }}>
                {openingHours.map((item) => (
                  <li key={item.day} className="flex justify-between items-center text-sm gap-4">
                    <span className="text-[#E4E1D8]/75">{item.day}</span>
                    <span className="text-[#AD652E] font-medium ltr text-xs tabular-nums">{item.hours}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── Contact + quick links ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <SectionLabel>
                <Phone className="w-4 h-4 shrink-0" />
                צור קשר
              </SectionLabel>
              <div className="space-y-4 mb-7" style={{ fontFamily: "'Assistant', sans-serif" }}>
                <a
                  href="tel:+972549605860"
                  className="flex items-center gap-3 text-[#E4E1D8]/75 hover:text-[#E4E1D8] text-sm transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#AD652E]/20 flex items-center justify-center group-hover:bg-[#AD652E]/40 transition-colors shrink-0">
                    <Phone className="w-3.5 h-3.5 text-[#AD652E]" />
                  </div>
                  <span className="ltr group-hover:text-[#AD652E] transition-colors">054-960-5860</span>
                </a>
                <a
                  href="https://wa.me/972549605860"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#E4E1D8]/75 hover:text-[#E4E1D8] text-sm transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors shrink-0">
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  </div>
                  <span className="group-hover:text-[#25D366] transition-colors">WhatsApp</span>
                </a>
              </div>

              <p className="text-[#AD652E] text-xs uppercase tracking-widest font-semibold mb-3" style={{ fontFamily: "'Assistant', sans-serif" }}>ניווט מהיר</p>
              <ul className="space-y-2" style={{ fontFamily: "'Assistant', sans-serif" }}>
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => goto(link.href)}
                      className="text-[#E4E1D8]/55 hover:text-[#AD652E] text-sm transition-colors bg-transparent border-none cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="mt-12 pt-6 border-t border-[#7A5030]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[#E4E1D8]/40 text-xs" style={{ fontFamily: "'Assistant', sans-serif" }}>
              © {new Date().getFullYear()} קבוצת נח אירוח בע&quot;מ. כל הזכויות שמורות.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#AD652E]/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#AD652E]/70" />
              <span className="w-1 h-1 rounded-full bg-[#AD652E]/50" />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
