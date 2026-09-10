'use client'

import { motion } from 'motion/react'

function CalibrationBezel() {
  const ticks = Array.from({ length: 72 })
  return (
    <svg
      viewBox="0 0 200 200"
      className="animate-spin-slow absolute inset-0 h-full w-full"
      aria-hidden
    >
      {ticks.map((_, i) => {
        const major = i % 6 === 0
        const angle = (i / ticks.length) * 360
        return (
          <line
            key={i}
            x1="100"
            y1={major ? 8 : 11}
            x2="100"
            y2={major ? 18 : 15}
            stroke="rgba(223,219,211,0.55)"
            strokeWidth={major ? 1.1 : 0.6}
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
      className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full outline-none"
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      aria-label="Bắt đầu dòng chảy hồi tưởng"
    >
      {/* Ambient caustic mist layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(156,198,221,0.28), rgba(193,178,212,0.16) 45%, transparent 72%)',
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(circle, rgba(237,220,198,0.22), transparent 65%)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating calibration bezels */}
      <CalibrationBezel />
      <div className="animate-spin-slow-reverse absolute inset-[10px] rounded-full hairline" />

      {/* Glass shell */}
      <div
        className="absolute inset-[16px] rounded-full frost hairline"
        style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)' }}
      />

      {/* Moonstone jewel core */}
      <motion.div
        className="relative h-[54px] w-[54px] rounded-full"
        animate={{ opacity: [0.82, 1, 0.82] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle at 35% 30%, #ffffff 0%, #cfe0ea 22%, #9cc6dd 46%, #6f8ba8 70%, #2b3547 100%)',
          boxShadow:
            '0 0 24px 4px rgba(156,198,221,0.45), inset 0 -6px 12px rgba(0,0,0,0.4), inset 0 4px 8px rgba(255,255,255,0.5)',
        }}
      >
        <div
          aria-hidden
          className="absolute left-[28%] top-[22%] h-3 w-3 rounded-full bg-white/80 blur-[2px]"
        />
      </motion.div>
    </motion.button>
  )
}
