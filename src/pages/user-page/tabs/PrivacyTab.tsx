import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import React from "react";
import Action from "../../../components/common/Action";
import SectionTitle from "../../../components/common/SectionTitle";
import Title from "../../../components/common/Title";
import { UserType } from "../../../types";

export default function PrivacyTab({ user }: { user: UserType }) {
  return (
    <Box fontFamily="mono">
      <Title
        label="Safety & Privacy"
        description="Manage how we use data to personalize your Reddit experience, and control how other redditors interact with you. To learn more, visit our Privacy & Security FAQs ."
      />
      <SectionTitle label="Safety" />
      <Action
        label="People You've Blocked"
        description="Blocked people can’t send you chat requests or private messages."
      />
      <Input
        disabled={true}
        placeholder="BLOCK NEW USER"
        fontSize={10}
        fontWeight="bold"
        bg="white"
      />
      <SectionTitle label="Advanced security" />
      <Action
        label="Use two-factor authentication"
        description="Help protect your account (even if someone gets your password) by requiring a verification code and a password to log in."
        button={<Switch disabled={true} />}
      />
    </Box>
  );
}
