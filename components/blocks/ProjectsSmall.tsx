"use client";

import { useEffect, useRef } from "react";
import { storyblokEditable } from "@storyblok/react";

export default function ProjectsSmall({ blok }: any) {
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

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

  return (
    <section {...storyblokEditable(blok)} className="bg-[#1e1e1e] py-24">
      <div className="w-full px-6 lg:px-12">

<div className="flex justify-between items-center mb-12">
        <div className="">
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
                <h3 className="text-3xl font-serif font-normal text-white mb-2">
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
  );
}