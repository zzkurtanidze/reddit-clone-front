import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "formik";

export default function FormTextarea({
  placeholder,
  label,
  name,
  error,
  required = false,
  description,
  sufix,
}: {
  placeholder?: string;
  label?: string;
  name: string;
  error: string | undefined;
  required?: boolean;
  description?: string;
  sufix?: string;
}) {
  return (
    <FormControl isInvalid={error ? true : false} my={2}>
      {label && (
        <FormLabel fontFamily="mono">{`${label} ${
          required ? "*" : ""
        }`}</FormLabel>
      )}
      {description && (
        <FormHelperText fontSize={12} fontFamily="mono" mb={2}>
          {description}
        </FormHelperText>
      )}
      <Field
        bg="white"
        as={Textarea}
        placeholder={placeholder && `${placeholder} ${required ? "*" : ""}`}
        name={name}
      ></Field>
      {sufix && (
        <FormHelperText fontSize={12} fontFamily="mono" my={2}>
          {sufix}
        </FormHelperText>
      )}
    </FormControl>
  );
}
