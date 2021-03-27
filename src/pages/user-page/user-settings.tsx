import { Box, Flex, Text } from "@chakra-ui/layout";
import Container from "../../components/common/Container";
import React, { useEffect, useState } from "react";

import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";

export default function UserSettingsPage({ match }: { match: any }) {
  const [tab, setTab] = useState<string>("");

  useEffect(() => {
    setTab(match.params.tab);
  }, [match]);

  return (
    <Container>
      <Text
        fontFamily="mono"
        fontSize={20}
        alignItems="center"
        fontWeight="bold"
        display="flex"
        gridGap={1}
      >
        <IoIosSettings size={22} /> User settings
      </Text>
      <Flex
        mt={5}
        fontFamily="mono"
        fontWeight={900}
        fontSize={15}
        letterSpacing="-0.2px"
        borderBottom="1px solid rgba(191, 191, 191, 0.5)"
      >
        <TabLink name="account" label="Account" tab={tab} />
        <TabLink name="profile" label="Profile" tab={tab} />
        <TabLink name="privacy" label="Safety & Privacy" tab={tab} />
        <TabLink name="notifications" label="Notifications" tab={tab} />
        <TabLink name="premium" label="Subscriptions" tab={tab} />
      </Flex>
    </Container>
  );
}

const TabLink = ({
  name,
  label,
  tab,
}: {
  name: string;
  label: string;
  tab: string;
}) => {
  return (
    <Box px={5} py={3} borderBottom={tab === name ? "3px solid #0079D3" : "0"}>
      <Link to={`/settings/${name}`}>{label}</Link>
    </Box>
  );
};
