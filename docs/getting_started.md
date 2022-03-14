# Getting Started

1. Clone this repository and install the dependencies:

    ```bash
    git clone https://github.com/JacobFV/mln-dashboard.git
    cd  mln-dashboard
    npm install
    ```

2. Next, rename `.env.example` to `.env`. Then follow the directions included as comments in `.env` to set up your environment. Most of these variables are required for the application to run.

3. Create the database by running `npx prisma migrate dev --name init`. Make sure you see the console display `seeding database` so you know that the database is working.

4. You should now be able to run the application by running `npm run dev`. Click on the URL shown in the terminal to get started!

5. If you are using VS Code, you can enjoy break-point debugging within your IDE by debugging the `Next.js: debug server-side` or `Next.js: debug full stack` configurations.
