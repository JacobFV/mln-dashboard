export const verfCodeExpiration = 60 * 60 * 24 // 24 hours
export const verfCodeLength = 6
export const verfCodeAlphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
export const verfCodeRegex = new RegExp(`[A-Za-z0-9]${verfCodeLength}`)

export const appname = 'MLN Dashboard'
export const version = '0.0.1'
export const description = ''
export const publicDomain = 'https://mln-dashboard.net'// the domain that will be used when the app goes online. Also used for email domains
export const baseurl = 'http://localhost:3000' // change this out at deploy time to bangkok.uta.edu:443 or wherever
export const noreplyEmail = `noreply@${publicDomain}`
export const supportEmail = `support@${publicDomain}`