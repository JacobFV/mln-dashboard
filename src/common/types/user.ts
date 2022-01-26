import appinfo from "../misc/appInfo";

export interface User {
  uid: string
  username: string
  email: string
  password: string|undefined
  hash: string|undefined
  dateCreated: string
  dateLastLogin: string|undefined
  verificationCode: string|undefined
  verified: boolean
  dateVerified: string|undefined
  deleted: boolean
}

// used for people who aren't signed in
export const Anonymous: User = {
  uid: 'u-anonymous',
  username: 'Anonymous',
  email: `anonymous@${appinfo.publicDomain}`,
  password: undefined,
  hash: undefined,
  dateCreated: '',
  dateLastLogin: undefined,
  verificationCode: '',
  verified: false,
  dateVerified: undefined,
  deleted: false
}

// used for special cases (like owning the root storage directory)
export const Nobody: User = {
  uid: 'u-nobody',
  username: 'Nobody',
  email: `nobody@${appinfo.publicDomain}`,
  password: undefined,
  hash: undefined,
  dateCreated: '',
  dateLastLogin: undefined,
  verificationCode: '',
  verified: false,
  dateVerified: undefined,
  deleted: false
}

/*export function makeFullUser(user: Partial<User>): User|undefined {
  if (!user) return undefined
  if (user.id && user.name && user.email && user.password
      && user.dateCreated && user.dateUpdated) {
    return user as User
  }
  return undefined
}*/