type Node = {
  guid: string // guid should be immutable and structured as "domain:id"
}

type Entity = Node & {
  createdAt: Date
  updatedAt: Date;
  name: string
  picture: string // url to profile picture. might be served from this server or elsewhere
}
export type Group = Entity & {
  // groups also have their own storage folder
  readonly createdAt: Date
  ownerGuid: string
  memberGuids: string[]
}
type User = Entity & {
  email: string
  otherEmails: [string]
  group_guids: string[]
  dateOfBirth: Date! // policy purposes only
  loginAttempts: [{
    token: string
    date: Date
    sucess: boolean
  }]
  passwordHash?: string
  resetPasswordToken?: string // short alphanumeric code
  resetPasswordTokenExpiration?: Date
  verificationNeeded?: boolean // if true, the user needs to verify their email address before logging in with password authentication
  verificationCode?: string // short alphanumeric code
  verificationCodeExpiration?: Date
}
export enum PermissionLevel { NONE, READ, WRITE, ADMIN, OWNER }
export type FilePermissions = {
  permissionsMap: {[userGuid: string]: PermissionLevel}
}
type App {
  name: String,
  description: String,
  version: String,
  invocation_template: String, // eg. `node ./index.js $arg1 --arg2 $arg3`
  inputs: {
    [name: string]: {
      type: Type,
      description: string,
      required: boolean,
      default: any,
    },
  },
  outputs: {
    [name: string]: {
      type: Type,
      description: string,
    },
  },
}
db {
  users: [User!]!
  organizations: [Organization!]!
  filePermissions: [String: FilePermission!]! // key is filepath
  // there is no persistent data for files; we use the OS filesystem instead!
  apps: [App!]!
}