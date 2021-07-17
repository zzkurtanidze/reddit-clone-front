import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Flex,
  Table,
  Thead,
  Tr,
  Divider,
  useToast,
  Grid,
} from "@chakra-ui/react";
//@ts-ignore
import { CommunityType } from "@types/";
import PrimaryButton from "@components/common/PrimaryButton";
import { ImHammer2 } from "react-icons/im";
import Modal from "@components/Modal";
import { Formik, Form, Field } from "formik";
import FormField from "@components/common/FormField";
import SelectField from "@components/common/SelectField";
//@ts-ignore
import { getRules, banUser } from "@api/";
import FormCheckbox from "@components/common/FormCheckbox";
import FormTextarea from "@components/common/FormTextarea";
import SecondaryButton from "@components/common/SecondaryButton";
import * as yup from "yup";
//@ts-ignore
import {getBannedUsers} from "@api/";

const validationSchema = yup.object({
  username: yup.string().required().min(3).label("Username"),
  reason: yup.string().required().label("Reason"),
  note: yup.string().max(300).label("Note"),
  until: yup.number().max(356).label("Length"),
  permanent: yup.boolean(),
  message: yup.string().max(1000).label("Message"),
});

export default function BannedUsers({
  community,
  communityUsername,
}: {
  community: CommunityType;
  communityUsername: string;
}) {
  const [banUserModal, setBanUserModal] = useState<boolean>(false);
  const { rules: initialRules } = getRules(communityUsername);
  const [rules, setRules] = useState<any[]>([]);
  const toast = useToast();
  const [bannedUsers, setBannedUsers] = useState([]);
  const { banned, isLoading } = getBannedUsers(communityUsername) 

  useEffect(() => {
    if(bannedUsers) {
      setBannedUsers(banned)
    }
  }, [banned])

  useEffect(() => {
    if (initialRules) {
      const newRules: any[] = [];
      initialRules.forEach(
        (rule: { name: string; _id: string; [x: string]: any }) => {
          newRules.push({ label: rule.name, value: rule._id });
        }
      );
      setRules(newRules);
    }
  }, [initialRules]);

  return (
    <Box>
      {banUserModal && (
        <Modal
          open={banUserModal}
          onClose={() => setBanUserModal(false)}
          py={7}
          w="30%"
          overflow="default"
        >
          <Text fontSize={18} fontFamily="mono">
            Ban a user:
          </Text>
          <Divider my={5} />
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              username: "",
              reason: "",
              note: "",
              until: "",
              permanent: false,
              message: "",
            }}
            onSubmit={async (data) => {
              const response = await banUser(data, community._id);
              if(response.statusText === "OK") {
                toast({
                  title: "User banned succesfully",
                  status: "success",
                  isClosable: true
                }) 
                setBanUserModal(false);
              } 
            }}
          >
            {({ values, touched, errors, isValid }) => (
              <Form>
                <FormField
                  label="Enter Username"
                  placeholder="username"
                  type="text"
                  name="username"
                  error={errors.username}
                  touched={touched.username}
                />
                <Field
                  label="Reason for ban"
                  name="reason"
                  options={rules}
                  error={errors.reason}
                  touched={touched.reason}
                  component={SelectField}
                />
                <FormField
                  label="Mod Note"
                  placeholder="Mod note"
                  type="text"
                  name="note"
                  sufix={`${300 - values.note.length} Characters remaining`}
                  error={errors.note}
                  touched={touched.note}
                />
                <Text fontSize={14} fontFamily="mono" fontWeight="medium" mb={2}>How Long?</Text>
                <Flex w="64%" alignItems="center" gridGap={2}>
                  <FormField
                    name="until"
                    type="number"
                    error={errors.until}
                    touched={touched.until}
                    inlineSufix="Days"
                    disabled={values.permanent}
                  />
                  <FormCheckbox label="Permanent" name="permanent" side="right" />
                </Flex>
                <FormTextarea
                  label="Note to include in ban message"
                  placeholder="Reason they were banned"
                  sufix={`${1000 - values.message.length} Characters Remaining`}
                  name="message"
                  error={errors.message}
                  touched={touched.message}
                />
                <Flex justifyContent="flex-end" gridGap={2}>
                  <SecondaryButton
                    onClick={() => setBanUserModal(false)}
                    label="Cancel"
                  />
                  <PrimaryButton type="submit" label="Ban user" disabled={!isValid} />
                </Flex>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
      <Flex
        w="100%"
        h="max-content"
        bg="#EDEFF1"
        p={2}
        alignItems="center"
        justifyContent="flex-end"
        gridGap={5}
      >
        <PrimaryButton label="Ban user" onClick={() => setBanUserModal(true)} />
      </Flex>
      <Box p={10}>
        <Text fontSize={22} fontFamily="mono" fontWeight="medium">
          Banned users
        </Text>
        {bannedUsers && bannedUsers.length < 1 ? (
          <Flex
            direction="column"
            w="100%"
            h="40vh"
            bg="white"
            borderRadius={5}
            justifyContent="center"
            alignItems="center"
            gridGap={10}
            mt={5}
          >
            <ImHammer2 color="gray" fontSize={30} />
            <Text
              fontFamily="mono"
              fontSize={20}
              fontWeight="medium"
              color="gray.500"
            >
              No banned users in r/{communityUsername}
            </Text>
          </Flex>
        ) : (
          <Grid gridTemplateColumns="2fr 7fr 1fr 1.4fr" bg="white" p={3} borderRadius={5}>
            <Box>
              Just testing :D 
             </Box> 
          </Grid>
        )}
      </Box>
    </Box>
  );
}
