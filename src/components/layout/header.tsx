import Image from "next/image"
import Link from "next/link"
import { NextLink } from '@mantine/next';
import { Burger, Button, Divider, Grid, Header, MediaQuery, Menu, Text } from "@mantine/core"
import { useSession } from "next-auth/react"

import { appname } from "../../common/constants"
import AppLogo from "../appLogo"
import { File, Logout, User } from "tabler-icons-react";
import { useState } from "react";

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
 */
export default () => {
  const { data: session } = useSession()
  const loggedIn = session && session.user;

  const commonTopBarElements = (
    <>
      <Text size="md" weight="bold" component={NextLink} href="/gallery">
        Gallery
      </Text>
      <Text size="md" weight="bold" component={NextLink} href="/about">
        About
      </Text>
    </>
  );

  (
    <Header
      height={60} p="xs"
    >
      <Link href="/">
        <Image src={AppLogo} alt={appname} />
      </Link>
      <Divider />
      {!loggedIn && (
        <Grid>
          <Grid.Col span={8}>
            {commonTopBarElements}
          </Grid.Col>
          {/* TODO: I need to find a better way to right align this */}
          <Grid.Col offset={1} span={1.5}>
            <Button color="primary" size="sm" component={NextLink} href="/register">
              Create account
            </Button>
          </Grid.Col>
          <Grid.Col span={1.5}>
            <Button color="primary" size="sm" component={NextLink} href="/login">
              Log in
            </Button>
          </Grid.Col>
        </Grid>
      )}
      {loggedIn && (
        <Grid>
          <Grid.Col span={9}>
            {commonTopBarElements}
          </Grid.Col>
          {/* TODO: I need to find a better way to right align this */}
          <Grid.Col offset={2} span={1}>
            <Menu>
              <Menu.Item icon={<File size={14}/>} component={NextLink} href="/files">
                Files
              </Menu.Item>
              <Divider />
              <Menu.Item icon={<User size={14}/>} component={NextLink} href="/profile">
                Profile
              </Menu.Item>
              <Menu.Item icon={<Logout size={14}/>} component={NextLink} href="/logout">
                Log out
              </Menu.Item>
            </Menu>
          </Grid.Col>
        </Grid>
      )}
    </Header>
  );
  
  const loggedInMenuItems = (
    <>
      <Menu.Item icon={<File size={14}/>} component={NextLink} href="/files">
        Files
      </Menu.Item>
      <Divider />
      <Menu.Item icon={<User size={14}/>} component={NextLink} href="/profile">
        Profile
      </Menu.Item>
      <Menu.Item icon={<Logout size={14}/>} component={NextLink} href="/logout">
        Log out
      </Menu.Item>
    </>
  );

  const menuItemsForSmallDisplay = (
    <>
      // TODO: I stopped off here
      <Divider />
      {loggedIn && loggedInMenuItems}
    </>
  );

  // https://mantine.dev/core/app-shell/#responsive-styles
  return (
    <Header height={70} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          {/* this appears on small displays (actually, it disappears on medium+ ones) */}

        </MediaQuery>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          {/* this appears on medium and large displays (actually, it disappears on small ones) */}
          <Menu>
            {loggedInMenuItems}
          </Menu>
        </MediaQuery>

        <Text>Application header</Text>
      </div>
    </Header>
  )
}