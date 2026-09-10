'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, ChevronLeft, Hourglass } from 'lucide-react'
import { SPACES, type Space } from '@/lib/spaces'

const ORIGIN: Record<number, { x: number; y: number }> = {
  0: { x: 44, y: 44 },
  1: { x: -44, y: 44 },
  2: { x: 44, y: -44 },
  3: { x: -44, y: -44 },
}

function SpaceCard({
  space,
  index,
  onSelect,
}: {
  space: Space
  index: number
  onSelect: (s: Space) => void
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(space)}
      initial={{ opacity: 0, scale: 0.4, ...ORIGIN[index] }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.4, ...ORIGIN[index] }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 24,
        delay: 0.04 * index,
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-[1.4rem] frost hairline p-4 text-left outline-none"
    >
      {/* Hairline accent edge — flat, no glow bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-40 transition-opacity group-hover:opacity-100"
        style={{ background: space.color }}
      />

      <div className="relative flex items-start justify-between">
        <span
          className="font-mono text-[34px] font-light leading-none tracking-[-0.04em]"
          style={{ color: space.color }}
        >
          {space.index}
        </span>
        <ArrowUpRight
          className="h-4 w-4 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          style={{ color: space.color }}
          strokeWidth={1.5}
        />
      </div>

      <div className="relative">
        <span className="font-mono text-[9px] tracking-[0.16em] text-silver-dim">
          {space.code}
        </span>
        <h3 className="mt-1.5 text-[15px] font-medium leading-tight text-silver">
          {space.title}
        </h3>
        <p className="mt-1 text-[10.5px] leading-snug text-silver-dim">
          {space.subtitle}
        </p>
      </div>
    </motion.button>
  )
}

export function MatrixScreen({
  onBack,
  onSelect,
}: {
  onBack: () => void
  onSelect: (s: Space) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex h-full w-full flex-col px-6 pb-7 pt-14"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.button
          type="button"
          onClick={onBack}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-1 rounded-full frost hairline py-1.5 pl-2 pr-3.5 text-[12px] text-silver-faint outline-none"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          Quay lại
        </motion.button>
        <span className="font-mono text-[10px] tracking-[0.16em] text-silver-dim">
          MATRIX // 2x2.DUAL
        </span>
      </div>

      {/* Title */}
      <div className="mt-8">
        <h2 className="text-[22px] font-light leading-tight tracking-tight text-silver">
          Chọn không gian tự sự
        </h2>
        <p className="mt-2 text-[11.5px] leading-relaxed text-silver-dim">
          4 chiều không gian tâm thức • Cấu hình âm học riêng biệt
        </p>
      </div>

      {/* 2x2 grid */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {SPACES.map((space, i) => (
          <SpaceCard key={space.id} space={space} index={i} onSelect={onSelect} />
        ))}
      </div>

      {/* Chronological anchor */}
      <div className="mt-auto pt-6">
        <div className="flex items-center gap-2.5 rounded-2xl frost hairline px-4 py-3">
          <Hourglass className="h-4 w-4 shrink-0 text-champagne" strokeWidth={1.4} />
          <input
            type="text"
            placeholder="Mốc thời gian... e.g. 2018, Cấp 3"
            className="w-full bg-transparent text-[12.5px] text-silver placeholder:text-silver-dim/70 outline-none"
          />
        </div>
      </div>
    </motion.div>
  )
}
