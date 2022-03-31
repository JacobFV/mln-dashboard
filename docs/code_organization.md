# Code Organization

Here are the major files and directories:

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

I'm (kind of) adhering to Google's [JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html):

- Use camelCase for variable names and modularized css classes
- Use `const` wherever possible
- Include jsdoc comments for each function/class/etc.

I don't have hard rules on formatting (indentation level, tab vs. space, max length, etc.) yet. Just be reasonable.

## Documentation

I want to use [codecrumbs](https://codecrumbs.io/) and/or [js-code-to-svg-flowchart](https://bogdan-lyashenko.github.io/js-code-to-svg-flowchart/docs/live-editor) to make visual documentation of the server logic.

Unless otherwise specified, filenames are relative to this repository's root or the `/src` directory; `/` does NOT indicate that a path is relative to the operating system's root.

The overall repo should be versionless, but API endpoints are a necessary exception (since who wants to dig out and update all their old client-side javascript?). API endpoints are versioned by major releases. Following GitHUb's recommendations, minor changes should retain backwards compatibility. Currently, the API is on `v1`. Once I reach a stable alpha, I will move the contents of `/src/pages/api` to `/src/pages/api/v1`.

## Tests

Tests are placed in the `/test` subdirectory and performed using `mocha`. This section will be expanded once I start using tests.
