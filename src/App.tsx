import { lazy, Suspense } from "react";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { SectionRefsProvider } from "@/lib/SectionRefsContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FloatingWhatsApp from "./components/whatsapp/FloatingWhatsapp";

const Gallery = lazy(() => import("@/components/sections/Gallery"));
const Orders = lazy(() => import("@/components/sections/Orders"));

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <SectionRefsProvider>
        <div className="min-h-screen bg-[#E4E1D8] text-[#000000]" dir="rtl">
          <Navbar />
          <main>
            <Hero />
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <Gallery />
            </Suspense>
            <Suspense fallback={<div className="min-h-[40vh]" />}>
              <Orders />
            </Suspense>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </SectionRefsProvider>
    </MotionConfig>
    </LazyMotion>
  );
}
