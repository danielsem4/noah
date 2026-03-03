import { motion } from "framer-motion";
import { useSectionRefs } from "@/lib/SectionRefsContext";
import logoSrc from "../../assets/logo_transperent.png";

const luxEase = [0.25, 0.46, 0.45, 0.94] as const;

function OrnamentLine() {
  return (
    <div className="flex items-center gap-3 w-full max-w-xs">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#82583B]/40" />
      <span className="text-[#AD652E] text-sm select-none">✦</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#82583B]/40" />
    </div>
  );
}

export default function Hero() {
  const { registerRef, scrollTo } = useSectionRefs();

  return (
    <section
      ref={registerRef("hero")}
      className="relative min-h-screen flex items-center bg-[#E4E1D8] overflow-hidden"
    >
      {/* Subtle paper grain — hidden on mobile for performance */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 hidden sm:block"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Warm amber glow — lower-left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#AD652E]/6 blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
      {/* Truffle glow — upper-right */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#82583B]/5 blur-[80px] pointer-events-none translate-x-1/4 -translate-y-1/4" />

      {/* Dot-grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #82583B 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Vertical accent line */}
      <div className="absolute top-28 right-10 sm:right-20 w-px h-32 bg-gradient-to-b from-transparent via-[#AD652E]/40 to-transparent hidden sm:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-28 sm:py-32">
          {/* Text side */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
            {/* Label chip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: luxEase }}
              className="mb-5"
            ></motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3, ease: luxEase }}
              className="text-[#000000] leading-tight mb-6"
              style={{
                fontFamily: "'Frank Ruhl Libre', Georgia, serif",
                fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              ברוכים הבאים
              <br />
              <span style={{ color: "#AD652E" }}>לבר-מסעדה NOAH</span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.46, ease: luxEase }}
              className="text-[#82583B] text-base sm:text-lg leading-relaxed max-w-md mb-10"
              style={{ fontFamily: "'Assistant', sans-serif" }}
            >
              נח מציג תפריט שף פיוז׳ן חלבי-ישראלי כשר, מגוון יינות, קוקטיילים ייחודיים ואת כל סוגי
              האלכוהול. כאן נאספים טעמים עמוקים, אלכוהול מדויק ורגעים שנוצרים מתוך לבביות, תשומת לב
              והקשבה לפרטים הקטנים. שום דבר אינו מקרי.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.58, ease: luxEase }}
              className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto justify-center lg:justify-end"
            >
              <button
                onClick={() => scrollTo("orders")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-13 px-10 rounded-xl bg-[#935024] text-[#E4E1D8] font-bold text-base hover:bg-[#AD652E] transition-all duration-300 shadow-lg shadow-[#AD652E]/25 hover:shadow-[#AD652E]/40 hover:-translate-y-0.5 active:translate-y-0"
                style={{ fontFamily: "'Assistant', sans-serif" }}
              >
                להזמנת משלוח
              </button>
              <button
                onClick={() => scrollTo("gallery")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-13 px-10 rounded-xl border-2 border-[#82583B]/50 text-[#5F3C20] font-semibold text-base hover:border-[#AD652E] hover:text-[#AD652E] transition-all duration-300"
                style={{ fontFamily: "'Assistant', sans-serif" }}
              >
                הגלריה שלנו
              </button>
            </motion.div>

            {/* Ornament */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.74 }}
              className="mt-10 flex justify-center lg:justify-end w-full"
            >
              <OrnamentLine />
            </motion.div>
          </div>

          {/* ── Logo side ── */}
          <div className="flex items-center justify-center order-first lg:order-last">
            <img
              src={logoSrc}
              alt="קבוצת נח"
              width={320}
              height={320}
              className="w-52 sm:w-64 lg:w-80 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
