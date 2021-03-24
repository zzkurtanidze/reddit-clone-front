import { Grid } from "@chakra-ui/layout";
import RulesSidebar from "../../components/Rules";
import React from "react";
import Container from "../../components/common/Container";
import NewPostForm from "../../components/posts/post-form/NewPostForm";

export default function SubmitPage({ match }: { match?: any }) {
  return (
    <Container>
      <Grid gridTemplateColumns="1fr 0.4fr" gridGap={5}>
        <NewPostForm match={match} />
        <RulesSidebar />
      </Grid>
    </Container>
  );
}
