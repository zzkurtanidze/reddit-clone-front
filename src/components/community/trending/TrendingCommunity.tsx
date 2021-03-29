import React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { CommunityType } from "../../../types";
import LoginModal from "../../auth-modals/LoginModal";
import Join from "../common/Join";
import CommunityPicture from "../common/CommunityPicture";

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
    <Flex justifyContent="space-between" gridGap={2}>
      <Flex gridGap={2}>
        {community && (
          <CommunityPicture
            communityUsername={community.username}
            imageSrc={community.image}
            width="35px"
            withLink
          />
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
      </Flex>
      <Join community={community} />
      <LoginModal setShowModal={setLoginModal} showModal={loginModal} />
    </Flex>
  );
};
