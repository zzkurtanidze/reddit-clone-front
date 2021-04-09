import React from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
//@ts-ignore
import { CommunityType } from "@types";
import LoginModal from "../../auth-modals/LoginModal";
import Join from "../common/Join";
import CommunityPicture from "../common/CommunityPicture";
import { Link } from "react-router-dom";

export const TrendingCommunity: React.FC<{ community: CommunityType }> = ({
  community,
}) => {
  const [joinedNumber, setJoinedNumber] = useState<number>(0);
  const [loginModal, setLoginModal] = useState<boolean>(false);

  useEffect(() => {
    setJoinedNumber(community.members.length);
  }, [community]);

  return (
    <Flex justifyContent="space-between" gridGap={2}>
      <Grid gridTemplateColumns="0.2fr 1fr" gridGap={2}>
        {community && (
          <CommunityPicture
            communityUsername={community.username}
            imageSrc={community.image}
            width="35px"
            withLink
          />
        )}
        <Box>
          <Text
            letterSpacing={-0.1}
            textOverflow="ellipsis"
            noOfLines={1}
            fontWeight="bold"
            fontSize={12}
          >
            <Link to={`/r/${community.name.split(" ").join("")}`}>
              r/{community.name}
            </Link>
          </Text>
          <Text fontSize={10}>{joinedNumber} Members</Text>
        </Box>
      </Grid>
      <Join community={community} />
      <LoginModal setShowModal={setLoginModal} showModal={loginModal} />
    </Flex>
  );
};
