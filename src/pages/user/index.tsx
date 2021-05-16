//@ts-nocheck
import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUser } from "@api";
import Container from "@components/common/Container";
import Loading from "@components/common/Loading";
import UserDetails from "@components/user/UserDetails";
import { getUserRole } from "@api/";
import { UserRoleContext } from "@context/UserRoleContext";
import { useHistory } from "react-router";
import PostTeaser from "@components/posts/PostTeaser";
import UserPostsTab from "./tabs/UserPostsTab";

export default function UserPage({ match }: { match: any }) {
  const username = match.params.username;
  const tabname = match.params.tabname;
  const { user, isLoading } = getUser(username);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const role = getUserRole(username);
  const history = useHistory();

  useEffect(() => {
    if (tabname) {
      setSelectedTab(tabname);
    } else {
      setSelectedTab("");
    }
  }, [tabname]);

  useEffect(() => {
    if (user) {
      history.push(`/user/${user.username}/${selectedTab}`);
    }
  }, [selectedTab, user]);

  useEffect(() => {
    if (user)
      document.title = `${user.displayName || user.username} (u/${
        user.username
      }) - Reddit`;
  }, [user]);

  const tabs = {
    posts: <UserPostsTab user={user} />,
    // 'comments': <UserCommentsTab />
  };

  if (isLoading) return <Loading />;
  return (
    <UserRoleContext.Provider value={role}>
      <Flex
        mt="60px"
        px={selectedTab === "" ? "17%" : "1%"}
        w="100vw"
        h="40px"
        bg="white"
      >
        <TabButton
          label="OVERVIEW"
          onClick={() => setSelectedTab("")}
          selected={selectedTab === ""}
        />
        <TabButton
          label="POSTS"
          onClick={() => setSelectedTab("posts")}
          selected={selectedTab === "posts"}
        />
        <TabButton
          label="COMMENTS"
          onClick={() => setSelectedTab("comments")}
          selected={selectedTab === "comments"}
        />
      </Flex>
      <Container mx={selectedTab === "" ? "17%" : "1%"} my={7}>
        {user && (
          <Grid
            gridGap={5}
            gridTemplateColumns={`1fr ${
              selectedTab === "" ? "0.4fr" : "0.27fr"
            }`}
          >
            {tabs[selectedTab] ? (
              tabs[selectedTab]
            ) : (
              <Box>
                {user.posts &&
                  user.posts.map((post) => <PostTeaser post={post} />)}
              </Box>
            )}
            <Box>
              <UserDetails user={user} id={user._id} />
            </Box>
          </Grid>
        )}
      </Container>
    </UserRoleContext.Provider>
  );
}

const TabButton = ({
  label,
  onClick,
  selected,
}: {
  label: string;
  onClick: Function;
  selected: boolean;
}) => {
  return (
    <Button
      bg="none"
      _hover={{}}
      _active={{}}
      _focus={{}}
      h="100%"
      py={0}
      borderRadius={0}
      fontSize={14}
      fontFamily="mono"
      borderBottomWidth={selected ? "3px" : "0"}
      borderBottomColor="#0079D3"
      transition="0"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
