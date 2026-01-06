import { client } from "./sanity";
import { token } from "./token";
import { defineLive } from "next-sanity/live";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  browserToken: token,
  serverToken: token,
});