import { useQuery, gql } from "@apollo/client";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { User } from "../models/[...models]";

export class GetUserProps {
  redirectToLoginPage: boolean = false;
  redirectToVerifyPage: boolean = true;
  checkVerified: boolean = true;
  undefinedIfNotVerified: boolean = false;
  queryUser: boolean = false;
  extraUserKeys: object[] = [];
}

/**
 * Get the current user from the JWT and runs appropriate auth logic.
 * @NOTE this function should be called from the client only.
 * @param redirectToLoginPage {boolean} - if true, redirect to login page if user is not logged in. Setting this to true is useful when you want the function to make a best effort at returning an authenticated user object even if the user is not logged in yet.
 * @param redirectToVerifyPage {boolean} - if true, redirect to verify page if user is not verified. Note, setting this method to true incurs database read delays.
 * @param checkVerified {boolean} - if true, check if the user is verified.
 * @param undefinedIfNotVerified {boolean} - if true, return undefined if the user is not verified.
 * @param queryUser {boolean} - if true, query the user from the database. Always true if checkVerified is true.
 * @param extraUserKeys {object} - Any extra keys to query along with the `verified` user key (if applicable.)
 * @returns {User} - An object containing the user object if the user is logged in, otherwise null and a loading indicator. Note: this function might have redirected the user to the login or verify page and then returned after an indefinite amount of time.
 */
export default function getUser(props: GetUserProps): {
  user: User | undefined;
  loading: boolean;
} {
  // TODO: somehow artificially set cwd path
  // because this function works whenever it's
  // called in a `/page/[...page]` route but not
  // in this file
  // Maybe place this code in _app.jsx
  const { data: session, status: status } = useSession();

  if (status == "loading" || !session || !session.user) {
    // not logged in
    if (props.redirectToLoginPage) {
      // make best effort at getting an authenticated user object
      Router.push("/account/login");
      return getUser(props);
    } else {
      return { user: undefined, loading: false };
    }
  }

  // logged in
  let user = session.user as User;

  if (
    props.queryUser ||
    props.checkVerified ||
    props.extraUserKeys.length > 0
  ) {
    // TODO: cache results for each key combination,
    // similar to how useSession doesn't perform a GET on each call
    const { loading, error, data } = useQuery(
      gql`query userByEmail($email: String!) {
        ${props.extraUserKeys.concat(["verified"]).join("\n")}
      }`,
      { variables: { email: user.email } }
    );
    if (loading) {
      return { user: undefined, loading: true };
    }
    if (error) {
      console.error(error);
      return { user: undefined, loading: false };
    }
    user = { user, ...data.user };
  }
  if (props.checkVerified) {
    // check if redirection is even necessary
    if (!user.verified) {
      if (props.redirectToVerifyPage) {
        // make best effort at getting a verified user object
        Router.push("/account/verify");
        return getUser(props);
      } else {
        // user is not verified
        if (props.undefinedIfNotVerified) {
          return { user: undefined, loading: false };
        }
      }
    }
  }

  // TODO: somehow get a message queue for the user
  // like "Welcome to appname!"

  return { user: user, loading: false };
}
