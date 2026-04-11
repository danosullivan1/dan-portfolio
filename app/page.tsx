export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Container */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        
        {/* HERO */}
        <section className="mb-20">

          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Hey, I’m Dan 👋
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            this is a storyblok website
          </p>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>

          <p className="text-gray-600 mb-4">
            Want to collaborate or chat about a project?
          </p>

          <a
            href="mailto:your@email.com"
            className="text-blue-600 hover:underline"
          >
            your@email.com
          </a>
        </section>

      </div>
    </main>
  );
}