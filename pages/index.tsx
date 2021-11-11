import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Login from './auth/login'
import { useSession, signIn, signOut } from "next-auth/client"

// Dr. Sharma wants to login page to be the home page
const Home: NextPage = () => {
  const [session, loading] = useSession()
  if (!session) {
    signIn()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export default Home;
