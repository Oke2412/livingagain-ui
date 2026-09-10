'use client'

import { motion } from 'motion/react'
import { WaveField } from './wave-field'

function CalibrationBezel() {
  const ticks = Array.from({ length: 72 })
  return (
    <svg
      viewBox="0 0 200 200"
      className="animate-spin-slow pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      {ticks.map((_, i) => {
        const major = i % 6 === 0
        const angle = (i / ticks.length) * 360
        return (
          <line
            key={i}
            x1="100"
            y1={major ? 6 : 9}
            x2="100"
            y2={major ? 14 : 12}
            stroke="rgba(223,219,211,0.45)"
            strokeWidth={major ? 1 : 0.5}
            transform={`rotate(${angle} 100 100)`}
          />
        )
      })}
    </svg>
  )
}

export function Orb({ onActivate }: { onActivate: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onActivate}
      className="relative flex h-[150px] w-[150px] items-center justify-center rounded-full outline-none"
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      aria-label="Bắt đầu dòng chảy hồi tưởng"
    >
      {/* Soft outer halo — kept minimal for the flat editorial canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-full opacity-50 blur-2xl"
        style={{
          background:
            'radial-gradient(circle, rgba(156,198,221,0.18), transparent 70%)',
        }}
      />

      {/* Rotating calibration bezel */}
      <CalibrationBezel />

      {/* Fluid distortion wave core */}
      <div
        className="relative h-[118px] w-[118px] overflow-hidden rounded-full hairline"
        style={{ boxShadow: 'inset 0 0 30px 4px rgba(0,0,0,0.55)' }}
      >
        <WaveField color="#9cc6dd" intensity={1} interactive className="h-full w-full" />
        {/* glass specular sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 34% 26%, rgba(255,255,255,0.32), transparent 42%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.12)' }}
        />
      </div>
    </motion.button>
  )
}
