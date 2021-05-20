//@ts-ignore
import { newRule } from "@api/";
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
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required().min(2).max(100).label("Rule name"),
  description: yup.string().max(500).label("Description"),
});

export default function RulesForm({
  community,
  setShowModal,
}: {
  community: CommunityType;
  setShowModal: any;
}) {
  const toast = useToast();

  return (
    <Formik
      initialValues={{ name: "", description: "" }}
      onSubmit={async (data) => {
        const response = await newRule(community, data);
        if (response.statusText === "OK") {
          toast({
            title: "Rule has been added.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setShowModal(false);
        }
      }}
      validateOnMount={true}
      validationSchema={validationSchema}
    >
      {({ errors, values, touched }) => (
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
              touched={touched.name}
            />
            <FormTextarea
              label="Full Description"
              placeholder="Enter the full description of the rule"
              name="description"
              sufix={`${500 - values.description.length} Characters remaining`}
              error={errors.description}
              touched={touched.description}
            />
            <Flex gridGap={2}>
              <SecondaryButton
                label="Cancel"
                onClick={() => setShowModal(false)}
                py="7px"
              />
              <PrimaryButton
                label="Add new rule"
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
