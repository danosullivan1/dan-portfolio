"use client";

import { storyblokEditable } from "@storyblok/react";

export default function Intro({ blok }: any) {

  return (
    <section
  {...storyblokEditable(blok)}
  className="relative bg-white py-20 h-[70vh] overflow-hidden"
>
  <div className="relative w-full px-20">
    <div className="flex justify-end">
      <h3 className="text-5xl font-normal max-w-[700px] mix-blend-difference" style={{ color: "white" }}>
        Intro text that sits here lordh vdhjvdh ehe feved fve vfedrfv rdv frdfvrd vr dfv rfv rv rvs here Intro text tfe vrvrv rdvrd vrdvcrv crdv cv drcrdvc ecd hat sits here
      </h3>
    </div>
  </div>
</section>
  );
}