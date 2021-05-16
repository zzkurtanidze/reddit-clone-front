import React from "react";
import { Box, Grid, Text } from "@chakra-ui/layout";
import SectionTitle from "@components/common/SectionTitle";
import { RiDatabaseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { ImTicket } from "react-icons/im";
import { IoMdDocument } from "react-icons/io";
import ModQueue from "./tabs/modqueue";
import RulesTab from "./tabs/rules";

export default function ModToolsPage({ match }: { match: any }) {
  const tabName = match.params.tabname;
  const community = match.params.name;

  const tabs = {
    modqueue: <ModQueue communityUsername={community} />,
    rules: <RulesTab />,
  };

  return (
    <Grid gridTemplateColumns="0.2fr 1fr">
      <Box py="70px" minH="100vh" bg="#F6F7F8">
        <SectionTitle
          icon={<RiDatabaseLine size={16} color="#718096" />}
          label="Queues"
          px="25px"
          mt={9}
          mb={1}
        />
        <TabLink label="Mod queue" url="modqueue" tabName={tabName} />
        <TabLink label="Reports" url="reports" tabName={tabName} />
        <SectionTitle
          icon={<FaUser size={16} color="#718096" />}
          label="User Management"
          px="25px"
          mt={9}
          mb={1}
        />
        <TabLink label="Banned" url="banned" tabName={tabName} />
        <TabLink label="Moderators" url="moderators" tabName={tabName} />
        <SectionTitle
          icon={<ImTicket size={16} color="#718096" />}
          label="Flairs"
          px="25px"
          mt={9}
          mb={1}
        />
        <TabLink label="User flairs" url="userflairs" tabName={tabName} />
        <TabLink label="Post flairs" url="postflairs" tabName={tabName} />
        <SectionTitle
          icon={<IoMdDocument size={16} color="#718096" />}
          label="Rules And Regulations"
          px="25px"
          mt={9}
          mb={1}
        />
        <TabLink label="Rules" url="rules" tabName={tabName} />
        <TabLink
          label="Content controls"
          url="contentcontrols"
          tabName={tabName}
        />
        <TabLink label="Automod" url="automod" tabName={tabName} />
      </Box>
      <Box bg="#DAE0E6">
        {
          //@ts-ignore
          tabs[tabName]
        }
      </Box>
    </Grid>
  );
}

const TabLink = ({
  url,
  label,
  tabName,
}: {
  url: string;
  label: string;
  tabName: string;
}) => {
  return (
    <Link to={`./${url}`}>
      <Text
        fontSize={14}
        px="25px"
        py="7px"
        w="100%"
        bg={tabName === url ? "#EDEFF1" : "transparent"}
        boxShadow={tabName === url ? "inset 4px 0 blue" : "0"}
        _hover={{ background: "#EDEFF1" }}
      >
        {label}
      </Text>
    </Link>
  );
};
