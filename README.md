# Multilayer Network Dashboard

**NOTE: I have written this README using declarative sentences as it might appear when published. However much of the actual code is not implemented yet.**

## Getting Started

Clone this repository and install the dependencies:
```bash
git clone TODO
npm install
```

NOTE: this server depends on other MLN-graphing tools that are not included in this repository. We will be adding them later.

Copy the `.env.local` file to your project root and replace the value for JWT_SECRET with a new secret. (# Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32)

Then, run the server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Development

This project is organized by
```
├── src
│   ├── apps: applications that the server interfaces with
│   ├── common: common functions to both frontend and backend
│   ├── components: ReactJS components which are included in pages
│   ├── data: JSON files for storing auth data
│   ├── pages: routable next.js pages and api endpoints
│   ├── public: static files
│   ├── server: server-side-only code
│   ├── storage: user-segmented storage
│   └── styles: stylesheets
├─ README: documentation for internal and (future) anaymous developers
├─ LICENSE: MIT License 
├─ ...staticly compiled files and directories
├─ ...npm stuff
└─ ...github stuff
```

### Client

Known TODO's:
[ ] use/develop middleware to wrap all requests that require authentication
[ ] implement single file server endpoint GET/POST/LIST/DELETE
[ ] add a client-side dashboard
[ ] use `next/Link` instead of `mui/link` to precache pages
[ ] make sure the users verify their email before usering
[ ] enable third-party authentication
[ ] rename `User.username` to `User.name`

### Frontend 

Pages are defined in `pages/` directory and written in ReactJS (mostly typescript). I used the material-ui library for user interface design because its components provide a strong starting point to meet user expectations on both desktop and mobile, different screen sizes, and with accessibility requirements.

### Backend

The javscript backend component of the server is managed by nextjs. [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`. The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Some API routes will be used to perform application-logic like graph generation, visualization, and data retrieval. The next.js server API routes for those application-specific functions simply provide an interface to other backend programs (python scripts, databases, etc.) which perform necesary logic. The `next.js` server can directly launch new processes or communicate with existing ones. 

### Security

I suggest we containerize all application logic processes in docker containers. We should also containerize the server. Then we should periodically (maybe every night) restart all the containers to make sure they are healthy. 

I think the JWT_SECRET environment variable (`.env.local`) should be regenerated every time the server is restarted.