'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export const StickyScroll = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { isDark } = useTheme()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  })

  const [activeCard, setActiveCard] = useState(0)
  const cards = [
    {
      title: 'Real-time Collaboration',
      desc: 'Work together with your team in real-time. See cursors, leave comments, and resolve conflicts instantly.',
      gradientDark: 'from-[#D97706] to-[#B45309]',
      gradientLight: 'from-[#FEF3C7] to-[#FDE68A]',
    },
    {
      title: 'AI-Powered Assistance',
      desc: 'Layr\'s AI understands your design system. Ask it to generate components or refactor layouts.',
      gradientDark: 'from-[#BE123C] to-[#9F1239]',
      gradientLight: 'from-[#FFE4E6] to-[#FECDD3]',
    },
    {
      title: 'Universal Export',
      desc: 'Don\'t get locked in. Export your project to React, Vue, Svelte, or plain HTML/CSS.',
      gradientDark: 'from-[#0F766E] to-[#0D9488]',
      gradientLight: 'from-[#CCFBF1] to-[#99F6E4]',
    }
  ]

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const cardIndex = Math.min(
        cards.length - 1,
        Math.floor(latest * cards.length)
      )
      setActiveCard(cardIndex)
    })
    return () => unsubscribe()
  }, [scrollYProgress, cards.length])

  return (
    <section ref={ref} className={`h-[300vh] transition-colors duration-700 relative ${isDark ? 'bg-[#1C1917] text-[#E7E5E4]' : 'bg-[#F3F0E7] text-[#1C1917]'}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-20 items-center">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 z-10 font-body">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeCard === index ? 1 : 0.2,
                  y: activeCard === index ? 0 : 20,
                  filter: activeCard === index ? 'blur(0px)' : 'blur(2px)'
                }}
                className={`transition-all duration-500 ${activeCard === index ? 'block' : 'hidden md:block'}`}
              >
                <h3 className="font-heading text-4xl md:text-6xl mb-6 font-bold tracking-tight">
                  {card.title}
                </h3>
                <p className={`text-xl leading-relaxed max-w-md font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  {card.desc}
                </p>
                {activeCard === index && (
                  <div className={`mt-8 flex items-center gap-2 font-semibold cursor-pointer group ${isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'}`}>
                    Learn more <ChevronRight strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
                <div className="h-20" />
              </motion.div>
            ))}
          </div>

          {/* Visual Content */}
          <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] flex items-center justify-center">
            {/* Soft Ambient Glow */}
            <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 transition-colors duration-700
                ${isDark ? 'bg-orange-500/10' : 'bg-orange-200/30'}`} />
            
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
                animate={{ 
                  opacity: activeCard === index ? 1 : 0,
                  scale: activeCard === index ? 1 : 0.9,
                  rotate: activeCard === index ? 0 : -6,
                  zIndex: activeCard === index ? 10 : 0
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className={`absolute inset-0 rounded-2xl p-4 transition-colors duration-700
                    ${isDark ? 'bg-[#292524]' : 'bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]'}`}
              >
                <div className={`w-full h-full rounded-xl flex items-center justify-center relative overflow-hidden transition-colors duration-500
                    ${isDark ? 'bg-[#1C1917]' : 'bg-[#FDFBF7]'}`}>
                  
                  {/* Grain Texture */}
                  <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  
                  {/* Organic Abstract Shape */}
                  <div className={`w-48 h-48 rounded-full blur-[80px] opacity-60 bg-gradient-to-r ${isDark ? card.gradientDark : card.gradientLight}`} />
                  
                  <div className={`relative z-10 font-heading text-9xl font-extrabold select-none ${isDark ? 'text-[#E7E5E4]/10' : 'text-[#1C1917]/5'}`}>
                    0{index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

