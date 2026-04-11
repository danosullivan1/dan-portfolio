import { storyblokEditable } from "@storyblok/react";

export default function Grid({ blok }: any) {
  return (
    <section {...storyblokEditable(blok)} className="bg-[#1e1e1e] py-24">
      <div className="mx-auto w-full lg:max-w-screen-lg">

        <div className="pb-6 mb-12">
          <h2 className="text-6xl font-serif font-normal text-white">
            Heading
          </h2>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-6 min-h-140">

          <div className="col-span-1 row-span-2 bg-gray-950 text-white p-8 flex flex-col justify-between rounded-2xl">
            <span className="text-3xl">✦</span>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-serif font-normal">Strategy</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Lorem We help you define a clear direction, aligning your goals with a focused digital strategy that delivers results.
              </p>
            </div>
          </div>

          {/* Item 2 — top right wide */}
          <div className="col-span-2 row-span-1 bg-orange-500 p-8 flex flex-col justify-between rounded-2xl">
            <span className="text-3xl">◎</span>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-serif font-normal text-gray-900">
                Design
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Pixel-perfect interfaces crafted with intention. Every detail considered.
              </p>
            </div>
          </div>

          {/* Item 3 — bottom middle */}
          <div className="col-span-1 row-span-1 bg-gray-100 p-8 flex flex-col justify-between rounded-2xl">
            <span className="text-3xl">⟡</span>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-serif font-normal text-gray-900">
                Development
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Clean, performant code built on modern frameworks.
              </p>
            </div>
          </div>

          {/* Item 4 — bottom right */}
          <div className="col-span-1 row-span-1 bg-gray-950 text-white p-8 flex flex-col justify-between rounded-2xl">
            <span className="text-3xl">◈</span>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-serif font-normal">
                Motion
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Thoughtful animation that brings interfaces to life.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}