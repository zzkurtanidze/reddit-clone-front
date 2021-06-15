import Modal from "@components/Modal";
import React from "react";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import FormField from "@components/common/FormField";
import * as yup from "yup";
//@ts-ignore
import {updatePassword} from "@api/";
import {useToast} from "@chakra-ui/react";
import PrimaryButton from "@components/common/PrimaryButton";

const validationSchema = yup.object({
  oldPassword: yup.string().required().label("Old password"),
  newPassword: yup.string().required().min(4).label("New password"),
  confirmNewPassword: yup.string().required().label("Confirm new password"),
});

export default function PasswordChange({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  const toast = useToast()

  return (
    <Modal open={open} onClose={() => setOpen(false)} withImage>
      <Flex py={70} direction="column" gridGap={3}>
        <Image
          src="https://www.redditstatic.com/accountmanager/18e257d5fdea817c0f12cccf8867d930.svg"
          w="35px"
          alt="reddit-logo"
        />
        <Text fontSize={18} fontFamily="mono" fontWeight="bold">
          Update your password
        </Text>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async ({ oldPassword, newPassword, confirmNewPassword }, errors) => {
            if(newPassword !== confirmNewPassword) {
              errors.setErrors({ confirmNewPassword: "Passwords are not equal" });
            } else {
              const response = await updatePassword({ oldPassword, newPassword });
              if(response.statusText === "OK") {
                toast({
                  title: "Password changed succesfully",
                  status: "success",
                  isClosable: true,
                })
                setOpen(false);
              }
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Flex direction="column" w="40%" gridGap={3}>
                <FormField
                  type="password"
                  error={errors.oldPassword}
                  touched={touched.oldPassword}
                  name="oldPassword"
                  placeholder="Old Password"
                />
                <FormField
                  type="password"
                  error={errors.newPassword}
                  touched={touched.newPassword}
                  name="newPassword"
                  placeholder="New Password"
                />
                <FormField
                  type="password"
                  error={errors.confirmNewPassword}
                  touched={touched.confirmNewPassword}
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                />
                <PrimaryButton label="Save" type="submit" w="max-content" px={10}/>
              </Flex>
            </Form>
          )}
        </Formik>
      </Flex>
    </Modal>
  );
}
