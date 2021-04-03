import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { FaPlus, FaCheck } from "react-icons/fa";

export const CategoryButton = ({
  label,
  checkedIcon = <FaPlus color="#878A8C" size={14} />,
  uncheckedIcon = <FaCheck color="white" size={14} />,
  onClick,
  ...props
}: {
  label: string;
  checkedIcon?: JSX.Element;
  uncheckedIcon?: JSX.Element;
  onClick: Function;
  [x: string]: any;
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Button
      borderRadius={50}
      mx={1}
      my={2}
      fontSize={13}
      fontWeight="bold"
      h="max-content"
      py={2}
      color={checked ? "white" : "#878A8C"}
      border="1px solid #878A8C"
      bg={checked ? "#0B0B0B" : "white"}
      display="flex"
      gridGap={2}
      _hover={{ background: checked ? "#0B0B0B" : "#FAFAFB" }}
      _focus={{}}
      _active={{
        background: checked ? "#0B0B0B" : "#FAFAFB",
      }}
      textTransform="uppercase"
      onClick={() => {
        setChecked(!checked);
        onClick();
      }}
      {...props}
    >
      {!checked ? checkedIcon : uncheckedIcon}
      {label}
    </Button>
  );
};
