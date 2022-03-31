import '../styles/globals.css'

import { Image } from "next"
import { SessionProvider } from "next-auth/react"
import { MantineProvider, AppShell } from "@mantine/core"

import {Header} from "../components/header"

/**
 * Defines commons layout, styles, and session for all pages
 */
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        theme={{
          loader: 'bars'
          // TODO: Add theme
        }}>
        <AppShell
          paddings="md"
          header={<Header />}
        >
          <main>
            <Component {...pageProps} />
          </main>
        </AppShell>
      </MantineProvider>
    </SessionProvider>
  )
}
