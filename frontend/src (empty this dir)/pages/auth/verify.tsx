/**
 * @fileoverview Verify email page.
 *
 * TODO: add top-level meta for all files
 */

import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from "@apollo/client";
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Box, Button, Group, LoadingOverlay, TextInput } from '@mantine/core';
import Link from 'next/link';
import { exampleEmail, helloEmail, pages, verfCodeExample, verfCodeExplanation, verfCodeRegex } from '../../common/constants';
import { ArrowRight, Check, Mail } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import showError from '../../components/showError';

const sendEmailVerfCodeMutation = gql`
mutation sendEmailVerfCode(email: $email, override: $override) {
  response
}`;
const verifyEmailMutation = gql`
mutation verifyEmail(email: $email, code: $code) {
  response
}`;

enum FormState {
  ENTER_EMAIL,
  ENTER_CODE,
}

type FormData = {
  email: string,
  code: string
}

export default () => {

  const [ sendEmailVerfCodeMutationFn, {loading: sendEmailVerfCodeMutationLoading} ] = useMutation(
    sendEmailVerfCodeMutation, {
    onCompleted: (data) => {
      showNotification({
        title: 'Verification code sent',
        message: data.response, // should look like this: "We have sent a verification code to $email. If you don't receive it, please check your spam folder.",
        color: 'blue',
        icon: <Mail />,
      })
      setFormState(FormState.ENTER_CODE)
    },
    onError: (error) => {
      showError(error.message, error.name)
    }
  })
  const [ verifyEmailMutationFn, {loading: verifyEmailMutationLoading} ] = useMutation(
    verifyEmailMutation, {
    onCompleted: (data) => {
      console.log(data)
      // if success, redirect to gallery with make login = True
      showNotification({
        title: "Your email has been verified",
        message: data.response, // should look like this: "You can now use $email to log in to your $appname account.",
        color: 'green',
        icon: <Check />,
      })
      router.push(pages.gallery, {query: {login: true}})
    },
    onError: (error) => {
      console.log(error)
      // if error, "Sorry, that code didn't work. Make sure to type the code exactly as it appears in the email we sent to $email"
      showError(error.message, error.name)
    }
  })

  const handleSubmit = async (values: FormData) => {
    console.log(values)
    switch(formState) {
      case FormState.ENTER_EMAIL:
        // send verification code to email
        sendEmailVerfCodeMutationFn({variables: { email: values.email, override: true }})
        break;
      case FormState.ENTER_CODE:
        // verify email with code
        verifyEmailMutationFn({variables: { email: values.email, code: values.code }})
        break;
      default:
        throw new Error("unreachable")
    }
  }

  const router = useRouter()
  const { email: initialEmail, code } = router.query

  const form = useForm<FormData>({
    initialValues: {
      email: initialEmail as string ?? '',
      code: code as string ?? '',
    },

    validate: {
      email: (value) => null,
      code: (value) => (formState === FormState.ENTER_CODE ?
        verfCodeRegex.test(value) ? null : verfCodeExplanation : null)
    }
  })

  let initialFormState: FormState
  if (!initialEmail) {
    initialFormState = FormState.ENTER_EMAIL
  } else if (initialEmail && !code) {
    initialFormState = FormState.ENTER_CODE
  } else if (initialEmail && code) {
    initialFormState = FormState.ENTER_CODE
    handleSubmit(form.values)
  } else {
    throw new Error("unreachable")
  }

  const [formState, setFormState] = useState<FormState>(initialFormState)
  const loading = sendEmailVerfCodeMutationLoading || verifyEmailMutationLoading

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading} />
        <TextInput
          mt="sm"
          type="email"
          label="Email"
          placeholder={helloEmail ?? exampleEmail}
          onClick={() => {
            setFormState(FormState.ENTER_EMAIL)}}
          required
          {...form.getInputProps('email')}
          />

        {formState === FormState.ENTER_CODE && (
        <TextInput
          mt="sm"
          type="text"
          label="Code"
          placeholder={verfCodeExample}
          required
          {...form.getInputProps('code')}
          />)}

        <Group position="right" mt="md">
          {formState === FormState.ENTER_EMAIL && (
            <Button
              type="submit"
              leftIcon={<Mail size={18}/>}>
              {!loading ? 'Send' : 'Sending'} verification code
            </Button>
          )}
          {formState === FormState.ENTER_CODE && (
            <Button
              type="submit"
              leftIcon={<ArrowRight size={18}/>}>
              {!loading ? 'Verify' : 'Verifying'} email
            </Button>
          )}
        </Group>
      </form>
      <Box mt="md">
        <Link href={pages.auth.createAccount}>
          Create account
        </Link>
      </Box>
      <Box mt="md">
        <Link href={pages.auth.signIn}>
          Sign in
        </Link>
      </Box>
    </Box>
  );
}