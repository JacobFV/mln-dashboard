# Getting Started

## Requirements

- **Install node.js and npm**. This server was developed and tested using the node.js v16.13.1 and npm 8.1.2 writing. Follow the directions at [this link](https://nodejs.org/en/download/) to install node.js and npm.

## Installation

1. Clone this repository and install the dependencies:

    ```bash
    git clone https://github.com/JacobFV/mln-dashboard.git
    cd  mln-dashboard
    npm install
    ```

2. Next, rename `.env.example` to `.env`. Then follow the directions included as comments in `.env` to set up your environment. Most of these variables are required for the application to run. If you do not want to use one of the auth providers, you will need to comment it out in the `/src/pages/api/auth/[...nextauth].js` file.

3. Initialize the database by 1) chainging `"isolatedModules": true` to `"isolatedModules": false` in `tsconfig.json` and then 2) running `npx prisma migrate dev --name init`. Make sure you see the console display `seeding database` so you know that the database is working. You can inspect the database by running `npx prisma studio`.

4. You should now be able to run the application by running `npm run dev`. Click on the URL shown in the terminal to get started!

## Getting Help

- Before you start programming, I recommend setting aside an hour to read [this guide](https://nextjs.org/learn/foundations/from-javascript-to-react), [this guide](https://nextjs.org/learn/foundations/from-react-to-nextjs), and [this guide](https://nextjs.org/learn/foundations/how-nextjs-works).

- Make sure you can get the server running before you make any changes to the code.

- Prisma Studio is your friend. Run `npx prisma studio` to see what the database looks like.

- If you are using VS Code, you can enjoy break-point debugging within your IDE by debugging with either the `Next.js: debug server-side` or `Next.js: debug full stack` configurations.

- Also, I recommend the "Nature Rainbow Dark" color scheme with the Next.JS extension pack for VS Code. Combined, they make a really fun developer experience.

- [Sign up](https://github.com/features/copilot/signup) for Github CoPilot if you haven't already. (Click the link for a 5 second intro.) I've found that copilot makes it easy to jump into new languages and frameworks.

- If you are stuck, please contact me at `jacobfv123 [at] gmail [dot] com`.
