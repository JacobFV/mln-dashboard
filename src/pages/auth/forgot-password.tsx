/**
 * @fileoverview 
 *
 * TODO: add top-level meta for all files
 */

import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from "@apollo/client";
import { useForm } from '@mantine/form';
import { Box, Button, Group, LoadingOverlay, TextInput } from '@mantine/core';
import Link from 'next/link';
import { exampleEmail, helloEmail, pages } from '../../common/constants';
import { Mail } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import showError from '../../components/showError';

const forgotPasswordMutation = gql`
mutation forgotPassword(email: $email) {
  response
}`;

type FormData = {
  email: string
}

export default () => {

  const router = useRouter()

  const [ forgotPasswordMutationFn, { loading } ] = useMutation(
    forgotPasswordMutation, {
    onCompleted: (data) => {
      showNotification({
        message: data.response, // should look like this: "We have sent a reset password email to ${email} if it exists in our database. If you don't receive it, please check your spam folder and make sure your email address is spelled correctly.",
        color: 'blue',
        icon: <Mail />,
      })
    },
    onError: (error) => {
      showError(error.message, error.name)
    }
  })

  const handleSubmit = async (values: FormData) => {
    await forgotPasswordMutationFn({
      variables: {
        email: values.email
      }
    })
  }


  const form = useForm<FormData>({
    initialValues: {
      email: router.query.email as string ?? ''
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
          placeholder={helloEmail ?? exampleEmail}
          required
          {...form.getInputProps('email')}
          />

        <Group position="right" mt="md">
          <Button
            type="submit"
            leftIcon={<Mail size={18}/>}
            >
            Send reset password token
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