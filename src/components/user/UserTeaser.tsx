import React, { ReactElement } from "react"
import { ButtonGroup, Button, Image, Text } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom';
//@ts-ignore
import { UserType } from '@types/';

export function UserTeaser({ user }: { user: UserType }): ReactElement | null {
  const history = useHistory();

  return (
    <ButtonGroup alignItems="center">
      <Button
        display="grid"
        gridTemplateColumns="1fr 2fr"
        bg="0"
        transition="0"
        alignItems="center"
        w="160px"
        px="10px"
        _hover={{}}
        _active={{}}
        _focus={{}}
        onClick={() =>
          history.push(`/user/${user.username}`)
        }
      >
        <Image
          src={
            user.image ||
            `${process.env.REACT_APP_ASSETS_URL}/avatar.png`
          }
          w="30px"
          minW="30px"
          h="30px"
          minH="30px"
          borderRadius={5}
        />
        <Text>{user.username}</Text>
      </Button>
    </ButtonGroup>
  )
}
