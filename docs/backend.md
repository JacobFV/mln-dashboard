# Backend

TODO: restructure as much functionality as possible into a graphql schema

TODO: use getUser to make approriate email to identity mappings. Also denies access to a user if they are deleted. Obviously, throws an error if the user is not found.

When you're talking about a reasonably complex server like this one, the term 'backend' is kind of vauge. I'm going to describe it in three classes:

- **API endpoints**. These are located in the `/pages/api` folder. Like any other Next.js page, whenever the user navigates to `http://localhost:<app_port>/api/...`, the corresponding default export function in `/pages/api/...` is called. All API endpoints are also versioned by `/api/v1/...`, so we can update the API without breaking the frontend. Much of the API is interfaced through a GraphQL schema at `/api/v1/graphql`.
- **Server-only code**. Many API endpoints use the same code or it may be cleaner to consolidate the code that a single endpoint uses in separate files for readability, extendability, or versioning reasons. This server-only code is located in the `/server` folder. These functions do not\* operate on HTTP requests or responses and are not directly exposed to the client. The database is managed in the `/server/db` folder.
- **Applications**. These are the essential programs that this web app provides an interface to. For MLN-Dashboard, examples of apps could be graph generation, visualization, and data retrieval tools. This code is located in the `/src/apps` folder. See the [Apps](/docs/apps.md) documentation page for details.

## Diagrams

TODO: I need to make visual documentation showing how the server components fit together using [codecrumbs](https://codecrumbs.io/) and/or [js-code-to-svg-flowchart](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor).

## Common Types, Database, and GraphQL

This server is a hybrid RESTful / GraphQL server. The RESTful API is exposed to the client via the `/api/v1` endpoint. The GraphQL API is exposed to the client at a single endpoint: `/api/v1/graphql`. Please skim the [GraphQL Documentation](/https://graphql.org/learn/) for an introduction to GraphQL if you are not familiar with it.

I think we should make as much data as possibly directly accessible to the frontend via GraphQL. This should help keep things simple, flexible, understandable, and maintainable while also allowing for complex server logic to be added in the future. To minimize complexity and maximize efficiency, the graphql schema is aligned as closely as is reasonably possible with the database. Directives defined on the schema (@authenticated, @owner, @private, etc.) establish how the client can interact with schema fields. Directives include:

- `@readIfAuthenticated`: This directive requires that the client be authenticated. If the client is not authenticated, the field is not returned (without sending an error message).
- `@readIfOwner`: This directive requires that the client be authenticated and that the client be the owner of the object. If the client is not authenticated or is not the owner of the object, the field is not returned. The `owner` is defined differently depending on the resource. For example, the owner of a file is defined by the `file.owner.guid` field; the owner of a user is defined by the `user.guid` field; the owner of an organization is defined by the `organization.owner.guid` field.
- `@private`: This directive indicates the field is private. Private fields are never returned to the client regardless of authentication. In fact, they might be implemented by completely removing the field from the graphql schema.
- no visibility directive: Fields are public by default. Public fields are always returned -- unless, of course, an error occurs.
- `@immutable`: This directive indicates the field or object will not change and can be safely cached.
- `@deprecated`: This directive indicates the field is deprecated. Deprecated fields or mutations are returned to the client with a warning message. There should not be a reason to use this directive at the early development stage we are in.
- `@unique`: This directive indicates that all values for the field should be unique. An error is thrown if the client attempts to set a value that results in a value-space collision.
- `@paginated`: This directive indicates that the field is paginated. This means that the field is an array of objects and the client can request a specific page of the array. The client can request a page of the array by specifying the `page` and `pageSize` query parameters. The `page` parameter is 1-indexed. The `pageSize` parameter is the number of objects to return in the page. The default page size is 10. If no parameters are specified, the entire array is returned.
- `@lazy`: This directive indicates that the object is undefined until it is requested the first time -- hence, lazy loading. If the value changes, the object will be deleted and once again be undefined.

It's hard to explain what the GraphQL schema looks like without also discussing common types and the database:

- Common types (like `User`, `FilePermissions`, etc.) are defined in the `/src/common/types` folder. This allows types to be shared across the server and the frontend.
- The 'database' is a singleton object that stores all persistent data (users, file permissions, etc.). This object is saved and loaded using json serialization/deserialization and can be retrieved on the server side using `/server/db.js:singleton()`.
- The GraphQL schema and associated resolver functions are defined in the `/pages/api/v1/graphql` folder. The graphql endpoint manages interfacing with the database, provides server-side API functionality via graphql mutations, and can be extended for collaborative editing using graphql subscriptions.

There are many similarities between the database and graphql schema -- the main difference being that the database is actually a javascript/typescript object, it doesn't include the `query`, `mutate` or `subscription` objects, and it replaces objects with their guid when serializing. On the other hand, the graphql schema doesn't include the `root` object and links directly to the objects pointed to by a guid. Please see `/src/common/types/*`, `/src/server/db.ts`, `/src/pages/api/v1/graphql.ts` for exact definitions.

Note also: in most cases where a user want to do something that requires authorization, we don't trust the graphql api for the `email` or `guid`. That's because anybody can make a request on behalf of a user with a given email. Instead, the email, guid, and associated user object is retrieved on the server-side using the client's JWT. That's why you'll see mutations like `deleteAccount()` with no `email` or `guid` arguments.

Here's the database and types:

```ts
interface Node {
  guid: ID! @unique @immutable
}
scalar DateTime // javascript Date object as string `YYYY-mm-DD HH:MM:SS.SSS`
interface Node {
  guid: ID! @unique @immutable
}
interface Entity implements Node {
  guid: ID! @unique @immutable
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
}
type Group implements Entity {
  // groups also have their own storage folder
  guid: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  owner: User!
  dateCreated: String!
  dateModified: String
  members: [User!]
}
type User implements Entity {
  guid: ID!
  email: String!
  otherEmails: [String!]
  name: String!
  picture: String! // url to profile picture. might be served from this server or elsewhere
  dateOfBirth: DateTime! // policy purposes only
  dateCreated: String!
  dateModified: String
  loginAttempts: [{
    token: string
    date: Date
    sucess: boolean
  }]
  passwordHash: String
  resetPasswordToken: String // short alphanumeric code
  groups: [Group!] // list of Group guids
  verification_needed: Boolean // if true, the user needs to verify their email address to log in with password authentication
  verification_code: String // short alphanumeric code
  verification_date: String // date the verification code was sent
}
enum PermissionLevel {
  READER
  WRITER
  ADMIN
  OWNER
}
type FilePermission {
  user: User!
  permissionLevel: PermissionLevel!
}
type File {
  fullPath: String!
  owner: User! // is an  admin, writer, and reader
  permissions: [FilePermission!]!
  dateCreated: String!
  dateModified: String!
  size: Int // bytes
}
type App {
  name: String,
  description: String,
  version: String,
  invocation_template: String, // eg. `node ./index.js $arg1 --arg2 $arg3`
  inputs: {
    [name: string]: {
      type: Type,
      description: string,
      required: boolean,
      default: any,
    },
  },
  outputs: {
    [name: string]: {
      type: Type,
      description: string,
    },
  },
}
db {
  users: [User!]!
  organizations: [Organization!]!
  filePermissions: [String: FilePermission!]! // key is filepath
  // there is no persistent data for files; we use the OS filesystem instead!
  apps: [App!]!
}
```

And here's the graphql schema:

```graphql

```

```graphql
scalar DateTime // javascript Date object as string `YYYY-mm-DD HH:MM:SS.SSS`
interface Node {
  guid: ID! @unique @immutable
}
type LoginAttempt {
  token: String!
  date: DateTime!
  sucess: Boolean!
}
interface Entity implements Node {
  guid: ID! @unique @immutable
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
}
type Group implements Entity {
  // groups also have their own storage folder
  guid: ID! @unique @immutable
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  owner: User! @owner
  dateCreated: String! @private
  dateModified: String @private
  members: [User!]
}
type User implements Entity {
  guid: ID!
  email: String! @unique
  otherEmails: [String!]
  name: String!
  picture: String! // url to profile picture. might be served from this server or elsewhere
  dateOfBirth: DateTime! @private // policy purposes only
  dateCreated: String! @private
  dateModified: String @private
  loginAttempts: [LoginAttempt!]! @private
  passwordHash: String @private
  resetPasswordToken: String @private // short alphanumeric code
  groups: [Group!] // list of Group guids
  verification_needed: Boolean @private // if true, the user needs to verify their email address to log in with password authentication
  verification_code: String @private // short alphanumeric code
  verification_date: String @private // date the verification code was sent
}
enum PermissionLevel {
  READER
  WRITER
  ADMIN
  OWNER
}
type FilePermission {
  user: User!
  permissionLevel: PermissionLevel!
}
type File {
  fullPath: String!
  owner: User! // is an  admin, writer, and reader
  permissions: [FilePermission!]!
  dateCreated: String!
  dateModified: String!
  size: Int // bytes
}
type App {
  name: String,
  description: String,
  version: String,
  invocation_template: String, // eg. `node ./index.js $arg1 --arg2 $arg3`
  inputs: {
    [name: string]: {
      type: Type,
      description: string,
      required: boolean,
      default: any,
    },
  },
  outputs: {
    [name: string]: {
      type: Type,
      description: string,
    },
  },
}
db {
  users: [User!]!
  organizations: [Organization!]!
  filePermissions: [String: FilePermission!]! // key is filepath
  // there is no persistent data for files; we use the OS filesystem instead!
  apps: [App!]!
}
query {
  users: [User!]!
  // file permissions are accessible inside `files`
  files(path: String!, depth: Int = 0): [File!]|string // returns an error message if the path is invalid or user does not have permission
  apps: [App!]!
}
mutate {
  createPasswordAuthenticatedUser(email: String, name: String, password: String) {
     result: String
  }
  // send email with verification code to user
  resendVerificationEmail(email: String) {
     result: String
  }
  // verify user's email address using verification code
  verifyEmail(verificationCode: String) {
     result: String
  }
  deleteUser() {
     result: String
  }
  changeUsername(newUsername: String) {
     result: String
  }
  mergeIntoOtherAccount(otherAccountEmail: String) {
     result: String
  }
  changePassword(oldPassword: String, newPassword: String) {
     result: String
  }
  // send email with reset password code to user
  forgotPassword(email: String) {
     result: String!
  }
  // reset user's password using reset password code
  resetPassword(email: String, resetPasswordToken: String, newPassword: String) {
     result: String
  }
  createGroup(name: String!) {
     result: String
  }
  deleteGroup(guid: ID!) {
     result: String
  }
  addUserToGroup(userGuid: ID!, groupGuid: ID!) {
     result: String
  }
  removeUserFromGroup(userGuid: ID!, groupGuid: ID!) {
     result: String
  }
  setPermisssions(path: String!, permissions: FilePermissionInput!) {
     result: String
  } // TODO: change permission to permissionLevels
  // TODO: completely separate the database from graphql schema
}
subscription {
  ...
}
```

Also, the GraphQL website [made some recommendations](https://graphql.org/learn/best-practices/) on development and deployment considerations:

> It's encouraged that any production GraphQL services enable GZIP and encourage their clients to send the header:
>
> > Accept-Encoding: gzip

### Password reset sequence

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgVXNlci0-PitTZXJ2ZXI6IEdFVCAvYWNjb3VudC9mb3Jnb3RfcGFzc3dvcmRcbiAgICBTZXJ2ZXItPj4rVXNlcjogMjAwIE9LIHdpdGggaHRtbCBmb3JtIHRvIGVudGVyIGVtYWlsXG4gICAgVXNlci0-K1NlcnZlcjogbXV0YXRlIHsgZm9yZ290UGFzc3dvcmQoZW1haWwpIHsgcmVzdWx0IH0gfVxuICAgIFNlcnZlci0-PitVc2VyOiBTZW5kcyBlbWFpbCB3aXRoIHJlc2V0X3Bhc3N3b3JkIGxpbmtcbiAgICBVc2VyLT4-K1NlcnZlcjogbGluayBpbiBlbWFpbDogR0VUIC9hY2NvdW50L3Jlc2V0X3Bhc3N3b3JkJmVtYWlsPS4uLiZ0b2tlbj0uLi5cbiAgICBTZXJ2ZXItPj4rVXNlcjogMjAwIE9LIHdpdGggaHRtbCBmb3JtIHRvIGVudGVyIG5ldyBwYXNzd29yZFxuICAgIFVzZXItPitTZXJ2ZXI6IG11dGF0ZSB7IGNoYW5nZVBhc3N3b3JkKGVtYWlsLCBuZXdQYXNzd29yZCwgdG9rZW4pIHsgcmVzdWx0IH0gfSIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)](https://mermaid.live/edit/#eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgVXNlci0-PitTZXJ2ZXI6IEdFVCAvYWNjb3VudC9mb3Jnb3RfcGFzc3dvcmRcbiAgICBTZXJ2ZXItPj4rVXNlcjogMjAwIE9LIHdpdGggaHRtbCBmb3JtIHRvIGVudGVyIGVtYWlsXG4gICAgVXNlci0-K1NlcnZlcjogbXV0YXRlIHsgZm9yZ290UGFzc3dvcmQoZW1haWwpIHsgcmVzdWx0IH0gfVxuICAgIFNlcnZlci0-PitVc2VyOiBTZW5kcyBlbWFpbCB3aXRoIHJlc2V0X3Bhc3N3b3JkIGxpbmtcbiAgICBVc2VyLT4-K1NlcnZlcjogbGluayBpbiBlbWFpbDogR0VUIC9hY2NvdW50L3Jlc2V0X3Bhc3N3b3JkJmVtYWlsPS4uLiZ0b2tlbj0uLi5cbiAgICBTZXJ2ZXItPj4rVXNlcjogMjAwIE9LIHdpdGggaHRtbCBmb3JtIHRvIGVudGVyIG5ldyBwYXNzd29yZFxuICAgIFVzZXItPitTZXJ2ZXI6IG11dGF0ZSB7IGNoYW5nZVBhc3N3b3JkKGVtYWlsLCBuZXdQYXNzd29yZCwgdG9rZW4pIHsgcmVzdWx0IH0gfSIsIm1lcm1haWQiOiJ7XG4gIFwidGhlbWVcIjogXCJkZWZhdWx0XCJcbn0iLCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)

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
