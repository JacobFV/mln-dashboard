# Authentication, Verification, and Security

This app uses **[json web tokens](https://jwt.io/)** (JWT) to authenticate users. JWT tokens are signed with the environment variable `JWT_SECRET` in `.env.local`. In the future, I will automate nightly key rotations.

The **`nextauth.js`** library makes it easy to support many different authentication methods. To test them, you will need to get your own access tokens and secrets. I will include links in the `.env.example` on how to obtain these.

For **password authentication**, the passwords are salted and stretched using the `bcrypt` library. Only the resulting hash is stored in the database. Users might not have a password hash if they use other authentication methods.

**Email verification**. Users enter the `email_verified=false` state if they 1) create a new account using password authentication, 2) change their email address, or 3) add email-credential login functionality to an existing account. Unverified users are automatically redirected to the check email page.

**Third party authentication** provider identities are already trusted as verified means of communication with the user. This means a user could create a password-authenticated account, not verify their email address, sign in with a third party identity under the same email and not have to verify, and finally attempt password authentication and realize their email is still unverified. Password authentication always requires verification because otherwise someone could create a password-backdoor to my account without me knowing.

Since email addresses can change, users are _not_ identified by their email address. The `user` object is uniquely idenfied by a globally uinque user id (`guid`). This provides a stable point of reference when setting permissions on users who change their emails / merge accounts / disable password sign in / etc. Also, since JWT's identify users by their email, a new account is created each time the user signs in using an auth provider that is under a different email address. This creates a problem where a user could have multiple accounts. To prevent this issue, users can select to merge into an existing account when authenticating with a new email.

**Abuse protection**. REST API requests and GraphQL queries are rate limited to prevent abuse. The rate limit is implemented with a leaky bucket algorithm on a per-IP address basis for unauthenticated users and per-user basis for authenticated users. Additionally, app usage is rate limited, but this better explained in the [apps documentation](/docs/apps.md).

**Containerization**. Apps are launched in containers under an OS-user which only has read and write access to the corresponding subset of the `/storage` directory that the user who launched the application has permissions to read and write respectively. After execution is complete, a diff is performed across all files and directories that the user has permissions to write to, and the changes are pulled into the main content directory. The entire server is also containerized and only has permissions to read and write to the repository root directory. The storage directory is backed up and the entire app container is deleted, re-downloaded, restarted every night.
