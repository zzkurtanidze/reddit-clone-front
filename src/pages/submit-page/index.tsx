import React from "react";
import Container from "../../components/common/Container";
import NewPostForm from "../../components/posts/post-form/NewPostForm";

export default function SubmitPage({ match }: { match?: any }) {
  console.log(match);
  return (
    <Container>
      <NewPostForm match={match} />
    </Container>
  );
}
