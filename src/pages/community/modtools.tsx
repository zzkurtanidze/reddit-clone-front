//@ts-nocheck
import React from "react";
import { Box, Grid, Text } from "@chakra-ui/layout";
import SectionTitle from "@components/common/SectionTitle";
import { RiDatabaseLine } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { ImTicket } from "react-icons/im";
import { IoMdDocument } from "react-icons/io";
import ModQueue from "./tabs/modqueue";
import RulesTab from "./tabs/rules";
import ModeratorsPage from "./moderators";
//@ts-ignore
import { getRoleInCommunity } from "@api/";
import PostFlairs from "./tabs/postFlairs";
import PendingTab from "./tabs/pending";
import PrimaryButton from "@components/common/PrimaryButton";

export default function ModToolsPage({ match }: { match: any }) {
  const tabName = match.params.tabname;
  const community = match.params.name;
  const { role } = getRoleInCommunity(community);
  const history = useHistory();

  const tabs = {
    modqueue: <ModQueue communityUsername={community} />,
    rules: <RulesTab community={community} />,
    pending: <PendingTab communityUsername={community} />,
    moderators: <ModeratorsPage match={match} role={role} />,
    postflairs: <PostFlairs community={community} />,
  };

  return (
    <Grid gridTemplateColumns="0.2fr 1fr">
      {role === "admin" && (
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
          <TabLink label="Pending" url="pending" tabName={tabName} />
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
      )}
      <Box
        w={role !== "admin" ? "100vw" : "100%"}
        h={role !== "admin" ? "100vh" : "100%"}
        bg="#DAE0E6"
        mt="60px"
      >
        {role === "admin" || tabName === "moderators" ? (
          tabs[tabName]
        ) : (
          //@ts-ignore
          <Grid w="100%" h="80vh" placeItems="center">
            <PrimaryButton
              label="Go Back"
              onClick={() => history.push(`/r/${community}/`)}
              position="absolute"
              top="80px"
              left="50px"
            />
            <Text fontFamily="mono" fontSize={22} fontWeight="bold">
              You don't have permissions to see this page.
            </Text>
          </Grid>
        )}
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
