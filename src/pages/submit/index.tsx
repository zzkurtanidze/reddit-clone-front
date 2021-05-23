import { Box, Flex, Grid } from "@chakra-ui/layout";
import RulesSidebar from "@components/common/Rules";
import React, { useEffect } from "react";
import Container from "@components/common/Container";
import NewPostForm from "@components/posts/post-form/NewPostForm";
//@ts-ignore
import { getCommunity } from "@api/";
import CommunityTeaser from "@components/community/CommunityTeaser";

export default function SubmitPage({ match }: { match?: any }) {
  const name = match.params.name;
  const { community } = getCommunity(name);

  return (
    <Container>
      <Grid gridTemplateColumns="1fr 0.4fr" gridGap={5}>
        <NewPostForm match={match} />
        <Flex direction="column" gridGap={5}>
          {community && <CommunityTeaser community={community} />}
          <RulesSidebar />
        </Flex>
      </Grid>
    </Container>
  );
}
