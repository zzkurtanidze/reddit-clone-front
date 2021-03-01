import { Text } from "@chakra-ui/react";
import React from "react";
import Container from "../../components/common/Container";

export default function CommunityPage({ match }: { match: any }) {
  const id = match.params.id;

  return (
    <Container>
      <Text>Community</Text>{" "}
    </Container>
  );
}
