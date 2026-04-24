"use client";

import { useState } from "react";

type NavItem = {
  _uid: string;
  label: string;
  url: { cached_url: string } | string;
  image?: { filename: string; alt?: string };
};

export default function NavDock({ items }: { items: NavItem[] }) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 group">
      <div className="
        bg-black text-white shadow-lg
        w-[80vw] lg:w-[550px] h-12
        rounded-xl
        flex items-center justify-start px-8
        transition-all duration-500 ease-in-out overflow-hidden
        group-hover:h-[440px]
        group-hover:rounded-3xl
      ">
        <div className="group-hover:hidden text-md tracking-wide">Menu</div>

        <div className="
          absolute inset-0
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500 delay-100
          p-4
        ">
          <div className="grid grid-cols-2 gap-3 h-full">

            {/* LEFT — nav links */}
            <div className="flex flex-col h-full py-1">
              {items.map((item) => (
                <a
                  key={item._uid}
                  href={typeof item.url === "string" ? item.url : item.url?.cached_url}
                  className="hover:text-[#9de782] text-5xl pb-3"
                  onMouseEnter={() => setHoveredImage(item.image?.filename ?? null)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* RIGHT — two fixed image slots */}
            <div className="flex flex-col gap-3 h-full">

              {/* top: dropdown reveal on hover */}
              <div className="relative rounded-2xl flex-1 overflow-hidden bg-white/5">
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transform: hoveredImage ? "translateY(0%)" : "translateY(-100%)",
                    transition: "transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                >
                    
                  {hoveredImage && (
                    
                    <img
                      src={hoveredImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="absolute left-4 bottom-4 text-[#9de782] text-lg font-light">Link</div>

              {/* bottom: static red box */}
              <div className="rounded-2xl flex-1 overflow-hidden">
                
              <img
                      src={items[3].image?.filename}
                      alt=""
                      className="w-full h-full object-cover"
                    /></div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}