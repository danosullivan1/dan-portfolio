import { storyblokEditable } from "@storyblok/react";

export default function Hero({ blok }: any) {
  return (
    <section {...storyblokEditable(blok)} className="relative flex items-center justify-center min-h-[80vh] text-center px-6 bg-gray-900 text-white">
      
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl md:text-6xl text-white font-bold tracking-tight">
          {blok.Heading}
        </h1>

        {blok.Description && (
          <p className="mt-6 text-lg text-gray-200">
            {blok.Description}
          </p>
        )}

        {blok.Link && (
  <a className="text-xl text-white" href={blok.Link.url}>link text</a>
)}
      </div>
    </section>
  );
}