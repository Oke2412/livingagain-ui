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
      {/* Themed corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-60 blur-2xl transition-opacity group-hover:opacity-100"
        style={{ background: space.glow }}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[10px] tracking-[0.14em]"
            style={{ color: space.color }}
          >
            {space.index} // {space.code}
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-silver-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            style={{ color: space.color }}
            strokeWidth={1.5}
          />
        </div>
        {/* Etched chip */}
        <div className="mt-2 inline-flex items-center gap-1 rounded-md border border-hairline px-1.5 py-0.5">
          <span
            className="h-1 w-1 rounded-full"
            style={{ background: space.color }}
          />
          <span className="font-mono text-[8px] tracking-[0.12em] text-silver-dim">
            CH.0{index + 1}
          </span>
        </div>
      </div>

      <div className="relative">
        <h3 className="text-[15px] font-medium leading-tight text-silver">
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
