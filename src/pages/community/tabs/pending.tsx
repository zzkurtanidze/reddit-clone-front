//@ts-ignore
import { sendNotification } from "@api/";
//@ts-ignore
import { responseOnJoinRequest } from "@api/";
//@ts-ignore
import { getCommunity } from "@api/";
//@ts-ignore
import { getPendingMembers } from "@api/";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import Container from "@components/common/Container";
import FieldLoading from "@components/common/loading-animations/FieldLoading";
import PrimaryButton from "@components/common/PrimaryButton";
import SecondaryButton from "@components/common/SecondaryButton";
//@ts-ignore
import { UserType } from "@types/";
//@ts-ignore
import { CommunityType } from "@types/";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { CgMinimize } from 'react-icons/cg';

export default function PendingTab({
  communityUsername,
}: {
  communityUsername: CommunityType;
}) {
  let {
    initialPendingMembers,
    isLoading: membersIsLoading,
    error,
  } = getPendingMembers(communityUsername);
  let { community, isLoading: communityIsLoading } =
    getCommunity(communityUsername);
  const [pendingMembers, setPendingMembers] = useState<[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (communityIsLoading || membersIsLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [communityIsLoading, membersIsLoading]);

  useEffect(() => {
    if (initialPendingMembers) setPendingMembers(initialPendingMembers);
  }, [initialPendingMembers]);

  return (
    <Container size="sm">
      <Text fontFamily="mono" fontSize={22} fontWeight="medium">
        Pending members
      </Text>
      <Box bg="white" borderRadius={5} mt={10} h="max-content">
        {isLoading && (
          <Flex direction="column" p={5} gridGap={7}>
            <FieldLoading />
            <FieldLoading />
            <FieldLoading />
            <FieldLoading />
            <FieldLoading />
            <FieldLoading />
            <FieldLoading />
          </Flex>
        )}
				{pendingMembers && pendingMembers.length > 0 ?
          pendingMembers.map(({ user: member, message }: { user: UserType, message: string }, index: number) => (
            <>
              <Grid
                gridTemplateColumns="0.7fr 10fr 1.3fr 1.3fr 1fr"
                alignItems="center"
                p={3}
                px={10}
              >
                <Image
                  src={
                    member.image || "http://localhost:4000/assets/avatar.png"
                  }
                  w="30px"
                  borderRadius={5}
                />
                <Text>u/{member.username}</Text>
                <SecondaryButton
                  label="Discard"
                  onClick={async () => {
                    const response = await responseOnJoinRequest(
                      communityUsername,
                      {
                        answer: "declined",
                        userId: member._id,
                      }
                    );
                    if (response.statusText === "OK") {
                      toast({
                        title: `u/${member.username} has been declined`,
                        isClosable: true,
                      });
                      setPendingMembers(response.data);
                      await sendNotification(member.username, {
                        title: `Your request has been declined`,
                        description: `Sorry, your request to join in r/${communityUsername} has been declined!`,
                        type: "moderator",
                        more: {
                          community: community._id,
                          url: `/`,
                        },
                      });
                    }
                  }}
                  mx={2}
                />
                <PrimaryButton
                  label="Accept"
                  onClick={async () => {
                    const response = await responseOnJoinRequest(
                      communityUsername,
                      {
                        answer: "accepted",
                        userId: member._id,
                      }
                    );
                    if (response.statusText === "OK") {
                      toast({
                        title: `u/${member.username} has been added to community`,
                        isClosable: true,
                      });
                      setPendingMembers(response.data);
                      await sendNotification(member.username, {
                        title: `Your request has been accepted`,
                        description: `Congrulations! your request to join in r/${communityUsername} has been accepted!`,
                        type: "moderator",
                        more: {
                          community: community._id,
                          url: `/r/${communityUsername}/`,
                        },
                      });
                    }
                  }}
                  mx={2}
                />
                <Button
                  bg="none"
                  _hover={{}}
                  _active={{}}
                  _focus={{}}
                  onClick={() => {
                    if (expanded.includes(index)) {
                      setExpanded((expanded) =>
                        expanded.filter((exp) => exp !== index)
                      );
                    } else {
                      setExpanded([...expanded, index]);
                    }
                  }}
                >
									{expanded.includes(index) ? (
										<CgMinimize />
									) : (
                  	<HiOutlineArrowsExpand />
									)}
                </Button>
              </Grid>
              {expanded.includes(index) && (
                <Box
                  bg="#EDEFF1"
                  minH="100px"
								  borderRadius={5}
                  p={5}
                >
									<Text fontFamily="mono" fontSize={11} fontWeight="extrabold" textTransform="uppercase"> Message From User </Text>
                  <Text fontFamily="mono">{message}</Text>
                </Box>
              )}
            </>
						)) : (
							<Flex alignItems="center" direction="column" justifyContent="center" minH="500px" gridGap={10}>
								<Image src="http://localhost:4000/assets/cat_blep.png" w="200px"/>
								<Text textAlign="center" fontSize={20} fontFamily="mono" fontWeight="bold">No users pending</Text>
						  </Flex>
						)}
      </Box>
    </Container>
  );
}
