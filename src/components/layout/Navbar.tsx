import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoSrc from "../../assets/logo.jpeg";

const navLinks = [
  { label: "בית", href: "#hero" },
  { label: "גלריה", href: "#gallery" },
  { label: "להזמנות", href: "#orders" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-light shadow-md shadow-[#82583B]/15"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* ── Logo ── */}
            <button
              onClick={() => goto("#hero")}
              className="flex items-center gap-3 cursor-pointer bg-transparent border-none"
            >
              {/* Real logo image */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-md shadow-[#AD652E]/30 flex-shrink-0 border border-[#AD652E]/30">
                <img
                  src={logoSrc}
                  alt=" בר מסעדה - Noah"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:flex flex-col leading-tight text-right">
                <span
                  className="text-[#000000] font-bold text-sm tracking-wide"
                  style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
                >
                  בר מסעדה - Noah
                </span>
              </div>
            </button>

            {/* ── Desktop nav ── */}
            <nav
              className="hidden md:flex items-center gap-10"
              aria-label="ניווט ראשי"
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => goto(link.href)}
                  className="relative text-[#000000] hover:text-[#AD652E] font-medium text-sm transition-colors duration-200 group cursor-pointer bg-transparent border-none"
                  style={{ fontFamily: "'Assistant', sans-serif" }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 right-0 w-0 h-[1.5px] bg-[#AD652E] transition-all duration-300 group-hover:w-full rounded-full" />
                </button>
              ))}
            </nav>

            {/* ── Mobile burger ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#5F3C20] hover:bg-[#AD652E]/10 transition-colors bg-transparent border-none cursor-pointer"
              aria-label={mobileOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-16 sm:top-20 right-0 left-0 z-40 md:hidden shadow-2xl shadow-black/15"
            style={{
              background: "#ffffff",
              borderTop: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {/* Logo in menu */}
            <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-black/8">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-md flex-shrink-0 border border-black/10">
                <img
                  src={logoSrc}
                  alt="קבוצת נח"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col leading-tight text-right">
                <span
                  className="text-black font-bold text-base"
                  style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
                >
                  קבוצת נח
                </span>
                <span className="text-black/50 text-xs font-medium">
                  אירוח בע&quot;מ
                </span>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col py-3 px-4" aria-label="ניווט נייד">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.07,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  onClick={() => goto(link.href)}
                  className="text-right font-semibold text-lg py-3.5 px-3 rounded-xl transition-all duration-200 bg-transparent border-none w-full cursor-pointer"
                  style={{
                    fontFamily: "'Frank Ruhl Libre', serif",
                    color: "#000000",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(173,101,46,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "#AD652E";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "";
                    (e.currentTarget as HTMLElement).style.color = "#000000";
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
