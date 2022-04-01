import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Box, Card, Container } from '@mantine/core'
import { useSession } from "next-auth/react";
import Router from "next/router";
import { LiteUser } from "../common/models/[...models]";

//import styles from '../styles/Home.module.css'

export default () => {

  const { data: session, status: status } = useSession();

  if (!session || !session.user) {
    Router.push("/account/login");
  }

  const user = session!.user! as LiteUser;

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