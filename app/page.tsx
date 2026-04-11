import { getStoryblokApi } from "@storyblok/react/rsc";

export default async function Home() {
  const storyblokApi = getStoryblokApi();

  if (!process.env.STORYBLOK_TOKEN) {
    throw new Error("Missing STORYBLOK_TOKEN");
  }

  const { data } = await storyblokApi.get("cdn/stories/home", {
    version: "draft",
  });

  const story = data?.story;

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