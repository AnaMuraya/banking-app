'use client'

import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

type Props = {
  value: number
  title: string
  className: string
}

export default function AnimatedNumber({ value, title, className }: Props) {
  const spring = useSpring(value, { mass: 0.4, stiffness: 75, damping: 15, duration: 3 })
  const display = useTransform(spring, current => Math.round(current).toLocaleString())

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return (
    <motion.span className={className} data-testid={title === 'New Balance' && 'currency-number'}>
      {display}
    </motion.span>
  )
}
