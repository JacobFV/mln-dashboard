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

export const appname = "MLN Dashboard";
export const version = "0.0.1";
export const description = "";
export const publicDomain = "https://mln-dashboard.net"; // the domain that will be used when the app goes online. Also used for email domains
export const baseurl = "http://localhost:3000"; // change this out at deploy time to bangkok.uta.edu:443 or wherever
export const noreplyEmail = `noreply@${publicDomain}`;
export const supportEmail = `support@${publicDomain}`;

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
