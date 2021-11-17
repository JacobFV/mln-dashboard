import appinfo from "../misc/appInfo";

export interface User {
  id: number
  username: string
  email: string
  password: string
  dateCreated: string
  dateUpdated: string
  deleted: boolean
}

export const Anonymous: User = {
  id: 0,
  username: 'Anonymous',
  email: `anonymous@${appinfo.publicUrl}`,
  password: '',
  dateCreated: '',
  dateUpdated: '',
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