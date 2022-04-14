/*import { useRouter } from "next/router";
import { signIn } from "next-auth/react"

export default () => {
  signIn();
  // redirect to index
  const router = useRouter();
  router.push("/");
}*/

import Link from 'next/link';
import { Box, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import AppLogoImage from '../../components/appLogoImage';
import { helloEmail, exampleEmail, pages } from '../../common/constants'

class FormType {
  email: string = ''
  password: string = ''
}

function trySignIn(values: FormType) {
  // TODO: implement. maybe this is better handled by each provider?
  // Look for tutorial on this
}

export default () => {

  const form = useForm({
    initialValues: new FormType(),
  })

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <AppLogoImage />
      <form onSubmit={form.onSubmit((values) => {
        console.log(values)
        trySignIn(values)
      })}>

        <TextInput
          mt="sm"
          type="email"
          label="Email"
          placeholder={helloEmail ?? exampleEmail}
          required
          {...form.getInputProps('email')}
          />

        <TextInput
          mt="sm"
          type="password"
          label="Password"
          required
          {...form.getInputProps('password')}
          />

        <Group position="right" mt="md">
          <Button type="submit">Sign In</Button>
        </Group>
      </form>
      <Box mt="md">
        <Link  href={pages.auth.createAccount}>
          Create account
        </Link>
      </Box>
      <Box mt="md">
        <Link  href={pages.auth.forgotPassword.enterEmail}>
          Forgot password?
        </Link>
      </Box>
    </Box>
  );
}