import { createContext, useContext, useRef, useCallback, type ReactNode } from 'react'

type SectionId = 'hero' | 'gallery' | 'orders'

interface SectionRefsValue {
  registerRef: (id: SectionId) => (el: HTMLElement | null) => void
  scrollTo: (id: SectionId) => void
}

const SectionRefsContext = createContext<SectionRefsValue | null>(null)

export function SectionRefsProvider({ children }: { children: ReactNode }) {
  const refs = useRef<Map<SectionId, HTMLElement>>(new Map())

  const registerRef = useCallback((id: SectionId) => {
    return (el: HTMLElement | null) => {
      if (el) {
        refs.current.set(id, el)
      } else {
        refs.current.delete(id)
      }
    }
  }, [])

  const scrollTo = useCallback((id: SectionId) => {
    refs.current.get(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <SectionRefsContext.Provider value={{ registerRef, scrollTo }}>
      {children}
    </SectionRefsContext.Provider>
  )
}

export function useSectionRefs() {
  const ctx = useContext(SectionRefsContext)
  if (!ctx) throw new Error('useSectionRefs must be used within SectionRefsProvider')
  return ctx
}
