import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import SecondaryButton from "@components/common/SecondaryButton";
import StyledBox from "@components/common/StyledBox";
import React, { useState } from "react";
import { IoIosCheckmarkCircleOutline, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

export default function StyleCommunity() {
  const [show, setShow] = useState<boolean>(true);

  if (!show) return <></>;
  return (
    <StyledBox p={0}>
      <Image src="http://localhost:4000/assets/style-component-banner.png" />
      <Button
        bg="none"
        position="absolute"
        right="0px"
        top="10px"
        _hover={{}}
        _active={{}}
        _focus={{}}
        w="max-content"
        h="max-content"
        p={0}
        onClick={() => setShow(false)}
      >
        <IoMdClose size={14} color="white" />
      </Button>
      <Box p="13px">
        <Flex gridGap={3}>
          <Image
            src="http://localhost:4000/assets/reddit-painter.png"
            position="relative"
            top="-20px"
            w="50px"
          />
          <Text fontFamily="mono" mt={3} fontWeight="semibold">
            Add community style
          </Text>
        </Flex>
        <Text fontFamily="mono" fontSize={14}>
          Styling your community helps attract members. For assistance, take a
          look at the Customize Appearance Overview . Here are some great ways
          to get started.
        </Text>
        <Flex direction="column" gridGap={3} mt={5}>
          <Text
            color="#0079D3"
            fontSize={14}
            display="flex"
            gridGap={1}
            alignItems="center"
          >
            <IoIosCheckmarkCircleOutline size={16} color="gray" />
            <Link to={``}>Add community icon</Link>
          </Text>
          <Text
            color="#0079D3"
            fontSize={14}
            display="flex"
            gridGap={1}
            alignItems="center"
          >
            <IoIosCheckmarkCircleOutline size={16} color="gray" />
            <Link to={``}>Customize banner</Link>
          </Text>
          <Text
            color="#0079D3"
            fontSize={14}
            display="flex"
            gridGap={1}
            alignItems="center"
          >
            <IoIosCheckmarkCircleOutline size={16} color="gray" />
            <Link to={``}>Customize colors</Link>
          </Text>
          <SecondaryButton
            w="100%"
            my={1}
            label="Customize Appearance"
            onClick={() => {}}
          />
          <Text
            color="gray.400"
            fontSize={12}
            fontFamily="mono"
            fontWeight="bold"
            textAlign="center"
          >
            Only moderators can see this widget
          </Text>
        </Flex>
      </Box>
    </StyledBox>
  );
}
