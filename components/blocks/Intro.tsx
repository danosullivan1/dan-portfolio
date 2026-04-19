"use client";

import { storyblokEditable } from "@storyblok/react";
import { useEffect, useRef } from "react";

export default function Intro({ blok }: any) {
  const zoneRef = useRef<HTMLElement>(null);
  const lastSpawn = useRef(0);
  const imageIndex = useRef(0);
  const trailImagesRef = useRef<string[]>([]);

  // keep the ref updated without causing effect re-runs
  trailImagesRef.current = (blok.trail_images ?? [])
    .map((item: any) => item.image?.filename)
    .filter(Boolean);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    const handleMove = (e: MouseEvent) => {
      const images = trailImagesRef.current;
      if (images.length === 0) return;

      const now = Date.now();
      if (now - lastSpawn.current < 120) return;
      lastSpawn.current = now;

      const rect = zone.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const src = images[imageIndex.current % images.length];
      imageIndex.current++;

      const el = document.createElement("img");
      el.src = src;
      el.style.cssText = `
        position: absolute;
        left: ${x - 60}px;
        top: ${y - 60}px;
        width: 190px;
        height: 240px;
        object-fit: cover;
        border-radius: 12px;
        pointer-events: none;
        z-index: 0;
        animation: trail-fall 1.9s ease-out forwards;
      `;
      zone.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    };

    zone.addEventListener("mousemove", handleMove);
    return () => zone.removeEventListener("mousemove", handleMove);
  }, []); // runs once, reads latest images via ref

  return (
    <>
      <style>{`
        @keyframes trail-fall {
  0%   { transform: translateY(0px)   scale(1);    opacity: 1; }
  60%  { transform: translateY(120px) scale(1);  opacity: 0.9; }
   90% { transform: translateY(200px) scale(1); opacity: 0.9; }
  100% { transform: translateY(340px) scale(1); opacity: 0; }
}
      `}</style>

      <section
        {...storyblokEditable(blok)}
        ref={zoneRef}
        className="relative bg-white py-20 h-full lg:h-[70vh] overflow-hidden cursor-crosshair"
      >
        <div className="relative w-full px-16">
          <div className="flex justify-end">
            <h3
              className="text-6xl font-normal max-w-[700px]"
              style={{
                color: "white",
                mixBlendMode: "difference",
                position: "relative",
                zIndex: 10,
              }}
            >
              {blok.intro_text} text here example intro text that text here example intro text that text here example intro text that text here
            </h3>
          </div>
        </div>
      </section>
    </>
  );
}