export default function Hero({ blok }: any) {
    return (
      <section className="relative h-screen w-full flex items-center justify-center text-center text-white">
  
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src={blok.image?.filename}
            alt={blok.image?.alt || "Hero image"}
            className="w-full h-full object-cover"
          />
  
          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
  
        {/* CONTENT CONTAINER */}
        <div className="relative z-10 max-w-3xl px-6">
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            {blok.headline}
          </h1>
  
          <p className="mt-6 text-lg text-white/80">
            {blok.subheadline}
          </p>
  
        </div>
  
      </section>
    );
  }