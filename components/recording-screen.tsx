'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Check, ChevronLeft, Pause, Play } from 'lucide-react'
import type { Space } from '@/lib/spaces'
import { Waveform } from './waveform'

function formatTime(total: number) {
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

export function RecordingScreen({
  space,
  onBack,
  onFinish,
}: {
  space: Space
  onBack: () => void
  onFinish: () => void
}) {
  const [seconds, setSeconds] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full w-full flex-col px-6 pb-8 pt-14"
    >
      {/* Caustic cocoon glow themed to card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 42%, ${space.chamber}, transparent 62%)`,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
        style={{ background: space.glow }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top status */}
      <div className="relative flex items-center justify-between">
        <motion.button
          type="button"
          onClick={onBack}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-1 rounded-full frost hairline py-1.5 pl-2 pr-3.5 text-[12px] text-silver-faint outline-none"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          Quay lại
        </motion.button>
        <div className="flex items-center gap-2 rounded-full frost hairline px-3 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            {!paused && (
              <span
                className="animate-breathe absolute inline-flex h-full w-full rounded-full"
                style={{ background: space.color }}
              />
            )}
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: space.color }}
            />
          </span>
          <span className="font-mono text-[10px] tracking-[0.14em] text-silver-faint">
            {paused ? 'TẠM DỪNG' : 'ĐANG GHI'} • {space.code}
          </span>
        </div>
      </div>

      {/* Chamber prompt */}
      <div className="relative mt-8 text-center">
        <p className="font-mono text-[10px] tracking-[0.24em] text-silver-dim">
          CHAMBER {space.index}
        </p>
        <p className="mx-auto mt-2 max-w-[16rem] text-pretty text-[13.5px] leading-relaxed text-silver-faint">
          {space.prompt}
        </p>
      </div>

      {/* Timer */}
      <div className="relative mt-10 flex flex-col items-center">
        <div className="relative">
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center font-mono text-[46px] font-light tracking-tight blur-lg"
            style={{ color: space.color, opacity: 0.5 }}
          >
            {formatTime(seconds)}
          </span>
          <span className="relative font-mono text-[46px] font-light tracking-tight text-silver">
            {formatTime(seconds)}
          </span>
        </div>
      </div>

      {/* Waveform */}
      <div className="relative mt-6 h-40 w-full">
        <Waveform color={space.color} active={!paused} />
      </div>

      {/* Controls */}
      <div className="relative mt-auto flex items-center justify-center gap-6 pt-6">
        <motion.button
          type="button"
          onClick={() => setPaused((p) => !p)}
          whileTap={{ scale: 0.9 }}
          className="flex h-16 w-16 items-center justify-center rounded-full frost hairline text-silver outline-none"
          aria-label={paused ? 'Tiếp tục ghi' : 'Tạm dừng'}
        >
          {paused ? (
            <Play className="h-6 w-6" strokeWidth={1.4} />
          ) : (
            <Pause className="h-6 w-6" strokeWidth={1.4} />
          )}
        </motion.button>

        <motion.button
          type="button"
          onClick={onFinish}
          whileTap={{ scale: 0.9 }}
          className="relative flex h-20 w-20 items-center justify-center rounded-full outline-none"
          aria-label="Hoàn tất và lưu"
        >
          <span
            aria-hidden
            className="absolute -inset-2 rounded-full blur-xl"
            style={{ background: space.glow }}
          />
          <span
            className="relative flex h-full w-full items-center justify-center rounded-full"
            style={{
              background: `radial-gradient(circle at 35% 30%, #ffffff, ${space.color} 55%, rgba(0,0,0,0.4))`,
              boxShadow: `0 0 24px 2px ${space.glow}, inset 0 -4px 8px rgba(0,0,0,0.35), inset 0 3px 6px rgba(255,255,255,0.5)`,
            }}
          >
            <Check className="h-8 w-8 text-void" strokeWidth={2.2} />
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}
