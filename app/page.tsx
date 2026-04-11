export default async function Home() {
  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/home?token=${process.env.STORYBLOK_TOKEN}&version=draft`,
    { next: { revalidate: 0 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Storyblok data");
  }

  const data = await res.json();
  const story = data.story;

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        {story?.content?.Title}
      </h1>

      <p className="mt-4 text-gray-600">
        {story?.content?.Description}
      </p>
    </main>
  );
}