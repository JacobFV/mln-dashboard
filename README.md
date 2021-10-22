# Multilayer Network Dashboard

Nile & David: I will have a QT-demo ready by the meeting Friday

## Getting Started

First, install the node packages:
```bash
npm install
```

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
│   ├── common: common functions and data
│   ├── components: useful ReactJS components
│   ├── pages: next ReactJS pages
│   ├── public: static files
│   ├── styles: stylesheets
│   ├── server_js: server-side code (javascript)
|   └── server_py: server-side code (python)
├─ README: documentation for internal and (future) anaymous developers
├─ LICENSE: MIT License 
├─ ...staticly compiled files and directories
├─ ...npm stuff
└─ ...github stuff
```

### Client

TODO:
[ ] add a client-side dashboard
[ ] use `next/Link` instead of `mui/link` to precache pages

### Frontend

Pages are defined in `pages/` directory and written in ReactJS (mostly typescript).

### Backend server

We haven't decided yet how to handle the backend server.

**TODO**. Explain and justify graphQL is used as the interface for all backend API calls.
- flexible to data. show how python data is effortlessly serialized and reconstructed.
- flexible to growth. explain how it can be grown
- flexible to platform. find python and nodejs solutions.

#### javascript

The javscript backend component of the server is managed by nextjs. [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`. The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

#### Python

Nothing yet.