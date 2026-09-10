'use client'

import { motion } from 'motion/react'
import { History, Upload, Settings } from 'lucide-react'
import { Orb } from './orb'

function NavPill({
  icon: Icon,
  label,
}: {
  icon: typeof History
  label: string
}) {
  return (
    <button
      type="button"
      className="group flex flex-col items-center gap-1.5 px-3 py-1 outline-none"
    >
      <Icon
        className="h-[19px] w-[19px] text-silver-dim transition-colors group-hover:text-silver"
        strokeWidth={1.25}
      />
      <span className="text-[10px] tracking-wide text-silver-dim transition-colors group-hover:text-silver-faint">
        {label}
      </span>
    </button>
  )
}

export function NexusScreen({ onActivate }: { onActivate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex h-full w-full flex-col px-7 pb-8 pt-14"
    >
      {/* Chronometer badge */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2.5 rounded-full frost hairline px-3.5 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-breathe absolute inline-flex h-full w-full rounded-full bg-champagne" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-champagne" />
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-silver-faint">
            UTC+07:00 • FRI 11 SEP
          </span>
        </div>
      </div>

      {/* Greeting */}
      <div className="mt-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-balance text-[30px] font-light leading-tight tracking-tight text-silver"
        >
          Dòng hồi tưởng
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.6 }}
          className="mx-auto mt-3 max-w-[15rem] text-pretty text-[13px] leading-relaxed text-silver-dim"
        >
          Chạm nhẹ để bắt đầu dòng chảy
        </motion.p>
      </div>

      {/* Central orb */}
      <div className="flex flex-1 items-center justify-center">
        <Orb onActivate={onActivate} />
      </div>

      {/* Ready label */}
      <p className="mb-6 text-center font-mono text-[10px] tracking-[0.28em] text-silver-dim/70">
        NEXUS // STANDBY
      </p>

      {/* Bottom nav */}
      <div className="flex items-center justify-center">
        <nav className="flex items-center gap-1 rounded-full frost hairline px-2 py-2">
          <NavPill icon={History} label="Lịch sử" />
          <span className="h-6 w-px bg-hairline" />
          <NavPill icon={Upload} label="Tải tệp" />
          <span className="h-6 w-px bg-hairline" />
          <NavPill icon={Settings} label="Cài đặt" />
        </nav>
      </div>
    </motion.div>
  )
}
