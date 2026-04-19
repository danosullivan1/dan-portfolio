"use client";

import { storyblokEditable } from "@storyblok/react";
import { useEffect, useRef } from "react";

export default function Intro({ blok }: any) {
  const zoneRef = useRef<HTMLElement>(null);
  const lastSpawn = useRef(0);
  const imageIndex = useRef(0);
  const trailImagesRef = useRef<string[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

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

      const rect = zone.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate direction vector from last position
      let dx = 0;
      let dy = 0;
      if (lastPos.current) {
        dx = x - lastPos.current.x;
        dy = y - lastPos.current.y;

        // Normalise and scale to a gentle glide distance
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const glide = 120;
        dx = (dx / len) * glide;
        dy = (dy / len) * glide;
      }

      lastPos.current = { x, y };
      lastSpawn.current = now;

      const src = images[imageIndex.current % images.length];
      imageIndex.current++;

      // Unique animation name so each image gets its own keyframe
      const id = `glide-${Date.now()}-${Math.random().toString(36).slice(2)}`;

      const style = document.createElement("style");
      style.textContent = `
        @keyframes ${id} {
          0%   { transform: translate(0px, 0px)               scale(1);    opacity: 1; }
          60%  { transform: translate(${dx * 0.6}px, ${dy * 0.6}px) scale(1);    opacity: 1; }
          90%  { transform: translate(${dx * 0.9}px, ${dy * 0.9}px) scale(1);  opacity: 1; }
          100% { transform: translate(${dx}px, ${dy}px)       scale(1); opacity: 0; }
        }
      `;
      document.head.appendChild(style);

      const el = document.createElement("img");
      el.src = src;
      el.style.cssText = `
        position: absolute;
        left: ${x - 95}px;
        top: ${y - 120}px;
        width: 190px;
        height: 240px;
        object-fit: cover;
        border-radius: 12px;
        pointer-events: none;
        z-index: 0;
        animation: ${id} 1.9s ease-out forwards;
      `;
      zone.appendChild(el);

      el.addEventListener("animationend", () => {
        el.remove();
        style.remove();
      });
    };

    zone.addEventListener("mousemove", handleMove);
    return () => zone.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        ref={zoneRef}
        className="relative bg-white py-60 lg:py-20 h-full lg:h-[70vh] overflow-hidden cursor-crosshair"
      >
        <div className="relative w-full px-6 lg:px-16">
          <div className="flex justify-end">
            <h3
              className="text-4xl lg:text-6xl font-normal max-w-[700px]"
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