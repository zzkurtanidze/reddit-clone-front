import React from "react";
import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { getCommunity, joinCommunity } from "../../api";
import { UserContext } from "../../context/UserContext";
import { CommunityType } from "../../types";

export const TrendingCommunity: React.FC<{ community: CommunityType }> = ({
  community,
}) => {
  const user = useContext(UserContext);
  const [joined, setJoined] = useState<boolean>(false);
  const [joinedNumber, setJoinedNumber] = useState<number>(0);

  useEffect(() => {
    if (user?.joined) {
      user.joined.forEach((joinedCommunity) => {
        if (joinedCommunity._id === community._id) {
          setJoined(true);
        }
      });
      setJoinedNumber(community.members.length);
    }
  }, [user]);

  const fetchCommunity = async () => {
    const response = await getCommunity(community._id);
    if (response.statusText === "OK") {
    }
  };

  const handleJoin = async () => {
    const response = await joinCommunity(community._id);
    if (response.statusText === "OK") {
      setJoined(!joined);
      setJoinedNumber((number) => (joined ? number - 1 : number + 1));
      fetchCommunity();
    }
  };

  return (
    <Flex gridGap={3}>
      {community.image && (
        <Image
          className="loading-image"
          w={8}
          h={8}
          borderRadius="50%"
          src={community.image}
        />
      )}
      <Box>
        <Text
          letterSpacing={-0.2}
          textOverflow="ellipsis"
          noOfLines={1}
          fontWeight="bold"
          fontSize={12}
        >
          r/{community.name}...
        </Text>
        <Text fontSize={10}>{joinedNumber} Members</Text>
      </Box>
      <Button
        px={50}
        py="8px"
        h="max-content"
        fontSize={14}
        borderRadius={50}
        bg={joined ? "#e2e2e2" : "#1384D7"}
        color={joined ? "black" : "white"}
        _hover={{
          backgroundColor: joined ? "#c9c9c9" : "#3c9ce0",
        }}
        onClick={handleJoin}
      >
        {joined ? "Joined" : "Join"}
      </Button>
    </Flex>
  );
};
