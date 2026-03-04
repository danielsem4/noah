import { useState, useSyncExternalStore } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSectionRefs } from "@/lib/SectionRefsContext";

type SectionId = "hero" | "gallery" | "orders";

const navLinks: { label: string; id: SectionId }[] = [
  { label: "בית", id: "hero" },
  { label: "גלריה", id: "gallery" },
  { label: "להזמנות", id: "orders" },
];

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}

function getScrollSnapshot() {
  return window.scrollY > 40;
}

function getServerSnapshot() {
  return false;
}

export default function Navbar() {
  const scrolled = useSyncExternalStore(subscribeScroll, getScrollSnapshot, getServerSnapshot);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollTo } = useSectionRefs();

  const goto = (id: SectionId) => {
    setMobileOpen(false);
    scrollTo(id);
  };

  return (
    <>
      <m.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 right-0 left-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? "glass-light shadow-md shadow-[#82583B]/15"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* ── Logo ── */}
            <button
              onClick={() => goto("hero")}
              aria-label="דף הבית"
              className="flex items-center gap-3 cursor-pointer bg-transparent border-none"
            >

              <div className="hidden sm:flex flex-col leading-tight text-right">
                <span
                  className="text-[#000000] font-bold text-base tracking-wide"
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
                  key={link.id}
                  onClick={() => goto(link.id)}
                  className="relative text-[#000000] hover:text-[#AD652E] font-medium text-base transition-colors duration-200 group cursor-pointer bg-transparent border-none"
                  style={{ fontFamily: "'Assistant', sans-serif" }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 right-0 w-0 h-[1.5px] bg-[#AD652E] transition-[width] duration-300 group-hover:w-full rounded-full" />
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
      </m.header>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-16 sm:top-20 right-0 left-0 z-40 md:hidden shadow-2xl shadow-black/15"
            style={{
              background: "#E4E1D8",
              borderTop: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {/* Nav links */}
            <nav className="flex flex-col py-3 px-4" aria-label="ניווט נייד">
              {navLinks.map((link, i) => (
                <m.button
                  key={link.id}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.07,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  onClick={() => goto(link.id)}
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
                </m.button>
              ))}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
