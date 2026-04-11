import { StoryblokComponent } from "@storyblok/react";

export default function PageRenderer({ story }: any) {
  return (
    <main className="min-h-screen">
      {story?.content?.body?.map((blok: any) => (
        <StoryblokComponent blok={blok} key={blok._uid} />
      ))}
    </main>
  );
}