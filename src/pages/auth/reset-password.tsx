/**
 * @fileoverview
 * TODO: add top-level meta for all files
 */

import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from "@apollo/client";
import { useForm } from '@mantine/form';
import { Box, Button, Group, LoadingOverlay, TextInput } from '@mantine/core';
import Link from 'next/link';
import { pages } from '../../common/constants';
import { Check } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import showError from '../../components/showError';
import { isValidPassword } from '../../common/utils/sanityCheck';

const resetPasswordMutation = gql`
mutation resetPassword(email: $email, newPassword: $newPassword, token: $token) {
  response
}`;

type FormData = {
  email: string
  token: string
  newPassword: string
}

export default () => {

  const router = useRouter()

  const [ resetPasswordMutationFn, { loading } ] = useMutation(
    resetPasswordMutation, {
    onCompleted: (data) => {
      showNotification({
        title: "Password updated",
        message: "You can now sign in with your new password. Make sure to store it in a secure place.",
        color: 'green',
        icon: <Check />,
      })
    },
    onError: (error) => {
      showError(error.message, error.name)
    }
  })

  const handleSubmit = async (values: FormData) => {
    await resetPasswordMutationFn({
      variables: {
        email: values.email
      }
    })
  }


  const form = useForm<FormData>({
    initialValues: {
      email: router.query.email as string ?? '',
      token: router.query.token as string,
      newPassword: '',
    },

    validate: {
      newPassword: (value: string) => {
        const [valid, reasonNotValid] = isValidPassword(value);
        return !valid ? reasonNotValid : null;
      },
  })

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading} />
        <TextInput
          mt="sm"
          type="email"
          label="Email"
          disabled={true}
          required
          {...form.getInputProps('email')}
          />

        <input type="hidden" name="token" value={form.values.token} />

        <TextInput
          mt="sm"
          type="password"
          label="New password"
          placeholder="New password"
          required
          {...form.getInputProps('newPassword')}
          />

        <Group position="right" mt="md">
          <Button type="submit" >
            Change my password
          </Button>
        </Group>
      </form>
      <Box mt="md">
        <Link href={pages.auth.signIn}>
          Sign in
        </Link>
      </Box>
    </Box>
  );
}