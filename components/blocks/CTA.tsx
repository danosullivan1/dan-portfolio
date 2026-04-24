"use client";

import { storyblokEditable } from "@storyblok/react";

export default function CTA({ blok }: any) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="relative bg-[#0e0d0b] overflow-hidden px-6 lg:px-12 py-16 flex flex-col justify-between"
    >


    </section>
  );
}