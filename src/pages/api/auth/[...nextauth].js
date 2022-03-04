import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

import { prisma } from "../../../prisma/prisma";
import createUser from "../../../server/account/createUser";
import { verfCodeExpiration } from "../../../common/constants";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    //// EmailProvider({
    ////   server: process.env.EMAIL_SERVER,
    ////   from: process.env.EMAIL_FROM,
    //// }),
    //// // Temporarily removing the Apple provider from the demo site as the
    //// // callback URL for it needs updating due to Vercel changing domains
    ////
    //// Providers.Apple({
    ////   clientId: process.env.APPLE_ID,
    ////   clientSecret: {
    ////     appleId: process.env.APPLE_ID,
    ////     teamId: process.env.APPLE_TEAM_ID,
    ////     privateKey: process.env.APPLE_PRIVATE_KEY,
    ////     keyId: process.env.APPLE_KEY_ID,
    ////   },
    //// }),
    //// */
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
    }),
    //// GoogleProvider({
    ////   clientId: process.env.GOOGLE_ID,
    ////   clientSecret: process.env.GOOGLE_SECRET,
    //// }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    //// Auth0Provider({
    ////   clientId: process.env.AUTH0_ID,
    ////   clientSecret: process.env.AUTH0_SECRET,
    ////   issuer: process.env.AUTH0_ISSUER,
    //// }),
  ],
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // user: { name, email, image } on first sign in
      // user includes uid and jwt token on later calls

      // First check if user exists in database
      const dbEmails = await prisma.email.findMany({
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (dbEmails.length === 0) {
        // If user does not exist in database,
        // Create new user (the verf code will be sent by `createUser`)
        // This case should only happen for third-party authenticated users
        // since a credential authenticated user will already have been made if it is able to sign in
        createUser({ name: user.name, email: user.email, picture: user.image });

        // redirect to the verify email page
        return "/auth/verify";
      } else if (dbEmails.length === 1) {
        // If one matching email exists, check if it needs verification
        if (dbEmails[0].needsVerification) {
          const verfCodeSentOnSeconds = new Date(
            dbEmails[0].verificationCodeSentOn
          ).getSeconds();
          const verfCodeExpiresAtSeconds =
            verfCodeSentOnSeconds + verfCodeExpiration;
          // If the verification code has expired, send a new one
          if (verfCodeSentOnSeconds > verfCodeExpiresAtSeconds) {
            sendVerificationCode(email);
          }
          // In any case, redirect to the verify email page
          return "/auth/verify";
        } else {
          // If the user exists and is already verified; sign them in
          return true;
        }
      } else {
        // If multiple matching emails exist, throw an error
        throw new Error("Multiple matching emails found");
      }
    },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
  },

  debug: true,

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {
    async signIn(message) {
      /* on successful sign in */
      console.log("signIn", JSON.stringify(message, null, 2));
    },
    async signOut(message) {
      /* on signout */
      console.log("signOut", JSON.stringify(message, null, 2));
    },
    async createUser(message) {
      /* user created */
      console.log("createUser", JSON.stringify(message, null, 2));
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
      console.log("updateUser", JSON.stringify(message, null, 2));
    },
    async linkAccount(message) {
      /* account (e.g. Twitter) linked to a user */
      console.log("linkAccount", JSON.stringify(message, null, 2));
    },
    async session(message) {
      /* session is active */
      console.log("session", JSON.stringify(message, null, 2));
    },
    async error(message) {
      /* error in authentication flow */
      console.log("error", JSON.stringify(message, null, 2));
    },
  },

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: {
    colorScheme: "auto",
    brandColor: "", // Hex color code
    logo: "", // Absolute URL to image
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
});
