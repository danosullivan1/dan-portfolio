import "@/lib/storyblok";

import type { Metadata } from "next";
import "./globals.css";
import StoryblokProvider from "../components/StoryblokProvider";
import { difference } from "next/dist/build/utils";

import NavDock from "../components/NavDock";


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




<a href="/" className="fixed top-6 lg:top-12 left-6 lg:left-12 text-xl text-red-500 font-bold uppercase z-[100]" style={{ mixBlendMode: 'difference', color:'white'}}>Dan O'Sullivan</a>


  <NavDock items={navigation?.body ?? []} />



          {/* PAGE CONTENT */}
          <main className="flex-1">{children}</main>

          {/* FOOTER */}
          <footer className="py-0 px-6 lg:px-12 text-center text-md bg-white text-black">


<div className="flex justify-between">


<div className="flex flex-col gap-8">
  <h2 className="text-left text-gray-500 text-3xl">Contact</h2>
  <button className="bg-green-300 text-black w-fit px-6 py-2">
    Get in touch
  </button>
</div>


<div>
© {new Date().getFullYear()}



</div>



</div>



          
          </footer>
        </StoryblokProvider>

      </body>
    </html>
  );
}