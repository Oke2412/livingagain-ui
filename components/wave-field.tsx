'use client'

import { useEffect, useRef } from 'react'

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uColor;
uniform float uIntensity;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
float noise(vec2 p){
  vec2 i=floor(p); vec2 f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i+vec2(0.0,0.0)),hash(i+vec2(1.0,0.0)),u.x),
             mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0; float a=0.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.02; a*=0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy/uRes.xy;
  float aspect = uRes.x/max(uRes.y,1.0);
  vec2 p = vec2(uv.x*aspect, uv.y);
  vec2 ptr = vec2(uPointer.x*aspect, uPointer.y);
  float d = distance(p, ptr);
  float pull = exp(-d*3.5)*0.5;
  float t = uTime*0.12;
  // domain-warped fbm for a fluid, self-advecting distortion
  vec2 q = vec2(fbm(p*2.2 + t), fbm(p*2.2 + vec2(5.2,1.3) - t));
  vec2 r = vec2(fbm(p*2.2 + q*1.6 + t*0.6), fbm(p*2.2 + q*1.6 + vec2(8.3) - t*0.4));
  float f = fbm(p*2.2 + r*1.4 + pull*3.0);
  // flowing wave bands riding the warped field
  float bands = sin(uv.y*9.0 + f*7.0 + r.x*5.0 + pull*12.0 + t*2.0)*0.5+0.5;
  float v = mix(f, bands, 0.45);
  v = pow(clamp(v,0.0,1.0), 1.5);
  vec3 base = vec3(0.027,0.035,0.051);
  vec3 col = mix(base, uColor, v*uIntensity);
  col += uColor*pull*0.5;
  gl_FragColor = vec4(col,1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  return sh
}

export function WaveField({
  color = '#9cc6dd',
  intensity = 1,
  interactive = true,
  className,
}: {
  color?: string
  intensity?: number
  interactive?: boolean
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(color)
  const intensityRef = useRef(intensity)
  colorRef.current = color
  intensityRef.current = intensity

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', {
      antialias: true,
      alpha: false,
      premultipliedAlpha: false,
    })
    if (!gl) {
      // Graceful fallback: soft radial tint so the surface is never blank
      canvas.style.background = `radial-gradient(circle at 50% 45%, ${color}, #07090d 70%)`
      return
    }

    const prog = gl.createProgram()!
    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    )
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uPointer = gl.getUniformLocation(prog, 'uPointer')
    const uColor = gl.getUniformLocation(prog, 'uColor')
    const uIntensity = gl.getUniformLocation(prog, 'uIntensity')

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const ptr = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      ptr.tx = (e.clientX - rect.left) / rect.width
      ptr.ty = 1 - (e.clientY - rect.top) / rect.height
    }
    if (interactive) window.addEventListener('pointermove', onMove)

    const start = performance.now()
    let raf = 0
    let visible = true
    // Smoothly interpolated color/intensity so space changes glide instead of snap
    const [ir, ig, ib] = hexToRgb(colorRef.current)
    const cur = { r: ir, g: ig, b: ib, i: intensityRef.current }
    const onVis = () => {
      visible = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', onVis)

    const render = () => {
      raf = requestAnimationFrame(render)
      if (!visible) return
      const now = performance.now()
      // idle drift when not interactive
      if (!interactive) {
        const t = (now - start) / 1000
        ptr.tx = 0.5 + Math.cos(t * 0.4) * 0.28
        ptr.ty = 0.5 + Math.sin(t * 0.32) * 0.28
      }
      ptr.x += (ptr.tx - ptr.x) * 0.06
      ptr.y += (ptr.ty - ptr.y) * 0.06

      const [tr, tg, tb] = hexToRgb(colorRef.current)
      cur.r += (tr - cur.r) * 0.05
      cur.g += (tg - cur.g) * 0.05
      cur.b += (tb - cur.b) * 0.05
      cur.i += (intensityRef.current - cur.i) * 0.05
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.uniform2f(uPointer, ptr.x, ptr.y)
      gl.uniform3f(uColor, cur.r, cur.g, cur.b)
      gl.uniform1f(uIntensity, cur.i)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      if (interactive) window.removeEventListener('pointermove', onMove)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [interactive])

  return <canvas ref={ref} className={className} aria-hidden />
}
