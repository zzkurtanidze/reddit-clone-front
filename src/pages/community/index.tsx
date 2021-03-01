//@ts-nocheck
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getCommunity } from "../../api";
import Container from "../../components/common/Container";
import Cover from "../../components/common/Cover";
import { CommunityType } from "../../types";

export default function CommunityPage({ match }: { match: any }) {
  const [community, setCommunity] = useState<CommunityType | undefined>();
  const [coverImage, setCoverImage] = useState<string>("");
  const name: string = match.params.name;

  useEffect(() => {
    fetchCommunity();
  }, []);

  const fetchCommunity = async () => {
    const response = await getCommunity(name);
    if (response.statusText === "OK") {
      setCommunity(response.data);
      setCoverImage(
        response.data.coverImage
          ? `http://${response.data.coverImage}`
          : "http://localhost:4000/static/default-cover.png"
      );
    }
  };

  return (
    <>
      ,
      {community && (
        <Box>
          <Cover coverImage={coverImage} />
          <Container mt={250}>
            <Text>TESTING</Text>
          </Container>
        </Box>
      )}
    </>
  );
}
