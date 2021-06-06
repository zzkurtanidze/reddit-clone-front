import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { CategoryButton } from "./CategoryButton";

import { AiFillCaretDown } from "react-icons/ai";
//@ts-ignore
import { getFlairs } from "@api/";
import Flair from "@components/common/Flair";
import { IoMdClose } from "react-icons/io";
import SecondaryButton from "@components/common/SecondaryButton";
import PrimaryButton from "@components/common/PrimaryButton";

export const FlairsDropdown = ({
  label,
  post,
  setPost,
  community,
}: {
  label: string;
  community: string;
  post: any;
  setPost: any;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { flairs: initialFlairs, isLoading } = getFlairs(community);
  const [flairs, setFlairs] = useState<[]>();
  const [search, setSearch] = useState("");
  const [selectedFlair, setSelectedFlair] = useState("");

  useEffect(() => {
    if (initialFlairs) {
      setFlairs(initialFlairs);
    }
  }, [initialFlairs]);

  return (
    <Flex direction="column">
      <CategoryButton
        checkedIcon={<AiFillCaretDown color="#878A8C" size={14} />}
        label={label}
        onClick={() => setOpen(!open)}
      />
      {open && flairs && (
        <Box
          bg="white"
          position="absolute"
          top="100px"
          right="135px"
          borderRadius="5px"
          w="300px"
          minH="400px"
          px="5px"
          zIndex={5}
          boxShadow="0 1px 15px rgba(0,0,0,.3)"
          fontWeight="bold"
          fontSize={13}
          color="#878A8C"
          p={3}
        >
          <Box position="relative">
            <Text color="black" fontSize={16} fontFamily="mono">
              Select r/{community} flair
            </Text>
            <Button
              _hover={{}}
              _focus={{}}
              _active={{}}
              bg="none"
              position="absolute"
              right="-7px"
              top="-7px"
              onClick={() => setOpen(false)}
            >
              <IoMdClose color="black" size={18} />
            </Button>
          </Box>
          <Divider my={4} />
          <Input
            w="100%"
            h="40px"
            _focus={{ borderColor: "black" }}
            placeholder="Search for flair"
            fontSize={13}
            fontFamily="mono"
            type="input"
            mb={2}
            onChange={(e: any) => setSearch(e.target.value)}
          />
          <RadioGroup
            value={selectedFlair}
            onChange={(value: string) => setSelectedFlair(value)}
          >
            {flairs
              ?.filter((flair: any) => flair.text.includes(search))
              .map((flair: any) => (
                <Box mt={3}>
                  <Radio
                    _focus={{}}
                    isChecked={selectedFlair === flair.text}
                    value={flair.text}
                  >
                    <Flair flair={flair} />
                  </Radio>
                </Box>
              ))}
          </RadioGroup>
          <Flex
            w="100%"
            justifyContent="flex-end"
            position="absolute"
            bottom="10px"
            right="15px"
            gridGap={2}
          >
            <SecondaryButton
              label="Clear Flair"
              onClick={() => setSelectedFlair("")}
              disabled={!selectedFlair}
            />
            <PrimaryButton
              label="Apply"
              onClick={() => {
                setPost({
                  ...post,
                  flair: flairs.find((f: any) => f.text === selectedFlair),
                });
                setOpen(false);
              }}
            />
          </Flex>
        </Box>
      )}
    </Flex>
  );
};
