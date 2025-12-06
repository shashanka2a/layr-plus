'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { MagneticButton } from './MagneticButton'

export const CTA = () => {
  const { isDark } = useTheme()
  return (
    <section className={`py-32 relative overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#1C1917] text-[#E7E5E4]' : 'bg-[#F3F0E7] text-[#1C1917]'}`}>
      <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-orange-900/10' : 'from-orange-50/50'} to-transparent`} />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <h2 className="font-heading text-5xl md:text-7xl mb-8 font-extrabold tracking-tight">
              Start building <br/>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-[#E7E5E4] to-[#A8A29E]' : 'from-[#1C1917] to-[#78716C]'}`}>
                the future.
              </span>
            </h2>
            <p className={`text-xl mb-12 max-w-2xl mx-auto font-normal font-body ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
              Join 50,000+ creators who are shipping faster with Layr.plus. 
              No credit card required for the free tier.
            </p>
            
            <div className="flex justify-center">
              <MagneticButton className="px-12 py-5 rounded-full text-lg font-semibold">
                Get Started for Free
              </MagneticButton>
            </div>
        </motion.div>
      </div>
    </section>
  )
}

