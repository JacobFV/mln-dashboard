// The server is parametrized here to make it easier for
// others to use it as a template.
import {
  BrandTwitter,
  BrandYoutube,
  BrandInstagram,
  BrandGithub,
  BrandMedium,
  BrandLinkedin,
  BrandFacebook,
} from "tabler-icons-react";


// Please fill in the following variables:
export const verfCodeExpiration = 60 * 60 * 24; // 24 hours
export const verfCodeLength = 6;
export const verfCodeAlphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const verfCodeRegex = new RegExp(`[A-Za-z0-9]${verfCodeLength}`);
export const verfCodeExample = "ABC123";
export const verfCodeExplanation = `The verification code must be ${verfCodeLength} characters long and only use capital or lowercase alphanumeric characters.`;

export const appname = "MLN Dashboard";
export const publicDomain = "https://mln-dashboard.net"; // the domain that will be used when the app goes online. Also used for email domains. This variable is used wherever the 'actual' URL is not needed such as in email addresses.
export const baseurlWithoutPort = "http://localhost"; // change this out at deploy time to bangkok.uta.edu:443 or wherever
export const webPort = 3000; // change to 80 or 443 (recommended) when deploying to production
export const graphqlPort = 4000; // assign to whatever port you want
export const baseurl = `${baseurlWithoutPort}:{web_port}`;
export const graphqlEndpoint = `${baseurlWithoutPort}:{graphql_port}`;

export const version = "0.0.1";
export const SEODescription = "";

export const helloEmail = `hello@${publicDomain}`;
export const noreplyEmail = `noreply@${publicDomain}`;
export const supportEmail = `support@${publicDomain}`;
export const exampleEmail = `example@${publicDomain}`; // fallback in case other emails are undefined. do not delete

export const pages = {
  admin: {},
  auth: {
    createAccount: "/auth/create-account",
    error: "/auth/error",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    profile: "/auth/profile",
    verify: "/auth/verify", // for users and emails
  },
  about: {
    index: "/about",
    contact: "/about/contact",
    policy: {
      dataDeletion: "/about/policy/data-deletion",
      privacyPolicy: "/about/policy/privacy-policy",
      termsOfService: "/about/policy/terms-of-service",
    },
  },
  learn: {
    index: "/learn",
  },
  404: "/404",
  500: "/500",
  error: "/error",
  gallery: "/app/gallery",
  index: "/",
};

export { default as appLogoSVG } from "../../public/favicon.svg";
export { default as appLogoIcon } from "../../public/favicon.ico";
export { default as appLogoPNG } from "../../public/favicon2x.png";

// social accounts
// icons should conform to the `Icon` type in `tabler-icon-react`
export const socialAccounts = [
  {
    name: "Github",
    icon: BrandGithub,
    url: "https://github.com/YOUR_USERNAME",
  },
  /*{
    name: "Youtube",
    icon: BrandYoutube,
    url: "https://youtube.com/YOUR_USERNAME",
  },
  {
    name: "Facebook",
    icon: BrandFacebook,
    url: "https://facebook.com/YOUR_USERNAME",
  },
  {
    name: "Twitter",
    icon: BrandTwitter,
    url: "https://twitter.com/YOUR_USERNAME",
  },
  {
    name: "Instagram",
    icon: BrandInstagram,
    url: "https://instagram.com/YOUR_USERNAME",
  },
  {
    name: "LinkedIn",
    icon: BrandLinkedin,
    url: "https://linkedin.com/YOUR_USERNAME",
  },
  {
    name: "Medium",
    icon: BrandMedium,
    url: "https://medium.com/YOUR_USERNAME",
  },*/
];
