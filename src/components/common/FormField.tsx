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
};

export default function FormField({
  placeholder,
  type,
  label,
  name,
  error,
  required = false,
  description,
}: FormFieldProps) {
  return (
    <FormControl isInvalid={error ? true : false} my={2}>
      <FormLabel fontFamily="mono">
        {label && `${label} ${required && "*"}`}
      </FormLabel>
      {description && (
        <FormHelperText fontSize={12} mb={2}>
          {description}
        </FormHelperText>
      )}
      <Field
        placeholder={placeholder && `${placeholder} ${required && "*"}`}
        name={name}
        type={type}
        as={Input}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
