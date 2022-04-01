import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Box, Card, Container } from '@mantine/core'

//import getUser from '../common/utils/getUser'
//import styles from '../styles/Home.module.css'

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LiteUser } from "../models/[...models]";

function getUser(): LiteUser {
  // artificially set cwd path
  const { data: session, status: status } = useSession();

  if (!session || !session.user) {
    const router = useRouter();
    router.push("/account/login");
  }

  return session!.user! as LiteUser;
}


export default () => {

  const user = getUser();

  return (
    <Container size="xs">
      <Card>
        <Card.Section>
          <Image src={user.image} alt={user.name} />
        </Card.Section>
        <h1>Current user:</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Card>
    </Container>
  )
}