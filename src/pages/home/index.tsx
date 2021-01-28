import React from "react";
import PostTeaser from "../../components/posts/PostTeaser";
import Trending from "../../components/posts/Trending";
import TrendingCommunities from "../../components/TrendingCommunities";
import { Box, Grid } from "@chakra-ui/react";

const items = [
  {
    title: "Tom Bray",
    body:
      "here is description of this post and this description should be long enough I think this is enough.",
    image:
      "https://images.unsplash.com/photo-1610944770887-c470bab58def?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8dG93SlpGc2twR2d8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60j",
    postedTo: "pewdiewpiecrew",
    postedBy: "Jorj Janson",
    votes: 150,
  },
  {
    title: "Tom Bray",
    body: "some dummy txt",
    image:
      "https://images.unsplash.com/photo-1610944770887-c470bab58def?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8dG93SlpGc2twR2d8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    postedTo: "pewdiewpiecrew",
    postedBy: "Jorj Janson",
    votes: 150,
  },
  {
    title: "Tom Bray",
    body: "some dummy txt",
    image:
      "https://images.unsplash.com/photo-1610902422826-548d3472fff5?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8dG93SlpGc2twR2d8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    postedTo: "pewdiewpiecrew",
    postedBy: "Jorj Janson",
    votes: 150,
  },
  {
    title: "Tom Bray",
    body: "some dummy txt",
    image: "https://i.ytimg.com/vi/4m8LLfLXvMM/maxresdefault.jpg",
    postedTo: "pewdiewpiecrew",
    postedBy: "Jorj Janson",
    votes: 150,
  },
];

export default function HomePage() {
  return (
    <Box mx="17%">
      <Trending items={items} />
      <Grid templateColumns="1fr 0.5fr" gap={50}>
        <Box>
          {items.map((item) => (
            <PostTeaser
              key={`${item.title}-${Date.now()}-${Math.random()}`}
              post={item}
            />
          ))}
        </Box>
        <Box>
          <TrendingCommunities />
        </Box>
      </Grid>
    </Box>
  );
}
