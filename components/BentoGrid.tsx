'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Palette, Layout, Code } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export const BentoGrid = () => {
  const { isDark } = useTheme()

  const cardClass = isDark 
    ? 'bg-[#1C1917] border-[#E7E5E4]/10' 
    : 'bg-white border-[#1C1917]/5 shadow-sm'

  return (
    <section className={`py-32 transition-colors duration-700 ${isDark ? 'bg-[#0C0A09] text-[#E7E5E4]' : 'bg-[#F3F0E7] text-[#1C1917]'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-heading text-3xl md:text-5xl mb-6 font-bold tracking-tight">
            Three powerful layers
          </h2>
          <p className={`font-body text-xl font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
            Each tool designed to excel at what it does best, together forming the complete stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
          {/* Card 1: Logora */}
          <motion.a 
            href="http://logora.design/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 0.99 }}
            className={`md:col-span-2 md:row-span-2 rounded-3xl p-12 border relative overflow-hidden group transition-colors duration-500 block ${cardClass}`}
          >
             <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] transition-colors opacity-30
                ${isDark ? 'bg-orange-500/20' : 'bg-orange-200/50'}`} />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-[#E7E5E4]/10 text-[#E7E5E4]' : 'bg-[#1C1917]/5 text-[#1C1917]'}`}>
                  <Palette size={20} strokeWidth={2} />
                </div>
                <h3 className="font-heading text-3xl mb-4 font-bold">Logora</h3>
                <p className={`max-w-md text-lg mb-8 font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  AI-powered logo and brand identity design that scales.
                </p>
                <div className={`flex items-center gap-2 font-semibold cursor-pointer group w-fit ${isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'}`}>
                   Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              <div className={`mt-10 w-full h-64 rounded-xl border overflow-hidden flex items-center justify-center relative
                  ${isDark ? 'bg-[#292524] border-[#E7E5E4]/5' : 'bg-[#FDFBF7] border-[#1C1917]/5'}`}>
                 <div className="grid grid-cols-4 gap-4 opacity-80">
                    {[...Array(8)].map((_, i) => (
                        <motion.div 
                            key={i}
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`w-16 h-16 rounded-full ${isDark ? 'bg-[#E7E5E4]/5' : 'bg-[#1C1917]/5'}`}
                            style={{ 
                                backgroundColor: [
                                    '#9A3412', '#EA580C', '#F97316', '#FB923C',
                                    '#78350F', '#92400E', '#B45309', '#D97706'
                                ][i] 
                            }} 
                        />
                    ))}
                 </div>
              </div>
            </div>
          </motion.a>

          {/* Card 2: Deckr */}
          <motion.a 
             href="http://deckr.design/"
             target="_blank"
             rel="noopener noreferrer"
             whileHover={{ scale: 0.99 }}
             className={`rounded-3xl p-10 border relative overflow-hidden group flex flex-col justify-between transition-colors duration-500 block ${cardClass}`}
          >
             <div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-[#E7E5E4]/10 text-[#E7E5E4]' : 'bg-[#1C1917]/5 text-[#1C1917]'}`}>
                  <Layout size={20} strokeWidth={2} />
                </div>
                <h3 className="font-heading text-2xl mb-2 font-bold">Deckr</h3>
                <p className={`text-sm mb-4 font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  Create stunning decks with smart templates.
                </p>
                <div className={`flex items-center gap-2 font-semibold cursor-pointer group w-fit text-sm ${isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'}`}>
                   Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
             </div>
             
             <div className="mt-8 flex justify-center relative">
                 <div className={`w-40 h-28 rounded shadow-lg absolute top-0 -right-4 rotate-6 opacity-40 ${isDark ? 'bg-[#44403C]' : 'bg-[#D6D3D1]'}`} />
                 <div className={`w-40 h-28 rounded shadow-lg absolute top-2 -right-2 rotate-3 opacity-70 ${isDark ? 'bg-[#57534E]' : 'bg-[#E7E5E4]'}`} />
                 <div className={`w-40 h-28 rounded shadow-xl relative z-10 flex flex-col p-4 ${isDark ? 'bg-[#292524] border border-[#E7E5E4]/10' : 'bg-white border border-[#1C1917]/10'}`}>
                     <div className={`w-8 h-2 rounded-full mb-3 ${isDark ? 'bg-[#E7E5E4]/20' : 'bg-[#1C1917]/10'}`} />
                     <div className={`w-full h-12 rounded mb-3 ${isDark ? 'bg-[#E7E5E4]/10' : 'bg-[#1C1917]/5'}`} />
                 </div>
             </div>
          </motion.a>

          {/* Card 3: Buidl */}
          <motion.a 
             href="https://buidl.design/"
             target="_blank"
             rel="noopener noreferrer"
             whileHover={{ scale: 0.99 }}
             className={`md:col-span-1 rounded-3xl p-10 border relative overflow-hidden group transition-colors duration-500 block ${cardClass}`}
          >
             <div className={`absolute bottom-0 right-0 w-[200px] h-[200px] rounded-full blur-[80px] transition-colors opacity-30
                 ${isDark ? 'bg-rose-500/20' : 'bg-rose-200/50'}`} />
             <div className="relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-[#E7E5E4]/10 text-[#E7E5E4]' : 'bg-[#1C1917]/5 text-[#1C1917]'}`}>
                  <Code size={20} strokeWidth={2} />
                </div>
                <h3 className="font-heading text-2xl mb-2 font-bold">Buidl</h3>
                <p className={`text-sm mb-4 font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  Build and deploy apps fast.
                </p>
                <div className={`flex items-center gap-2 font-semibold cursor-pointer group w-fit text-sm ${isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'}`}>
                   Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                
                <div className={`mt-8 p-3 rounded font-mono text-xs flex items-center gap-2 w-fit
                    ${isDark ? 'bg-[#1C1917] border border-[#E7E5E4]/10 text-emerald-500' : 'bg-white border border-[#1C1917]/10 text-emerald-700'}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Deployed
                </div>
             </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

