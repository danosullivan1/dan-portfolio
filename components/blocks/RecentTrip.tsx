"use client";

import { storyblokEditable } from "@storyblok/react";
import React from "react";

// ─── Fallback content ─────────────────────────────────────────────────────────

const FALLBACK = {
  label:       "Recent Trip",
  heading:     "Four Days in Madrid",
  description: "Chasing light across the old city, end of a long European summer.",
  location:    "Madrid, Spain",
  camera:      "Fujifilm X100VI",
  cta:         "View the photo journal",
};

const PLACEHOLDER_PHOTOS = [
  { src: "https://picsum.photos/seed/fitzroy-dawn-landscape/2000/1200" },
  { src: "https://picsum.photos/seed/ruta40-wind-landscape/2000/1200" },
  { src: "https://picsum.photos/seed/viedma-lenticular-landscape/2000/1200" },
];

// ─── Ken Burns motion presets ─────────────────────────────────────────────────

const KB_MOTIONS = [
  { from: "scale(1.05) translate(-0.8%, -0.6%)", to: "scale(1.13) translate(1.2%,  0.8%)" },
  { from: "scale(1.12) translate( 0.8%,    0%)", to: "scale(1.04) translate(-1.2%, -0.8%)" },
  { from: "scale(1.05) translate(    0%,  0.8%)", to: "scale(1.13) translate(-0.8%, -1.2%)" },
];

// ─── Slideshow hook ───────────────────────────────────────────────────────────

function useSlideshow(
  count: number,
  intervalMs = 5200
): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs]);
  return [i, setI];
}

// ─── Ken Burns stage ──────────────────────────────────────────────────────────

function KenBurnsStage({
  photos,
  active,
}: {
  photos: { src: string }[];
  active: number;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0c0c0a]">
      {photos.map((p, idx) => {
        const m = KB_MOTIONS[idx % KB_MOTIONS.length];
        const on = idx === active;
        return (
          <div
            key={idx}
            aria-hidden={!on}
            className="absolute inset-0"
            style={{
              opacity: on ? 1 : 0,
              transition: "opacity 1400ms cubic-bezier(.4,0,.2,1)",
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${p.src})`,
                transform: on ? m.to : m.from,
                transition: "transform 7200ms linear",
                willChange: "transform",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── Dots ─────────────────────────────────────────────────────────────────────

function Dots({
  count,
  active,
  onPick,
  dark = false,
}: {
  count: number;
  active: number;
  onPick: (i: number) => void;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onPick(idx)}
          aria-label={`Photo ${idx + 1}`}
          className={`h-[7px] rounded-full border-none p-0 cursor-pointer transition-all duration-300 ${
            idx === active
              ? dark ? "bg-neutral-900/90" : "bg-white/95"
              : dark ? "bg-neutral-900/25" : "bg-white/30"
          }`}
          style={{ width: idx === active ? 22 : 7 }}
        />
      ))}
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const MapPin = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="shrink-0">
    <path d="M5 11.5C5 11.5 9 7.5 9 4.6A4 4 0 0 0 1 4.6C1 7.5 5 11.5 5 11.5Z" stroke="white" strokeWidth="1" fill="none" />
    <circle cx="5" cy="4.6" r="1.1" fill="white" />
  </svg>
);

const CameraIcon = () => (
  <svg width="12" height="10" viewBox="0 0 14 12" fill="none" className="shrink-0">
    <rect x=".5" y="2.5" width="13" height="9" rx="1" stroke="white" strokeWidth="1" fill="none" />
    <path d="M4.5 2.5L5.3 1h3.4l.8 1.5" stroke="white" strokeWidth="1" fill="none" />
    <circle cx="7" cy="7" r="2.4" stroke="white" strokeWidth="1" fill="none" />
  </svg>
);

// ─── Meta block ───────────────────────────────────────────────────────────────

function MetaRight({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="text-right">
      <p className="text-[10px] tracking-[0.24em] uppercase text-white/60 mb-1 font-medium font-sans">
        {label}
      </p>
      <div className="text-[13px] text-white/95 font-sans">{children}</div>
    </div>
  );
}

// ─── CTA button ───────────────────────────────────────────────────────────────

function CtaButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href} style={{
        fontFamily: "'Fraunces', Georgia, serif"}}
      className="group inline-flex items-center gap-3.5 bg-white text-black hover:border-white/55 px-6 py-4 text-lg font-medium tracking-wide transition-all duration-240"
    >
      <span>{label}</span>
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#14130f]">
        <svg
          width="16" height="10" viewBox="0 0 18 10" fill="none"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <path
            d="M1 5h16M12 1l5 4-5 4"
            stroke="#14130f" strokeWidth="1.2"
            fill="none" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}

// ─── Storyblok component ──────────────────────────────────────────────────────

export default function RecentTrip({ blok }: any) {
  const imageUrl = blok.image?.filename ?? null;
  const photos   = imageUrl ? [{ src: imageUrl }] : PLACEHOLDER_PHOTOS;

  const [i, setI] = useSlideshow(photos.length);

  const label       = blok.label       ?? FALLBACK.label;
  const heading     = blok.heading     ?? FALLBACK.heading;
  const description = blok.description ?? FALLBACK.description;
  const location    = blok.location    ?? FALLBACK.location;
  const camera      = blok.camera      ?? FALLBACK.camera;
  const cta         = blok.cta         ?? FALLBACK.cta;

  return (
    <section
      {...storyblokEditable(blok)}
      className="h-auto py-0"
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..700,0..100;1,9..144,300..700,0..100&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');`}</style>

      <div className="bg-[#f6f3ec] px-12 py-8 lg:py-32">

        {/* 21:9 hero */}
        <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: "21/9" }}>
          <KenBurnsStage photos={photos} active={i} />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 55%, rgba(0,0,0,.85) 100%)",
            }}
          />

          {/* Top row — label + counter */}
          <div className="absolute top-7 left-9 right-9 flex justify-between items-center text-white/95">
            <div className="inline-flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase font-semibold font-sans">
              <span className="w-5 h-px bg-red-800" />
              {label}
            </div>
          </div>

          {/* Bottom row — heading + meta + CTA */}
          <div
            className="absolute left-9 right-9 bottom-8 text-white grid gap-10 items-end"
            style={{ gridTemplateColumns: "1.6fr 1fr" }}
          >
            {/* Left — heading + description */}
            <div>
              <h2
                className="m-0 text-white font-light leading-[0.98] tracking-tight"
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "clamp(2.2rem, 5vw, 4.75rem)",
                }}
              >
                {heading}
              </h2>
              <p
                className="mt-3.5 mb-0 text-white/88 font-light leading-snug max-w-[52ch]"
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                }}
              >
                {description}
              </p>
            </div>

            {/* Right — meta + CTA */}
            <div className="flex flex-col items-end gap-4">
              <div className="flex gap-7 items-end">
                <MetaRight label="Where">
                  <span className="inline-flex items-center gap-1.5">
                    {location}
                  </span>
                </MetaRight>
                <MetaRight label="Shot on">
                  <span className="inline-flex items-center gap-1.5">
                    {camera}
                  </span>
                </MetaRight>
              </div>
              <CtaButton label={cta} href={blok.ctaHref ?? "/"} />
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-end pt-4">
          <Dots count={photos.length} active={i} onPick={setI} dark={false} />
        </div>

      </div>
    </section>
  );
}