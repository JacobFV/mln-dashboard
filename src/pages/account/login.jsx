import React from 'react';
import { useForm, useToggle, upperFirst } from '@mantine/hooks';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
} from '@mantine/core';
import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';


export default ({ csrfToken, providers, callbackUrl, email, error: errorType }) => {
  // We only want to render providers
  const providersToRender = providers.filter(provider => {
    if (provider.type === 'oauth' || provider.type === 'email') {
      // Always render oauth and email type providers
      return true
    } else if (provider.type === 'credentials' && provider.credentials) {
      // Only render credentials type provider if credentials are defined
      return true
    }
    // Don't render other provider types
    return false
  })

  const errors = {
    Signin: 'Try signing with a different account.',
    OAuthSignin: 'Try signing with a different account.',
    OAuthCallback: 'Try signing with a different account.',
    OAuthCreateAccount: 'Try signing with a different account.',
    EmailCreateAccount: 'Try signing with a different account.',
    Callback: 'Try signing with a different account.',
    OAuthAccountNotLinked: 'To confirm your identity, sign in with the same account you used originally.',
    EmailSignin: 'Check your email address.',
    CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
    default: 'Unable to sign in.'
  }

  const error = errorType && (errors[errorType] ?? errors.default)

  /*return <>
    <div className='signin'>
      {error &&
        <div className='error'>
          <p>{error}</p>
        </div>}
      {providersToRender.map((provider, i) =>
        <div key={provider.id} className='provider'>
          {provider.type === 'oauth' &&
            <form action={provider.signinUrl} method='POST'>
              <input type='hidden' name='csrfToken' value={csrfToken} />
              {callbackUrl && <input type='hidden' name='callbackUrl' value={callbackUrl} />}
              <button type='submit' className='button'>Sign in with {provider.name}</button>
            </form>}
          {(provider.type === 'email' || provider.type === 'credentials') && (i > 0) &&
          providersToRender[i - 1].type !== 'email' && providersToRender[i - 1].type !== 'credentials' &&
            <hr />}
          {provider.type === 'email' &&
            <form action={provider.signinUrl} method='POST'>
              <input type='hidden' name='csrfToken' value={csrfToken} />
              <label for={`input-email-for-${provider.id}-provider`}>Email</label>
              <input id={`input-email-for-${provider.id}-provider`} autoFocus type='text' name='email' value={email} placeholder='email@example.com' />
              <button type='submit'>Sign in with {provider.name}</button>
            </form>}
          {provider.type === 'credentials' &&
            <form action={provider.callbackUrl} method='POST'>
              <input type='hidden' name='csrfToken' value={csrfToken} />
              {Object.keys(provider.credentials).map(credential => {
                return (
                  <div key={`input-group-${provider.id}`}>
                    <label
                      for={`input-${credential}-for-${provider.id}-provider`}
                    >{provider.credentials[credential].label || credential}
                    </label>
                    <input
                      name={credential}
                      id={`input-${credential}-for-${provider.id}-provider`}
                      type={provider.credentials[credential].type || 'text'}
                      value={provider.credentials[credential].value || ''}
                      placeholder={provider.credentials[credential].placeholder || ''}
                    />
                  </div>
                )
              })}
              <button type='submit'>Sign in with {provider.name}</button>
            </form>}
          {(provider.type === 'email' || provider.type === 'credentials') && ((i + 1) < providersToRender.length) &&
            <hr />}
        </div>
      )}
    </div>
  </>*/


  const [type, toggle] = useToggle('login', ['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Group direction="column" grow>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Group>

        <Group position="apart" mt="xl">
          <Anchor component="button" type="button" color="gray" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}