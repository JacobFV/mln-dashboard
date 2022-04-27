// https://github.com/mantinedev/ui.mantine.dev/tree/master/components/HeaderMenu/HeaderMenu.tsx

import Link from "next/link"
import { Button, Divider, Grid, Header, MediaQuery, Menu, Text } from "@mantine/core"
import { useSession } from "next-auth/react"

import { pages } from "../../common/constants";
import AppLogoImage from "../appLogoImage"
import { Logout, User } from "tabler-icons-react";

/** The header component
 *
 * Displays a header with the following components:
 * If the user is not logged in:
 * - App icon
 * - Gallery
 * - About
 * - Horizontal space (rest of content is right-aligned)
 * - Create account
 * - Log in
 *
 * If the user is logged in:
 * - App icon
 * - Gallery
 * - About
 * - Horizontal space (rest of content is right-aligned)
 * - dropdown:
 *   - Files
 *   - Divider
 *   - Profile
 *   - Log out
 *
 *
 * If the user is not logged in and the screen is small:
 * - App icon
 * - Gallery
 * - About
 * - Horizontal space (rest of content is right-aligned)
 * - Menu
 *   - Create account
 *   - Log in
 *
 * If the user is logged in and the screen is small:
 * - App icon
 * - Gallery
 * - About
 * - Horizontal space (rest of content is right-aligned)
 * - Menu
*    - Files
 *   - Divider
 *   - Profile
 *   - Log out
 *
 * If the user is not logged in and the screen is medium:
 * - App icon
 * - Gallery
 * - About
 * - Horizontal space (rest of content is right-aligned)
 * - Create account
 * - Log in
 *
 * If the user is logged in and the screen is medium:
 * - App icon
 * - Gallery
 * - About
 * - Horizontal space (rest of content is right-aligned)
 * - Menu
 *   - Files
 *   - Divider
 *   - Profile
 *   - Log out
 */
export default () => {

  const { data: session } = useSession()
  const loggedIn = session && session!.user;

  const galleryButton = (
    <Text<typeof Link>
      size="md"
      weight="bold"
      component={Link}
      href={pages.gallery}>
      Gallery
    </Text>
  )
  const learnButton = (
    <Text<typeof Link>
      size="md"
      weight="bold"
      component={Link}
      href={pages.learn}>
      Learn
    </Text>
  )
  const aboutButton = (
    <Text<typeof Link>
      size="md"
      weight="bold"
      component={Link}
      href={pages.about}>
      About
    </Text>
  )

  const createAccountButton = (
    <Button<typeof Link>
      color="primary"
      size="sm"
      component={Link}
      href={pages.auth.createAccount}>
      Create account
    </Button>);
  const signInButton = (
    <Button<typeof Link>
      color="primary"
      size="sm"
      component={Link}
      href={pages.auth.signIn}>
      Sign in
    </Button>);
  const createAccountMenuItem = (
    <Menu.Item<typeof Link>
      component={Link}
      href={pages.auth.createAccount}>
      Create account
    </Menu.Item>);
  const signInMenuItem = (
    <Menu.Item<typeof Link>
      component={Link}
      href={pages.auth.signIn}>
      Sign In
    </Menu.Item>);

  const profileMenuItem = (
    <Menu.Item<typeof Link>
      icon={<User size={14} />}
      component={Link}
      href={pages.auth.profile}>
      Profile
    </Menu.Item>);
  const signOutMenuItem = (
    <Menu.Item<typeof Link>
    icon={<Logout size={14} />}
    component={Link}
    href={pages.auth.signOut}>
      Sign out
    </Menu.Item>);

  const leftHeaderElements = (
    <>
      {galleryButton}
      {learnButton}
      {aboutButton}
    </>
  )
  const rightHeaderElements = loggedIn ? (
    <Menu>
      {profileMenuItem}
      < Divider />
      {signOutMenuItem}
    </Menu>
  ) : (
    <>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <>
          {/* This displays on small */}
          <Menu>
            {createAccountMenuItem}
            < Divider />
            {signInMenuItem}
          </Menu>
        </>
      </MediaQuery>
      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <>
          {/* This displays on medium */}
          {createAccountButton}
          {signInButton}
        </>
      </MediaQuery>
    </>
  )

  // TODO: the home image doesn't go home

  return (
    < Header
      height={60} p="xs"
    >
      <Grid>
        <Grid.Col span={1}>
          <Button component={Link} href={pages.index}>
            <AppLogoImage />
          </Button>
        </Grid.Col>
        <Grid.Col span={8}>
          {leftHeaderElements}
        </Grid.Col>
        <Grid.Col span={3}>
          {rightHeaderElements}
        </Grid.Col>
      </Grid>
    </Header >
  )
}
