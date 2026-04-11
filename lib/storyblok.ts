import { storyblokInit, apiPlugin, StoryblokComponent } from "@storyblok/react";
import Hero from "@/components/blocks/Hero";
import Grid from "@/components/blocks/Grid";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || "",
  use: [apiPlugin],
  components: {
    hero: Hero,
    grid: Grid
  },
});