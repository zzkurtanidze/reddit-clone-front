import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import PrimaryButton from "./common/PrimaryButton";
import StyledBox from "./common/StyledBox";
import CommunityFormModal from "./community/form/CommunityFormModal";

export default function HomeSidebar() {
  const [communityModal, setCommunityModal] = useState(false);

  return (
    <StyledBox>
      <Image
        position="absolute"
        top="0"
        left="0"
        src="http://localhost:4000/static/home-sidebar-banner.png"
      />
      <Flex alignItems="center" mb={5}>
        <Image
          src="http://localhost:4000/static/reddit-guy.png"
          w="50px"
          zIndex={4}
        />
        <Text ml={3} mt={5} fontWeight="bold">
          Home
        </Text>
      </Flex>
      <Text fontSize={14}>
        Your personal Reddit frontpage. Come here to check in with your favorite
        communities.
      </Text>
      <Flex flexDirection="column" gridGap={3} mt={5}>
        <PrimaryButton
          onClick={() => window.location.replace("/submit")}
          label="Create post"
          _focus={{}}
        />
        <PrimaryButton
          onClick={() => setCommunityModal(true)}
          label="Create community"
          bg="gray.100"
          borderWidth="1px"
          borderColor="gray.400"
          _focus={{}}
          color="black"
        />
      </Flex>
      <CommunityFormModal
        open={communityModal}
        onClose={() => setCommunityModal(false)}
      />
    </StyledBox>
  );
}
