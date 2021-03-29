import { Text } from "@chakra-ui/layout";
import React from "react";

export default function Title({
  label,
  description,
}: {
  label: string;
  description?: string;
}) {
  return (
    <>
      <Text fontFamily="mono" fontSize={22} fontWeight="500">
        {label}
      </Text>
      {description && (
        <Text
          fontFamily="mono"
          fontSize={11}
          fontWeight="200"
          color="gray.500"
          mt={5}
        >
          {description}
        </Text>
      )}
    </>
  );
}
