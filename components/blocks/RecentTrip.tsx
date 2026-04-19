"use client";
import { storyblokEditable } from "@storyblok/react";
import { useRef, useCallback } from "react";

const COLS = 20;
const ROWS = 8;

const WORDS: { word: string; row: number; col: number }[] = [
  { word: "hello", row: 2, col: 3 },
  { word: "world", row: 5, col: 4 },
];

function buildGrid() {
  const cells = Array(COLS * ROWS).fill("a");
  WORDS.forEach(({ word, row, col }) => {
    [...word].forEach((char, i) => {
      const index = row * COLS + col + i;
      if (index < COLS * ROWS) cells[index] = char;
    });
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
        cell.style.color = "#ff4500";
        cell.style.fontWeight = "900";
      } else if (ring === 1) {
        cell.style.color = "#ff9900";
        cell.style.fontWeight = "700";
      } else if (ring === 2) {
        cell.style.color = "#ffdd00";
        cell.style.fontWeight = "500";
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
      className="h-screen bg-black text-white py-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: "8px" }}>
        {baseCells.map((char, i) => (
          <div
            className="text-8xl font-bold"
            key={i}
            ref={(el) => { cellRefs.current[i] = el; }}
            style={{ transition: "color 0.3s ease, font-weight 0.3s ease", color: "white", fontWeight: "400" }}
          >
            {char}
          </div>
        ))}
      </div>
    </section>
  );
}