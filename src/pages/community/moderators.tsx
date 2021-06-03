//@ts-ignore
import { getCommunity } from "@api/";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import Container from "@components/common/Container";
import Loading from "@components/common/Loading";
//@ts-ignore
import { UserType } from "@types/";
import React, { useContext, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import PrimaryButton from "@components/common/PrimaryButton";
import Modal from "@components/Modal";
import { Form, Formik } from "formik";
import FormField from "@components/common/FormField";
import SecondaryButton from "@components/common/SecondaryButton";
import * as yup from "yup";
//@ts-ignore
import { sendNotification } from "@api/";
//@ts-ignore
import { inviteModerator } from "@api/";
import ModeratorsListing from "@components/community/common/ModeratorsListing";
//@ts-ignore
import queryString from "query-string";
//@ts-ignore
import { UserContext } from "@context/UserContext";
import { Image } from "@chakra-ui/image";
//@ts-ignore
import { acceptModerator } from "@api/";
import { useToast } from "@chakra-ui/toast";

const validationSchema = yup.object({
  username: yup.string().required().min(5).label("Username"),
});

export default function ModeratorsPage({
  match,
  role,
}: {
  match: any;
  role?: string;
}) {
  const communityName = match.params.name;
  const { community, isLoading } = getCommunity(communityName);
  const user = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [moderatorForm, setModeratorForm] = useState<boolean>(false);
  const history = useHistory();
  const params = queryString.parse(window.location.search);
  const [inviteModal, setInviteModal] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    if (params.acceptInvite && user && community) {
      community.invitedModerators.forEach((moderator: UserType) => {
        if (moderator.username === user.username) {
          setInviteModal(true);
        }
      });
    }
  }, [user, community]);

  if (isLoading) return <Loading />;
  return (
    <>
      {role === "admin" && (
        <>
          <Flex
            w="100%"
            h="60px"
            mt="60px"
            bg="#EDEFF1"
            alignItems="center"
            justifyContent="flex-end"
            px={5}
          >
            <PrimaryButton
              label="Invite user as mod"
              onClick={() => setModeratorForm(!moderatorForm)}
            />
          </Flex>
          <Modal
            open={moderatorForm}
            onClose={() => setModeratorForm(false)}
            w="500px"
          >
            <Text fontFamily="mono" fontSize={20} fontWeight="bold">
              Invite Moderators
            </Text>
            <Divider my={5} />
            <Formik
              initialValues={{ username: "" }}
              onSubmit={async ({ username }) => {
                await sendNotification(username, {
                  title: `You have been invited for u/${communityName} moderator`,
                  description: "",
                  type: "moderator",
                  more: {
                    community: community._id,
                    url: `/r/${communityName}/about/moderators/?acceptInvite=true`,
                  },
                });
                const response = await inviteModerator(username, community._id);
                if (response.statusText === "OK") {
                  toast({
                    title: "User has been invited succesfully",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
                  setModeratorForm(false);
                } else {
                  toast({
                    title: response.data,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                }
              }}
              validationSchema={validationSchema}
            >
              {({ errors, touched }) => (
                <Form>
                  <Flex direction="column" gridGap={2}>
                    <FormField
                      placeholder="Enter Username"
                      name="username"
                      type="input"
                      error={errors.username}
                      touched={touched.username}
                    />
                    <Flex
                      gridGap={3}
                      alignItems="center"
                      justifyContent="flex-end"
                      mt={5}
                    >
                      <SecondaryButton
                        label="Cancel"
                        onClick={() => setModeratorForm(false)}
                      />
                      <PrimaryButton
                        type="submit"
                        label="Invite"
                        disabled={errors.username}
                      />
                    </Flex>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Modal>
        </>
      )}
      <Modal open={inviteModal} onClose={() => setInviteModal(false)} w="430px">
        <Flex direction="column" alignItems="center" mt={5}>
          <Image
            src="http://localhost:4000/assets/congrats.png"
            w="80px"
            h="80px"
          />
          <Text fontSize={14} mt={5}>
            Congrats! You are invited to become a moderator!
          </Text>
          <Flex
            mt={5}
            position="relative"
            top="10px"
            gridGap={2}
            justifyContent="flex-end"
            w="100%"
          >
            <SecondaryButton
              label="Decline"
              onClick={async () => {
                await acceptModerator(community._id, false);
                community.moderators.forEach(async (moderator: UserType) => {
                  await sendNotification(moderator.username, {
                    title: `u/${user?.username} declined your invitation`,
                    description: `u/${user?.username} delined your invitation to be r/${community.username} moderator`,
                    type: "moderator",
                    more: {
                      community: community._id,
                      url: `/r/${community.username}/about/moderators`,
                    },
                  });
                });
                setInviteModal(false);
              }}
            />
            <PrimaryButton
              label="Accept"
              onClick={async () => {
                await acceptModerator(community._id, true);
                community.moderators.forEach(async (moderator: UserType) => {
                  await sendNotification(moderator.username, {
                    title: `u/${user?.username} accepted your invitation`,
                    description: `u/${user?.username} is now r/${community.username} moderator`,
                    type: "moderator",
                    more: {
                      community: community._id,
                      url: `/r/${community.username}/about/moderators`,
                    },
                  });
                });
                setInviteModal(false);
                history.push(`/r/${community.username}/about/moderators`);
              }}
            />
          </Flex>
        </Flex>
      </Modal>
      <Container
        mx={role === "admin" ? "3%" : "10%"}
        my={role === "admin" ? "5%" : "10%"}
      >
        <Text fontSize={18} fontFamily="mono" fontWeight="medium">
          Moderators of r/{community.username}
        </Text>
        <Box
          w="100%"
          h="max-content"
          my={15}
          borderRadius="5px"
          overflow="hidden"
          bg="gray.100"
        >
          <Box bg="gray.200" py="10px" px="15px">
            <Input
              w="17vw"
              h="35px"
              py={0}
              type="text"
              bg="white"
              placeholder="Search for user"
              fontSize={14}
              borderWidth="1px"
              borderColor="gray.600"
              onChange={(e: any) => setSearchTerm(e.target.value)}
              _focus={{}}
              _hover={{}}
            />
            <Button
              p="0"
              bg="gray.600"
              borderRadius={0}
              borderRightRadius="5px"
              w="35px"
              h="34px"
              position="relative"
              top="-1px"
              zIndex={1}
              right="40px"
              onClick={() =>
                history.push(
                  `/r/${community.username}/about/moderators/?q=${searchTerm}`
                )
              }
              _hover={{}}
              _active={{}}
              _focus={{}}
            >
              <BiSearchAlt color="white" size={20} />
            </Button>
          </Box>
          <Box bg="white" pt="5px">
            <ModeratorsListing
              moderators={community.moderators}
              community={community}
              setSearchTerm={setSearchTerm}
            />
          </Box>
        </Box>
      </Container>
      {role === "admin" && (
        <Container mx="3%" my="5%">
          <Text fontSize={18} fontFamily="mono" fontWeight="medium">
            Invited moderators of r/{community.username}
          </Text>
          <Box
            w="100%"
            h="max-content"
            my={15}
            borderRadius="5px"
            overflow="hidden"
            bg="gray.100"
          >
            <Box bg="gray.200" py="10px" px="15px">
              <Input
                w="17vw"
                h="35px"
                py={0}
                type="text"
                bg="white"
                placeholder="Search for user"
                fontSize={14}
                borderWidth="1px"
                borderColor="gray.600"
                onChange={(e: any) => setSearchTerm(e.target.value)}
                _focus={{}}
                _hover={{}}
              />
              <Button
                p="0"
                bg="gray.600"
                borderRadius={0}
                borderRightRadius="5px"
                w="35px"
                h="34px"
                position="relative"
                top="-1px"
                zIndex={1}
                right="40px"
                onClick={() =>
                  history.push(
                    `/r/${community.username}/about/moderators/?q=${searchTerm}`
                  )
                }
                _hover={{}}
                _active={{}}
                _focus={{}}
              >
                <BiSearchAlt color="white" size={20} />
              </Button>
            </Box>
            <Box bg="white" pt="5px">
              <ModeratorsListing
                community={community}
                setSearchTerm={setSearchTerm}
                moderators={community.invitedModerators}
              />
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
