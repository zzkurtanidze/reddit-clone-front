//@ts-ignore
import { getRules } from "@api/";
import { Button } from "@chakra-ui/button";
import { Box, Divider, Text } from "@chakra-ui/layout";
import StyledBox from "@components/common/StyledBox";
//@ts-ignore
import { CommunityType } from "@types/";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function RulesListing({
  community,
}: {
  community: CommunityType;
}) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const { rules } = getRules(community.username);

  if (rules.length < 1) return <></>;
  return (
    <StyledBox
      titleBackground="#0079D3"
      title={`R/${community.username.toUpperCase()} RULES`}
    >
      {rules &&
        rules.map((rule: any, index: string) =>
          !rule.description ? (
            <>
              <Text fontFamily="mono" fontSize={14} fontWeight="medium" my={2}>
                {index + 1}. {rule.name}
              </Text>
              {index + 1 !== rules.length && <Divider />}
            </>
          ) : (
            <>
              <Button
                bg="none"
                h="max-content"
                w="100%"
                p={0}
                _hover={{}}
                _active={{}}
                _focus={{}}
                display="flex"
                justifyContent="space-between"
                onClick={() => {
                  if (expanded.includes(index)) {
                    setExpanded((expanded) =>
                      expanded.filter((rule) => rule !== index)
                    );
                  } else {
                    setExpanded([...expanded, index]);
                  }
                }}
              >
                <Text
                  textAlign="left"
                  fontFamily="mono"
                  fontSize={14}
                  fontWeight="medium"
                  my={2}
                >
                  {index + 1}. {rule.name}
                </Text>
                {expanded.includes(index) ? (
                  <IoIosArrowUp size={14} />
                ) : (
                  <IoIosArrowDown size={14} />
                )}
              </Button>
              {expanded.includes(index) && (
                <Box>
                  <Text
                    fontFamily="mono"
                    fontWeight="medium"
                    fontSize={14}
                    ml={4}
                    my={2}
                  >
                    {rule.description}
                  </Text>
                </Box>
              )}
              {index + 1 !== rules.length && <Divider />}
            </>
          )
        )}
    </StyledBox>
  );
}
