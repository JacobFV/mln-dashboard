import '../styles/globals.css'

//// import type { AppProps } from 'next/app'
//// function MyApp({ Component, pageProps }: AppProps) {
////     return <Component {...pageProps} />
//// }
//// export default MyApp

import { SessionProvider } from "next-auth/react"
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}