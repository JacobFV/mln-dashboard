import type { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import { Box } from '@mantine/core'

import styles from '../styles/Home.module.css'
import PanelLayout from '../components/panelLayout/panelLayout'

const Dashboards: NextPage = () => {

  const [ session, loading ] = useSession()

  if (!session || !session.user) {
    Router.push('/account/login')
  }

  return (
    <PanelLayout>
      <Box
        sx={{
            maxWidth: "md",
        }}
        mx="auto">
          <h1>Current user:</h1>
          <pre>{JSON.stringify(session.user, null, 2)}</pre>
      </Box>
    </PanelLayout>
  )

  /* Copilot generated this. I think it's a good starting point
  return (
      <div className={styles.container}>
          <Head>
              <title>Dashboards</title>
              <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
              <h1 className={styles.title}>Dashboards</h1>
                              <div className={styles.grid}>
                  <div className={styles.card}>
                      <div className={styles.cardImageContainer}>
                          <Image
                              src="/images/dashboard.svg"
                              className={styles.cardImage}
                              alt="Dashboard"
                          />
                      </div>
                      <div className={styles.cardContent}>
                          <h2 className={styles.cardTitle}>Dashboard</h2>
                          <p className={styles.cardDescription}>
                              A dashboard is a visual representation of your
                              application. It is a good place to display
                              information and statistics.
                          </p>
                      </div>
                  </div>
                  <div className={styles.card}>
                      <div className={styles.cardImageContainer}>
                          <Image
                              src="/images/analytics.svg"
                              className={styles.cardImage}
                              alt="Analytics"
                          />
                      </div>
                      <div className={styles.cardContent}>
                          <h2 className={styles.cardTitle}>Analytics</h2>
                          <p className={styles.cardDescription}>
                              Analytics is the collection of data that is
                              collected by the application. It is a good
                              place to show how the application is performing
                              and how it is performing in comparison to
                              other applications.
                          </p>
                      </div>
                  </div>
                  <div className={styles.card}>
                      <div className={styles.cardImageContainer}>
                          <Image
                              src="/images/monitoring.svg"
                              className={styles.cardImage}
                              alt="Monitoring"
                          />
                      </div>
                      <div className={styles.cardContent}>
                          <h2 className={styles.cardTitle}>Monitoring</h2>
                          <p className={styles.cardDescription}>
                              Monitoring is the collection of data that is
                              collected by the application. It is a good
                              place to show how the application is performing
                              and how it is performing in comparison to
                              other applications.
                          </p>
                      </div>
                  </div>
              </div>
          </main>
      </div>
  ) */
}