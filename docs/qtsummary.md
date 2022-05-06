# Code Organization

Code is organized under the following major files and directories:

```text
├── docs: documentation for us, future developers, and the community
├── public: static web resources. next.js requires this to be in the root
├── research: some papers that might be relevant for the project
├── src: source code goes here
│   ├── apps: backend applications that the server interfaces with
│   ├── common: code shared by both the frontend and backend
│   |   ├── misc: miscellaneous code that doesn't fit anywhere else
│   |   ├── types: types that are used by multiple files including the database
│   |   ├── utils: utility functions that are / might be used by multiple files
│   |   ├── constants: important shared constants
│   |   └── ...
│   ├── components: ReactJS components which are included in pages
│   ├── pages: next.js routes '/url/path' to the corresponding default export at '/src/pages/<url/path>'
│   |   ├── api: pages and api endpoints
│   |   |   ├── graphql.ts: the handler for all graphql functions
│   |   |   ├── auth: next.js authentication handling
│   |   |   └── ... other rest api endpoints
│   |   └── ... pages
│   ├── prisma: database schema and sqlite saves
│   ├── server: server-side-only code used in API endpoints
│   └── styles: stylesheets
├── storage: entity-segmented storage
├── test: ts mocha tests
├── README: overview page for MLN-Dashboard
├── LICENSE: MIT License
├── .env.local: environment file with variables included (not in git)
├── .env.local.example: empty environment file
├── .next: next.js-compiled app
└── ... developer files (vscode, git, npm)
```

## Code Style

Code (mostly) adheres to [Google's JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html):

- camelCase is used for variable names and modularized css classes
- `const` instead of `var` or `let` is employed wherever possible
- jsdoc comments are / should be included for each function/class/etc.

While no hard formatting rules are enforced, eg, indentation level, tab vs. space, max length, etc., the code is formatted in a way that is easy to read and modify.

## Documentation

Once the backend is stable, [codecrumbs](https://codecrumbs.io/) and/or [js-code-to-svg-flowchart](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor) will be used to make visual documentation of the server logic.

Unless otherwise specified, filenames is the MLN-Dashboard documentation are relative to the repository's root or the `/src` directory; `/` does NOT indicate that a path is relative to the operating system's root.

Effort is made to keep the overall repo should be versionless in-between major version numbers. Following GitHUb's recommendations, minor changes should retain backwards compatibility. API endpoints are a necessary exception; all past and present API versions are organized by major releases. This further facilitates code reuse across versions. Currently, the API is on `v1`. Once a stable beta is reached, the contents of `/src/pages/api` will be moved to `/src/pages/api/v1`.

## Tests

Tests are placed in the `/test` subdirectory and performed using `mocha`. This section will be expanded once tests are setup.

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

# Authorization

Authorization is the process of establishing what privileges and permissions a user has. Currently, all functionality that requires authorization is implemented on the GraphQL resolver functions. See the [schema description](/docs/backend.md) for details. We currently use authorization for the following purposes:

**Restricting access to privileged information on the graphql api**: For example, a user cannot see another user's alternative emails, their own login attempts, or anybody's password hash. Users must belong to a given group to see that group's information.

**Restricting access to files**: See [file_permissions.md](/docs/file_permissions.md) for more information.

Authentication is not necessary to have authorization in every case. Clients are authenticated as `Anonymous` users by default.

# Users and Groups

Resources are owned by either a **user** or a **group**. Users and groups are both a type of **entity**. Groups contain users and groups and are useful for managing organizations or establishing hierarchial permissions for a collection of entities. Every entity has:

- metadata, including a unique ID, name, dateCreated, etc.
- a top-level storage directory. This directory is located at `/storage/<entityID>`.

The `<entityID>` field is `u{<user.ID>}` for users and `g{<group.ID>}` for groups. This allows us to take advantage of prisma's `unique` ID auto-generation while avoiding namespace collisions between users and groups.

Please note: "users" and "groups" in this context are not the same as linux users and groups. The server can run under any linux user. It implements users and groups on its own layer of abstraction, and it only modifies files under its own repository root directory. See [security > containerization](/docs/authentication_verification_and_security.md) for information about the impact this server makes on its host system.

## Creating Users and Groups

Users are created when either:

- a person authenticates with a new third party identity and the email attached to the OAuth identity is not already in the database or
- a `createAccount` mutation is sent to create a credential-authenticated account.

See the `/src/pages/api/auth/[...nextauth].js` `async signIn` function and `createAccount` graphQL mutation for details on how this is handled.

Groups are created by a user with the `createGroup` mutation. See the `createGroup` mutation for details.

## Special Users

There are two special users:

- `Anonymous` user: the user who is not logged in. This psuedo-user exists for the purpose of being able to assign public read and write permissions to files.
- `System` user: the system user is used in cases where nobody should have control of a resource. For example, each user's top-level directory is owned by the `System` user to prevent them from doing something stupid like giving away ownership rights on their own top-level directory. The `System` user also owns the root storage directory. See [authorization](/docs/authorization.md) for more information.

# Apps

**App** are the building blocks of the server's application layer. Right now, all apps are treated as black box programs. (Actually, right now, I don't have any apps.) However, explicit interfaces are specified for each application, leaving the room open to make a block-programming editor in the future or even directly invoke transparent javascript or python functions.

Apps are listed in the `/src/apps` directory. Each app has a `manifest.ts` file in its root with a default export function that specifies the app's name, description, and other metadata like so:

```ts
default export (): AppManifest => {
  return new {
    name: 'My App',
    description: 'A description of my app',
    ...
  }
}
```

The returned object should conform to the `AppManifest` type. This manifest object allows the server to automatically index, display, and build user interfaces for each app. It contains `inputs` and `outputs` which determine the editable and viewable UI components presented to the user before and after application execution respectively. Under the hood, these type specifications are represented using instances of `AnyType` and subclasses which allows overriding where necessary but simplicity when convenient. See `/src/common/apps/[...appTypes].ts` for more details.

It's not recommended to develop apps directly inside this repository. Instead, apps should be developed in their own repository and added as a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) in the /apps directory. Once your app is ready, run `git add-submodule https://github.com/user/repo.git apps/my-submodule` to add it to the server. If you don't want the AppManifest to be included in your main remote, create a new branch with the AppManifest included. Remember, contents inside git submodules don't get versioned along with the main repository. The main repo merely points to the most recent local commit of that submodule.

In the future block-based programming editor, this input and output type metadata will be used to annotate input and output ports of nodes (which represent app executions in a workflow) with a specific color or shape. Users will be able to drag and drop these nodes into the workflow editor to create a multi-app workflow. See [https://github.com/JacobFV/EasyMLN](https://github.com/JacobFV/EasyMLN) for a longer description of this idea.

# Client

The client recieves pages served from the `/pages` directory which are written in JSX and TSX (mostly typescript).

The following libraries / modules were initially considered when developing MLN-Dashboard:

- preact: possible lightweight react alternative
- material-ui and mui: developer-friendly, accelerate development time, meet user expectations on both desktop and mobile, different screen sizes, and with accessibility requirements.
- apollo ecosystem: flexible and complex queries with client-side caching.
- Modularized SASS: for flexible styling with jsx/tsx.

Preact was rejected for its limited component library. While the material-ui framework was initially selected for aesthetic appeal, its heavy weight made development and page loading times excessively long. After exploring the web development ecosystem on GitHub, we discovered `mantine`, a library that builds on top of react and provides specific components that we will needed including:

- `@mantine/dropzone`: uploading files
- `@mantine/modals`: simple modal dialogs
- `@mantine/rte`: rich text editor for making research reports with support for formatting, tables, lists, image uploads, video embedding, and mentions of other users
- `@mantine/hooks`: qt form builder for lgoin, registration, and other forms
- `Spoiler`: provide short summaries of an author's research
- `AppShell`: quick app template UI component
- `Grid`: flexible layout
- `Autocomplete`: options for application input
- `SegmentedControl`: options for application output
- `Breadcrumbs`: file navigation
- `Stepper`: progress bar for application execution and creating new accounts
  
At its current state, we are employing the following client-side stack:

- JSX/TSX/React: used for defining code alongside view components
- mantine: supplies high-level user interface components
- apollo/client: used for communicating with the server


# Backend

When you're talking about a reasonably complex server like this one, the term 'backend' is kind of vague. I'm going to describe it in three classes:

- **API endpoints**. These are located in the `/pages/api` folder. Like any other Next.js page, whenever the user navigates to `http://localhost:<app_port>/api/...`, the corresponding default export function in `/pages/api/...` is called. Much of the API is interfaced through a GraphQL schema at `/api/graphql`. In the future, API endpoints will be versioned by `/api/v1/...`, so we can update the API without breaking the frontend.
- **Server-only code**. Many API endpoints use the same code or there may be cases where it may be cleaner to consolidate the code that a single endpoint uses in separate files for readability, extendability, or versioning reasons. This server-only code is located in the `/server` folder. These functions do not\* operate on HTTP requests or responses and are not directly exposed to the client.
- **Applications**. Now we're in the deep-backend. These are the essential programs that this web app provides an interface to. For MLN-Dashboard, examples of apps could be graph generation, visualization, and data retrieval tools. This code is located in the `/src/apps` folder. See the [Apps](/docs/apps.md) documentation page for details.

## Common Types, Database, and GraphQL

This server is a hybrid RESTful / GraphQL server. The RESTful API is exposed to the client via the `/src/api` endpoint. The GraphQL API is exposed to the client at a single endpoint: `/src/api/graphql`. Please skim the [GraphQL Documentation](/https://graphql.org/learn/) for an introduction to GraphQL if you are not familiar with it.

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

# File Permissions

Ideally, we want to implement a Google-Drive-kind-of sharing architecture where **users and groups can own and share files and directories with fine-tuned permission levels (hidden, read, write, admin, owner)**. For brevity, this document refers to both files and directories as "resources". A resource can only have one owner. The current *owner* can change the owner and administrate files; all users with an *admin* permission level can delete, move, rename, and share, and they also have write permissions; all users with *write* permissions can edit files, and they also have read permissions; and all users with *read* permissions can read, copy, and download files. A resource can also be explicitly marked as 'hidden' for some particular entity. Users inherit the permissions of the group(s) they belong to with conflicts determined by a least restrictive union.

Initially, a newly created or uploaded file is owned by the user or group who created or uploaded it. That owner can then share the file with other users or groups, giving them read-only access.

In many cases, file access permissions are inherited from the parent directory. For example, if a user creates a new file in a directory, the file's owner is the user who owns the directory. Inherited permissions can also override the parent directory's permissions. For example, UserA could be given reader permissions on `/storage/userB/sharedFolder` but also hidden permissions on `/storage/userB/sharedFolder/file.txt`. This would make UserA able to read everything in `/storage/userB/sharedFolder/` except for `file.txt`.

The Anonymous and System users are special users that are used on the backend to implement some of sharing architecture features.

- The System user owns the storage root directory and each entity's top-level directory. Users and groups have admin permissions on their own top-level directory.
- The Anonymous user has hidden permissions on the root storage directory.

See [users and groups](/docs/users_and_groups.md) for more information.

**Inherited vs explicit permissions**. Explicit permissions are explicitly assigned to a resource while inherited permissions are implicitly acquired from the parent directory of a resource. Whenver an admin views permissions on a file or directory, they want to see both inherited and explicit permissions set on that resource. On the other hand, when permissions are assigned to a resource, these are assigned to become explicit permissions.

Removing explicit permissions is not the same as revoking inherited permissions. The sharing dialog presents a list of entities that the resource is shared with. Users can select `hidden` to explicitly revoke access to a resource. They can also click a delete icon to simply revert access permissions for that resource to its parent directory.

Whenever an explicit permission to read, write, administrate, or own a resource is assigned to an entity, the path to that resource is stored on the entity's list of shared resources. This list allows the user interface to make a "shared with me" type of sidebar menu for resources which would otherwise be buried under hidden parent directories. This list is updated whenever explicit permissions are revoked, changed to hidden, or the filesystem resource is deleted. This list is also updated every time the server restarts, which should be nightly.

**There is a potential security exploit** with this approach: assume I have a file system like this:

```
├── jacob
├── org1 (admin: Jacob)
|  ├── file 1
|  └── folder 1
|     ├── folder 1.1
|     └── folder 1.2
...
```

By giving Jacob admin rights to `org1`, he inherently has admin rights on all its subdirectories. Therefore, Jacob could explicitly grant himself access like so:

```
├── jacob
├── org1 (admin: Jacob)
|  ├── file 1 (admin: Jacob)
|  └── folder 1 (admin: Jacob)
|     ├── folder 1.1 (admin: Jacob)
|     └── folder 1.2 (admin: Jacob)
...
```

Then, even if the `org1` owner removes Jacob from the group, he will still have control over the group's resources that he has explicitly assigned admin permissions for himself.

```
├── jacob
├── org1
|  ├── file 1 (admin: Jacob; Jacob can still see this folder)
|  ├── file 2 (Jacob can't see this newly created file)
|  └── folder 1 (admin: Jacob; Jacob can still see this folder)
|     ├── folder 1.1 (admin: Jacob; Jacob can still see this folder)
|     └── folder 1.2 (admin: Jacob; Jacob can still see this folder)
...
```

To prevent attacks like this from happening unintentionally, when a user is revoking explicit permissions on a directory, they should receive a request like "Do you want to revoke permissions for all child directories as well?". If the user clicks "yes", then the system should recursively remove permissions for all child directories as well.

**Navigation**. Users navigate to resources by selecting one of: "My files", "Shared with me", "GroupA's files", "Shared with GroupA", and etc. for all groups that the user belongs to. Then the main content panel is filled with a list or tile of resources which they can click through to arrive a a resource. There is also a top-level search bar / breadcrumbs display which allows users to search for resources by name, by tag (future), or by path. For security reasons, the server treats hidden resources as if they didn't exist and responds with a not found error.

Explicit permissions are shaped as follows:

```ts
type Permission {
  path: string!
  entity: ID!
  permission: PermissionLevel!
}
```

They are stored in the Prisma-connected database.

Note: the `owner` of a resource does not have to be the user who created the resource or the entity under whose top-level directory the rersource is located in.

**Groups**. When a user is added to a group, the UI asks the inviter whether they would like to assign `reader`, `writer`, or `admin` permissions to that new user for that group's root directory. The group owner has admin permissions. (The system user is the owner of all entity top-level directories). Conversely, the UI asks if the group owner would like to revoke those permissions when removing a user from the group.

# Live Editing

Collaborative editing and viewing is a really cool yet increasingly essential feature of the web. Here more than ever, we developers need to rely on existing conventions and modules to minimize essential and accidental complexities. GraphQL subscriptions coupled with declarative react data fetching and rendering is a great way to make this happen. Here's a quick and dirty example:

```js
// copilot generated this as an example
const { useSubscription } = require("@apollo/react-hooks");
const { gql } = require("apollo-boost");

function useDocumentChanges(document_id) {
  const { data, loading, error } = useSubscription(
    gql`subscription {
      document_changes(document_id: ${document_id}) {
        id
        type
        data
      }
    }`
  );
  if (loading) return null;
  if (error) return null;
  return data.document_changes;
}

function useDocument(document_id) {
  const changes = useDocumentChanges(document_id);
  if (!changes) return null;
  const [state, setState] = useState(changes[0].data);
  changes.forEach((change) => {
    setState(change.data);
  });
  return state;
}
```

Currently, the server does not feature applications that would utilize collaborative editing. However, in the future, users may be able to write reports, create block-based workflows, and comment on other users' reports and outputs in close to real-time. If I have time, I might use `mantine/rtf` and (`react-blockly` or `react-flow`) to implement this.
