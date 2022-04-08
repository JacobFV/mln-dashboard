// adopted from
// https://ui.mantine.dev/component/footer-centered

import React from 'react';
import { createStyles, Anchor, Group, ActionIcon } from '@mantine/core';

import AppLogo from '../appLogo'
import { appname, socialAccounts } from '../../common/constants';
import Image from 'next/image';
import { Icon } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

export interface FooterCenteredProps {
  links: { link: string; label: string }[];
}

/**
 * Footer centered
 * @param {FooterCenteredProps} props
 * @returns {JSX.Element}
 *
 * @example
 * <FooterCentered links={[{ link: '/', label: 'Home' }]} />
 *
 * @see https://ui.mantine.dev/component/footer-centered
 */
export default ({ links }: FooterCenteredProps) => {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<'a'>
      color="dimmed"
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Image src={AppLogo} alt={appname} />

        <Group className={classes.links}>{items}</Group>

        <Group spacing={0} position="right" noWrap>
          {
            socialAccounts.map((account: { name: string, icon: Icon }) => (
              <ActionIcon key={account.name} size="lg">
                <account.icon size={18} />
              </ActionIcon>
          }
        </Group>
      </div>
    </div>
  );
}