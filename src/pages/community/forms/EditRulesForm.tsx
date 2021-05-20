//@ts-ignore
import { removeRule } from "@api/";
//@ts-ignore
import { updateRule } from "@api/";
import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import FormField from "@components/common/FormField";
import FormTextarea from "@components/common/FormTextarea";
import PrimaryButton from "@components/common/PrimaryButton";
import SecondaryButton from "@components/common/SecondaryButton";
//@ts-ignore
import { CommunityType } from "@types/";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required().min(2).max(100).label("Rule name"),
  description: yup.string().max(500).label("Description"),
});

export default function EditRulesForm({
  community,
  onClose,
  rule,
}: {
  community: CommunityType;
  onClose: any;
  rule: any;
}) {
  const toast = useToast();
  const history = useHistory();

  return (
    <Formik
      initialValues={{ name: rule.name, description: rule.description }}
      onSubmit={async (data) => {
        const response = await updateRule(community, data, rule.name);
        if (response.statusText === "OK") {
          toast({
            title: "Rule has been updated.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          onClose();
        }
      }}
      validateOnMount={true}
      validationSchema={validationSchema}
    >
      {({ errors, values }) => (
        <Form>
          <Flex direction="column" gridGap={2}>
            <FormField
              label="Rule"
              placeholder='Rule displayed (e.g "No Photos")'
              sufix={`${100 - values.name.length} Characters remaining`}
              name="name"
              type="input"
              required={true}
              error={errors.name}
              touched={true}
            />
            <FormTextarea
              label="Full Description"
              placeholder="Enter the full description of the rule"
              name="description"
              sufix={`${500 - values.description.length} Characters remaining`}
              error={errors.description}
              touched={true}
            />
            <Button
              bg="none"
              _hover={{}}
              _active={{}}
              _focus={{}}
              fontFamily="mono"
              fontWeight="bold"
              color="red"
              float="left"
              w="max-content"
              position="absolute"
              bottom="25px"
              right="15px"
              fontSize={14}
              onClick={async () => {
                removeRule(community, rule.name);
                toast({
                  title: "Removed succesfully",
                  status: "info",
                  isClosable: true,
                });
                onClose();
              }}
            >
              Delete
            </Button>
            <Flex gridGap={2}>
              <SecondaryButton label="Cancel" onClick={onClose} py="7px" />
              <PrimaryButton
                label="Save"
                type="submit"
                isDisabled={errors.name || errors.description}
              />
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
