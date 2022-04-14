# Multilayer Network Dashboard

**NOTE: I have written this README using declarative sentences as it might appear when published. However some parts are not implemented yet.**

## Getting Started

Please see the [Getting Started](/docs/getting_started.md) section for instructions on how to get started with this project.

## Documentation

Please see the [`/docs`](https://github.com/JacobFV/mln-dashboard/tree/main/docs) directory for documentation.

## Contributing

Please see our [Contributing Guide](/CONTRIBUTING) for more information. If you have any questions, please contact me `jacobfv123 [at] gmail [dot] com`.

## Dev notes

Please excuse the mess:

- make sure all next links use the `to` attribute instead of `href`
- write /auth/error, /auth/sign-in, /auth/profile
- implement markdown-react for pages
- implement middleware in _app
- implement middleware in getUser
- write error pages

- revert next-auth to use the default login page
- comment out any unstable UI elements
- make a home page with an create account and login button
- make the create-user, forgot-password, resend-verification-code, verify pages normal html forms with POST submit actions.
- make corresponding post api endpoints for those pages that call the server logic
- make scripts to test the database and get it working
- write server logic for the create-user, forgot-password, resend-verification-code, verify pages

- just make a simple QT page for running and downloading MLN projects
- copy content from <https://github.com/JacobFV/EasyMLN-old>- and <https://github.com/JacobFV/EasyMLN/blob/main/pages/index.tsx> to `pages/index.tsx`
- use [these templates](https://ui.mantine.dev/category) for the UI

- filler content in /home
- get started with organization page
- create organization page (accessible from account settings)
- account settings. Tabbed area for user/orgA/orgB/... if the user has an org.
- database working
- typegraphql bindings
- "All Apps" page and autogenerated form for running apps, viewing outputs, and generating artifacts

- use mantine form hook to make/modify the newUser, verifyRequest, error, signin, signout pages in `[..nextauth].js` (<https://simplernerd.com/next-auth-callbackurl/>)
- make graphql server schema, endpoint, and resolvers
- backend/api documentation
- ensure auth providers are working

Known TODO's:

see <https://react.rocks/example/react-sortable-tree> for collaspable tree

- [ ] make password hash salted witha naunce that is computed from the account creation timestamp
- [ ] add captcha's on the forms
- [ ] use
- [ ] add prisma seed command to create `system` and `anonymous` users
- [ ] separate HTTP API handlers from true handlers
- [ ] add unit and integration tests
- [ ] use <https://codecrumbs.io/> and/or <https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor> to make nice documentation of the API routes
- [ ] require users to verify their email before continuing
- [ ] implement single file server endpoint GET/POST/LIST/DELETE. Gracefully don't show files that the user doesn't have access to.
- [ ] add captcha to create account
- [ ] obtain API keys to authenticate with Google, Facebook, etc. and enable third-party authentication
- [ ] add a client-side dashboard
- [ ] use `next/Link` instead of `mui/link` to pre-cache pages
- [ ] completely stop using user.username and user.name except in natural language greetings and non-auth logic
- [ ] add top-level comments to all API routes and maybe also to pages

TODO: Maybe make sidebar have two tabs:

- show all files: then users open individual files with a default or user-specified file viewer
- show all projects: then users open individual projects with

TODO: make tabbed-interface for main content

I stopped off in `permissions.js:120` to get the server ready for demo.
