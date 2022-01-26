# Code Organization

```
├── docs: documentation for us, future developers, and the community
├── public: static web resources. nextjs requires this to be in the root
├── research: some papers that might be relevant for the project
├── src
│   ├── apps: backend applications that the server interfaces with
│   ├── common: code shared by both the frontend and backend
│   |   ├── misc: miscellaneous code that doesn't fit anywhere else
│   |   ├── types: types that are used by multiple files including the database
│   |   ├── utils: utility functions that are used by multiple files
│   |   └── ...
│   ├── components: ReactJS components which are included in pages
│   ├── db: JSON files for storing persistent data and their schemas
│   ├── pages: next.js pages and api endpoints
│   ├── server: server-side-only code shared by API endpoints
│   └── styles: stylesheets
├── storage: user-segmented storage
├── README: basic information (eg. getting started)
├── LICENSE: MIT License
├── .env.local: environment variables (not in git)
├── .env.local.example: empty environment variables file
├── .next: next.js-compiled app
└── ...developer files (vscode, git, npm)
```

I'm trying (want) to adhere to Google's [JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html).

- Use camelCase for variable names and modularized css classes
- Use `const` wherever possible
- Include jsdoc comments for each function/class/etc.

I also want to use [codecrumbs](https://codecrumbs.io/) and/or [js-code-to-svg-flowchart](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor) to make visual documentation of the server logic.

When I write filenames, they are relative to this repository root or the `/src` directory; They are not relative to the operating system's root unless explicitly stated.

The overall repo should be versionless, but API endpoints are a necesary exception (since who wants to dig out and update all their old client-side javascript?). API endpoints are versioned by major releases. Following GitHUb's recommendations, minor changes should retain backwards compatibility. Currently, the API is on `v1`.

When you run `npm run dev`, you are starting a node.js process (the nextjs server) which serves the pages located in the `/pages` directory. (If you're working in vscode, you can select the `Next.js: debug server-side` or `Next.js: debug full stack` options to enjoy break-point debugging inside the vscode IDE.) Basically, what's going on is that whenever the server recieves an HTTP request for a page with the path `/path/to/somewhere`, it executes the default exported javascript function located in `/pages/path/to/somewhere.js`. This function is either 1) generates an HTML page possibly using react, or 2) performs some server-side datafetching, update, or action and returns a JSON response. While it is possible to perform server-side rendering with this approach, we really should try to decouple the HTML server from the persistent backend. Not only does this minimize TTL latency but it also allows webpages to be statically rendered to HTML and cached on the server, CDN, or client.
