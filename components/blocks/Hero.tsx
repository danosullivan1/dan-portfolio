import { storyblokEditable } from "@storyblok/react";

export default function Hero({ blok }: any) {
  return (
    <section {...storyblokEditable(blok)} className="relative flex items-end justify-center h-screen text-center px-6 py-24 bg-black text-white">
      
      <div className="absolute inset-0 left-0 bottom-0 bg-[#15640e]" />

      <div className="relative z-1 w-full max-w-10/12 lg:max-w-screen-2xl">
        <h1 className="text-5xl md:text-6xl text-white tracking-tight text-left pb-8">
          {blok.Heading}
        </h1>

        {blok.Description && (
          <p className="text-6xl text-white text-left">
            {blok.Description}
          </p>
        )}
      </div>
    </section>
  );
}