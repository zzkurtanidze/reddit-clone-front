import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

type FormFieldProps = {
  placeholder: string;
  type: string;
  name: string;
  error: string | undefined;
};

export default function FormField({
  placeholder,
  type,
  name,
  error,
}: FormFieldProps) {
  return (
    <FormControl isInvalid={error ? true : false}>
      <Field placeholder={placeholder} name={name} type={type} as={Input} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
