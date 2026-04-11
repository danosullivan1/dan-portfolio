import { storyblokInit, apiPlugin, StoryblokComponent } from "@storyblok/react";
import Hero from "@/components/blocks/Hero";

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN || "",
  use: [apiPlugin],
  components: {
    hero: Hero,
  },
});