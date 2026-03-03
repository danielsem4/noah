import { Phone, MessageCircle, MapPin, Clock, UtensilsCrossed } from 'lucide-react'
import { motion } from 'framer-motion'

const quickLinks = [
  { label: 'בית', href: '#hero' },
  { label: 'גלריה', href: '#gallery' },
  { label: 'להזמנות', href: '#orders' },
]

const openingHours = [
  { day: 'ראשון – חמישי', hours: '12:00 – 23:00' },
  { day: 'שישי', hours: '12:00 – 16:00' },
  { day: 'שבת', hours: '19:00 – 23:30' },
]

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#0A0703] border-t border-[#3D2E1A] overflow-hidden">
      {/* Decorative gradient top */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#C8971A]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8971A] to-[#8B1A1A] flex items-center justify-center shadow-lg shadow-[#C8971A]/20">
                <UtensilsCrossed className="w-6 h-6 text-[#F5EDD6]" />
              </div>
              <div>
                <p className="text-[#F5EDD6] font-bold text-lg">קבוצת נח</p>
                <p className="text-[#C8971A] text-sm">אירוח בע&quot;מ</p>
              </div>
            </div>
            <p className="text-[#8A7560] text-sm leading-relaxed">
              חוויה קולינרית ייחודית של טעמים מסורתיים עם נגיעה מודרנית.
              מסעדה, אירועים ושמחות.
            </p>
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-[#C8971A] font-semibold text-base mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              כתובת
            </h3>
            <address className="not-italic text-[#C8B896] text-sm leading-relaxed">
              <p>רחוב הראשי 12</p>
              <p>תל אביב-יפו</p>
              <p className="mt-2 text-[#8A7560] text-xs">ניתן לחנות ברחוב החנייה</p>
            </address>
          </motion.div>

          {/* Opening hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-[#C8971A] font-semibold text-base mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              שעות פתיחה
            </h3>
            <ul className="space-y-2">
              {openingHours.map((item) => (
                <li key={item.day} className="flex justify-between text-sm gap-4">
                  <span className="text-[#C8B896]">{item.day}</span>
                  <span className="text-[#8A7560] ltr">{item.hours}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact + Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-[#C8971A] font-semibold text-base mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              צור קשר
            </h3>
            <div className="space-y-3 mb-6">
              <a
                href="tel:+972549605860"
                className="flex items-center gap-2 text-[#C8B896] hover:text-[#F5EDD6] text-sm transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#C8971A] flex-shrink-0" />
                <span className="ltr group-hover:text-[#C8971A] transition-colors">054-960-5860</span>
              </a>
              <a
                href="https://wa.me/972549605860"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#C8B896] hover:text-[#F5EDD6] text-sm transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                <span className="group-hover:text-[#25D366] transition-colors">WhatsApp</span>
              </a>
            </div>

            <h3 className="text-[#C8971A] font-semibold text-sm mb-3">ניווט מהיר</h3>
            <ul className="space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-[#8A7560] hover:text-[#C8971A] text-sm transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#3D2E1A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7560]">
          <p>© {new Date().getFullYear()} קבוצת נח אירוח בע&quot;מ. כל הזכויות שמורות.</p>
          <p className="flex items-center gap-1">
            <span>עוצב ופותח ב</span>
            <span className="text-[#C8971A]">❤</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
