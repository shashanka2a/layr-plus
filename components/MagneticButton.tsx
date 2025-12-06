'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export const MagneticButton = ({ children, className = '', onClick, variant = 'primary' }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const { isDark } = useTheme()

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const getStyles = () => {
    if (variant === 'primary') {
      return isDark 
        ? 'bg-[#E7E5E4] text-[#1C1917] hover:bg-white' 
        : 'bg-[#1C1917] text-[#FAFAF9] hover:bg-[#44403C]'
    }
    return isDark 
      ? 'border border-[#E7E5E4]/20 text-[#E7E5E4] hover:bg-[#E7E5E4]/10 backdrop-blur-md' 
      : 'border border-[#1C1917]/10 text-[#1C1917] hover:bg-[#1C1917]/5 backdrop-blur-md'
  }

  return (
    <motion.button
      ref={ref}
      className={`${className} ${getStyles()} transition-colors duration-300 font-heading font-semibold tracking-tight`}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.button>
  )
}

