'use client'

import type { ReactNode } from 'react'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-void px-4 py-6">
      {/* Ambient room glow behind device */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(156,198,221,0.10), rgba(193,178,212,0.06) 45%, transparent 70%)',
        }}
      />

      {/* Device */}
      <div className="relative h-[812px] max-h-[92dvh] w-[375px] max-w-full shrink-0">
        {/* Titanium bezel */}
        <div
          className="absolute inset-0 rounded-[3.2rem] p-[2px]"
          style={{
            background:
              'linear-gradient(150deg, rgba(223,219,211,0.35), rgba(223,219,211,0.04) 30%, rgba(0,0,0,0.6) 60%, rgba(223,219,211,0.18))',
            boxShadow:
              '0 40px 120px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          <div className="grain relative h-full w-full overflow-hidden rounded-[3.05rem] bg-void">
            {/* Screen inner vignette */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30 rounded-[3.05rem]"
              style={{
                boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.65)',
              }}
            />
            {/* Dynamic island */}
            <div className="absolute left-1/2 top-3 z-50 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
