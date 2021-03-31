import { Box, SimpleGrid, Text } from "@chakra-ui/react";
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
      <SimpleGrid my="20px" gap="10px" columns={[2, 2, 3, 4]}>
        {items &&
          items.length >= 1 &&
          items.map((item: PostType) => (
            <TrendingItem key={item._id} item={item} />
          ))}
      </SimpleGrid>
    </Box>
  );
}
