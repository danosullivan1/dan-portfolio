import PageRenderer from "@/components/PageRenderer";
import StoryblokLive from "@/components/StoryblokLive";

export default async function About() {
  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/home?token=${process.env.NEXT_PUBLIC_STORYBLOK_TOKEN}&version=draft`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const story = data.story;

  return (
    <StoryblokLive story={story}>
      <PageRenderer story={story} />
    </StoryblokLive>
  );
}