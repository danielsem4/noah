import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

// ── Food images — lazy loaded ───────────────────────────────────────────
const _glob = import.meta.glob<string>(
  ['../../assets/optimized/carosuelFood/*.webp'],
  { eager: false, import: 'default' }
)

const foodEntries = Object.entries(_glob)
  .map(([path, loader]) => ({
    loader,
    name: decodeURIComponent(path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? ''),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'he'))

interface FoodItem {
  src: string
  name: string
}

export default function FoodGallery() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [slidesInView, setSlidesInView] = useState(0)
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])

  // Load food images lazily
  useEffect(() => {
    Promise.all(
      foodEntries.map(async (entry) => {
        const src = (await entry.loader()) as string
        return { src, name: entry.name }
      })
    ).then(setFoodItems)
  }, [])

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setSlidesInView(api.slidesInView().length)
    onSelect()

    api.on('select', onSelect)
    api.on('reInit', () => {
      setCount(api.scrollSnapList().length)
      setSlidesInView(api.slidesInView().length)
      onSelect()
    })

    return () => {
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  if (foodItems.length === 0) {
    return (
      <div className="flex justify-center items-center py-12" style={{ minHeight: '300px' }}>
        <div className="w-8 h-8 border-2 border-[#AD652E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const visibleEnd = Math.min(current + slidesInView, foodItems.length)

  return (
    <div className="relative">
      {/* Prev button (right side in RTL) */}
      <button
        onClick={() => api?.scrollPrev()}
        aria-label="הקודם"
        className="absolute right-0 top-[38%] -translate-y-1/2 -translate-x-1 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#1C0A02] hover:bg-[#AD652E] border border-[#AD652E]/40 shadow-lg transition-[background-color,transform,box-shadow] duration-300 hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-5 h-5 text-[#E4E1D8]" />
      </button>

      <div className="mx-10 sm:mx-11">
        <Carousel
          setApi={setApi}
          opts={{ loop: true, direction: 'rtl', align: 'start' }}
        >
          <CarouselContent className="-ml-3.5">
            {foodItems.map((item, i) => (
              <CarouselItem
                key={i}
                className="pl-3.5 basis-1/2 sm:basis-1/3 lg:basis-1/4"
              >
                <div className="flex flex-col group">
                  <div
                    className="relative overflow-hidden w-full rounded-xl transition-transform duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)] hover:-translate-y-[5px] hover:shadow-[0_16px_32px_rgba(0,0,0,.55)]"
                    style={{
                      aspectRatio: '3/4',
                      border: '1.5px solid rgba(173,101,46,0.25)',
                      willChange: 'transform',
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      loading="lazy"
                      width={600}
                      height={800}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ willChange: 'transform' }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to top,rgba(10,5,2,.6) 0%,transparent 55%)' }}
                    />
                  </div>

                  <p
                    className="mt-2 text-center text-[#C8B89A] font-medium leading-snug px-0.5"
                    style={{
                      fontFamily: "'Frank Ruhl Libre',serif",
                      fontSize: 'clamp(.68rem,1.4vw,.82rem)',
                    }}
                  >
                    {item.name}
                  </p>
                  <div className="mt-1 h-px w-7 bg-[#AD652E] mx-auto rounded-full transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-center" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Next button (left side in RTL) */}
      <button
        onClick={() => api?.scrollNext()}
        aria-label="הבא"
        className="absolute left-0 top-[38%] -translate-y-1/2 translate-x-1 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#1C0A02] hover:bg-[#AD652E] border border-[#AD652E]/40 shadow-lg transition-[background-color,transform,box-shadow] duration-300 hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5 text-[#E4E1D8]" />
      </button>

      {/* Counter */}
      {count > 0 && (
        <p
          className="text-center text-[#AD652E]/80 text-xs mt-4"
          style={{ fontFamily: "'Assistant',sans-serif" }}
        >
          {current + 1}–{visibleEnd} / {foodItems.length}
        </p>
      )}
    </div>
  )
}
