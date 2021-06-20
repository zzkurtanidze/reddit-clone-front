import React, { ReactElement, useEffect, useState } from "react"
import { Text, Grid } from '@chakra-ui/react';
import Container from "@components/common/Container";
import jwt_decode from 'jwt-decode';
//@ts-ignore
import {updateUser} from "@api/";

export default function VerificationPage({ match }: { match: any }): ReactElement | null {
  const { token } = match.params; 
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const { userId, expire }: { userId: string, expire: number } = jwt_decode(token);
    const now = Math.floor(Date.now() / 1000);
    if(expire < now) {
      setExpired(true) 
    } else {
      verification()
    }
  }, [])

  const verification = async () => {
    await updateUser({ emailConfirmed: true });
    window.location.replace("/");
  }

  if(expired) return <Grid placeItems="center" w="100%" h="90vh"><Text fontFamily="mono" fontSize={32} fontWeight="bold">Link is expired.</Text></Grid>
  return (
    <Container>
    </Container>
  )
}
