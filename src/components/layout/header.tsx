import Image from "next/image"
import Link from "next/link"
import { NextLink } from '@mantine/next';
import { Button, Divider, Grid, Header, MediaQuery, Menu, Text, UnstyledButton } from "@mantine/core"
import { signIn, useSession } from "next-auth/react"

import { appname } from "../../common/constants"
import AppLogoImage from "../appLogoImage"
import { File, Logout, User } from "tabler-icons-react";

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
    <Text size="md" weight="bold" component={NextLink} href="/gallery">
      Gallery
    </Text>
  )
  const aboutButton = (
    <Text size="md" weight="bold" component={NextLink} href="/about">
      About
    </Text>
  )

  const createAccountButton = (
    <Button color="primary" size="sm" component={NextLink} href="/auth/create-account">
      Create account
    </Button>);
  const logInButton = (
    < Button color="primary" size="sm" component={NextLink} href="/auth/login" >
      Log in
    </Button >);
  const createAccountMenuItem = (
    <Menu.Item component={NextLink} href="/auth/create-account">
      Create account
    </Menu.Item>);
  const logInMenuItem = (
    <Menu.Item component={NextLink} href="/auth/login">
      Log In
    </Menu.Item>);

  const profileMenuItem = (
    <Menu.Item icon={<User size={14} />} component={NextLink} href="/app/profile">
      Profile
    </Menu.Item>);
  const logOutMenuItem = (
    <Menu.Item icon={<Logout size={14} />} component={NextLink} href="/auth/logout">
      Log out
    </Menu.Item>);

  const leftHeaderElements = (
    <>
      {galleryButton}
      {aboutButton}
    </>
  )
  const rightHeaderElements = loggedIn ? (
    <Menu>
      {profileMenuItem}
      < Divider />
      {logOutMenuItem}
    </Menu>
  ) : (
    <>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <>
          {/* This displays on small */}
          <Menu>
            {createAccountMenuItem}
            < Divider />
            {logInMenuItem}
          </Menu>
        </>
      </MediaQuery>
      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <>
          {/* This displays on medium */}
          {createAccountButton}
          {logInButton}
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
          <Button component={Link} to="/">
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
