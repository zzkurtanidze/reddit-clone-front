import React from "react";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { CommunityType } from "../../types";
import LoginModal from "../form-modals/LoginModal";
import Join from "./Join";
import CommunityPicture from "./CommunityPicture";

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
    <Flex>
      {community && (
        <Link
          _focus={{}}
          _active={{}}
          w="16%"
          h="16%"
          href={`/r/${community.name.split(" ").join("")}`}
        >
          <CommunityPicture
            communityName={community.name}
            imageSrc={community.image}
            width="35px"
          />
        </Link>
      )}
      <Box>
        <Link
          _focus={{}}
          href={`/r/${community.name.split(" ").join("")}`}
          letterSpacing={-0.2}
          textOverflow="ellipsis"
          noOfLines={1}
          fontWeight="bold"
          fontSize={12}
        >
          r/{community.name}
        </Link>
        <Text fontSize={10}>{joinedNumber} Members</Text>
      </Box>
      <Join user={user} community={community} />
      <LoginModal setShowModal={setLoginModal} showModal={loginModal} />
    </Flex>
  );
};
