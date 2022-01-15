# Authentication, Verification, and Security

This app uses [json web tokens](https://jwt.io/) (JWT) to authenticate users. JWT tokens are signed with the environment variable `JWT_SECRET` in `.env.local`. In the future, I will automate nightly key rotations.

The `nextauth.js` library makes it easy to support many different authentication methods. To test them, you will need to get your own access tokens and secrets. I will include links in the `.env.example` on how to obtain these.

For password authentication, the passwords are salted and stretched using the `bcrypt` library. Only the resulting hash is stored in the database.

A user can either be:

- **needs verification but has not been verified**. After a user signs up, they are sent a verification code. They can then use this code to verify their email address. Users also enter this state if they change their email address or reset their password. `verification_needed` is set to `true` in the database.
- **needs verification and has been verified**. After a correct verification code is submitted to the `/api/v1/account/verify-account` endpoint, the user's email is verified. `verification_needed` is set to `false` in the database.
- **does not need verification**. This is the default. `verification_needed` is set to `false` in the database.

Email verification is only needed for users signing in with password-based authentication. The `authorize(credentials, req)` method in `/src/pages/api/v1/auth/[...nextauth].js` automatically redirects password-authenticated users to the verify email address page if the user needs verification but has not been verified. Other third party authentication provider identities are already trusted as verified means of communication with the user. This means a user could create a password-authenticated account, not verify their email address, sign in with a third party identity under the same email and not have to verify, and finally attempt password authentication and realize their email is still unverified. Password authentication always requires verification because otherwise someone could create a password-backdoor to my account without me knowing.

Valid JWT tokens are **not** the same as users. A token only identifies (one of) the user's email addresses. The `user` object is uniquely idenfied by a globally uinque user id (guid). This provides a stable point of reference when setting permissions on users who change their emails / merge accounts / disable password sign in / etc. User data is stored in the `user` map while email-to-user mappings are defined in a separate map.

Since JWT's identify users by their email, a new account is created each time the user signs in using an auth provider that is under a different email address. An account can be made to point to a different email address by making appropriate changes to the `emailToUserMap`. If this field is defined and valid, `server.getUser()` returns the user's database entry for the email address it points to.

Athorization is exclusively implemented on the GraphQL server using type and field directives. See the [schema description](/src/docs/backend.md) for details.

Also, I'm not sure where to state this, but REST API requests and GraphQL queries are rate limited to prevent abuse. The rate limit is implemented with a leaky bucket algorithm on a per-IP address basis for unauthenticated users and per-user basis for authenticated users. Additionally, app usage is rate limited, but this better explained in the [apps documentation](/src/docs/apps.md).

Apps are launched in containers which only have access to the `/storage` directory. The nobody has execute permission in the `/storage` directory. The entire server is also containerized and only has permissions to read and write to the repository root directory. The storage directory is saved and the entire app container is deleted, re-downloaded, restarted every night.
