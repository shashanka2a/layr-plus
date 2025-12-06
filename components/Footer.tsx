'use client'

import { Layers } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export const Footer = () => {
  const { isDark } = useTheme()
  return (
    <footer className={`py-20 border-t transition-colors duration-700 font-body ${isDark ? 'bg-[#0C0A09] text-[#E7E5E4] border-[#E7E5E4]/5' : 'bg-[#FDFBF7] text-[#1C1917] border-[#1C1917]/5'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20">
          <div className="mb-10 md:mb-0">
            <div className="flex items-center gap-2 text-2xl font-heading font-bold mb-6">
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${isDark ? 'bg-[#E7E5E4] text-[#1C1917]' : 'bg-[#1C1917] text-[#FAFAF9]'}`}>
                <Layers size={18} strokeWidth={2.5} />
              </div>
              Layr.plus
            </div>
            <p className={`max-w-xs font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
              All the layers you need to build. <br/>
              San Francisco, CA.
            </p>
          </div>

          <div className="flex gap-16 flex-wrap">
            {[
              { title: 'Product', links: ['Features', 'Integrations', 'Pricing', 'Changelog'] },
              { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-6 tracking-wide text-sm uppercase">{col.title}</h4>
                <ul className={`space-y-4 font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  {col.links.map((link) => (
                    <li key={link} className={`cursor-pointer transition-colors ${isDark ? 'hover:text-[#E7E5E4]' : 'hover:text-[#1C1917]'}`}>
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`flex flex-col md:flex-row justify-between items-center text-sm font-normal pt-8 border-t ${isDark ? 'border-[#E7E5E4]/5 text-[#78716C]' : 'border-[#1C1917]/5 text-[#A8A29E]'}`}>
          <p>© 2024 Layr.plus Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {['Twitter', 'GitHub', 'Discord'].map(social => (
                <a key={social} href="#" className={`transition-colors ${isDark ? 'hover:text-[#E7E5E4]' : 'hover:text-[#1C1917]'}`}>{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

