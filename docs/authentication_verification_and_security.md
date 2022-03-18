# Authentication, Verification, and Security

This app uses **[json web tokens](https://jwt.io/)** (JWT) to authenticate users. JWT tokens are signed with the environment variable `JWT_SECRET` in `.env.local`. If you are deploying this in a production environment, you will want to automate nightly/weekly/monthly key rotations.

The **`nextauth.js`** library makes it easy to support many different authentication providers. To test them, you will need to get your own access tokens and secrets. See the links in the `.env.local.example` file on how to obtain these.

For **password authentication**, the passwords are salted and stretched using the `bcrypt` library. Only the resulting hash is stored in the database. Users might not have a password hash if they use other authentication methods.

**Email verification**. All emails must be verified before they can be used. A verification code is sent whenever:

- a new user is created,
- a new email is added to an existing account, or
- a user clicks "resend verification code" on the verify page.

Unverified users are automatically redirected to the check email page.

Since email addresses can change, **users are _not_ uniquely identified by their email address**. The `user` object is uniquely identified by its `id`. This provides a stable point of reference to use when setting permissions on users who may change their emails / merge accounts / disable password sign in / etc. Also, since JWT's identify users by their email, a new account is created each time the user signs in using an auth provider that is under a different email address. This creates a problem where a user could have multiple accounts. To prevent this issue, users can select to merge into an existing account when authenticating with a new email. This feature is not yet implemented.

**Abuse protection**. REST API requests and GraphQL queries are rate limited to prevent abuse. The rate limit is implemented with a leaky bucket algorithm on a per-IP address basis for unauthenticated users and per-user basis for authenticated users. Additionally, app usage is rate limited, but this better explained in the [apps documentation](/docs/apps.md). This feature is not yet implemented.

**Containerization**. Apps are launched in containers under an OS-user which only has read and write access to the corresponding subset of the `/storage` directory that the user who launched the application has permissions to read and write respectively. After execution is complete, a diff is performed across all files and directories that the user has permissions to write to, and the changes are pulled into the main content directory. The entire server is also containerized and only has permissions to read and write to the repository root directory. The storage directory is backed up and the entire app container is deleted, re-downloaded, restarted every night. This feature is not yet implemented.
