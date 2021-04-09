import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { FormikErrors } from "formik";
import React from "react";
import Select from "react-select";

export default function SelectField({
  label,
  name,
  error,
  description,
  touched,
  options,
  form,
  field,
}: {
  label?: string;
  name: string;
  error:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  description?: string;
  touched?: boolean;
  options: { value: string; label: string }[] | undefined;
  form?: any;
  field?: any;
}) {
  return (
    <FormControl fontFamily="mono" isInvalid={error && touched ? true : false}>
      {label && <FormLabel>{label}</FormLabel>}
      {description && (
        <FormHelperText fontSize={12} mb={2}>
          {description}
        </FormHelperText>
      )}
      <Select
        options={options}
        maxMenuHeight={150}
        name={name}
        onChange={(option) => form.setFieldValue(field.name, option!.value)}
      />
      {touched && (
        <FormErrorMessage fontSize={12} fontWeight="600">
          {error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}
