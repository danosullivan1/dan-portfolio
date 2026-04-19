"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import Hero from "@/components/blocks/Hero";
import Intro from "@/components/blocks/Intro";
import ProjectsSmall from "@/components/blocks/ProjectsSmall";
import CTA from "@/components/blocks/CTA";
import Wordsearch from "./blocks/Wordsearch";
import RecentTrip from "@/components/blocks/RecentTrip";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN!,
  use: [apiPlugin],
  components: {
    hero: Hero,
    intro: Intro,
    projectssmall: ProjectsSmall,
    cta: CTA,
    wordsearch: Wordsearch,
    recenttrip: RecentTrip,
  },
});

export default function StoryblokProvider({ children }: any) {
  return children;
}