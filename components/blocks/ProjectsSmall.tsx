"use client";

import { useEffect, useRef, useState } from "react";
import { storyblokEditable } from "@storyblok/react";

export default function ProjectsSmall({ blok }: any) {
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      imageRefs.current.forEach((img) => {
        if (!img) return;
        const rect = img.parentElement!.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const offset = (centerY - viewportCenter) * 0.08;
        img.style.transform = `translateY(${offset}px) scale(1.2)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* custom cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: cursorVisible ? 1 : 0,
          // transition: "opacity 0.2s ease",
        }}
      >
        <div style={{
          color: "#C4E750",
          padding: "8px 14px",
          fontSize: "34px",
          fontWeight: 500,
          letterSpacing: "0.05em",
          borderRadius: "0px",
          whiteSpace: "nowrap",
        }}>
          View
        </div>
      </div>

      <section
        {...storyblokEditable(blok)}
        className="bg-[#1e1e1e] py-24"
        style={{ cursor: cursorVisible ? "none" : "auto" }}
      >
        <div className="w-full px-6 lg:px-12">

          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-5xl font-normal text-white">
                {blok.heading}Heading here
              </h1>
            </div>
            <div className="text-white text-2xl">See all</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-2">
            {blok.cards?.map((card: any, index: number) => (
              <div
                key={card._uid}
                className={`${index === 2 ? "col-span-1 lg:col-span-2" : "col-span-1"} flex flex-col`}
                onMouseEnter={() => setCursorVisible(true)}
                onMouseLeave={() => setCursorVisible(false)}
                style={{ cursor: "none" }}
              >
                <div className="overflow-hidden h-[450px]">
                  <img
                    ref={(el) => { imageRefs.current[index] = el; }}
                    src={card.image?.filename}
                    alt={card.title}
                    className="w-full h-full object-cover transition-none"
                    style={{ willChange: "transform" }}
                  />
                </div>
                <div className="pt-5">
                  <h3 className="text-4xl font-serif font-normal text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-lg text-white font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}