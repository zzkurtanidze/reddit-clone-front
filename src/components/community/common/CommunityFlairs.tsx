//@ts-ignore
import { getFlairs } from "@api/";
import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import Flair from "@components/common/Flair";
import StyledBox from "@components/common/StyledBox";
//@ts-ignore
import { CommunityType } from "@types/";
import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { IoMdClose } from "react-icons/io";

export default function CommunityFlairs({
  community,
}: {
  community: CommunityType;
}) {
  const { flairs } = getFlairs(community.username);
  const params = queryString.parse(window.location.search);

  return (
    <StyledBox title="Filter by flairs" titleBackground={community.theme.main}>
      <Flex gridGap={2} flexWrap="wrap">
        {flairs &&
          flairs.map((flair: any) => (
            <Link to={`/r/${community.username}/?f=${flair.text}`}>
              <Box
                bg={flair.backgroundColor}
                display="flex"
                alignItems="center"
                px={2}
                py={1}
                borderRadius={50}
              >
                <Flair flair={flair} />
                {params.f && params.f === flair.text && (
                  <Button
                    p={0}
                    w="max-content"
                    h="max-content"
                    bg="rgba(255,255,255,.7)"
                    borderRadius={50}
                    size="xs"
                    _hover={{}}
                    _active={{}}
                    _focus={{}}
                    onClick={() =>
                      window.location.replace(`/r/${community.username}`)
                    }
                  >
                    <IoMdClose color={flair.backgroundColor} size={18} />
                  </Button>
                )}
              </Box>
            </Link>
          ))}
      </Flex>
    </StyledBox>
  );
}
