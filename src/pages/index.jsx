import { useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'
import { signIn } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  // When rendering client side don't display anything until loading is complete
  if (loading) return null

  // If no session exists, display access denied message
  if (!session) {
    console.log('please login')
    signIn()
  }
  console.log('you are logged in')

  // If session exists, display content
  return <>
    <a href="/auth/create_account">Create Account</a>
    <a href="/auth/login">Login</a>
    <div>
      <h1>Protected Page</h1>
      <p>You are logged in</p>
      <iframe src="/api/old/examples/jwt" />
    </div>
  </>
}