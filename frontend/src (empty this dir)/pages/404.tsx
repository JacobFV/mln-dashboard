import { Center } from "@mantine/core"
import { useRouter } from "next/router"

export default () => {

  const router = useRouter()


  return (<>
    <Center><code>400</code>: We've looked everywhere</Center>
    <p>Sorry, we could not find {router.route}.</p>
    <p>You will be redirected back {!prevURL ? 'home ' : ' '}in {delay.toString(0)} seconds.</p>
  </>)
}