'use client'

import { storyblokEditable } from "@storyblok/react";
import { useRef, useEffect } from "react";
import type { ReactElement } from "react";

// ─── Logos ────────────────────────────────────────────────────────────────────

const logos: Record<string, ReactElement> = {
  React: (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none">
      <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" transform="rotate(120 12 12)" />
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0">
      <circle cx="12" cy="12" r="11" fill="#000" />
      <path d="M8 8h1.5l6.5 9.5V8H17.5v10H16L9.5 8.5V18H8V8z" fill="white" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0">
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <path d="M5 13.5h4.5V15H7.3v5H5.8v-5H5v-1.5zm7.5 0h-1.5V15h1.5v3.5c0 .8.6 1.5 1.4 1.5h1.1V18.5h-.6c-.2 0-.4-.2-.4-.4v-3.1h1V13.5h-1v-2h-1.5v2z" fill="white" />
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7z" fill="#339933" opacity="0.9" />
      <path d="M12 6v12M6 9l6 3 6-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.09 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.51 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 16.85 9.49 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.62 13.15 9.51 12 7 12z" fill="#38BDF8" />
    </svg>
  ),
  GSAP: (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none">
      <rect width="24" height="24" rx="4" fill="#0AE448" />
      <path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-6H8" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Three.js": (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none">
      <path d="M12 2L2 20h20L12 2z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M12 7l-4 10h8L12 7z" fill="white" opacity="0.25" />
      <path d="M12 7l4 10" stroke="white" strokeWidth="0.8" opacity="0.5" />
      <path d="M8 17h8" stroke="white" strokeWidth="0.8" opacity="0.5" />
    </svg>
  ),
  WebGL: (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none">
      <rect width="24" height="24" rx="4" fill="#990000" />
      <path d="M4 8h16M4 12h10M4 16h13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none">
      <path d="M8 2h4a4 4 0 0 1 0 8H8V2z" fill="#F24E1E" />
      <path d="M8 10h4a4 4 0 0 1 0 8H8v-8z" fill="#A259FF" />
      <path d="M8 18a4 4 0 0 0 4 4v-4H8z" fill="#0ACF83" />
      <path d="M4 6a4 4 0 0 0 4 4V2a4 4 0 0 0-4 4z" fill="#FF7262" />
      <circle cx="16" cy="14" r="4" fill="#1ABCFE" />
    </svg>
  ),
  Storyblok: (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none">
      <rect width="24" height="24" rx="5" fill="#00B3B0" />
      <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z" fill="white" />
    </svg>
  ),
  WordPress: (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none">
      <circle cx="12" cy="12" r="10" fill="#21759B" />
      <path d="M3.6 12a8.4 8.4 0 0 1 1.2-4.3l4.6 12.6A8.4 8.4 0 0 1 3.6 12z" fill="white" />
      <path d="M18.7 11.6c0-1.3-.5-2.2-1-2.9-.6-.9-1.1-1.7-1.1-2.6 0-1 .8-2 1.9-2l.1.1A8.4 8.4 0 0 0 12 3.6a8.4 8.4 0 0 0-7.1 3.9h.5c1.2 0 3-.1 3-.1.6 0 .7.9.1.9 0 0-.6.1-1.3.1l4.1 12.2 2.5-7.4-1.8-4.8c-.6 0-1.2-.1-1.2-.1-.6 0-.5-1 .1-1 0 0 1.9.1 3 .1 1.2 0 3-.1 3-.1.6 0 .7.9.1.9 0 0-.6.1-1.3.1l4 12 1.1-3.7c.5-1.6.9-2.7.9-3.9z" fill="white" />
      <path d="M12.4 13l-3.3 9.6c1 .3 2 .4 3 .4a8.4 8.4 0 0 0 3.2-.6l-.1-.2-2.8-9.2z" fill="white" />
      <path d="M19.5 7.4a8.4 8.4 0 0 1-6.3 12.5L17 8.2c.3-.7.4-1.3.5-1.8v1z" fill="white" />
    </svg>
  ),
  Shopify: (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none">
      <path d="M20.5 6.5c-.1-.1-.3-.1-.5-.1s-2.7-.2-2.7-.2-.9-.9-1.1-1.1V21l5.3-1.3-1-13.2z" fill="#95BF47" />
      <path d="M13.5 4.5s-.5-.1-1.2-.1c-.1-.4-.4-1.1-1-1.6-.8-.8-1.9-.6-2.3-.5-.1-.1-.2-.3-.3-.4C8 1.3 7 1.5 6.3 2.5 5 4.5 5.5 7.5 5.5 7.5L9 8l.5-1.5s.7.2 1 .5v13l7-1.7V4.6c-.4 0-.7-.1-1-.1l-3 1z" fill="#5E8E3E" />
      <path d="M12.3 4.4c-.7 0-1.3.2-1.3.2V6l1.7-.5c0-.6-.2-1-.4-1.1z" fill="#fff" />
    </svg>
  ),
  "Craft CMS": (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#E5422B" />
      <path d="M16.5 8.5a5 5 0 0 0-7.07 7.07" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16.5" cy="8.5" r="1.5" fill="white" />
    </svg>
  ),
};


// Each card has two glow colours and a unique ambient animation offset
type GlowConfig = {
  a: string  // primary colour  (rgba)
  b: string  // secondary colour (rgba)
  offset: number // phase offset for ambient orbit (seconds)
}

const glowConfigs: GlowConfig[] = [
  // Build — electric blue / violet
  { a: "rgba(99,179,255,0.18)",  b: "rgba(139,92,246,0.10)", offset: 0 },
  // Motion — green / teal
  { a: "rgba(10,228,72,0.15)",   b: "rgba(0,210,180,0.09)",  offset: 2.1 },
  // Design — pink / orange
  { a: "rgba(244,63,94,0.16)",   b: "rgba(251,146,60,0.09)", offset: 4.4 },
]


function SkillItem({ name }: { name: string }) {
  return (
    <li className="flex items-center gap-2.5 text-xl text-white/55">
      {logos[name] ?? <span className="size-4 shrink-0 rounded-sm bg-white/10" />}
      {name}
    </li>
  );
}


function GlowCard({ title, items, glow }: { title: string; items: string[]; glow: GlowConfig }) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);
  const frameRef  = useRef<number>(0);
  const startRef  = useRef<number>(Date.now());
  const hoveredRef = useRef(false);
  const mousePos  = useRef({ x: 50, y: 50 });
  const ambientPos = useRef({ x: 50, y: 50 })

  // Single rAF loop — ambient orbit that mouse smoothly overrides
  useEffect(() => {
    const loop = () => {
      const t = (Date.now() - startRef.current) / 1000 + glow.offset;

      if (!hoveredRef.current) {
        // Slow elliptical orbit when idle
        ambientPos.current = {
          x: 50 + Math.sin(t * 0.4) * 35,
          y: 50 + Math.cos(t * 0.3) * 30,
        }
      } else {
        // Lerp ambient toward mouse so takeover is smooth
        ambientPos.current = {
          x: ambientPos.current.x + (mousePos.current.x - ambientPos.current.x) * 0.12,
          y: ambientPos.current.y + (mousePos.current.y - ambientPos.current.y) * 0.12,
        }
      }

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(420px circle at ${ambientPos.current.x}% ${ambientPos.current.y}%, ${glow.a}, ${glow.b}, transparent 65%)`
      }

      frameRef.current = requestAnimationFrame(loop)
    }
    frameRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameRef.current)
  }, [glow])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mousePos.current = {
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { hoveredRef.current = true }}
      onMouseLeave={() => { hoveredRef.current = false }}
      className="relative flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 overflow-hidden"
    >
      {/* Animated glow layer — always on, mouse takes over centre */}
      <div ref={glowRef} className="pointer-events-none absolute inset-0 rounded-2xl" />

      <p className="relative mb-5 font-mono text-[10px] uppercase tracking-widest text-white/25">
        {title}
      </p>
      <ul className="relative space-y-3">
        {items.map((item) => <SkillItem key={item} name={item} />)}
      </ul>
    </div>
  );
}

// ─── Statue ───────────────────────────────────────────────────────────────────

function RotatingStatue() {
  const meshRef  = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    const animate = () => {
      const t = (Date.now() - startRef.current) / 1000;
      if (meshRef.current) {
        meshRef.current.style.transform =
          `rotateX(${Math.sin(t * 0.3) * 5}deg) rotateY(${t * 16}deg)`;
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="flex items-center justify-center w-full" style={{ perspective: "1200px" }}>
      <div
        ref={meshRef}
        className="relative"
        style={{ width: "240px", height: "420px", transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-sm overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            boxShadow: "0 28px 72px rgba(0,0,0,0.75), 0 0 0 5px #1a1625, 0 0 0 6px rgba(255,255,255,0.04)",
          }}
        >
          <svg viewBox="0 0 240 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
            <defs>
              <linearGradient id="sk" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#b8b0cc" />
                <stop offset="20%"  stopColor="#dcd6ec" />
                <stop offset="50%"  stopColor="#eeeaf8" />
                <stop offset="75%"  stopColor="#e4e0f4" />
                <stop offset="100%" stopColor="#a8a0be" />
              </linearGradient>
              <linearGradient id="skd" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#a098b4" />
                <stop offset="40%"  stopColor="#ccc4dc" />
                <stop offset="100%" stopColor="#908898" />
              </linearGradient>
              <linearGradient id="plinth" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#302848" />
                <stop offset="100%" stopColor="#1a1428" />
              </linearGradient>
              <linearGradient id="vig" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#0c0a18" stopOpacity="0" />
                <stop offset="100%" stopColor="#0c0a18" stopOpacity="0.65" />
              </linearGradient>
              <radialGradient id="aura" cx="50%" cy="52%" r="45%">
                <stop offset="0%"   stopColor="rgba(139,92,246,0.09)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>
            <rect width="240" height="420" fill="#0c0a18" />
            <rect width="240" height="420" fill="url(#aura)" />
            <rect x="50"  y="378" width="140" height="8"  rx="1" fill="#3a3050" />
            <rect x="44"  y="386" width="152" height="10" rx="2" fill="#2e2644" />
            <rect x="38"  y="396" width="164" height="16" rx="2" fill="url(#plinth)" />
            <path d="M88,378 Q85,360 84,345 Q83,330 86,318 Q89,310 92,308 L96,308 Q99,310 100,318 Q101,332 100,348 Q99,363 98,378 Z" fill="url(#sk)" />
            <path d="M86,378 L100,378 Q102,370 100,362 Q96,366 92,364 Q89,366 86,374 Z" fill="url(#skd)" />
            <path d="M142,378 Q144,360 145,345 Q147,330 145,318 Q142,308 138,306 L134,306 Q130,308 129,318 Q128,332 129,348 Q130,363 132,378 Z" fill="url(#sk)" />
            <path d="M130,378 L144,378 Q146,370 145,362 Q141,365 137,364 Q134,366 130,374 Z" fill="url(#skd)" />
            <path d="M84,345 Q80,318 82,295 Q84,275 89,262 Q93,252 98,250 Q103,252 106,264 Q109,278 108,300 Q107,322 102,345 Q99,358 98,368 L94,368 Q91,352 88,334 Q85,318 84,308 Q83,295 85,285 Q83,306 83,328 Q82,340 84,345 Z" fill="url(#sk)" />
            <path d="M87,330 Q90,315 94,305 Q97,295 98,285" fill="none" stroke="#c8c0dc" strokeWidth="1" opacity="0.35" />
            <path d="M156,345 Q158,318 156,295 Q154,274 149,260 Q145,250 140,249 Q135,251 132,264 Q129,278 130,300 Q131,322 136,345 Q139,358 140,368 L144,368 Q148,350 151,330 Q154,312 155,298 Q156,284 154,274 Q156,298 156,320 Q157,334 156,345 Z" fill="url(#sk)" />
            <path d="M153,330 Q150,315 146,305 Q143,295 142,285" fill="none" stroke="#c8c0dc" strokeWidth="1" opacity="0.35" />
            <path d="M82,262 Q84,250 93,248 Q103,248 106,260 Q106,270 99,274 Q92,276 85,270 Z" fill="url(#sk)" />
            <path d="M134,260 Q136,248 146,247 Q156,248 158,260 Q158,270 151,274 Q143,276 136,270 Z" fill="url(#sk)" />
            <ellipse cx="94"  cy="260" rx="7" ry="6" fill="none" stroke="#c0b8d0" strokeWidth="0.8" opacity="0.4" />
            <ellipse cx="146" cy="259" rx="7" ry="6" fill="none" stroke="#c0b8d0" strokeWidth="0.8" opacity="0.4" />
            <path d="M82,262 Q76,238 78,213 Q80,192 85,178 Q89,166 94,160 Q99,154 104,154 Q109,156 112,166 Q115,180 114,202 Q113,224 108,246 Q106,256 106,262 Q100,267 93,265 Q87,267 82,262 Z" fill="url(#sk)" />
            <path d="M86,248 Q84,228 86,208 Q88,192 94,178" fill="none" stroke="#c4bcd4" strokeWidth="1" opacity="0.3" />
            <path d="M158,260 Q164,236 162,211 Q160,190 155,176 Q151,163 146,157 Q141,151 136,151 Q131,153 128,164 Q125,178 126,200 Q126,224 130,246 Q132,256 132,262 Q138,267 146,264 Q152,266 158,260 Z" fill="url(#sk)" />
            <path d="M134,248 Q132,226 134,206 Q136,190 142,176" fill="none" stroke="#c4bcd4" strokeWidth="1" opacity="0.3" />
            <path d="M84,182 Q82,168 85,153 Q88,140 96,134 Q102,129 110,128 Q118,127 124,128 Q132,129 139,134 Q147,140 150,154 Q153,168 152,182 Q148,194 138,198 Q128,202 120,202 Q110,202 100,198 Q90,194 84,182 Z" fill="url(#sk)" />
            <path d="M96,158 Q109,152 124,152 Q138,154 146,160" fill="none" stroke="#b0a8c0" strokeWidth="1.2" opacity="0.4" />
            <ellipse cx="120" cy="180" rx="3.5" ry="2.5" fill="none" stroke="#9890a8" strokeWidth="1" opacity="0.55" />
            <path d="M84,182 Q80,164 82,146 Q84,130 89,118 Q94,107 100,102 Q106,97 114,95 Q118,94 122,94 Q128,94 134,96 Q142,100 149,110 Q155,121 157,136 Q159,153 157,170 Q155,184 152,190 Q142,200 120,202 Q98,200 84,182 Z" fill="url(#sk)" />
            <path d="M112,138 Q120,136 128,138" fill="none" stroke="#b8b0cc" strokeWidth="1"   opacity="0.45" />
            <path d="M110,153 Q120,151 130,153" fill="none" stroke="#b8b0cc" strokeWidth="0.9" opacity="0.4" />
            <path d="M110,168 Q120,166 130,168" fill="none" stroke="#b8b0cc" strokeWidth="0.8" opacity="0.35" />
            <path d="M120,128 L120,178"          fill="none" stroke="#b8b0c8" strokeWidth="0.7" opacity="0.28" />
            <path d="M90,155 Q94,148 100,145"    fill="none" stroke="#b0a8c0" strokeWidth="0.8" opacity="0.3" />
            <path d="M150,155 Q146,148 140,145"  fill="none" stroke="#b0a8c0" strokeWidth="0.8" opacity="0.3" />
            <path d="M88,120 Q84,106 86,94 Q88,82 95,76 Q100,71 108,69 Q114,68 120,68 Q126,68 132,70 Q140,73 146,80 Q152,88 153,100 Q154,114 152,124 Q146,133 134,137 Q120,140 106,136 Q94,132 88,120 Z" fill="url(#sk)" />
            <path d="M96,116 Q108,110 120,112"  fill="none" stroke="#c4bcd4" strokeWidth="1.2" opacity="0.42" />
            <path d="M144,116 Q132,110 120,112" fill="none" stroke="#c4bcd4" strokeWidth="1.2" opacity="0.42" />
            <path d="M94,80 Q107,76 120,76 Q133,76 146,80" fill="none" stroke="#ccc4dc" strokeWidth="1.2" opacity="0.45" />
            <path d="M88,112 Q76,100 65,86 Q56,74 54,62 Q53,52 57,47 Q61,43 67,46 Q74,50 78,60 Q84,74 90,90 Q95,103 96,114 Z" fill="url(#sk)" />
            <path d="M72,86 Q70,76 68,66 Q66,58 66,50" fill="none" stroke="#c8c0d8" strokeWidth="1" opacity="0.4" />
            <path d="M54,62 Q48,50 46,38 Q44,27 46,20 Q48,14 53,13 Q57,13 59,19 Q62,28 62,40 Q62,52 61,62 Q58,58 54,62 Z" fill="url(#sk)" />
            <path d="M46,20 Q44,13 46,7 Q49,2 54,2 Q58,3 59,8 Q60,14 58,20 Q56,17 51,18 Z" fill="url(#sk)" />
            <path d="M54,2 Q59,-2 65,1 Q68,5 67,10 Q64,14 59,13" fill="url(#sk)" />
            <path d="M54,18 Q60,15 65,10 Q60,8 55,12" fill="none" stroke="#ccc4dc" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
            <path d="M152,112 Q163,102 172,90 Q178,80 178,68 Q178,58 173,54 Q168,51 163,54 Q158,58 155,70 Q151,84 150,100 Q148,110 150,120 Z" fill="url(#sk)" />
            <path d="M170,82 Q172,72 172,62 Q172,54 170,48" fill="none" stroke="#c8c0d8" strokeWidth="1" opacity="0.4" />
            <path d="M178,68 Q183,82 184,98 Q185,114 182,128 Q180,138 175,140 Q170,142 167,136 Q164,128 164,114 Q163,98 165,84 Q167,74 170,68 Z" fill="url(#sk)" />
            <path d="M175,140 Q178,150 176,158 Q173,164 169,163 Q165,162 163,155 Q162,147 163,140 Z" fill="url(#sk)" />
            <path d="M163,154 Q161,160 162,165" fill="none" stroke="#c8c0d8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <path d="M167,158 Q166,164 167,169" fill="none" stroke="#c8c0d8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <path d="M172,157 Q172,163 173,168" fill="none" stroke="#c8c0d8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <path d="M108,78 Q106,66 108,56 Q111,48 117,45 Q119,44 122,44 Q126,44 129,46 Q134,51 135,60 Q136,70 134,78 Q130,76 122,76 Q114,76 108,78 Z" fill="url(#sk)" />
            <path d="M113,73 Q115,60 117,50" fill="none" stroke="#c4bcd0" strokeWidth="0.9" opacity="0.4" />
            <path d="M131,73 Q129,60 127,50" fill="none" stroke="#c4bcd0" strokeWidth="0.9" opacity="0.4" />
            <ellipse cx="121" cy="26" rx="21" ry="25" fill="url(#sk)" />
            <path d="M100,30 Q103,46 121,50 Q139,46 142,30" fill="url(#sk)" />
            <path d="M108,20 Q113,16 119,17" fill="none" stroke="#b0a8c4" strokeWidth="1.1" opacity="0.55" />
            <path d="M123,20 Q129,16 135,17" fill="none" stroke="#b0a8c4" strokeWidth="1.1" opacity="0.55" />
            <path d="M121,18 L121,32"        fill="none" stroke="#c0b8cc" strokeWidth="0.9" opacity="0.32" />
            <path d="M117,32 Q121,35 125,32" fill="none" stroke="#b8b0c8" strokeWidth="1"   opacity="0.45" />
            <path d="M115,39 Q121,43 127,39" fill="none" stroke="#b0a8c0" strokeWidth="1.1" opacity="0.5" />
            <path d="M107,16 Q121,11 135,16" fill="none" stroke="#ccc4dc" strokeWidth="1.3" opacity="0.35" />
            <ellipse cx="100" cy="26" rx="4.5" ry="7" fill="url(#sk)" />
            <ellipse cx="142" cy="26" rx="4.5" ry="7" fill="url(#sk)" />
            <path d="M100,12 Q97,2 105,-2 Q113,-5 119,0 Q122,3 121,8"   fill="none" stroke="#d4cce4" strokeWidth="3"   strokeLinecap="round" opacity="0.85" />
            <path d="M104,8 Q100,-1 109,-4 Q118,-6 123,1 Q126,5 124,10" fill="none" stroke="#ccc4dc" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
            <path d="M115,5 Q112,-4 121,-6 Q130,-5 133,2 Q135,8 132,14" fill="none" stroke="#d0c8e0" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
            <path d="M124,7 Q129,-2 137,0 Q143,4 142,11 Q140,17 135,19"  fill="none" stroke="#c8c0d8" strokeWidth="2.5" strokeLinecap="round" opacity="0.72" />
            <path d="M98,18 Q93,10 97,3 Q101,-1 107,2"                   fill="none" stroke="#c4bcd4" strokeWidth="2"   strokeLinecap="round" opacity="0.65" />
            <path d="M138,14 Q144,7 142,1 Q138,-3 132,1"                  fill="none" stroke="#c4bcd4" strokeWidth="2"   strokeLinecap="round" opacity="0.65" />
            <path d="M95,395 Q88,362 86,322 Q84,284 86,248 Q88,214 92,182 Q95,152 98,124 Q101,100 106,78 Q110,60 116,42 Q119,28 118,12" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <path d="M155,395 Q158,358 157,318 Q156,278 154,242 Q151,206 149,174 Q147,144 145,116 Q143,90 138,66 Q134,46 130,28" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="7" />
            <rect x="0" y="385" width="240" height="35" fill="url(#vig)" />
          </svg>
        </div>

        <div className="absolute inset-0 rounded-sm flex items-center justify-center bg-[#0e0c1c]" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/15 text-center leading-loose">
            David<br /><span className="opacity-60">Michelangelo · 1504</span>
          </p>
        </div>
        <div className="absolute top-0 right-0 h-full w-7 bg-gradient-to-r from-[#0e0c1a] to-[#1c1830]" style={{ transform: "rotateY(90deg) translateZ(0)", transformOrigin: "right center", backfaceVisibility: "hidden" }} />
        <div className="absolute top-0 left-0 h-full w-7 bg-gradient-to-l from-[#0e0c1a] to-[#1c1830]" style={{ transform: "rotateY(-90deg) translateZ(0)", transformOrigin: "left center", backfaceVisibility: "hidden" }} />
      </div>
    </div>
  );
}


const BUILD  = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"];
const MOTION = ["Figma", "GSAP", "Three.js", "WebGL"];
const DESIGN = ["Storyblok", "WordPress", "Shopify"];


export default function Skills({ blok }: any) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-[#141314] h-auto px-10 py-40"
    >
      <div className="mx-auto grid items-start gap-10 lg:grid-cols-5">

        <div className="col-span-3 flex flex-col gap-4">
          <h2 className="text-4xl lg:text-7xl font-extralight leading-[1.1] tracking-tight text-white">
            {blok.heading ?? "Timeless craft. Modern tools."}
          </h2>
          <p className="text-xl font-light leading-relaxed text-white/50 pb-6">
            {blok.subheading ?? "The discipline of classical craft, applied to the modern web."}
          </p>
          <div className="flex flex-col lg:flex-row gap-4">
            <GlowCard title="Stack"  items={BUILD}  glow={glowConfigs[0]} />
            <GlowCard title="Tools" items={MOTION} glow={glowConfigs[1]} />
            <GlowCard title="CMS" items={DESIGN} glow={glowConfigs[2]} />
          </div>
        </div>

        <div className="col-span-2 flex flex-col items-center gap-4 pt-4">
          <RotatingStatue />
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">
            David · Michelangelo · 1504
          </p>
        </div>

      </div>
    </section>
  );
}