import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN || "",
  use: [apiPlugin],
});