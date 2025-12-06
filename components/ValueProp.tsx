'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Box, Layout, Code, Zap } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export const ValueProp = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isDark } = useTheme()

  return (
    <section ref={containerRef} className={`py-32 transition-colors duration-700 ${isDark ? 'bg-[#1C1917] text-[#E7E5E4]' : 'bg-[#FDFBF7] text-[#1C1917]'}`}>
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="font-heading text-3xl md:text-5xl mb-6 font-bold tracking-tight">
            The Complete Stack.
          </h2>
          <div className={`w-full h-px ${isDark ? 'bg-[#E7E5E4]/10' : 'bg-[#1C1917]/10'}`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Box, title: 'Concept', desc: 'Wireframe & prototype at the speed of thought.' },
            { icon: Layout, title: 'Design', desc: 'Design systems that scale automatically.' },
            { icon: Code, title: 'Develop', desc: 'Export clean, production-ready React code.' },
            { icon: Zap, title: 'Deploy', desc: 'One-click deployment to global edge networks.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`group p-10 rounded-3xl border transition-all duration-500 cursor-pointer relative overflow-hidden font-body
                ${isDark 
                    ? 'bg-[#292524]/20 border-[#E7E5E4]/5 hover:bg-[#292524]/40 hover:border-[#E7E5E4]/10' 
                    : 'bg-white border-[#1C1917]/5 hover:border-[#1C1917]/10 hover:shadow-xl hover:shadow-[#1C1917]/5'
                }`}
            >
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500
                    ${isDark ? 'bg-[#E7E5E4]/5 text-[#E7E5E4] group-hover:bg-[#E7E5E4] group-hover:text-[#1C1917]' : 'bg-[#1C1917]/5 text-[#1C1917] group-hover:bg-[#1C1917] group-hover:text-[#FAFAF9]'}`}>
                  <item.icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight font-heading">{item.title}</h3>
                <p className={`leading-relaxed font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

