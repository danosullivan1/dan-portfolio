import { storyblokEditable } from "@storyblok/react";

export default function Hero({ blok }: any) {
  return (
    <section {...storyblokEditable(blok)} className="relative flex items-center justify-center min-h-[80vh] text-center px-6 bg-gray-900 text-white">
      
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl md:text-6xl text-red-800 font-bold tracking-tight">
          {blok.title}
        </h1>

        {blok.subheadline && (
          <p className="mt-6 text-lg text-gray-200">
            {blok.subheadline}
          </p>
        )}

        {blok.button_text && (
          <a
            href={blok.button_link?.url || "#"}
            className="inline-block mt-8 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition"
          >
            {blok.button_text}
          </a>
        )}
      </div>
    </section>
  );
}