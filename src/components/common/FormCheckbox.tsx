import { FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Flex } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import { Field } from "formik";
import React from "react";

export default function FormCheckbox({
  label,
  description,
  name,
}: {
  label: string;
  description?: string;
  name: string;
}) {
  return (
    <Flex justifyContent="space-between">
      {label && (
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
    </Flex>
  );
}
