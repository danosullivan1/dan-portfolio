import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
});

export default async function Home() {
  const { getStoryblokApi } = await import("@storyblok/react/rsc");

  const storyblokApi = getStoryblokApi();

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