import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, FormikErrors } from "formik";
import React from "react";

type FormFieldProps = {
  placeholder?: string;
  label?: string;
  type: string;
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
};

export default function FormField({
  placeholder,
  type,
  label,
  name,
  error,
  required = false,
  description,
  sufix,
  touched,
}: FormFieldProps) {
  return (
    <FormControl isInvalid={error && touched ? true : false}>
      {label && (
        <FormLabel fontSize={14} fontFamily="mono">
          {label && `${label} ${required ? "*" : ""}`}
        </FormLabel>
      )}
      {description && (
        <FormHelperText fontSize={12} mb={2} fontFamily="mono">
          {description}
        </FormHelperText>
      )}
      <Field
        bg="white"
        placeholder={placeholder && `${placeholder} ${required ? "*" : ""}`}
        _focus={{ border: "1px solid black" }}
        name={name}
        type={type}
        fontFamily="mono"
        transition="0"
        fontSize={14}
        as={Input}
      />
      {touched && (
        <FormErrorMessage fontSize={11} fontFamily="mono" fontWeight="semibold">
          {error}
        </FormErrorMessage>
      )}
      {sufix && (
        <FormHelperText fontSize={12} my={2} fontFamily="mono">
          {sufix}
        </FormHelperText>
      )}
    </FormControl>
  );
}
