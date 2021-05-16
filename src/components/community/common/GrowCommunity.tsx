import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import StyledBox from "@components/common/StyledBox";
import React, { useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import LeftSideDrawing from "@assets/left-side-drawing.png";
import { useHistory } from "react-router-dom";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

export default function GrowCommunity({
  communityUsername,
}: {
  communityUsername: string;
}) {
  const [show, setShow] = useState<boolean>(true);
  const history = useHistory();

  return (
    <StyledBox position="relative" fontFamily="mono" mb={2}>
      <Text fontSize={22} fontWeight="medium">
        Grow your community
      </Text>
      <Button
        bg="none"
        top="25px"
        p={0}
        h="max-content"
        _active={{}}
        _hover={{}}
        _focus={{}}
        right="10px"
        position="absolute"
        onClick={() => setShow(!show)}
      >
        {show ? (
          <RiArrowUpSLine size={20} color="a5a5a5" />
        ) : (
          <RiArrowDownSLine size={20} color="a5a5a5" />
        )}
      </Button>
      {show && (
        <GrowCommunityItem
          label="Time to make your first post!"
          description="
              Now that you've created your community, start things off right by
              making your first post."
          color="#9a2de2"
          buttonLabel="Make your first post"
          onClick={() => history.push(`/${communityUsername}/submit`)}
        />
      )}
    </StyledBox>
  );
}

const GrowCommunityItem = ({
  label,
  description,
  onClick,
  buttonLabel,
  color,
}: {
  label: string;
  description: string;
  onClick: any;
  buttonLabel: string;
  color: string;
}) => {
  const [show, setShow] = useState<boolean>(true);

  if (!show) return <></>;
  return (
    <Flex
      px="15px"
      py="5px"
      my="15px"
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius={5}
      alignItems="center"
      gridGap={2}
      position="relative"
      bgImage={`url(${LeftSideDrawing})`}
      bgSize="50%"
      bgRepeat="no-repeat"
      bgPosition="-5px -50px"
    >
      <Box alignSelf="flex-start">
        <HiPlusCircle size={50} color={color} />
      </Box>
      <Box>
        <Text fontSize={24} fontWeight="medium">
          {label}
        </Text>
        <Text fontSize={14} fontWeight="medium" mt={1} w="80%" color="gray.400">
          {description}
        </Text>
        <Button
          bg={color}
          fontSize={14}
          h="max-content"
          py={2}
          my={2}
          _hover={{}}
          _active={{}}
          _focus={{}}
          color="white"
          borderRadius={50}
          onClick={onClick}
        >
          {buttonLabel}
        </Button>
        <Button
          position="absolute"
          bg="none"
          p={0}
          top={0}
          _hover={{}}
          _active={{}}
          _focus={{}}
          right={0}
          onClick={() => setShow(false)}
        >
          <IoMdClose size={14} color="#a5a5a5" />
        </Button>
      </Box>
    </Flex>
  );
};
