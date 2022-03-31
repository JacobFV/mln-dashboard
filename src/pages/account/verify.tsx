/**
 * @fileoverview Verify email page.
 *
 * Please send user to this page if their `user.emailVerified` is false.
 *
 * Users should receive an email with a link to verify their email address like so:
 * https://<appinfo.baseurl>/verify?token=<token>
 * Or they can type in the token manually.
 *
 * This page does not require the user to be signed in
 */

import React from 'react';
import { TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useRouter } from 'next/router';
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { publicDomain, verfCodeAlphabet, verfCodeLength, verfCodeRegex } from '../../common/constants';

const verifyEmailMutationGQL = gql`
mutation verifyEmail($email: String!, $code: String!) {
  verifyEmail(email: $email, code: $code) {
    success
    message
  }
}
`;

type VerifyEmailFormState = {
  displayMessage: boolean,
  success: boolean,
  message: string,
}

class VerifyEmailForm extends React.Component<{}, VerifyEmailFormState> {

  verifyEmailMutationFn = useMutation(verifyEmailMutationGQL)[0]
  initialEmail: string | null
  form: any

  constructor(props: { initialEmail: string | null, initialCode: string | null }) {
    super(props);
    // if email and code are both provided, automatically invoke the verifyEmail mutation
    if (props.initialEmail && props.initialCode) {
      this.verifyEmail(props.initialEmail, props.initialCode)
    }
    this.state = {
      displayMessage: false,
      success: false,
      message: '',
    }
    this.initialEmail = props.initialEmail;
    this.form = useForm({
      initialValues: {
        email: props.initialEmail ?? '',
        code: props.initialCode ?? '',
      },
      validationRules: {
        code: (value) => verfCodeRegex.test(value) // this may be inverted
      },
    });
  }

  render() {
    if (this.state.success) {
      return (
        <div>
          <h1>Verification Successful</h1>
        </div>
      )
    }

    return (
      <div>
        <h1>Verify Email</h1>
        {this.state.displayMessage && <p>this.state.message</p>}
        {this.initialEmail && <p>
          Please check your email <code>{this.initialEmail}</code> for a verification code.
        </p>}
        <form onSubmit={this.form.onSubmit(async (values: { email: string, code: string }) => {
          this.verifyEmail(values.email, values.code);
        })}>
          {!this.initialEmail && <TextInput
            required
            label="Email"
            placeholder={`username@${publicDomain}`}
            {...this.form.getInputProps('email')}
          />}
          <TextInput
            required
            label="Verification Code"
            placeholder={verfCodeAlphabet.slice(0, verfCodeLength)}
            {...this.form.getInputProps('code')}
          />
        </form>
      </div>
    );
  }

  verifyEmail(email: string, code: string) {
    this.verifyEmailMutationFn({ variables: { email, code } })
      .then(({ data }) => {
        if (data.verifyEmail.success) {
          // perform redirect to index page
          const router = useRouter();
          // if the router dom stack is empty, push /
          // otherwise, pop to the previous page
          router.push('/');
          this.setState({
            success: true,
            displayMessage: true,
            message: data.verifyEmail.message,
          })
        } else {
          this.setState({
            success: false,
            displayMessage: true,
            message: data.verifyEmail.message ?? 'Verification failed',
          })
        }
      }).catch(err => {
        console.log(err.message)
        this.setState({
          success: false,
          displayMessage: true,
          message: 'An error occurred. Please try again.',
        })
      });
  }
}

export default () => {

  // get initial form values
  const { query } = useRouter()
  const initialEmail = decodeURIComponent(query.email as string ?? '');
  const initialCode = query.code as string ?? '';

  return new VerifyEmailForm({ initialEmail: initialEmail, initialCode: initialCode });
};
