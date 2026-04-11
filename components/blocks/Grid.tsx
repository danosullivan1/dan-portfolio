import { storyblokEditable } from "@storyblok/react";

export default function Grid({ blok }: any) {
  return (
    <section {...storyblokEditable(blok)} className="relative flex items-center justify-center min-h-[80vh] text-center px-6 bg-gray-900 text-white">
      
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 max-w-3xl">


<h1 className="text-black text-3xl uppercase">text</h1>



      </div>
    </section>
  );
}