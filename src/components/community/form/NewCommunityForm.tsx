import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import FormField from "../../common/FormField";
import FormTextarea from "../../common/FormTextarea";
import { Button } from "@chakra-ui/button";
import { createCommunity, getCategories } from "../../../api";
import { useToast } from "@chakra-ui/toast";
//@ts-ignore
import { CategoryType } from "@types/";
import SelectField from "@components/common/SelectField";

export default function NewCommunityForm() {
  let { categories: data } = getCategories();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const toast = useToast();

  useEffect(() => {
    const newCategories: { label: string; value: string }[] = [];
    if (data) {
      data.forEach(({ name, value }: { name: string; value: string }) => {
        newCategories.push({ label: name, value: value });
      });
    }
    setCategories(newCategories);
  }, [data]);

  return (
    <>
      <Text fontWeight="bold">Create Community</Text>
      <br />
      <Divider />
      <br />
      <Formik
        initialValues={{ name: "", description: "", category: "" }}
        onSubmit={async (data) => {
          const response = await createCommunity(data);
          if (response.statusText === "OK") {
            toast({
              title: "Community has been created",
              status: "success",
              isClosable: true,
            });
            setTimeout(() => {
              window.location.replace(`/r/${response.data.username}`);
            }, 1000);
          } else {
            toast({
              title: response.data,
              status: "error",
              isClosable: true,
            });
          }
        }}
      >
        {({ errors, touched }) => (
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
              <Field
                label="Categories"
                name="category"
                options={categories}
                error={errors.category}
                touched={touched.category}
                component={SelectField}
              />
              <Box mb="80px"></Box>
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
                    fontSize={14}
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
                    fontSize={14}
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
