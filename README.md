# Multilayer network analysis tool

Nile & David: I will have a QT-demo ready by the meeting Friday

## Getting Started

First, run the development server:

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
| README: documentation for internal and (future) anaymous developers
| LICENSE: MIT License 
| ...staticly compiled files and directories
| ...npm stuff
| ...github stuff
```

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

### Backend server

We haven't decided yet how to handle the backend server.

#### javascript

The javscript backend component of the server is managed by nextjs. [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`. The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

#### Python

