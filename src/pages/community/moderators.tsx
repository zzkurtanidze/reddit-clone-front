/* eslint-disable react-hooks/exhaustive-deps */
//@ts-ignore
import { getCommunity } from "@api/";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Text, Grid } from "@chakra-ui/layout";
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
//@ts-ignore
import queryString from "query-string";
//@ts-ignore
import { UserContext } from "@context/UserContext";
import { Image } from "@chakra-ui/image";
//@ts-ignore
import { acceptModerator } from "@api/";
import { useToast } from "@chakra-ui/toast";
import { UsersList } from "@components/user/UsersList";
import ErrorPage from "@pages/error";
import { IoMdClose } from "react-icons/io";

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
  const [moderatorsSearch, setModeratorsSearch] = useState<string>("");
  const [invitedModeratorsSearch, setInvitedModeratorsSearch] =
    useState<string>("");
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
            src={`${process.env.REACT_APP_ASSETS_URL}/congrats.png`}
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
                    description: `u/${user?.username} declined your invitation to be r/${community.username} moderator`,
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
        <UsersList setSearchTerm={setModeratorsSearch}>
          {community.moderators &&
          community.moderators.filter((moderator: UserType) =>
            moderator.username.includes(moderatorsSearch)
          ).length > 0 ? (
            community.moderators.map((moderator: UserType) => (
              <React.Fragment key={moderator._id}>
                <Grid
                  gridTemplateColumns="0.34fr 3fr 0.5fr"
                  alignItems="center"
                  w="90%"
                  m="auto"
                  my={3}
                >
                  <ButtonGroup alignItems="center">
                    <Button
                      display="grid"
                      gridTemplateColumns="1fr 2fr"
                      bg="0"
                      transition="0"
                      alignItems="center"
                      w="160px"
                      px="10px"
                      _hover={{}}
                      _active={{}}
                      _focus={{}}
                      onClick={() =>
                        history.push(`/user/${moderator.username}`)
                      }
                    >
                      <Image
                        src={
                          moderator.image ||
                          `${process.env.REACT_APP_ASSETS_URL}/avatar.png`
                        }
                        w="30px"
                        minW="30px"
                        h="30px"
                        minH="30px"
                        borderRadius={5}
                      />
                      <Text>{moderator.username}</Text>
                    </Button>
                  </ButtonGroup>
                  <Text></Text>
                  {community.moderators.includes(moderator) && (
                    <Text fontSize={14} color="gray.600">
                      Full Permissions
                    </Text>
                  )}
                  {community.invitedModerators.includes(moderator) && (
                    <Button
                      bg="none"
                      _active={{}}
                      _focus={{}}
                      _hover={{}}
                      p={0}
                      ml="100px"
                      onClick={async () => {
                        await acceptModerator(
                          community._id,
                          false,
                          moderator._id
                        );
                        toast({
                          title: "Invite canceled succesfully",
                          status: "success",
                          duration: 2000,
                          isClosable: true,
                        });
                        window.location.reload();
                      }}
                    >
                      <IoMdClose size={25} />
                    </Button>
                  )}
                </Grid>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <ErrorPage
              text={`No results`}
              button={
                <Button
                  bg="none"
                  color="blue.500"
                  borderRadius={50}
                  onClick={() => {
                    history.push(`/r/${community.username}/about/moderators`);
                    if (setModeratorsSearch) {
                      setModeratorsSearch("");
                    }
                  }}
                >
                  See All
                </Button>
              }
              h="100%"
              p="50px"
              fontSize={16}
            />
          )}
        </UsersList>
      </Container>
      {role === "admin" && (
        <Container mx="3%" my="5%">
          <Text fontSize={18} fontFamily="mono" fontWeight="medium">
            Invited moderators of r/{community.username}
          </Text>
          <UsersList setSearchTerm={setInvitedModeratorsSearch}>
            {community.invitedModerators &&
            community.invitedModerators.filter((moderator: UserType) =>
              moderator.username.includes(invitedModeratorsSearch)
            ).length > 0 ? (
              community.invitedModerators.map((moderator: UserType) => (
                <React.Fragment key={moderator._id}>
                  <Grid
                    gridTemplateColumns="0.34fr 3fr 0.5fr"
                    alignItems="center"
                    w="90%"
                    m="auto"
                    my={3}
                  >
                    <ButtonGroup alignItems="center">
                      <Button
                        display="grid"
                        gridTemplateColumns="1fr 2fr"
                        bg="0"
                        transition="0"
                        alignItems="center"
                        w="160px"
                        px="10px"
                        _hover={{}}
                        _active={{}}
                        _focus={{}}
                        onClick={() =>
                          history.push(`/user/${moderator.username}`)
                        }
                      >
                        <Image
                          src={
                            moderator.image ||
                            `${process.env.REACT_APP_ASSETS_URL}/avatar.png`
                          }
                          w="30px"
                          minW="30px"
                          h="30px"
                          minH="30px"
                          borderRadius={5}
                        />
                        <Text>{moderator.username}</Text>
                      </Button>
                    </ButtonGroup>
                    <Text></Text>
                    {community.moderators.includes(moderator) && (
                      <Text fontSize={14} color="gray.600">
                        Full Permissions
                      </Text>
                    )}
                    {community.invitedModerators.includes(moderator) && (
                      <Button
                        bg="none"
                        _active={{}}
                        _focus={{}}
                        _hover={{}}
                        p={0}
                        ml="100px"
                        onClick={async () => {
                          await acceptModerator(
                            community._id,
                            false,
                            moderator._id
                          );
                          toast({
                            title: "Invite canceled succesfully",
                            status: "success",
                            duration: 2000,
                            isClosable: true,
                          });
                          window.location.reload();
                        }}
                      >
                        <IoMdClose size={25} />
                      </Button>
                    )}
                  </Grid>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <ErrorPage
                text={`No results`}
                button={
                  <Button
                    bg="none"
                    color="blue.500"
                    borderRadius={50}
                    onClick={() => {
                      history.push(`/r/${community.username}/about/moderators`);
                      if (setInvitedModeratorsSearch) {
                        setInvitedModeratorsSearch("");
                      }
                    }}
                  >
                    See All
                  </Button>
                }
                h="100%"
                p="50px"
                fontSize={16}
              />
            )}
          </UsersList>
        </Container>
      )}
    </>
  );
}
