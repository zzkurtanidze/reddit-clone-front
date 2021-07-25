import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Flex,
  Divider,
  useToast,
  Grid,
  ButtonGroup,
  Button,
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
import { getRules, banUser, getBannedUsers } from "@api/";
import FormCheckbox from "@components/common/FormCheckbox";
import FormTextarea from "@components/common/FormTextarea";
import SecondaryButton from "@components/common/SecondaryButton";
import * as yup from "yup";
import { UsersList } from "@components/user/UsersList";
//@ts-ignore
import { UserTeaser } from "@components/user/UserTeaser";
//@ts-ignore
import daysleft from "daysleft";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { CgMinimize } from "react-icons/cg";
//@ts-ignore
import { UserType } from "@types/";
import ErrorPage from "@pages/error";
//@ts-ignore
import {removeBan} from "@api/";

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
  const { banned } = getBannedUsers(communityUsername);
  const [bannedUsersSearch, setBannedUsersSearch] = useState<string>("");
  const [expanded, setExpanded] = useState<number[]>([]);

  useEffect(() => {
    if (banned) {
      setBannedUsers(banned);
    }
  }, [banned]);

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
              if (response.statusText === "OK") {
                toast({
                  title: "User banned succesfully",
                  status: "success",
                  isClosable: true,
                });
                setBanUserModal(false);
                setBannedUsers(response.data);
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
                <Text
                  fontSize={14}
                  fontFamily="mono"
                  fontWeight="medium"
                  mb={2}
                >
                  How Long?
                </Text>
                <Flex w="64%" alignItems="center" gridGap={2}>
                  <FormField
                    name="until"
                    type="number"
                    error={errors.until}
                    touched={touched.until}
                    inlineSufix="Days"
                    disabled={values.permanent}
                  />
                  <FormCheckbox
                    label="Permanent"
                    name="permanent"
                    side="right"
                  />
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
                  <PrimaryButton
                    type="submit"
                    label="Ban user"
                    disabled={!isValid}
                  />
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
        <UsersList setSearchTerm={setBannedUsersSearch}>
          {bannedUsers && bannedUsers.filter((banned: UserType) => banned.user.username.includes(bannedUsersSearch)).length > 0 ?
            bannedUsers
              .filter((banned: { user: UserType }) =>
                banned.user.username.includes(bannedUsersSearch)
              )
              .map((banned: any, index: number) => (
                <React.Fragment key={banned._id}>
                  <Grid
                    gridTemplateColumns="2fr 5fr 0.5fr"
                    alignItems="center"
                    w="90%"
                    m="auto"
                    my={3}
                  >
                    <UserTeaser user={banned.user} />
                      {banned.until ? (
                        <Text>
                          {daysleft(new Date(banned.until * 1000))} Days left
                        </Text>
                      ) : (
                        <Text>
                        Permanent
                        </Text> 
                      )}
                    <Flex gridGap={5} alignItems="center">
                      <SecondaryButton
                        label="Remove ban"
                        onClick={async () => {
                          const response = await removeBan({ username:  banned.user.username }, community._id)
                          if(response.status === 200) {
                            toast({ 
                              title: `u/${banned.user.username} unbanned succesfully`,
                              status: "info",
                              isClosable: true,
                            })
                            setBannedUsers(response.data);
                          }
                        }}
                      />
                      <Button
                        _hover={{}}
                        p={0}
                        _active={{}}
                        _focus={{}}
                        h="max-content"
                        w="max-content"
                        bg="none"
                        onClick={() => {
                          if (expanded.indexOf(index) >= 0) {
                            setExpanded(
                              expanded.filter((exp) => exp !== index)
                            );
                          } else {
                            setExpanded(expanded.concat(index));
                          }
                        }}
                      >
                        {expanded.indexOf(index) >= 0 ? (
                          <CgMinimize className="icon" size={17} />
                        ) : (
                          <HiOutlineArrowsExpand className="icon" size={17} />
                        )}
                      </Button>
                    </Flex>
                  </Grid>
                  {expanded.indexOf(index) >= 0 && (
                    <Flex
                      bg="#EDEFF1"
                      w="100%"
                      maxW="100%"
                      h="max-content"
                      px={5}
                      py={3}
                      gridGap={20}
                    >
                      <Box>
                        <Text
                          fontFamily="mono"
                          fontSize={12}
                          textTransform="uppercase"
                          fontWeight="bold"
                        >
                          Report reason
                        </Text>
                        <Text
                          fontSize={13}
                          fontFamily="mono"
                          fontWeight="normal"
                        >
                          {banned.reason.name}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontFamily="mono"
                          fontSize={12}
                          textTransform="uppercase"
                          fontWeight="bold"
                        >
                          Note
                        </Text>
                        <Text
                          fontSize={13}
                          fontFamily="mono"
                          fontWeight="normal"
                        >
                          {banned.note}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontFamily="mono"
                          fontSize={12}
                          textTransform="uppercase"
                          fontWeight="bold"
                        >
                          Moderator message
                        </Text>
                        <Text
                          fontSize={13}
                          fontFamily="mono"
                          fontWeight="normal"
                          maxW="400px"
                        >
                          {banned.message}
                        </Text>
                      </Box>
                    </Flex>
                  )}
                  <Divider />
                </React.Fragment>
              )): (
                <ErrorPage
                  text={`No results`}
                  button={
                    <Button
                      bg="none"
                      color="blue.500"
                      borderRadius={50}
                      onClick={() => {
                        if (setBannedUsersSearch) {
                          setBannedUsersSearch("");
                        }
                      }}
                    >
                      See All
                    </Button>
                  }
                  h="100%"
                  p="50px"
                  fontSize={16}
                />
              )}
        </UsersList>
      </Box>
    </Box>
  );
}
