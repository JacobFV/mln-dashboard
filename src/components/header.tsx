import Image from "next/image"
import { Button, Divider, Header, Text } from "@mantine/core"
import { useSession } from "next-auth/react"

import { appname } from "../common/constants"
import Favicon from "../../public/favicon.svg"

/** The header component
 *
 * Displays a header with the following components:
 * If the user is not logged in:
 * - App icon
 * - Gallery
 * - About
 * - Horizontal spacer
 * - Create account
 * - Log in
 *
 * If the user is logged in:
 * - App icon
 * - dropdown:
 *   - Files
 *   - Divider
 *   - Profile
 *   - Log out
 */
export default () => {
  const { data: session } = useSession()
  const loggedIn = session && session.user;
  return (
    <Header
      height={60} p="xs"
    >
      <Button as="a" href="/">
        <Favicon />
      </Button>
      <Divider />
      {!loggedIn && (
        <>
          <Button as="a" href="/gallery">
            <Text size="md" weight="bold">
              Gallery
            </Text>
          </Button>
          <Button as="a" href="/about">
            <Text size="md" weight="bold">
              About
            </Text>
          </Button>
        </>
      )}
      {loggedIn && (
        <Menu>
          <Menu.Item icon="file" text="Files" href="/files" />
          <Button as="a" href="/files">
            <Text size="md" weight="bold">
              Files
            </Text>
          </Button>
          <Button as="a" href="/profile">
            <Text size="md" weight="bold">
              Profile
            </Text>
          </Button>
          <Button as="a" href="/logout">
            <Text size="md" weight="bold">
              Log out
            </Text>
          </Button>
        </Menu>
      )}
    </Header>
  )
}