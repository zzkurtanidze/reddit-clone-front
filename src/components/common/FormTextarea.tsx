import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Field, FormikErrors } from "formik";

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
  error:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  required?: boolean;
  description?: string;
  sufix?: string;
}) {
  return (
    <FormControl isInvalid={error ? true : false} my={2}>
      {label && (
        <FormLabel fontSize={14} fontFamily="mono">{`${label} ${
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
        fontSize={14}
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
