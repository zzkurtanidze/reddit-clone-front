import { Box, Link } from "@chakra-ui/layout";
import React from "react";
import Action from "../../../components/common/Action";
import SectionTitle from "../../../components/common/SectionTitle";
import Title from "../../../components/common/Title";
import { UserType } from "../../../types";

export default function PremiumTab({ user }: { user: UserType }) {
  return (
    <Box fontFamily="mono">
      <Title
        label="Reddit Premium"
        description="Reddit Premium is a subscription membership that upgrades your account with extra features."
      />
      <SectionTitle label="SUBSCRIPTION STATUS" />
      <Action description="Get Reddit Premium and help support Reddit." />
      <Link fontWeight="bold" color="#0079D3">
        Get Premium
      </Link>
    </Box>
  );
}
