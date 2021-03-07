import { Box, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { PostType } from "../../types/index";
import TrendingItem from "./TrendingItem";

export default function Trending({ items }: { items: PostType[] }) {
  return (
    <Box my="50px">
      {items.length > 1 && (
        <Text fontSize={14} fontWeight="bold">
          Trending today
        </Text>
      )}
      <Grid my="20px" gap="10px" templateColumns="repeat(4, 1fr)">
        {items &&
          items.length >= 1 &&
          items.map((item: PostType) => (
            <TrendingItem key={item._id} item={item} />
          ))}
      </Grid>
    </Box>
  );
}
