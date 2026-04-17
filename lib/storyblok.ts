import { storyblokInit, apiPlugin, StoryblokComponent } from "@storyblok/react";
import Hero from "@/components/blocks/Hero";
import Intro from "@/components/blocks/Intro";
import ProjectsSmall from "@/components/blocks/ProjectsSmall";
import CTA from "@/components/blocks/CTA";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || "",
  use: [apiPlugin],
  components: {
    hero: Hero,
    intro: Intro,
    projectssmall: ProjectsSmall,
    cta: CTA,
  },
});