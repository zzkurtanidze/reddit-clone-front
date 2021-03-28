import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

type FormFieldProps = {
  placeholder?: string;
  label?: string;
  type: string;
  name: string;
  error: string | undefined;
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
        <FormLabel fontFamily="mono">
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
        name={name}
        type={type}
        fontSize={14}
        as={Input}
      />
      {sufix && (
        <FormHelperText fontSize={12} my={2} fontFamily="mono">
          {sufix}
        </FormHelperText>
      )}
      {touched && (
        <FormErrorMessage fontSize={11} fontWeight="600">
          {error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}
