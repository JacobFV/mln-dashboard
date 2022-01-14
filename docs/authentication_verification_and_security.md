# Authentication, Verification, and Security

This app uses [json web tokens](https://jwt.io/) (JWT) to authenticate users. JWT tokens are signed with the environment variable `JWT_SECRET` in `.env.local`. In the future, I will automate nightly key rotations.

The `nextauth.js` library makes it easy to support many different authentication methods. To test them, you will need to get your own access tokens and secrets. I will include links in the `.env.example` on how to obtain these.

For password authentication, the passwords are salted and stretched using the `bcrypt` library. Only the resulting hash is stored in the database.

Use the `server.getUser()` function to determine if a user is authenticated. This function returns `null` if the user is not authenticated. It also automatically redirects to the enter verification code page if the user needs to verify their email address.

Email verification is only needed for users that only use password-based authentication or have just changed their email address. Other authentication providers are inherently already verified means of communication with the user. A user can either be:

- **needs verification but has not been verified**. After a user signs up, they are sent a verification code. They can then use this code to verify their email address. Users also enter this state if they change their email address or reset their password.
- **needs verification and has been verified**. After a correct verification code is submitted to the `/api/v1/account/verify-account` endpoint, the user's email is verified.
- **does not need verification**. This is the default.

These states are indicated by the `verification_needed` field on the user's database entry.

Since JWT's identify users by their email, a new account is created each time the user signs in using an auth provider that is under a different email address. An account can be made to point to a different email address by setting the `points_to` field on the user's database entry. If this field is defined and valid, `server.getUser()` returns the user's database entry for the email address it points to.

Apps are launched in containers which only have access to the `/storage` directory. The nobody has execute permission in the `/storage` directory. The entire server is also containerized and only has permissions to read and write to the repository root directory. The storage directory is saved and the entire app container is deleted, re-downloaded, restarted every night.
