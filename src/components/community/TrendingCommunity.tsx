import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { CommunityType } from "../../types";
import LoginModal from "../form-modals/LoginModal";
import Join from "./Join";

export const TrendingCommunity: React.FC<{ community: CommunityType }> = ({
  community,
}) => {
  const user = useContext(UserContext);
  const [joined, setJoined] = useState<boolean>(false);
  const [joinedNumber, setJoinedNumber] = useState<number>(0);
  const [loginModal, setLoginModal] = useState<boolean>(false);

  useEffect(() => {
    if (user?.joined) {
      user.joined.forEach((joinedCommunity) => {
        if (joinedCommunity._id === community._id) {
          setJoined(true);
        }
      });
    }
    setJoinedNumber(community.members.length);
  }, [user]);

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
          r/{community.name}
        </Text>
        <Text fontSize={10}>{joinedNumber} Members</Text>
      </Box>
      <Join user={user} community={community} />
      <LoginModal setShowModal={setLoginModal} showModal={loginModal} />
    </Flex>
  );
};
