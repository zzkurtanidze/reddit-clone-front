import { FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Flex } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import { Field } from "formik";
import React from "react";

export default function FormCheckbox({
  label,
  description,
  name,
  side = "left",
}: {
  label: string;
  description?: string;
  name: string;
  side?: "left" | "right"
}) {
  return (
    <Flex justifyContent="space-between" gridGap={2}>
      {label && side === "left" && (
        <FormLabel fontSize={14} fontFamily="mono">
          {label && label}
        </FormLabel>
      )}
      {description && (
        <FormHelperText fontSize={12} mb={2} fontFamily="mono">
          {description}
        </FormHelperText>
      )}
      <Field
        _focus={{ border: "1px solid black" }}
        name={name}
        type="checkbox"
        fontFamily="mono"
        transition="0"
        fontSize={14}
        as={Switch}
      />
      {label && side === "right" && (
        <FormLabel fontSize={14} fontFamily="mono">
          {label && label}
        </FormLabel>
      )}
    </Flex>
  );
}
