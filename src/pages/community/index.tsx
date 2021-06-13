/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { getCommunity } from "@api";
import Container from "@components/common/Container";
import Cover from "@components/common/Cover";
import CommunityPicture from "@components/community/common/CommunityPicture";
import Join from "@components/community/common/Join";
import NewPostTeaser from "@components/posts/post-form/NewPostTeaser";
import PostTeaser from "@components/posts/PostTeaser";
import CommunityInfo from "@components/community/common/CommunityInfo";
import { UserContext } from "@context/UserContext";
import Loading from "@components/common/Loading";
import { Link, useHistory } from "react-router-dom";
import ErrorPage from "@pages/error";
import Moderators from "@components/community/common/Moderators";
import { getRoleInCommunity } from "@api/";
import GrowCommunity from "@components/community/common/GrowCommunity";
import StyleCommunity from "@components/community/common/StyleCommunity";
import CommunityFlairs from "@components/community/common/CommunityFlairs";
import queryString from "query-string";
import PrimaryButton from "@components/common/PrimaryButton";
import SecondaryButton from "@components/common/SecondaryButton";
import FormTextarea from "@components/common/FormTextarea";
import Modal from "@components/Modal";
import { joinCommunity } from "@api/";
import { sendNotification } from "@api/";
import { UserType } from "@types/";
import { Formik, Form } from "formik";

export default function CommunityPage({ match }: { match: any }) {
  const [joined, setJoined] = useState<boolean>(false);
  const name: string = match.params.name;
  const user: UserType | undefined = useContext(UserContext);
  const { community, isLoading, error } = getCommunity(name);
  const { role } = getRoleInCommunity(name);
  const [posts, setPosts] = useState<[]>([]);
  const [privacy, setPrivacy] = useState("public");
  const [requested, setRequested] = useState(false);
  const [messageForm, setMessageForm] = useState(false);

  const history = useHistory();
  const params = queryString.parse(window.location.search);

  useEffect(() => {
    if (community) document.title = `r/${community?.name}`;

    let joined = false;

    if (community && user) {
      if (user.joined) {
        user.joined.forEach((joinedCommunity) => {
          if (joinedCommunity._id === community._id) {
            joined = true;
            setJoined(joined);
          }
        });
      }
      if (
        user.pendingCommunities &&
        user.pendingCommunities.indexOf(community._id) >= 0
      ) {
        setRequested(true);
      }
      setPrivacy(community.privacy);
    }
  }, [user, community]);

  useEffect(() => {
    if (community) {
      if (params.f) {
        setPosts(
          community.posts.filter((post) => post.flair?.text === params.f)
        );
      } else {
        setPosts(community.posts);
      }
    }
  }, [community, window.location.search]);

  if (error) return <ErrorPage />;
  if (isLoading) return <Loading />;
  if (privacy === "private" && !joined)
    return (
      <Flex
        w="100%"
        h="100vh"
        bg="#dae0e6"
        direction="column"
        justifyContent="center"
        alignItems="center"
        gridGap={7}
      >
        <Image
          src="http://localhost:4000/assets/key.svg"
          w="100px"
          h="100px"
          borderRadius={50}
        />
        <Text fontFamily="mono" fontWeight="bold">
          r/{community.username} is a private community
        </Text>
        <Box
          w="500px"
          h="max-content"
          px={5}
          py={2}
          bg="white"
          borderRadius={5}
        >
          <Text
            fontSize={18}
            fontFamily="mono"
            textAlign="center"
            fontWeight="bold"
          >
            r/{community.username}
          </Text>
          <br />
          <Text fontSize={14} fontFamily="mono" fontWeight="medium">
            {community.description}
          </Text>
        </Box>
        <Text
          fontFamily="mono"
          fontSize={16}
          fontWeight="semibold"
          w="525px"
          textAlign="center"
        >
          The moderators of r/rameprosta have set this community as private.
          Only approved members can view and take part in its discussions.
        </Text>
        {messageForm && (
          <Modal
            open={messageForm}
            onClose={() => setMessageForm(false)}
            w="400px"
          >
            <Text fontSize={18} w="60%" fontFamily="mono" fontWeight="bold">
              Enter message you want to send to mods
            </Text>
            <br />
            <Formik
              initialValues={{ message: "" }}
              onSubmit={async ({ message }) => {
                await joinCommunity(community._id, { message });
                community.moderators.forEach(async (moderator: UserType) => {
                  await sendNotification(moderator.username, {
                    title: `u/${user.username} requested to join r/${community.username} community`,
                    description: "",
                    type: "request",
                    more: {
                      community: community._id,
                      url: `/r/${community.username}/about/pending`,
                    },
                  });
                });
                setRequested(true);
                setMessageForm(false);
              }}
            >
              {({ value, touched, errors }) => (
                <Form>
                  <Flex direction="column" gridGap={3}>
                    <FormTextarea
                      name="message"
                      touched={touched.message}
                      error={errors.message}
                      label="Message"
                    />
                    <Flex gridGap={3} justifyContent="flex-end" w="100%">
                      <SecondaryButton
                        label="Cancel"
                        onClick={() => setMessageForm(false)}
                      />
                      <PrimaryButton label="Send request" type="submit" />
                    </Flex>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Modal>
        )}
        <Flex gridGap={5}>
          <SecondaryButton
            label={requested ? "Pending for approval" : "Request to join"}
            onClick={async () => {
              if (user) {
                setMessageForm(true);
              }
            }}
            bg="none"
            disabled={requested}
          />
          <PrimaryButton
            label="Browse reddit"
            onClick={() => history.push("/")}
          />
        </Flex>
        <Text
          w="500px"
          color="gray.500"
          fontWeight="medium"
          fontSize={12}
          fontFamily="mono"
          textAlign="center"
        >
          Use of this site constitutes acceptance of our User Agreement and
          Privacy Policy . ©2021 reddit inc. All rights reserved. REDDIT and the
          ALIEN Logo are registered trademarks of reddit inc.
        </Text>
      </Flex>
    );
  return (
    <Box>
      ,
      {community && (
        <Box>
          <Cover coverImage={community.coverImage} />
          <Container mx="0" mt={260}>
            <Box bg="white" zIndex={1} position="relative" top="-55px">
              <Flex px="17%" pt="10px" gridGap={3}>
                <CommunityPicture
                  imageSrc={community.image}
                  communityUsername={community.username}
                  uploadButton
                  position="relative"
                  top="-25px"
                />
                <Flex
                  gridGap={5}
                  position="relative"
                  top="-14px"
                  alignItems="center"
                >
                  <Box>
                    <Flex gridGap={5} alignItems="center">
                      <Text fontSize={28} color="#1c1c1c" fontWeight="bold">
                        {community.name}
                      </Text>
                      <Join community={community} refresh={true} />
                    </Flex>
                    <Text
                      fontSize={14}
                      color="#7c7c7c"
                      fontFamily="mono"
                      fontWeight="medium"
                    >
                      r/{community.username}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Flex
                gridGap={3}
                fontFamily="mono"
                fontWeight="medium"
                fontSize={13}
                mx="17%"
                pb="5px"
              >
                <Text color="gray.500" _hover={{ color: "yellow.400" }}>
                  <Link to={`/r/${community.username}`}>Posts</Link>
                </Text>
                <Text color="gray.500" _hover={{ color: "yellow.400" }}>
                  <Link to={`/r/${community.username}/wiki/rules`}>Rules</Link>
                </Text>
                <Text color="gray.500" _hover={{ color: "yellow.400" }}>
                  <Link to={`/r/${community.username}/wiki/index`}>Wiki</Link>
                </Text>
              </Flex>
            </Box>
            <Container my={-10}>
              <Grid gridTemplateColumns="1fr 0.5fr" gridGap={3}>
                <Box>
                  {role === "admin" && community.posts.length < 1 && (
                    <GrowCommunity communityUsername={community.username} />
                  )}
                  {joined && <NewPostTeaser community={community.username} />}
                  {posts.length >= 1 ? (
                    posts.map((post) => <PostTeaser post={post} />)
                  ) : (
                    <Box
                      textAlign="center"
                      fontSize={22}
                      fontWeight="bold"
                      fontFamily="mono"
                      w="100%"
                    >
                      <Text>No posts yet</Text>
                    </Box>
                  )}
                </Box>
                <Box w="300px">
                  <CommunityInfo community={community} />
                  <br />
                  {community.flairs && community.flairs.length > 0 && (
                    <>
                      <CommunityFlairs community={community} />
                      <br />
                    </>
                  )}
                  {role === "admin" && (
                    <>
                      <StyleCommunity />
                      <br />
                    </>
                  )}
                  <Moderators
                    moderators={community.moderators}
                    communityUsername={community.username}
                  />
                  <br />
                </Box>
              </Grid>
            </Container>
          </Container>
        </Box>
      )}
    </Box>
  );
}
