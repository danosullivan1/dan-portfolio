import { getStoryblokApi } from "@storyblok/react/rsc";

export default async function Home() {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.get("cdn/stories/home", {
    version: "draft",
  });

  const story = data.story;

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="max-w-2xl text-center space-y-6">
        
        {/* Title */}
        <h1 className="text-5xl font-bold tracking-tight text-black">
          {story?.content?.Title}
        </h1>

        {/* Description */}
        <p className="text-lg text-black">
          {story?.content?.Description}
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center pt-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-800 transition"
          >
            View Projects
          </a>

          <a
            href="mailto:you@example.com"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-black"
          >
            Contact
          </a>
        </div>
      </div>
    </main>
  );
}