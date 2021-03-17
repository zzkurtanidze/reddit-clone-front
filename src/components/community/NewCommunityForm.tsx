import React from "react";
import { Formik, Form } from "formik";
import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import FormField from "../common/FormField";
import FormTextarea from "../common/FormTextarea";
import { Button } from "@chakra-ui/button";

export default function NewCommunityForm() {
  return (
    <>
      <Text fontWeight="bold">Create Community</Text>
      <br />
      <Divider />
      <br />
      <Formik
        initialValues={{ name: "", description: "" }}
        onSubmit={(data) => console.log(data)}
      >
        {({ errors }) => (
          <Form>
            <Flex direction="column" gridGap={2}>
              <FormField
                label="Name"
                name="name"
                type="input"
                error={errors.name}
                required
                description="Community names including capitalization can not be changed."
              />
              <FormTextarea
                label={"Description"}
                name="description"
                error={errors.description}
                description="This is how new members come to understand your community."
                required
              />
              <Box mb="50px"></Box>
              <Flex
                position="absolute"
                w="100%"
                p={5}
                bottom="0"
                left="0"
                bg="gray.200"
                justifyContent="flex-end"
              >
                <Flex gridGap={2}>
                  <Button
                    type="submit"
                    bg="gray.200"
                    color="black"
                    borderColor="gray.500"
                    borderWidth="1px"
                    px="20px"
                    _hover={{}}
                    _active={{}}
                    borderRadius={3}
                  >
                    CANCEL
                  </Button>
                  <Button
                    type="submit"
                    bg="#1384D7"
                    color="white"
                    px="20px"
                    _hover={{}}
                    _active={{}}
                    borderRadius={3}
                  >
                    CREATE COMMUNITY
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
}
