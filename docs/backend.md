# Backend

TODO: getUser() does authentication, checks verification, optional redirect, and returns user object while getData('users.<email>') only returns user object

TODO: restructure as much functionality as possible into a graphql schema

When you run `npm run dev`, you are starting a node.js process that serves the pages located in the /pages directory. If you're working in vscode, select the `Next.js: debug server-side` or `Next.js: debug full stack` options to enjoy break-point debugging

I'm splitting the backend code into three parts:

- **API endpoints**. These are located in the `/pages/api` folder. Like any other Next.js page, whenever the user navigates to `http://localhost:<app_port>/api/...`, the corresponding function in `/pages/api/...` is called.
- **Server-only code**. Many API endpoints use the same code. This code is located in the `/server` folder. These functions do not\* operate on HTTP requests or responses.
- **Applications**. These are the essential programs that this web app provides an interface to. For MLN-Dashboard, examples of apps could be graph generation, visualization, and data retrieval tools. This code is located in the `/apps` folder. See the [Apps](/docs/apps) documentation page for details.

## Diagrams

TODO: I need to make visual documentation showing how the server components fit together using [codecrumbs](https://codecrumbs.io/) and/or [js-code-to-svg-flowchart](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor).

### Password reset sequence

[![sequenceDiagram
    User->>+Server: GET /account/forgot_password
    Server->>+User: 200 OK with html form to enter email
    User->>+Server: POST /api/v1/account/forgot_password
    Server->>+User: 200 OK
    Server->>+User: Sends email with reset_password link
    User->>+Server: GET /account/reset_password
    Server->>+User: 200 OK with html form to enter new password
    User->>+Server: POST /api/v1/account/reset_password
    Server->>+User: 200 OK
    User->>+Server: GET /account/reset_password_success
    Server->>+User: 200 OK with html page](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgVXNlci0-PitTZXJ2ZXI6IEdFVCAvYWNjb3VudC9mb3Jnb3RfcGFzc3dvcmRcbiAgICBTZXJ2ZXItPj4rVXNlcjogMjAwIE9LIHdpdGggaHRtbCBmb3JtIHRvIGVudGVyIGVtYWlsXG4gICAgVXNlci0-PitTZXJ2ZXI6IFBPU1QgL2FwaS92MS9hY2NvdW50L2ZvcmdvdF9wYXNzd29yZFxuICAgIFNlcnZlci0-PitVc2VyOiAyMDAgT0tcbiAgICBTZXJ2ZXItPj4rVXNlcjogU2VuZHMgZW1haWwgd2l0aCByZXNldF9wYXNzd29yZCBsaW5rXG4gICAgVXNlci0-PitTZXJ2ZXI6IEdFVCAvYWNjb3VudC9yZXNldF9wYXNzd29yZFxuICAgIFNlcnZlci0-PitVc2VyOiAyMDAgT0sgd2l0aCBodG1sIGZvcm0gdG8gZW50ZXIgbmV3IHBhc3N3b3JkXG4gICAgVXNlci0-PitTZXJ2ZXI6IFBPU1QgL2FwaS92MS9hY2NvdW50L3Jlc2V0X3Bhc3N3b3JkXG4gICAgU2VydmVyLT4-K1VzZXI6IDIwMCBPS1xuICAgIFVzZXItPj4rU2VydmVyOiBHRVQgL2FjY291bnQvcmVzZXRfcGFzc3dvcmRfc3VjY2Vzc1xuICAgIFNlcnZlci0-PitVc2VyOiAyMDAgT0sgd2l0aCBodG1sIHBhZ2UiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)](https://mermaid.live/edit#eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgVXNlci0-PitTZXJ2ZXI6IEdFVCAvYWNjb3VudC9mb3Jnb3RfcGFzc3dvcmRcbiAgICBTZXJ2ZXItPj4rVXNlcjogMjAwIE9LIHdpdGggaHRtbCBmb3JtIHRvIGVudGVyIGVtYWlsXG4gICAgVXNlci0-PitTZXJ2ZXI6IFBPU1QgL2FwaS92MS9hY2NvdW50L2ZvcmdvdF9wYXNzd29yZFxuICAgIFNlcnZlci0-PitVc2VyOiAyMDAgT0tcbiAgICBTZXJ2ZXItPj4rVXNlcjogU2VuZHMgZW1haWwgd2l0aCByZXNldF9wYXNzd29yZCBsaW5rXG4gICAgVXNlci0-PitTZXJ2ZXI6IEdFVCAvYWNjb3VudC9yZXNldF9wYXNzd29yZFxuICAgIFNlcnZlci0-PitVc2VyOiAyMDAgT0sgd2l0aCBodG1sIGZvcm0gdG8gZW50ZXIgbmV3IHBhc3N3b3JkXG4gICAgVXNlci0-PitTZXJ2ZXI6IFBPU1QgL2FwaS92MS9hY2NvdW50L3Jlc2V0X3Bhc3N3b3JkXG4gICAgU2VydmVyLT4-K1VzZXI6IDIwMCBPS1xuICAgIFVzZXItPj4rU2VydmVyOiBHRVQgL2FjY291bnQvcmVzZXRfcGFzc3dvcmRfc3VjY2Vzc1xuICAgIFNlcnZlci0-PitVc2VyOiAyMDAgT0sgd2l0aCBodG1sIHBhZ2UiLCJtZXJtYWlkIjoie1xuICBcInRoZW1lXCI6IFwiZGVmYXVsdFwiXG59IiwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)

NOTE: The user can exit this sequence anytime before they reach step 7 without resetting their password.

```text
1. User clicks the "forgot my password" link from the sign in page

2. Link navigates user to the `/account/forgot_password` page

3. User enters their email address and submits

4. The forgot password form invokes the `/api/v1/account/ forgot_password` endpoint with the user's email address

4.1. If the email address is not found, the server returns `200 OK` // the server returns 200 OK in all cases to prevent email harvesting

4.2. Server gets user object from the database

4.3. Server generates a reset password token and stores it on `user.reset_password_token`

4.4. Server sets `user.reset_password_token_expiration = Date.now() + (30 * 60 * 1000)` (30 minutes from now)

4.5. Server saves user object to database

4.6. Server sends email with a link to the `/account/reset_password` page that encodes the `reset_password_token` and their email address in the URL.

4.7. Server returns `200 OK`

5. User clicks the reset password link in the email to navigate to the `/account/reset_password` page with the `reset_password_token` in the URL

6. User types a new password

6.1. The client page checks that the password is valid using `common/account/sanity_check.js:isPasswordValid(password)` every time the user types a character

6.2. If the password is invalid, the client page displays an error message and the user is not allowed to submit the form

6.3. If the password is valid, the field turns green and the user can click the "reset password" button

7. User clicks the "reset password" button

7.1. The client page invokes the `/api/v1/account/reset_password` endpoint with the user's email address, the new password, and `reset_password_token`

7.2. The server validates the `reset_password_token` and email address

7.2.1. If the email address is not found, the reset_password_token does not exist, does not match, or the reset_password_token_expiration has passed, the server returns `400 Bad Request` // these cases are lumped together to prevent leaking information about the user's account

7.3. Server validates the new password using `common/account/sanity_check.js:isPasswordValid(password)`

7.3.1. If the password is invalid, the server returns `400 Bad Request`

7.3. Server gets user object from database

7.4. Server deletes `user.reset_password_token` and `user.reset_password_token_expiration` fields from the user object

7.5. Server computes hash of new password and stores it on `user.password_hash` replacing any previous value

7.6. Server saves user object to database

7.7. Server returns `200 OK`

7.8. If the client recieves a 200 OK response, it redirects the user to the `/account/reset_password_success` page

7.9. If the client recieves a 400 Bad Request response, it displays an error message and asks the user to repeat the process from step 1
```

## API endpoints

Here's a quick summary of the API endpoints broken down by category:

### `/api/v1/account/*`

#### `create-password-authenticated-account`

NOTE: This endpoint is only employed when creating an account that is initially password-authenticated. Accounts that are authenticated using other means (eg. github authentication) do not use use this endpoint. Instead, they are created by the 'after login' function in `/api/v1/auth/[...nextauth].js`

1. return `403, forbidden` if name, email, or password are not valid

   // The password form field will perform sanity checks on the client side after every change. This endpoint does not need to return human-readable error messages (such as "password length should be between 3 and 256 characters").

2. call server.account.createUser(name, email)

3. update the newly created user with the hashed password

3.1. get the newly created user from the database

3.2. set the field `user.password_hash` to `server.account.hashPassword(password)`

3.3. call `server.db.updateUser` with the modified user object

4. return `200, ok`

#### `resend-verification-code`

1. call server.account.sendVerificationCode with the email address

2. return 200, ok

#### `verify-account`

1. if the email is not in the database, the user does not need verification, the verification time limit has expired, or the code is incorrect, return `400, bad request`

2. remove the verification code and `verification_needed` from the user object

#### `delete-account`

1. call server.account.deleteUser(token.email)

2. return `200, ok`

#### `change-username`

1. if the username is not valid, return `400, bad request`

2. get the user object from the database

3. change the user.name to the new name

4. call server.db.updateUser with the modified user object

5. return `200, ok`

#### `change-email`

1. if the email is already in use or if the email is not valid, return `400, bad request`

2. get the user object from the database

3. change the user.email to the new email

4. set the user.email_verified = false and user.verification_needed = true for the new user

5. call server.db.updateUser with the modified user object

6. call server.account.sendVerificationEmail for the new user

7. return `200, ok`

#### `change-password`

This endpoint can be used to change the existing password of a password-authenticated account or to add password authentication to an account that was using some other authentication method. Unlike `reset-password`, it does not require the user to enter a verification code.

1. call server.account.sanityCheck.isValidPassword(password)

2. if the password is not valid, return `403, forbidden`

   // The 'change password' react component will perform sanity checks on the client side after every change to the text field. This endpoint does not need to return human-readable error messages (such as "password length should be between 3 and 256 characters").

3. get hash from server.account.hashPassword(password)

4. get the user object from the database

5. change the user.password_hash to hash

6. call server.db.updateUser with the modified user object

7. return `200, ok`

#### `forgot-password`

See sequence diagram "Password Reset" for details.

1. if the email address is not found, return `200 OK` // the server returns 200 OK in all cases to prevent email harvesting

2. get user object from the database

3. generate a reset password token and stores it on `user.reset_password_token`

4. set `user.reset_password_token_expiration = Date.now() + (30 * 60 * 1000)` (30 minutes from now)

5. save user object to database

6. Server sends email with a link to the `/account/reset_password` page that encodes the `reset_password_token` and their email address in the URL.

7. return `200 OK`

#### `reset-password`

See sequence diagram "Password Reset" for details.

POST with params: user's email address, the new password, and `reset_password_token`

1. The server validates the `reset_password_token` and email address

1.1. If the email address is not found, the reset_password_token does not exist, does not match, or the reset_password_token_expiration has passed, the server returns `400 Bad Request` // these cases are lumped together to prevent leaking information about the user's account

2. validate the new password using `common/account/sanity_check.js:isPasswordValid(password)`

2.1. If the password is invalid, return `400 Bad Request`

3. get user object from database

4. delete `user.reset_password_token` and `user.reset_password_token_expiration` fields from the user object

5. compute hash of new password and stores it on `user.password_hash` replacing any previous value

6. save user object to database

7. return `200 OK`

### `/api/v1/auth/[...nextauth].js`

#### `password login`

This is not a direct API route. It is called to authenticate a user with a password.

1. call server.account.hashPassword(password)

2. look for email-hash match in user_db

3. return appropriate boolean response

#### `after login`

This is not a direct API route. It is called after a user has been authenticated regardless of the authentication method.

1. get the user object with jwt.getToken()

2. if the user's email is not in the user_db,

2.1. call server.account.createUser(email, name)

2.2. if jwt token user has a `picture` field, store this value on the user object // we don't want to do this after every login; only the first

3. record the last login time in user_db

4. update the user object in the database

### `/api/v1/apps/*`

#### `list`

This is a graphql-like endpoint that returns any subset of the apps that the user has access to. The client supplies a `json` object with fields for each app that the user wants to see. The server returns a `json` object with the same fields, but with the values replaced by the values from the database.

#### `run`

## Server-only code

### `/server/account/*`

#### `hashPassword(password)`

#### `getUser(email, res?)`

If `res` is provided, the function will redirect to the verify_email page if `user.verification_needed && user.verification_needed==true`. It is strongly encouraged to include the `res` parameter to eliminate the need for maintaining manual redirect logic. Also cleans the user object of the `verification_code`, `verification_code_expiration`, `verification_needed`, `reset_password_token`, and `reset_password_token_expiration` fields if they are expired or unnecessary.

#### `updateUser(email, user)`

Completely replaces the user object in the database with the new user object. This function should be the only method used to update the user object in the database since it forces API logic to call `getUser` which in turn force handles redirect logic.

#### `createUser(name, email)`

NOTE: This function does not perform any sanity checks on the user parameters since they are already performed to the extent possible by create-password-authenticated-account. We cannot restrict a user from creating an account with a name that is already in use just because they are using OATH with a name or email that does not pass the sanity check.

1. Obtain a unique user id from the database

2. Create a new user object with the following fields:

- uid
- name
- email

3. Create a directory for the user's files in `/storage`

4. Store the user object in the database

#### `deleteUser(email)`

1. mark user.deleted = true in database

// For now, we do not need to delete folders in /storage

#### `sendVerificationCode(email)`

1. Generate a verification code

2. Set the `user.verification_code` to the verification code

3. Set the `user.verification_code_expiration` to the current time plus 30 minutes

4. Set the `user.verification_needed` to true

5. Delete the `user.reset_password_token` and `user.reset_password_token_expiration` fields from the user object

6. Send the verification code to the user's email with a one-tap link that automatically verifies the user's email
