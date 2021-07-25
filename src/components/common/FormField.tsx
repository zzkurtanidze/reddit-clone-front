import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputRightAddon,
  InputGroup,
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
  inlineSufix?: string;
  touched?: boolean;
  disabled?: boolean;
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
  inlineSufix,
  disabled,
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
      <InputGroup>
        <Field
          bg="white"
          placeholder={placeholder && `${placeholder} ${required ? "*" : ""}`}
          _focus={{ border: "1px solid black" }}
          name={name}
          type={type}
          fontFamily="mono"
          transition="0"
          fontSize={14}
          borderRadius={5}
          borderRightRadius={inlineSufix ? 0 : 5}
          disabled={disabled}
          as={Input}
        />
        {inlineSufix && (
            <InputRightAddon fontSize={14} bg="white">{inlineSufix}</InputRightAddon>
        )}
      </InputGroup>
      {touched && error && (
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
