export default function PageRenderer({ story }: { story: any }) {
    return (
      <main className="min-h-screen bg-white text-black">
        
        {/* HERO */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-32">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            {story?.content?.Title || "Your Name"}
          </h1>
  
          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            {story?.content?.Description || "Building modern web apps with Next.js"}
          </p>
  
          <div className="mt-8 flex gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Button
            </a>
  
            <a
              href="#contact"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Contact
            </a>
          </div>
        </section>
  
        {/* ABOUT */}
        <section className="max-w-3xl mx-auto px-6 py-20 border-t">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-gray-600 leading-relaxed">
            {story?.content?.Description || "this is a storyblok site"}
          </p>
        </section>
  
      </main>
    );
  }