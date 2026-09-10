'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
}

export function Waveform({
  color,
  active,
}: {
  color: string
  active: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const particles: Particle[] = Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * 0.5 + 0.2,
    }))

    let t = 0
    let raf = 0
    let amp = 0

    const harmonics = [
      { f: 1, a: 0.5, s: 0.9 },
      { f: 2.3, a: 0.28, s: 1.4 },
      { f: 3.7, a: 0.16, s: 0.6 },
      { f: 5.1, a: 0.1, s: 2.1 },
    ]

    const render = () => {
      raf = requestAnimationFrame(render)
      t += 0.016
      const target = activeRef.current ? 1 : 0.16
      amp += (target - amp) * 0.06

      ctx.clearRect(0, 0, w, h)
      const mid = h / 2

      // floating particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > 1) p.vx *= -1
        if (p.y < 0 || p.y > 1) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = p.a * (0.3 + amp * 0.7)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // multi-harmonic waveform mirrored
      const layers = [
        { alpha: 0.9, width: 1.6, scale: 1 },
        { alpha: 0.28, width: 1, scale: 0.6 },
      ]
      for (const layer of layers) {
        ctx.beginPath()
        for (let x = 0; x <= w; x += 2) {
          const nx = x / w
          let y = 0
          for (const har of harmonics) {
            y +=
              Math.sin(nx * Math.PI * 2 * har.f + t * har.s) *
              har.a
          }
          const env = Math.sin(nx * Math.PI) // taper at edges
          const yy = mid + y * mid * 0.7 * amp * env * layer.scale
          if (x === 0) ctx.moveTo(x, yy)
          else ctx.lineTo(x, yy)
        }
        ctx.strokeStyle = color
        ctx.globalAlpha = layer.alpha
        ctx.lineWidth = layer.width
        ctx.lineJoin = 'round'
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // center baseline glow dots
      ctx.beginPath()
      ctx.arc(w / 2, mid, 2, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.globalAlpha = 0.6
      ctx.fill()
      ctx.globalAlpha = 1
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [color])

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
}
