import { storyblokInit, apiPlugin, StoryblokComponent } from "@storyblok/react";
import Hero from "@/components/blocks/Hero";
import Intro from "@/components/blocks/Intro";
import ProjectsSmall from "@/components/blocks/ProjectsSmall";
import CTA from "@/components/blocks/CTA";
import Wordsearch from "@/components/blocks/Wordsearch";
import RecentTrip from "@/components/blocks/RecentTrip";
import Skills from "@/components/blocks/Skills";
import Globe from "@/components/blocks/Globe";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || "",
  use: [apiPlugin],
  components: {
    hero: Hero,
    intro: Intro,
    projectssmall: ProjectsSmall,
    cta: CTA,
    wordsearch: Wordsearch,
    recenttrip: RecentTrip,
    skills: Skills,
    globe: Globe
  },
});