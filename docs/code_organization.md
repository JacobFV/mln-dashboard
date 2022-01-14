# Code Organization

```
├── docs: documentation for us, future developers, and the community
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
│   ├── public: static web resources
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

When I write filenames, they are relative to this repository root or the `/src` directory; but not the operating system's root unless explicitly stated.
