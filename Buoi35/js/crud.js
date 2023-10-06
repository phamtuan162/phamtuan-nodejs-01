import { config } from "./config.js";
import { client } from "./client.js";
import { renderPosts } from "./renderUi.js";
const { SERVER_API } = config;

export const getPosts = async (query = {}, isLoading) => {
  const queryString = new URLSearchParams(query).toString();
  const { data } = await client.get(`/posts?${queryString}`);
  if (!isLoading) renderPosts(data);
  return data;
};
