//@ts-ignore
import { getFlairs } from "@api/";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/table";
import FormCheckbox from "@components/common/FormCheckbox";
import FormColorPicker from "@components/common/FormColorPicker";
import FormField from "@components/common/FormField";
import PrimaryButton from "@components/common/PrimaryButton";
import SecondaryButton from "@components/common/SecondaryButton";
//@ts-ignore
import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
//@ts-ignore
import { newFlair } from "@api/";
import Flair from "@components/common/Flair";
import { useToast } from "@chakra-ui/toast";
import { HiTrash } from "react-icons/hi";
import { useHistory } from "react-router";
//@ts-ignore
import { deleteFlair } from "@api/";
import FieldLoading from "@components/common/loading-animations/FieldLoading";

const validationSchema = yup.object({
  text: yup.string().required("Error: text or emoji is required"),
});

export default function PostFlairs({ community }: { community: string }) {
  const { flairs: initialFlairs, isLoading } = getFlairs(community);
  const [flairForm, setFlairForm] = useState<boolean>(false);
  const [form, setForm] = useState<FormValues>();
  const [flairs, setFlairs] = useState<[]>([]);
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    if (initialFlairs) {
      setFlairs(initialFlairs);
    }
  }, [initialFlairs]);

  type FormValues = {
    text: string;
    backgroundColor: string;
    textColor: string;
    ModOnly: boolean;
    CSSClass: string;
    type: string;
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 10000000, behavior: "smooth" });
    }, 10);
  }, [flairForm]);

  const formRef = useRef<any>();

  return (
    <Box>
      <Flex
        justifyContent="flex-end"
        w="100%"
        h="max-content"
        p={2}
        bg="#EDEFF1"
        alignItems="center"
        gridGap={5}
      >
        <PrimaryButton
          label="Add flair"
          onClick={() => {
            setFlairForm(!flairForm);
          }}
        />
      </Flex>
      <Box p={10}>
        <Text fontFamily="mono" fontWeight="medium" fontSize={22}>
          Post flair management
        </Text>
        <Table borderRadius={4} overflow="hidden" mt="50px">
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
              <Td w="10%">Flair ID</Td>
              <Td></Td>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && (
              <Flex direction="column" gridGap={10} bg="white" p={6} w="350%">
                <FieldLoading withImage={false} />
                <FieldLoading withImage={false} />
                <FieldLoading withImage={false} />
              </Flex>
            )}
						{flairs && flairs.length > 0 &&
              flairs.map((flair: any) => (
                <Tr
                  bg="white"
                  fontSize={14}
                  fontFamily="mono"
                  fontWeight="light"
                >
                  <Td>
                    <Flair flair={flair} />
                  </Td>
                  <Td>{flair.CSSClass}</Td>
                  <Td>{flair.ModOnly && "ModOnly"}</Td>
                  <Td>
                    <Button
                      bg="none"
                      textTransform="uppercase"
                      color="gray.500"
                      transition="0"
                      borderRadius={50}
                      fontFamily="mono"
                      fontSize={14}
                      px={0}
                      h="max-content"
                      py={2}
                      _focus={{}}
                      _active={{}}
                      onClick={() => {
                        navigator.clipboard.writeText(flair.id);
                        toast({
                          title: "ID Copied succesfully",
                          isClosable: true,
                        });
                      }}
                    >
                      Copy Id
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      bg="none"
                      textTransform="uppercase"
                      color="gray.500"
                      transition="0"
                      borderRadius={50}
                      fontFamily="mono"
                      fontSize={14}
                      px={0}
                      h="max-content"
                      py={2}
                      _focus={{}}
                      _active={{}}
                      onClick={async () => {
                        const response = await deleteFlair(community, flair.id);
                        if (response.statusText === "OK") {
                          toast({
                            title: "Flair removed succesfully",
                            status: "info",
                            isClosable: true,
                          });
                          setFlairs(response.data);
                        }
                      }}
                    >
                      <HiTrash color="#9b9b9b" size={18} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            {flairForm && (
              <Tr
                bg="white"
                fontSize={14}
                fontFamily="mono"
                fontWeight="light"
                ref={formRef}
              >
                <Td>
                  <Text
                    bg={form?.backgroundColor}
                    color={form?.textColor}
                    w="max-content"
                    h="max-content"
                    fontSize={13}
                    px="5px"
                    py="0px"
                    borderRadius={3}
                  >
                    {form?.text}
                  </Text>
                </Td>
                <Td>{form?.CSSClass}</Td>
                <Td>{form?.ModOnly && "ModOnly"}</Td>
                <Td>
                  <Button
                    bg="none"
                    textTransform="uppercase"
                    color="gray.500"
                    transition="0"
                    borderRadius={50}
                    fontFamily="mono"
                    fontSize={14}
                    px={0}
                    h="max-content"
                    py={2}
                    disabled
                  >
                    Copy Id
                  </Button>
                </Td>
                <Td></Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {!flairs ||
          (flairs.length < 1 && !flairForm && !isLoading && (
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
          ))}
        {flairForm && (
          <Box p={5} bg="gray.200">
            <Formik
              initialValues={{
                text: "",
                backgroundColor: "#ccc",
                textColor: "black",
                CSSClass: "",
                ModOnly: false,
                type: "post",
              }}
              validationSchema={validationSchema}
              onSubmit={async (data) => {
                const flair = {
                  id: uuidv4(),
                  ...data,
                };
                const response = await newFlair(community, flair);
                if (response.statusText === "OK") {
                  toast({
                    title: "Flair created succesfully",
                    status: "success",
                    isClosable: true,
                  });
									setFlairs(response.data.flairs);
                }
                setFlairForm(false);
                await setTimeout(() => {
                  history.push(`/r/${community}/about/postflairs`);
                }, 1000);
              }}
              //@ts-ignore
              innerRef={(data) => setForm(data?.values)}
              enableReinitialize
            >
              {({ errors, touched, values, setValues }) => (
                <Form>
                  <Flex gridGap={10}>
                    <Flex direction="column" gridGap={5} w="25%">
                      <Text
                        fontWeight="bold"
                        fontFamily="mono"
                        fontSize={11}
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
                          64 - values.text?.length
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
                        initialColor="#ccc"
                        values={values}
                        setValues={setValues}
                      />
                      <FormColorPicker
                        label="Flair text color"
                        name="textColor"
                        initialColor="black"
                        values={values}
                        setValues={setValues}
                      />
                    </Flex>
                    <Flex direction="column" w="25%">
                      <Text
                        fontWeight="bold"
                        fontFamily="mono"
                        fontSize={11}
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
