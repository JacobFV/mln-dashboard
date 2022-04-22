import { Center } from "@mantine/core"
import { useRouter } from "next/router"

export default () => {

  const router = useRouter()
  // TODO: see if it is possible to go back
  const prevURL = null

  // TODO: create countdown timer from 5 to 0
  const delay: number = 0.0

  return (<>
    <Center><code>500</code>: We're having some technical difficulties</Center>
    <p>We appreciate your patience.</p>
    <p>You will be redirected back {!prevURL ? 'home ' : ' '}in {delay.toString(0)} seconds.</p>
  </>)
}