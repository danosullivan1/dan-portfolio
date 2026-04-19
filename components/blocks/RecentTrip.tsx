"use client";
import { storyblokEditable } from "@storyblok/react";
import { useRef, useCallback } from "react";

const COLS = 27;
const ROWS = 6;

function buildGrid() {
  const pattern = ["d", "a", "n"];
  const cells = Array.from({ length: COLS * ROWS }, (_, i) => {
    return pattern[i % pattern.length];
  });
  return cells;
}

const baseCells = buildGrid();

export default function RecentTrip({ blok }: any) {
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;

    let closestIndex = 0;
    let closestDist = Infinity;

    cellRefs.current.forEach((cell, i) => {
      if (!cell) return;
      const rect = cell.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(clientX - cx, clientY - cy);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    const row = Math.floor(closestIndex / COLS);
    const col = closestIndex % COLS;

    cellRefs.current.forEach((cell, i) => {
      if (!cell) return;
      const r = Math.floor(i / COLS);
      const c = i % COLS;
      const dr = Math.abs(r - row);
      const dc = Math.abs(c - col);
      const ring = Math.max(dr, dc);

      if (ring === 0) {
        cell.style.color = "#b6fcb6"; // orange-red
        cell.style.fontWeight = "900";
      } else if (ring === 1) {
        cell.style.color = "#ff9900"; // orange
        cell.style.fontWeight = "700";
      } else if (ring === 2) {
        cell.style.color = "#ffdd00"; // yellow
        cell.style.fontWeight = "500";
      } else if (ring === 3) {
        cell.style.color = "#66ccff"; // light blue
        cell.style.fontWeight = "400";
      } else if (ring === 4) {
        cell.style.color = "#b6fcb6"; // pale green
        cell.style.fontWeight = "400";
      } else if (ring === 5) {
        cell.style.color = "#d8b6ff"; // light purple
        cell.style.fontWeight = "400";
      } else {
        cell.style.color = "white";
        cell.style.fontWeight = "400";
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    cellRefs.current.forEach((cell, i) => {
      if (!cell) return;
      cell.style.color = "white";
cell.style.fontWeight = "400";
    });
  }, []);

  return (
    <section
      {...storyblokEditable(blok)}
      className="h-auto bg-black text-white py-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: "3px" }}>
        {baseCells.map((char, i) => (
          <div
            className="text-8xl font-bold"
            key={i}
            ref={(el) => { cellRefs.current[i] = el; }}
            style={{ transition: "color 0.3s ease, font-weight 0.3s ease", color: "ffdd00", fontWeight: "400" }}
          >
            {char}
          </div>
        ))}
      </div>
    </section>
  );
}