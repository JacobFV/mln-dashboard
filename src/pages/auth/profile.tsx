import React from 'react';
import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { PhoneCall, At } from 'tabler-icons-react';
import getUser from '../../common/utils/getUser';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface UserInfoIconsProps {
  avatar: string;
  name: string;
  title: string;
  phone: string;
  email: string;
}

export function UserInfoIcons({ avatar, name, title, phone, email }: UserInfoIconsProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Group noWrap>
        <Avatar src={avatar} size={94} radius="md" />
        <div>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            {title}
          </Text>

          <Text size="lg" weight={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <At size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {email}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <PhoneCall size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {phone}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}

export default () => {
  //const { user, loading } = getUser()
  const { user, loading } = getUser(true, true, false, false, false, []);
  if (loading) return (
    <div>
      Loading...
    </div>
  )
  return (
    <UserInfoIcons
      avatar={user.image}
      name={user.name}
      title="Title"
      phone="+1 (123) 456-7890"
      email={user.email}
    />
  )

  /* old

  return (
    <Container size="xs">
      <Card>
        <Card.Section>
          <Image src={user.image} alt={user.name} />
        </Card.Section>
        <h1>Current user:</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Card>
    </Container>
  )
  */
}