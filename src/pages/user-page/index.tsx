//@ts-nocheck
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { RiMessage2Fill } from "react-icons/ri";
import { getUser } from "@api";
import Container from "@components/common/Container";
import Loading from "@components/common/Loading";
import TabButton from "@components/common/TabButton";
import PostTeaser from "@components/posts/PostTeaser";
import UserDetails from "@components/user/UserDetails";
import { PostType, UserType } from "@types";

export default function UserPage({ match }: { match: any }) {
  const username = match.params.username;
  const [user, setUser] = useState<UserType | undefined>();
  const [likedPosts, setLikedPosts] = useState<PostType | undefined>();
  const [dislikedPosts, setDislikedPosts] = useState<PostType | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("liked");

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) document.title = `u/${user.username}`;
  }, [user]);

  const fetchUser = async () => {
    setLoading(true);
    const user = await getUser(username);
    if (user) {
      if (user.likedPosts) {
        setLikedPosts(user.likedPosts);
      }
      if (user.dislikedPosts) {
        setDislikedPosts(user.dislikedPosts);
      }
      setUser(user);
    }
    setLoading(false);
  };

  const selectTab = (tabName: string) => {
    setSelectedTab(tabName);
    fetchUser();
  };

  if (loading) return <Loading />;
  return (
    <Box>
      {user && (
        <>
          <UserDetails user={user} id={user._id} />
          {user.likedPosts && (
            <Container my={0}>
              <Flex>
                <TabButton
                  selected={selectedTab === "liked"}
                  label="Liked Posts"
                  icon={<AiOutlineLike size={20} />}
                  onClick={() => selectTab("liked")}
                />
                <TabButton
                  selected={selectedTab === "disliked"}
                  label="Disliked Posts"
                  icon={<AiOutlineDislike size={20} />}
                  onClick={() => selectTab("disliked")}
                />
                <TabButton
                  selected={selectedTab === "posted"}
                  label="Posted"
                  icon={<RiMessage2Fill size={20} />}
                  onClick={() => selectTab("posted")}
                />
              </Flex>
              <Box m="auto" my={5} w="80%">
                {selectedTab === "liked" && likedPosts.length >= 1
                  ? likedPosts.map((post) => <PostTeaser post={post} />)
                  : selectedTab === "liked" && (
                      <Text
                        textAlign="center"
                        mt={10}
                        fontWeight="bold"
                        fontSize={28}
                        fontFamily="mono"
                      >
                        No posts liked yet
                      </Text>
                    )}
                {selectedTab === "disliked" && dislikedPosts.length >= 1
                  ? dislikedPosts.map((post) => <PostTeaser post={post} />)
                  : selectedTab === "disliked" && (
                      <Text
                        textAlign="center"
                        mt={10}
                        fontWeight="bold"
                        fontSize={28}
                        fontFamily="mono"
                      >
                        No posts disliked yet
                      </Text>
                    )}
                {selectedTab === "posted" && (
                  <Text
                    textAlign="center"
                    mt={10}
                    fontWeight="bold"
                    fontSize={28}
                    fontFamily="mono"
                  >
                    Nothing posted yet.
                  </Text>
                )}
              </Box>
            </Container>
          )}
        </>
      )}
    </Box>
  );
}
