//@ts-ignore
import { getFlairs } from "@api/";
import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import Flair from "@components/common/Flair";
import StyledBox from "@components/common/StyledBox";
//@ts-ignore
import { CommunityType } from "@types/";
import React from "react";
import { Link } from "react-router-dom";

export default function CommunityFlairs({
  community,
}: {
  community: CommunityType;
}) {
  const { flairs } = getFlairs(community.username);

  return (
    <StyledBox title="Filter by flairs" titleBackground={community.theme.main}>
      <Flex gridGap={2} flexWrap="wrap">
        {flairs &&
          flairs.map((flair: any) => (
            <Link to={`/r/${community.username}/?f=${flair.text}`}>
              <Flair flair={flair} />
            </Link>
          ))}
      </Flex>
    </StyledBox>
  );
}
