import { Center } from "@mantine/core"
import { useRouter } from "next/router"

export default () => {

  const router = useRouter()


  return (<>
    <Center><code>404</code>: We've looked everywhere</Center>
    <p>Sorry, we could not find {router.route}.</p>
  </>)
}