# Multilayer Network Dashboard

**NOTE: I have written this README using declarative sentences as it might appear when published. However much of the actual code is not implemented yet.**

## Getting Started

1. Clone this repository and install the dependencies:

```bash
git clone TODO
npm install
```

_NOTE: this server will ultimately depend on other MLN-graphing tools that are not included in this repository._

2. Update the `.env.local` file:

- replace the value for JWT_SECRET with a new random secret. (# Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32)

- follow the URLs to get your own API_KEY's and SECRETS for google, github, etc. authentication providers

3. Run the server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

Please see the `/docs` directory for documentation.

## Contributing & Development

Please read through the documentation before contributing. If you have any questions, please contact me.

This afternoon:

1. use mantine to make the newUser, verifyRequest, error, signin, signout pages in `[..nextauth].js` (https://simplernerd.com/next-auth-callbackurl/)
2. make graphql server schema, endpoint, and resolvers
3. make prisma schema and other architecture changes
4. finalize backend documentation

Known TODO's:

[ ] use
[ ] add prisma seed command to create `system` and `anonymous` users
[ ] separate HTTP API handlers from true handlers
[ ] add unit and integration tests
[ ] use https://codecrumbs.io/ and/or https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor to make nice documentation of the API routes
[ ] require users to verify their email before continuing
[ ] implement single file server endpoint GET/POST/LIST/DELETE. Gracefully don't show files that the user doesn't have access to.
[ ] add captcha to create account
[ ] obtain API keys to authenticate with Google, Facebook, etc. and enable third-party authentication
[ ] add a client-side dashboard
[ ] use `next/Link` instead of `mui/link` to pre-cache pages
[ ] completely stop using user.username and user.name except in natural language greetings and non-auth logic
[ ] add top-level comments to all API routes and maybe also to pages

TODO: Maybe make sidebar have two tabs:

- show all files: then users open individual files with a default or user-specified file viewer
- show all projects: then users open individual projects with

TODO: make tabbed-interface for main content
