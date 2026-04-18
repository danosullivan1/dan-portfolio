"use client";

import { useState, useCallback, useEffect } from "react";

const GRID_SIZE = 8;
const HIDDEN_WORDS = ["CREATIVE", "WORD", "WEB"];

type Cell = {
  letter: string;
  highlighted: boolean;
  partOfWord: boolean;
  wordIndex: number | null;
};

type PlacedWord = {
  word: string;
  cells: [number, number][];
};

const DIRECTIONS = [
  [0, 1],   // right
  [1, 0],   // down
  [1, 1],   // diagonal down-right

  [-1, 0],  // up
];

function buildGrid(words: string[]): { grid: Cell[][]; placed: PlacedWord[] } {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const grid: Cell[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => ({
      letter: letters[Math.floor(Math.random() * letters.length)],
      highlighted: false,
      partOfWord: false,
      wordIndex: null,
    }))
  );

  const placed: PlacedWord[] = [];

  words.forEach((word, wordIdx) => {
    let success = false;
    let attempts = 0;

    while (!success && attempts < 200) {
      attempts++;
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const startRow = Math.floor(Math.random() * GRID_SIZE);
      const startCol = Math.floor(Math.random() * GRID_SIZE);
      const cells: [number, number][] = [];
      let valid = true;

      for (let i = 0; i < word.length; i++) {
        const r = startRow + dir[0] * i;
        const c = startCol + dir[1] * i;
        if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) {
          valid = false;
          break;
        }
        if (grid[r][c].partOfWord && grid[r][c].letter !== word[i]) {
          valid = false;
          break;
        }
        cells.push([r, c]);
      }

      if (valid) {
        cells.forEach(([r, c], i) => {
          grid[r][c].letter = word[i];
          grid[r][c].partOfWord = true;
          grid[r][c].wordIndex = wordIdx;
        });
        placed.push({ word, cells });
        success = true;
      }
    }
  });

  return { grid, placed };
}

export default function WordSearch() {
  const [{ grid, placed }, setGridState] = useState<{ grid: Cell[][]; placed: PlacedWord[] }>({
    grid: Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => ({
        letter: "",
        highlighted: false,
        partOfWord: false,
        wordIndex: null,
      }))
    ),
    placed: [],
  });
  
  useEffect(() => {
    setGridState(buildGrid(HIDDEN_WORDS));
  }, []);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [hovering, setHovering] = useState<Set<string>>(new Set());

  const handleMouseEnter = useCallback((r: number, c: number) => {
    setHovering((prev) => new Set(prev).add(`${r},${c}`));
    if (grid[r][c].partOfWord) {
      setRevealed((prev) => new Set(prev).add(`${r},${c}`));
    }
  }, [grid]);

  const foundWords = HIDDEN_WORDS.filter((_, i) =>
    placed[i]?.cells.every(([r, c]) => revealed.has(`${r},${c}`))
  );

  const foundWordIndices = new Set(
    HIDDEN_WORDS.map((_, i) =>
      placed[i]?.cells.every(([r, c]) => revealed.has(`${r},${c}`)) ? i : -1
    ).filter((i) => i !== -1)
  );

  return (
    <section className="bg-[#1e1e1e] py-24 min-h-screen">
      <div className="w-full px-12">

        <div className="flex gap-16 items-start">
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 4rem)` }}
          >
            
            
            
            {grid.map((row, r) =>
  row.map((cell, c) => {
    const key = `${r},${c}`;
    const isRevealed = revealed.has(key);
    const isHovering = hovering.has(key);
    const isWrong = isHovering && !cell.partOfWord;
    const isWordComplete = cell.wordIndex !== null &&
      foundWordIndices.has(cell.wordIndex);

    return (
      <div
        key={key}
        onMouseEnter={() => handleMouseEnter(r, c)}
        className="w-16 h-16 flex items-center justify-center cursor-default select-none font-mono text-sm font-medium rounded-sm transition-colors duration-150"
        style={{
          background: isRevealed
            ? isWordComplete ? "#22C55E" : "#F97316"
            : isWrong
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.04)",
          color: isRevealed ? "#fff" : "rgba(255,255,255,0.35)",
          border: isRevealed
            ? isWordComplete ? "1px solid #22C55E" : "1px solid #F97316"
            : "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {cell.letter}
      </div>
    );
  })
)}




          </div>
        </div>
      </div>
    </section>
  );
}