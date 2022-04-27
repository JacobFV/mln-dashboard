import '../styles/globals.css'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
import { SessionProvider } from "next-auth/react"
import { MantineProvider, AppShell } from "@mantine/core"
import {NotificationsProvider} from "@mantine/notifications"

import { graphqlEndpoint } from '../common/constants'
import Header from "../components/layout/header"

/**
 * Defines commons layout, styles, and session for all pages
 */
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const apolloClient = new ApolloClient({
    uri: graphqlEndpoint,
    cache: new InMemoryCache(),
  })

  // TODO: somehow make a 'login' parameter handler for all pages
  // that forces a getUser call when the page loads -- which makes
  // sure the user is logged in or otherwise that they visit the login
  // page.

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={session}>
        <MantineProvider theme={{loader: 'bars'}}>
          <NotificationsProvider>
            <AppShell padding="md" header={<Header />}>
              <Component {...pageProps} />
            </AppShell>
          </NotificationsProvider>
        </MantineProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}
