// https://github.com/mantinedev/ui.mantine.dev/tree/master/components/HeroBullets/HeroBullets.tsx
import React from 'react';
import {
  createStyles,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  Image,
} from '@mantine/core';
import { Check } from 'tabler-icons-react';

import { appLogoSVG } from '../common/constants';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}));

export default () => {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>modern</span> Multi-Layer Network <br /> analysis dashboard
            </Title>
            <Text color="dimmed" mt="md">
              Perform complex MLN analysis on your data on a simple, intuitive, and
              researcher-oriented platform.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <Check size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Cloud based</b> &emdash; make your data, configs, and other project artifacts
                public or share with specific people
              </List.Item>
              <List.Item>
                <b>Researcher-oriented</b> &emdash; Experiments are recorded by default for
                reproducibility and later analysis
              </List.Item>
              <List.Item>
                <b>Free and open source</b> &emdash; MLN Dashboard is released under the MIT license,
                so you can modify and redistribute it to suit your needs
              </List.Item>
            </List>

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Get started
              </Button>
              <Button variant="default" radius="xl" size="md" className={classes.control}>
                See how it works
              </Button>
            </Group>
          </div>
          <Image src={appLogoSVG.src} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}