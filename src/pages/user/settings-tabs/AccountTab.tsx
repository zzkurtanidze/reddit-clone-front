import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import SecondaryButton from "@components/common/SecondaryButton";
import React, { useState } from "react";
import Action from "@components/common/Action";
import SectionTitle from "@components/common/SectionTitle";
import Title from "@components/common/Title";
import { HiTrash } from "react-icons/hi";
//@ts-ignore
import { UserType } from "@types";
import EmailChange from "../modals/EmailChange";
import PasswordChange from "../modals/PasswordChange";
//@ts-ignore
import { deactivateAccount, logOut } from "@api";
//@ts-ignore
import {verifyMail} from "@api/";

export default function AccountTab({ user }: { user: UserType }) {
  const [emailChangeModal, setEmailChangeModal] = useState<boolean>(false);
  const [passwordChangeModal, setPasswordChangeModal] = useState<boolean>(
    false
  );

  return (
    <Box fontFamily="mono">
      <Title label="Account Settings" />
      <SectionTitle label="Account preferences" />
      <Action
        prefix={!user.emailConfirmed ? "Email is not confirmed" : ""}
        label="Email address"
        description={user.email}
        secondButton={
          <SecondaryButton
            label="Change"
            bg="none"
            onClick={() => setEmailChangeModal(true)}
          />
        }
        button={!user.emailConfirmed ? (
          <SecondaryButton
            label="Verify email"
            bg="none"
            onClick={async () => {
              await verifyMail(); 
            }}
          />
            ) : (
            <></>
          )
        }
      />
      <Action
        label="Change password"
        description="Password must be at least 4 characters long"
        button={
          <SecondaryButton
            label="Change"
            bg="none"
            onClick={() => setPasswordChangeModal(true)}
          />
        }
      />
      <SectionTitle label="Deactivate account" />
      <Action
        button={
          <Button
            color="#FB575A"
            fontSize={13}
            fontFamily="mono"
            _hover={{}}
            _active={{}}
            _focus={{}}
            onClick={async () => {
              await deactivateAccount();
              await logOut();
              window.location.reload();
            }}
          >
            <HiTrash color="#FB575A" size={18} />
            DEACTIVATE ACCOUNT
          </Button>
        }
      />
      {emailChangeModal && (
        <EmailChange open={emailChangeModal} setOpen={setEmailChangeModal} />
      )}
      {passwordChangeModal && (
        <PasswordChange
          open={passwordChangeModal}
          setOpen={setPasswordChangeModal}
        />
      )}
    </Box>
  );
}
