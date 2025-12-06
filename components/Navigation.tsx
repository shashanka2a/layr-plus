'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { MagneticButton } from './MagneticButton'

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-body
        ${scrolled 
          ? (isDark ? 'py-4 bg-[#1C1917]/80 backdrop-blur-xl border-b border-[#E7E5E4]/10' : 'py-4 bg-[#F3F0E7]/80 backdrop-blur-xl border-b border-[#1C1917]/5') 
          : 'py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-2xl font-heading font-bold flex items-center gap-2 ${isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'}`}
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${isDark ? 'bg-[#E7E5E4] text-[#1C1917]' : 'bg-[#1C1917] text-[#FAFAF9]'}`}>
              <Layers size={18} strokeWidth={2.5} />
            </div>
            Layr.plus
          </motion.div>

          <div className={`hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
            {['Product', 'Solutions', 'Resources', 'Pricing'].map((item) => (
              <a key={item} href="#" className={`transition-colors relative group ${isDark ? 'hover:text-[#E7E5E4]' : 'hover:text-[#1C1917]'}`}>
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isDark ? 'bg-[#E7E5E4]' : 'bg-[#1C1917]'}`} />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-[#E7E5E4]' : 'hover:bg-black/5 text-[#1C1917]'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <MagneticButton className="px-6 py-2 rounded-full text-sm">
              Get Started
            </MagneticButton>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'} onClick={() => setIsOpen(true)} aria-label="Open menu">
              <Menu strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[60] flex flex-col items-center justify-center font-heading ${isDark ? 'bg-[#1C1917] text-[#E7E5E4]' : 'bg-[#F3F0E7] text-[#1C1917]'}`}
          >
            <button className="absolute top-8 right-8" onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X size={32} strokeWidth={2} />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {['Product', 'Solutions', 'Resources', 'Pricing'].map((item) => (
                <a key={item} href="#" className="text-4xl font-bold hover:opacity-50 transition-opacity">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

