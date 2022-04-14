# Backend

## Process flows

### Create Account

Only the email that the user used to sign in needs to be verified for the user to be able to access their account. I don't know how the user could have other unverified emails on their account though.

1. User visits /auth/create-account
    1. User enters email
    2. User enters password
    3. User clicks submit
    4. User is redirected to /auth/verify with email encoded in url. Page shows message "We have sent you an email to verify your email address $email"

### Verify Email

TODO: the "verify email" logic has changed from what appears in the docs.

The /auth/verify page displays differently depending on the query string (there can be other query strings as well).

1. INITIAL state: User visits /auth/verify
    - if !email, enter GET_EMAIL state. This is the default entry point. It is invoked by clicking "verify email" or when an unverified user is redirected here.
    - if email && !code, enter GET_CODE state. This branch is called from GET_EMAIL state only.
    - if email && code, enter FAST_VERIFY_EMAIL state. This branch is only used by email links.

GET_EMAIL state

- if signed in,
    1. sendEmailVerfCode(email: email, override: False) mutation called (override set to false in case code is already in transit)
    2. Enter GET_CODE state
- if not signed in,
    1. User enters email
    2. User clicks "send verification code"
    3. sendEmailVerfCode(email: email, override: True) mutation called (override set to True since User explicitly entered email)
    4. Enter GET_CODE state

GET_CODE state

1. Page gets email from query string
2. User enters code
3. User clicks submit
4. verifyEmail(email: email, code: code) mutation called
5. If not successful, show message "We could not verify your email address $email"
6. If successful,
    - If `from` query param present, redirect to `from` param
    - If signed in, redirect to gallery
    - If not signed in, redirect to login

FAST_VERIFY_EMAIL state

1. Pages gets email and code from query string
2. verifyEmail(email: email, code: code) mutation called
3. If not successful, show message "We could not verify your email address $email"
4. If successful,
    - If `from` query param present, redirect to `from` param
    - If signed in, redirect to gallery
    - If not signed in, redirect to login

### Reset Password

1. User visits /auth/forgot-password
    1. User enters email
    2. User clicks submit
    3. forgotPassword(uid) mutation called
    4. User is redirected to a page with check your inbox message
2. User clicks link in email
    1. User is redirected to /auth/reset-password with uid and reset password token in query string
    2. User enters new password
    3. User clicks submit
    4. resetPassword(uid, token, newPass) mutation called
    5. If,
        - If successful, User is redirected to /auth/login with message "We have reset your password"
        - If not successful, User is redirected to /auth/login with no message. (Silent failure for security reasons)
