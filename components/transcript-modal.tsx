'use client'

import { motion } from 'motion/react'
import { Check, Waves, X } from 'lucide-react'
import type { Space } from '@/lib/spaces'

type Token =
  | { kind: 'time'; value: string }
  | { kind: 'para'; value: string }
  | { kind: 'text'; value: string }

const TRANSCRIPT: Token[] = [
  { kind: 'time', value: '00:04' },
  { kind: 'text', value: 'Lúc đó là cuối tháng 9...' },
  { kind: 'para', value: 'im lặng 3.2s' },
  { kind: 'text', value: 'gió mùa đông bắc bắt đầu tràn về phố.' },
  { kind: 'time', value: '00:22' },
  { kind: 'para', value: 'thở dài' },
  {
    kind: 'text',
    value:
      'Mình đứng ở ban công nhìn xuống, đèn đường vàng vọt in bóng những tán cây đang rung.',
  },
  { kind: 'time', value: '00:41' },
  { kind: 'text', value: 'Có gì đó rất cũ, rất quen, khẽ trở mình trong lồng ngực.' },
]

export function TranscriptModal({
  space,
  onClose,
}: {
  space: Space
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[60] flex items-end justify-center"
    >
      <button
        type="button"
        aria-label="Đóng"
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
      />

      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        exit={{ y: '110%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative m-3 w-full overflow-hidden rounded-[1.75rem] frost hairline"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-70 blur-2xl"
          style={{ background: space.glow }}
        />

        {/* grabber */}
        <div className="flex justify-center pt-3">
          <span className="h-1 w-9 rounded-full bg-hairline-strong" />
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between px-5 pb-3 pt-3">
          <div className="flex items-center gap-2">
            <Waves className="h-4 w-4" style={{ color: space.color }} strokeWidth={1.5} />
            <div>
              <p className="text-[13px] font-medium text-silver">Bản gỡ băng</p>
              <p className="font-mono text-[9px] tracking-[0.14em] text-silver-dim">
                {space.index} // {space.code}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hairline text-silver-dim outline-none"
            aria-label="Đóng"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="mx-5 h-px bg-hairline" />

        {/* Transcript body */}
        <div className="no-scrollbar max-h-[42dvh] overflow-y-auto px-5 py-4">
          <p className="text-[13.5px] leading-[1.9] text-silver-faint">
            {TRANSCRIPT.map((tok, i) => {
              if (tok.kind === 'time') {
                return (
                  <span
                    key={i}
                    className="mr-1.5 inline-block rounded-md border border-hairline px-1.5 py-px align-middle font-mono text-[9.5px] tracking-wide text-silver-dim"
                  >
                    {tok.value}
                  </span>
                )
              }
              if (tok.kind === 'para') {
                return (
                  <span
                    key={i}
                    className="mx-1 inline-block rounded-md px-1.5 py-px align-middle text-[11px] italic"
                    style={{
                      color: space.color,
                      background: space.chamber,
                    }}
                  >
                    {tok.value}
                  </span>
                )
              }
              return (
                <span key={i} className="text-silver">
                  {' '}
                  {tok.value}{' '}
                </span>
              )
            })}
          </p>
        </div>

        {/* Footer action */}
        <div className="flex items-center gap-3 px-5 pb-6 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full hairline py-3 text-[13px] text-silver-faint outline-none"
          >
            Ghi lại
          </button>
          <motion.button
            type="button"
            onClick={onClose}
            whileTap={{ scale: 0.96 }}
            className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-[13px] font-medium text-void outline-none"
            style={{
              background: `linear-gradient(180deg, #ffffff, ${space.color})`,
              boxShadow: `0 8px 24px -8px ${space.glow}`,
            }}
          >
            <Check className="h-4 w-4" strokeWidth={2.2} />
            Lưu vào ký ức
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
