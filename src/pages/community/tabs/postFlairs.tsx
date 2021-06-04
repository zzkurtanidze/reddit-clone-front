//@ts-ignore
import { getFlairs } from "@api/";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Table, Td, Thead, Tr } from "@chakra-ui/table";
import FormCheckbox from "@components/common/FormCheckbox";
import FormColorPicker from "@components/common/FormColorPicker";
import FormField from "@components/common/FormField";
import PrimaryButton from "@components/common/PrimaryButton";
import SecondaryButton from "@components/common/SecondaryButton";
//@ts-ignore
import { CommunityType } from "@types/";
import { Form, Formik } from "formik";
import React, { useState } from "react";

export default function PostFlairs({ community }: { community: string }) {
  const { flairs, isLoading } = getFlairs(community);
  const [flairForm, setFlairForm] = useState<boolean>(false);

  return (
    <Box>
      <Flex
        justifyContent="flex-end"
        w="100%"
        h="max-content"
        mt="60px"
        p={2}
        bg="#EDEFF1"
        alignItems="center"
        gridGap={5}
      >
        <SecondaryButton
          label="Post flair settings"
          onClick={() => {}}
          bg="none"
        />
        <SecondaryButton
          label="Reorder"
          disabled={flairs ? false : true}
          onClick={() => {}}
          bg="none"
        />
        <PrimaryButton
          label="Add flair"
          onClick={() => setFlairForm(!flairForm)}
        />
      </Flex>
      <Box p={10}>
        <Text fontFamily="mono" fontWeight="medium" fontSize={22}>
          Post flair management
        </Text>
        <Table borderRadius={4} mt="50px">
          <Thead bg="#F6F7F8">
            <Tr
              fontSize={12}
              fontWeight="bold"
              fontFamily="mono"
              color="gray.500"
              textTransform="uppercase"
            >
              <Td w="35%">Post Flair Preview</Td>
              <Td w="10%">Css Class</Td>
              <Td w="40%">Settings</Td>
              <Td>Flair ID</Td>
            </Tr>
          </Thead>
        </Table>
        {!flairs && !flairForm && (
          <Flex
            placeItems="center"
            justifyContent="center"
            direction="column"
            bg="white"
            w="100%"
            minH="400px"
            gridGap={3}
          >
            <Image
              src="http://localhost:4000/assets/label.svg"
              w="50px"
              h="50px"
            />
            <Text fontFamily="mono" fontSize={22} fontWeight="medium">
              You do not have any post flair
            </Text>
            <Text fontFamily="mono" fontSize={14} fontWeight="medium">
              Create post flair in your community today
            </Text>
          </Flex>
        )}
        {flairForm && (
          <Box p={5} bg="gray.200">
            <Formik
              initialValues={{
                text: "",
                backgroundColor: "",
                textColor: "",
                CSSClass: "",
                ModOnly: false,
                type: "post",
              }}
              onSubmit={(data) => console.log(data)}
            >
              {({ errors, touched, values, setValues }) => (
                <Form>
                  <Flex gridGap={10}>
                    <Flex direction="column" gridGap={5} w="25%">
                      <Text
                        fontWeight="bold"
                        fontFamily="mono"
                        fontSize={10}
                        textTransform="uppercase"
                        color="gray.500"
                      >
                        Flair Appearance
                      </Text>
                      <FormField
                        type="input"
                        name="text"
                        touched={touched.text}
                        error={errors.text}
                        label="Flair text"
                        sufix={`${
                          (64 - values.text?.length) | 64
                        } characters remaining`}
                      />
                      <FormField
                        type="input"
                        name="CSSClass"
                        touched={touched.CSSClass}
                        error={errors.CSSClass}
                        label="CSS Class"
                        sufix="Optional"
                      />
                      <FormColorPicker
                        label="Flair background color"
                        name="backgroundColor"
                        values={values}
                        setValues={setValues}
                      />
                      <FormColorPicker
                        label="Flair text color"
                        name="textColor"
                        values={values}
                        setValues={setValues}
                      />
                    </Flex>
                    <Flex direction="column" w="25%">
                      <Text
                        fontWeight="bold"
                        fontFamily="mono"
                        fontSize={10}
                        textTransform="uppercase"
                        color="gray.500"
                      >
                        Flair settings
                      </Text>
                      <br />
                      <FormCheckbox label="Mod Only" name="ModOnly" />
                    </Flex>
                  </Flex>
                  <Flex w="100%" mt={5} justifyContent="flex-end" gridGap={5}>
                    <SecondaryButton
                      label="Cancel"
                      bg="none"
                      w="100px"
                      py="9px"
                      onClick={() => setFlairForm(false)}
                    />
                    <PrimaryButton
                      label="Save"
                      type="submit"
                      w="100px"
                      py="9px"
                    />
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        )}
      </Box>
    </Box>
  );
}
