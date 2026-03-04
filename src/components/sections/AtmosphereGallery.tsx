import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

import c1 from '../../assets/optimized/carousel/carusale_1.webp'
import c2 from '../../assets/optimized/carousel/carusale_2.webp'
import c3 from '../../assets/optimized/carousel/carusale_3.webp'
import c4 from '../../assets/optimized/carousel/carusale_4.webp'
import c5 from '../../assets/optimized/carousel/carusale_5.webp'
import c1s from '../../assets/optimized/carousel/carusale_1-600w.webp'
import c2s from '../../assets/optimized/carousel/carusale_2-600w.webp'
import c3s from '../../assets/optimized/carousel/carusale_3-600w.webp'
import c4s from '../../assets/optimized/carousel/carusale_4-600w.webp'
import c5s from '../../assets/optimized/carousel/carusale_5-600w.webp'

const ATM_SLIDES = [
  { src: c1, srcSmall: c1s, label: 'אווירה ייחודית' },
  { src: c2, srcSmall: c2s, label: 'קבוצת נח' },
  { src: c3, srcSmall: c3s, label: 'חוויה קולינרית' },
  { src: c4, srcSmall: c4s, label: 'מנות מיוחדות' },
  { src: c5, srcSmall: c5s, label: 'רגעים בלתי נשכחים' },
]

export default function AtmosphereGallery() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [showLabel, setShowLabel] = useState(true)

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return
    onSelect()
    api.on('select', onSelect)
    return () => { api.off('select', onSelect) }
  }, [api, onSelect])

  useEffect(() => {
    setShowLabel(false)
    const timer = setTimeout(() => setShowLabel(true), 50)
    return () => clearTimeout(timer)
  }, [current])

  const goTo = useCallback((index: number) => {
    api?.scrollTo(index)
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true, direction: 'rtl' }}
      plugins={[Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })]}
      className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/40"
    >
      <div style={{ height: 'clamp(220px, 44vw, 520px)' }} className="relative">
        <CarouselContent className="ml-0 h-full">
          {ATM_SLIDES.map((slide, i) => (
            <CarouselItem key={i} className="pl-0 relative h-full">
              <img
                src={slide.src}
                srcSet={`${slide.srcSmall} 600w, ${slide.src} 1200w`}
                sizes="(max-width: 640px) 100vw, 1200px"
                alt={slide.label}
                width={1200}
                height={800}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: 'linear-gradient(to top,rgba(10,5,2,.82) 0%,rgba(10,5,2,.14) 55%,transparent 100%)' }}
        />

        {/* Slide label */}
        <div
          className={`absolute bottom-12 sm:bottom-14 right-5 sm:right-10 z-10 motion-safe:transition-[opacity,transform] motion-safe:ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            showLabel
              ? 'opacity-100 translate-y-0 motion-safe:duration-[550ms] motion-safe:delay-[320ms]'
              : 'opacity-0 translate-y-4 duration-0'
          }`}
        >
          <p
            className="text-[#E4E1D8] font-bold"
            style={{
              fontFamily: "'Frank Ruhl Libre',serif",
              fontSize: 'clamp(1.1rem,2.8vw,2rem)',
              textShadow: '0 2px 24px rgba(0,0,0,.6)',
            }}
          >
            {ATM_SLIDES[current].label}
          </p>
          <div className="mt-2 w-9 h-0.5 bg-[#AD652E] rounded-full" />
        </div>

        {/* Prev (right side in RTL) */}
        <button
          onClick={() => api?.scrollPrev()}
          aria-label="הקודם"
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-white/20 hover:border-[#AD652E]/70 bg-black/25 hover:bg-[#AD652E]/70 backdrop-blur-sm transition-[background-color,transform,border-color] duration-300 hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Next (left side in RTL) */}
        <button
          onClick={() => api?.scrollNext()}
          aria-label="הבא"
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-white/20 hover:border-[#AD652E]/70 bg-black/25 hover:bg-[#AD652E]/70 backdrop-blur-sm transition-[background-color,transform,border-color] duration-300 hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0 z-20">
          {ATM_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`שקופית ${i + 1}`}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2"
            >
              <span
                className={`block h-2 w-7 rounded-full transition-[transform,background-color] duration-500 origin-left ${
                  i === current ? 'bg-[#AD652E]' : 'bg-white/40 hover:bg-white/70'
                }`}
                style={{ transform: i === current ? 'scaleX(1)' : 'scaleX(0.286)' }}
              />
            </button>
          ))}
        </div>
      </div>
    </Carousel>
  )
}
