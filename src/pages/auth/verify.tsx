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
import { useHover } from '@mantine/hooks';
import { Box, Button, Group, LoadingOverlay, TextInput } from '@mantine/core';
import Link from 'next/link';
import { exampleEmail, helloEmail, pages, verfCodeExample, verfCodeExplanation, verfCodeRegex } from '../../common/constants';
import { ArrowRight, Mail, X } from 'tabler-icons-react';
import AppLogoImage from '../../components/appLogoImage';

const sendEmailVerfCodeMutation = gql`
mutation sendEmailVerfCode(email: $email, override: $override) {
  success: Boolean
  response: String
}`;
const verifyEmailMutation = gql`
mutation verifyEmail(email: $email, code: $code) {
  success
  response
}`;
const [ sendEmailVerfCodeMutationFn, {loading: sendEmailVerfCodeMutationLoading} ] = useMutation(
  sendEmailVerfCodeMutation, {
  onCompleted: (data) => {
    console.log(data)
  },
  onError: (error) => {
    console.log(error)
  }
})

enum FormState {
  ENTER_EMAIL,
  SENDING_CODE,
  ENTER_CODE,
  VERIFYING,
  ONE_CLICK_VERIFY,
}

type FormData = {
  email: string,
  code: string
}

export default () => {

  const router = useRouter()
  const { email: initialEmail, code } = router.query

  let initialFormState: FormState
  if (!initialEmail) {
    initialFormState = FormState.ENTER_EMAIL
  } else if (initialEmail && !code) {
    initialFormState = FormState.ENTER_CODE
  } else if (initialEmail && code) {
    initialFormState = FormState.ONE_CLICK_VERIFY
  } else {
    throw new Error("unreachable")
  }

  const [formState, setFormState] = useState<FormState>(initialFormState)

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

  const handleSubmit = async (values: FormData) => {
    console.log(values)
    switch(formState) {
      case FormState.ENTER_EMAIL:
        // send verification code to email
        setFormState(FormState.SENDING_CODE)
        // TODO: send mutation
        // TODO: make overlay appear:
        // "We have sent a verification code to email"
        // "If you don't receive it, please check your spam folder"
        sendEmailVerfCodeMutationFn({variables: { email: values.email, override: true }})
        break;
      case FormState.ENTER_CODE:
      case FormState.ONE_CLICK_VERIFY:
        // verify email with code
        setFormState(FormState.VERIFYING)
        // TODO: send mutation
        const result = useMutation(
          verifyEmailMutation, {
            variables: { email: values.email, code: values.code }
          }
        )
        // TODO: make overlay appear
        // if error, "Sorry, that code didn't work. Make sure to type the code exactly as it appears in the email we sent to $email"
        // if success, redirect to (login if not logged in or files if logged in) and show overlay, "Your email has been verified"
        break;
      case FormState.SENDING_CODE:
        // cancel send verf code
        setFormState(FormState.ENTER_EMAIL)
        // TODO: cancel
        break
      case FormState.VERIFYING:
      default:
        throw new Error("unreachable")
    }
  }

  if(formState === FormState.ONE_CLICK_VERIFY) {
    handleSubmit(form.values)
  }

  const loading =
    formState === FormState.SENDING_CODE ||
    formState === FormState.VERIFYING

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <AppLogoImage />
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        disabled={formState === FormState.VERIFYING}>
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
              Send verification code
            </Button>
          )}
          {formState === FormState.SENDING_CODE && (
            <Button
              type="submit"
              ref={hoverRef}
              {... hovered ? {
                leftIcon: <X size={18}/>,
              } : {}}
              >
              hovered ? Change email : Sending...
            </Button>
          )}
          {formState === FormState.ENTER_CODE && (
            <Button
              type="submit"
              leftIcon={<ArrowRight size={18}/>}>
              Verify email
            </Button>
          )}
          {formState === FormState.VERIFYING && (
              <Button type="submit">
                Verifying...
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