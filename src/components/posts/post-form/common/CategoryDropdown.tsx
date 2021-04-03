import React, { useState } from "react";
import { Box, Divider, Flex } from "@chakra-ui/react";
import { CategoryButton } from "./CategoryButton";

import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export const CategoryDropdown = ({
  label,
  items,
  post,
  setPost,
}: {
  label: string;
  items: [];
  post: any;
  setPost: any;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Flex direction="column">
      <CategoryButton
        checkedIcon={<AiFillCaretDown color="#878A8C" size={14} />}
        uncheckedIcon={<AiFillCaretUp size={14} color="white" />}
        label={label}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <Box
          bg="white"
          position="absolute"
          borderRadius="10px"
          mt="40px"
          w="200px"
          px="5px"
          zIndex={5}
          boxShadow="0 1px 10px rgba(0,0,0,.1)"
          border="1px solid #878A8C"
          fontWeight="bold"
          textTransform="uppercase"
          fontSize={13}
          color="#878A8C"
        >
          {items.map((item: any, index: number) => (
            <>
              <CategoryButton
                label={item.name}
                w="100%"
                border="0"
                borderRadius="5px"
                mx={0}
                post={post}
                setPost={setPost}
              />
              {index < items.length - 1 && <Divider />}
            </>
          ))}
        </Box>
      )}
    </Flex>
  );
};
