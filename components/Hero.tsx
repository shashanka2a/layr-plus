'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { MagneticButton } from './MagneticButton'

export const Hero = () => {
  const { scrollY } = useScroll()
  const { isDark } = useTheme()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 800], [1, 0])

  return (
    <section className={`relative h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#1C1917] text-[#E7E5E4]' : 'bg-[#F3F0E7] text-[#1C1917]'}`}>
      
      {/* Background Gradients - Warm/Organic Blurs */}
      <div className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] blur-[150px] rounded-full transition-colors duration-700 opacity-50 ${isDark ? 'bg-orange-900/20' : 'bg-orange-100/60'}`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] blur-[150px] rounded-full transition-colors duration-700 opacity-50 ${isDark ? 'bg-rose-900/20' : 'bg-amber-100/60'}`} />
      
      {/* Organic Grain Texture */}
      <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none`} />

      <div className="container mx-auto px-6 relative z-10 pt-40">
        <motion.div style={{ y: y1, opacity }} className="max-w-5xl">
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-extrabold text-5xl md:text-7xl leading-[1.1] mb-8 tracking-tight"
          >
            Stack your <br />
            <span className={`${isDark ? 'text-[#D6D3D1]' : 'text-[#78716C]'}`}>
              Ambition.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`font-body text-lg md:text-xl max-w-lg leading-relaxed mb-10 font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}
          >
            The comprehensive suite for modern builders. 
            Concept. Design. Code. Deploy. <br />
            One seamless flow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton className="px-10 py-5 flex items-center gap-3 text-lg rounded-full">
              Start Building <ArrowRight size={20} strokeWidth={2} />
            </MagneticButton>
            <MagneticButton variant="secondary" className="px-10 py-5 text-lg rounded-full">
              View Showreel
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Abstract Monolithic Layers - Stone/Paper Texture feel */}
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-10 right-0 w-[600px] h-[600px] hidden lg:block pointer-events-none"
        >
             {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotateX: 55, rotateZ: -40, z: -100 }}
                  animate={{ opacity: 1, rotateX: 55, rotateZ: -40, z: 0 }}
                  transition={{ duration: 1, delay: 0.5 + (i * 0.15) }}
                  className={`absolute top-1/2 left-1/2 w-[350px] h-[450px] border transition-colors duration-700 rounded-2xl
                    ${isDark 
                        ? 'border-[#E7E5E4]/10 bg-[#292524]/60 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
                        : 'border-[#1C1917]/5 bg-[#FDFBF7]/50 shadow-[0_20px_50px_rgba(28,25,23,0.05)]'
                    }`}
                  style={{
                    transform: `translate(-50%, -50%) translateZ(${i * 60}px) translateY(${i * -60}px)`,
                    zIndex: 3 - i,
                    backdropFilter: 'blur(8px)'
                  }}
                />
             ))}
        </motion.div>
      </div>
    </section>
  )
}

