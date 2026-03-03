import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Gallery from '@/components/sections/Gallery'
import Orders from '@/components/sections/Orders'

export default function App() {
  return (
    <div className="min-h-screen bg-[#E4E1D8] text-[#000000]" dir="rtl">
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <Orders />
      </main>
      <Footer />
    </div>
  )
}
