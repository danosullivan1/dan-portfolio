"use client";

import { useEffect, useRef } from "react";
import { storyblokEditable } from "@storyblok/react";

const colorMap = new Map<string, string>();

export default function Globe({ blok }: any) {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const init = async () => {
      const mod = await import("globe.gl");
      const Globe = mod.default as any;

      const res = await fetch("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson");
      const countries = await res.json();

      const countryColors: Record<string, string> = {
        "United Kingdom": "#C9A84C",
        "France": "#C9A84C",
        "Germany": "#C9A84C",
        "Spain": "#C9A84C",
        "Italy": "#C9A84C",
        "Portugal": "#C9A84C",
        "Netherlands": "#C9A84C",
        "Belgium": "#C9A84C",
        "Switzerland": "#C9A84C",
        "Austria": "#C9A84C",
        "Czechia": "#C9A84C",
        "Bulgaria": "#C9A84C",
        "Greece": "#C9A84C",
        "Sweden": "#C9A84C",
        "Denmark": "#C9A84C",
        "Ireland": "#C9A84C",
        "Croatia": "#C9A84C",
        "Montenegro": "#C9A84C",
      };

      const globe = Globe()(globeRef.current!)
        .backgroundColor("rgba(0,0,0,0)")
        .backgroundImageUrl(null)
        .showAtmosphere(false)
        .globeImageUrl(null)
        .width(900)
        .height(900)
        .polygonsData(countries.features)
        .polygonCapColor((d: any) => {
          const name = d.properties.NAME;
          if (!colorMap.has(name)) {
            const color = countryColors[name] ?? "#2C4A2E";
            colorMap.set(name, color);
          }
          return colorMap.get(name)!;
        })
        .polygonSideColor(() => "rgba(0,0,0,0)")
        .polygonStrokeColor(() => "#ffffff")
        .polygonAltitude(0.005);

      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.6;
      globe.controls().enableZoom = false;
      globe.controls().minPolarAngle = Math.PI / 2;
      globe.controls().maxPolarAngle = Math.PI / 2;
      globe.pointOfView({ lat: 30, lng: 10, altitude: 2 });

globe.scene().rotation.x = 0.2;
setTimeout(() => {
  const globeMesh = globe.scene().children.find((obj: any) => obj.type === "Mesh");
  if (globeMesh) {
    (globeMesh as any).material.color.set("#0A1A3A");
  }
}, 100);

      const globeMesh = globe.scene().children.find((obj: any) => obj.type === "Mesh");
      if (globeMesh) {
        (globeMesh as any).material.color.set("#0A1A3A");
      }
    };

    init();
  }, []);

  return (
    <section
      {...storyblokEditable(blok)}
      className="relative bg-blue-200 py-20 h-[70vh] overflow-hidden flex items-center"
    >
      <div className="w-full px-12">
        <h3 className="text-5xl font-normal text-black max-w-[500px]">
          {blok.heading || "Heading goes here"}
        </h3>
      </div>

      <div
        ref={globeRef}
        className="absolute right-[-150px] top-1/2 -translate-y-1/2 mt-20"
      />
    </section>
  );
}