'use client'

import { Cursor } from '@/components/Cursor'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { ValueProp } from '@/components/ValueProp'
import { StickyScroll } from '@/components/StickyScroll'
import { BentoGrid } from '@/components/BentoGrid'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'
import { useTheme } from '@/components/ThemeProvider'

export default function Home() {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen font-body selection:bg-[#D97706] selection:text-white transition-colors duration-700 ${isDark ? 'bg-[#1C1917]' : 'bg-[#F3F0E7]'}`}>
      <Cursor />
      <Navigation />
      <main>
        <Hero />
        <ValueProp />
        <StickyScroll />
        <BentoGrid />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

