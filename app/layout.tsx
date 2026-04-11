import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My Storyblok powered portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-black">

        {/* NAV */}
        <header className="w-full border-b">
          <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

            <a href="/" className="font-bold text-lg">
              
            </a>

            <div className="flex gap-6 text-sm">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a href="/about" className="hover:underline">
                About
              </a>
              <a href="/posts" className="hover:underline">
                Posts
              </a>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </div>

          </nav>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="border-t py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()}
        </footer>

      </body>
    </html>
  );
}