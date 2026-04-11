"use client";

import { useEffect } from "react";
import { useStoryblokBridge } from "@storyblok/react";

export default function StoryblokLive({ story, children }: any) {
  useEffect(() => {
    if (!story?.id) return;

    useStoryblokBridge(story.id, () => {
      window.location.reload();
    });
  }, [story?.id]);

  return children;
}