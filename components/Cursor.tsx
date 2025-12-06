'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const { isDark } = useTheme()

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            })
        }

        const handleMouseOver = (e: MouseEvent) => {
             const target = e.target as HTMLElement
             if (['BUTTON', 'A', 'INPUT'].includes(target.tagName) || target.closest('button')) {
                 setIsHovering(true)
             } else {
                 setIsHovering(false)
             }
        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [])

    return (
        <motion.div
            className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] hidden md:block mix-blend-difference bg-[#E7E5E4]`}
            animate={{
                x: mousePosition.x - (isHovering ? 16 : 8),
                y: mousePosition.y - (isHovering ? 16 : 8),
                scale: isHovering ? 3 : 1
            }}
            transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 0.1
            }}
        />
    )
}

