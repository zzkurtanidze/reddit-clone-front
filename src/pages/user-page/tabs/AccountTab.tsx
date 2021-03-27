import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import SecondaryButton from "../../../components/common/SecondaryButton";
import React from "react";
import Action from "../common/Action";
import SectionTitle from "../common/SectionTitle";
import Title from "../common/Title";
import { GoTrashcan } from "react-icons/go";
import { HiTrash } from "react-icons/hi";

export default function AccountTab() {
  return (
    <Box fontFamily="mono">
      <Title label="Account Settings" />
      <SectionTitle label="Account preferences" />
      <Action
        label="Email address"
        description="zura.kurta@gmail.com"
        button={
          <SecondaryButton label="Change" onClick={() => console.log("")} />
        }
      />
      <Action
        label="Change password"
        description="Password must be at least 4 characters long"
        button={
          <SecondaryButton label="Change" onClick={() => console.log("")} />
        }
      />
      <SectionTitle label="Deactivate account" />
      <Action
        button={
          <Button
            color="#FB575A"
            fontSize={13}
            fontFamily="mono"
            _hover={{}}
            _active={{}}
            _focus={{}}
          >
            <HiTrash color="#FB575A" size={18} />
            DEACTIVATE ACCOUNT
          </Button>
        }
      />
    </Box>
  );
}
