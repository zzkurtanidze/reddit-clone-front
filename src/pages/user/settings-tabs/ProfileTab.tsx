import { Box, Flex } from "@chakra-ui/layout";
import Action from "@components/common/Action";
import { Form, Formik, useFormikContext } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import FormField from "@components/common/FormField";
import FormTextarea from "@components/common/FormTextarea";
import SectionTitle from "@components/common/SectionTitle";
import Title from "@components/common/Title";
import { Image } from "@chakra-ui/image";
//@ts-ignore
import { UserType } from "@types";
import { FaEdit } from "react-icons/fa";
import _ from "lodash";
//@ts-ignore
import { updateUser } from "@api";
import { useToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/button";
import ChangeUserCover from "@components/user/common/ChangeUserCover";
import ChangePicture from "@components/user/common/ChangePicture";

export default function ProfileTab({ user }: { user: UserType }) {
  const [showProfileChangeModal, setShowProfileChangeModal] =
    useState<boolean>(false);
  const [showCoverChangeModal, setShowCoverChangeModal] =
    useState<boolean>(false);

  const toast = useToast();

  return (
    <Box fontFamily="mono">
      <Title label="Customize proflie" />
      <SectionTitle label="Profile Information" />
      <Formik
        initialValues={{
          displayName: user.displayName || "",
          description: user.description || "",
        }}
        onSubmit={async (data) => {
          const response = await updateUser(data);
          if (response.statusText === "OK") {
            toast({
              title: "Changes saved.",
              status: "success",
              isClosable: true,
            });
          } else {
            toast({
              title: "Changes saved.",
              status: "success",
              isClosable: true,
            });
          }
        }}
      >
        {({ errors, values }) => (
          <Form>
            <FormField
              type="text"
              label="Display name (optional)"
              placeholder="Display name (optional)"
              description="Set a display name. This does not change your username."
              name="displayName"
              sufix={`${30 - values.displayName.length} Characters remaining`}
              error={errors.displayName}
            />
            <FormTextarea
              label="About (optional)"
              placeholder="About (optional)"
              name="description"
              description="A brief description of yourself shown on your profile."
              sufix={`${200 - values.description.length} Characters remaining`}
              error={errors.description}
            />
            <AutoSave debounceMs={1000} />
          </Form>
        )}
      </Formik>
      <SectionTitle label="Images" />
      <Action
        label="Avatar and banner image"
        description="Images must be .png or .jpg format"
      />
      <Flex gridGap={3}>
        <Box position="relative">
          <ChangePicture
            image={user.image}
            name="image"
            showProfileChangeModal={showProfileChangeModal}
            setShowProfileChangeModal={setShowProfileChangeModal}
          />
        </Box>
        <Box position="relative">
          <Image
            src={
              user.coverImage ||
              "https://www.zipjob.com/blog/wp-content/uploads/2020/08/linkedin-default-background-cover-photo-1.png"
            }
            alt={user.username}
            w={500}
            objectFit="cover"
            h={125}
            borderRadius="10px"
          />
          <Button
            cursor="pointer"
            position="absolute"
            bottom="5px"
            right="5px"
            p="10px"
            bg="white"
            border="1px solid #0079D3"
            borderRadius={50}
            onClick={() => setShowCoverChangeModal(true)}
          >
            <FaEdit color="#0079D3" />
          </Button>
          <ChangeUserCover
            showCoverChangeModal={showCoverChangeModal}
            setShowCoverChangeModal={setShowCoverChangeModal}
          />
        </Box>
      </Flex>
    </Box>
  );
}

const AutoSave = ({ debounceMs = 2000 }: { debounceMs: number }) => {
  const formik = useFormikContext();
  const [isSaved, setIsSaved] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    _.debounce(() => {
      if (!isSaved) {
        return formik.submitForm().then(() => setIsSaved(true));
      } else {
        return;
      }
    }, debounceMs),
    [formik.submitForm, debounceMs]
  );

  //@ts-ignore
  useEffect(() => {
    debouncedSubmit();
  }, [debouncedSubmit, formik.values]);

  return <></>;
};
