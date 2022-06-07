import Link from 'next/link';
import { Box, Button, Checkbox, Group, LoadingOverlay, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { gql, useMutation } from '@apollo/client';
import { showNotification } from '@mantine/notifications';

import { isValidName, isValidEmail, isValidPassword } from '../../common/utils/sanityCheck';
import { helloEmail, exampleEmail, pages } from '../../common/constants'
import { Check } from 'tabler-icons-react';
import showError from '../../components/showError';

const CREATE_CREDENTIAL_AUTHENTICATED_USER = gql`
mutation createCredentialAuthenticatedUser(email: String!, password: String!, name: String!) {
  id
  email
  name
  image
}`

class FormType {
  name: string = ''
  email: string = ''
  password: string = ''
  receiveUpdates: boolean = true
  agreesToTermsOfService: boolean = false
}

export default () => {
  const [mutationFn, { loading }] = useMutation(
    CREATE_CREDENTIAL_AUTHENTICATED_USER, {
    onCompleted: (data) => {
      // show notification now, because the user will have to go to their email and back before they get to see the real welcome page.
      showNotification({
        title: 'Account created',
        message: 'You can now sign in with your new password. Make sure to store it in a secure place.',
        color: 'green',
        icon: <Check />,
      })
      // TODO: handle this
      // 3. invoke signIn API call with email and password
      // 4. then push the verify page on the stack (unless I use getUser which handles that automatically)
    },
    onError: (error) => {
      showError(error.message, error.name)
    }
  })

  function tryCreateUser(values: FormType) {
    // 0 assume that mantine/form has already validated the data
    // 1 send create user mutation
    mutationFn({
      variables: {
        name: values.name,
        email: values.email,
        password: values.password,
        receiveUpdates: values.receiveUpdates,
        agreesToTermsOfService: values.agreesToTermsOfService
      }
    })
    // 2. rest is handled in the mutation onCompleted callback
  }


  const form = useForm({
    initialValues: new FormType(),

    validate: {
      name: (value: string) => {
        const [valid, reasonNotValid] = isValidName(value);
        return !valid ? reasonNotValid : null;
      },
      email: (value: string) => {
        const [valid, reasonNotValid] = isValidEmail(value);
        return !valid ? reasonNotValid : null;
      },
      password: (value: string) => {
        const [valid, reasonNotValid] = isValidPassword(value);
        return !valid ? reasonNotValid : null;
      },
    }
  })

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit((values) => {
        console.log(values)
        tryCreateUser(values)
      })}>

        <TextInput
          type="text"
          label="Name"
          required
          {...form.getInputProps('name')}
        />

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
          autoComplete='new-password'
          required
          {...form.getInputProps('password')}
        />

        <Checkbox
          mt="md"
          label="I would like to receive newsletters and other update emails"
          {...form.getInputProps('receiveUpdates', { type: 'checkbox' })}
        />
        <Checkbox
          required
          mt="sm"
          label="I have read and agree to the Terms of Service"
          {...form.getInputProps('agreesToTermsOfService', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      <Box mt="md">
        <Link href={pages.auth.signIn}>
          Already have an account? Sign In
        </Link>
      </Box>
    </Box>
  );
}