import "@/lib/storyblok";

import type { Metadata } from "next";
import "./globals.css";
import StoryblokProvider from "../components/StoryblokProvider";
import { difference } from "next/dist/build/utils";

export const metadata: Metadata = {
  title: "Title",
  description: "Title",
};

async function getNavigation() {
  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/navigation?token=${process.env.NEXT_PUBLIC_STORYBLOK_TOKEN}`,
    { next: { revalidate: 60 } }
  );

  const json = await res.json();
  return json.story.content;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  
}) {
  const navigation = await getNavigation();
  return (
    
    <html lang="en">
      <body className="min-h-screen relative flex flex-col bg-white text-black">

        <StoryblokProvider>




<a href="/" className="fixed top-6 lg:top-12 left-6 lg:left-12 text-xl text-red-500 font-bold uppercase z-[100]" style={{ mixBlendMode: 'difference', color:'white'}}>Text</a>



{/* EXPANDING BOTTOM DOCK */}
<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 group">

  <div
    className="
      bg-black text-white shadow-lg
      w-[80vw] lg:w-[550px] h-12
      rounded-xl
      flex items-center justify-start px-8
      transition-all duration-500 ease-in-out overflow-hidden

      group-hover:h-[440px]
      group-hover:rounded-3xl
      group-hover:p-4
    "
  >


    <div className="group-hover:hidden text-md tracking-wide">
      Menu
    </div>

    <div
      className="
        absolute inset-0
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500 delay-100
        p-4
      "
    >
      <div className="grid grid-cols-2 gap-8 h-full">

  <div className="flex flex-col gap-4 text-5xl">
  {navigation?.body?.map((item: any) => (
    <a
      key={item._uid}
      href={item.url?.cached_url || item.url}
      className="hover:text-blue-300 border-b border-white/40"
    >
      {item.label}
    </a>
  ))}
</div>

      
<div className="flex flex-col gap-3 w-full h-full">
  {
    navigation?.body?.map((item: any) => (
    <a
      key={item._uid}
      href={item.url?.cached_url || item.url}
       className="relative overflow-hidden rounded-2xl flex-1 group/item">
    
      {item.image?.filename && (
        <img
          src={item.image.filename}
          alt={item.image.alt || item.label}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

      <span className="relative z-10 flex items-center justify-center h-full text-white font-bold text-lg">
        {item.label}
      </span>
    </a>
  ))}
</div>

</div>
      </div>
    </div>

  </div>




          {/* PAGE CONTENT */}
          <main className="flex-1">{children}</main>

          {/* FOOTER */}
          <footer className="border-t py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()}
          </footer>
        </StoryblokProvider>

      </body>
    </html>
  );
}