import React from "react";
import {
  FormControl,
  FormErrorMessage,
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
  touched,
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
  touched?: boolean;
}) {
  return (
    <FormControl isInvalid={error && touched ? true : false} my={2}>
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
        fontFamily="mono"
        transition="0"
        as={Textarea}
        _focus={{ border: "1px solid black" }}
        placeholder={placeholder && `${placeholder} ${required ? "*" : ""}`}
        name={name}
      ></Field>
      {touched && (
        <FormErrorMessage fontSize={11} fontFamily="mono" fontWeight="semibold">
          {error}
        </FormErrorMessage>
      )}
      {sufix && (
        <FormHelperText fontSize={12} fontFamily="mono" my={2}>
          {sufix}
        </FormHelperText>
      )}
    </FormControl>
  );
}
