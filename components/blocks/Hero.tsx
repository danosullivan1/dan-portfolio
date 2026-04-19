import { storyblokEditable } from "@storyblok/react";

export default function Hero({ blok }: any) {
  return (
    <section {...storyblokEditable(blok)} className="relative flex items-center justify-center h-screen text-center px-6 py-8 bg-black text-white">
      
      <div className="absolute inset-0 left-0 top-1/2 bg-black" />

      <div className="relative z-1 w-full max-w-10/12 lg:max-w-screen-2xl">
        <h1 className="text-3xl lg:text-5xl md:text-6xl text-white tracking-tight text-left pb-2 lg:pb-4">
          {blok.Heading}
        </h1>

        {blok.Description && (
          <p className="text-3xl lg:text-5xl text-white text-left">
            {blok.Description}
          </p>
        )}
      </div>
    </section>
  );
}