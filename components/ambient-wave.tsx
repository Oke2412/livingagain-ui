'use client'

import { motion } from 'motion/react'
import { WaveField } from './wave-field'
import type { Space } from '@/lib/spaces'

type Screen = 'nexus' | 'matrix' | 'recording'

// A single persistent wave field behind every screen. It never unmounts —
// only its color, intensity and opacity glide as you navigate, so screens
// share one continuous surface instead of each spawning their own.
export function AmbientWave({
  screen,
  space,
}: {
  screen: Screen
  space: Space | null
}) {
  const recording = screen === 'recording' && !!space
  const color = recording ? space!.color : '#9cc6dd'
  const intensity = recording ? 0.9 : 0.5
  const opacity = screen === 'recording' ? 0.72 : screen === 'matrix' ? 0.2 : 0.14

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <WaveField
        color={color}
        intensity={intensity}
        interactive
        className="h-full w-full"
      />
      {/* Focus vignette — keeps edges sinking into the void */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, transparent 28%, rgba(5,6,8,0.5) 68%, rgba(5,6,8,0.92) 100%)',
        }}
      />
    </motion.div>
  )
}
