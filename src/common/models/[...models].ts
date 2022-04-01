/* @fileoverview Type definitions shared by the client and server
 *
 * This file does not always align with the database schema.
 *
 * Client-side types intentionally possess only a subset of the
 * attributes defined in the database schema. For example, there is no reason
 * that the client should view `User.password_hash` so it is not defined on the
 * client side `User` type. Also, many of the types are ego-centric. For example,
 * there is no `user_id` on `LoginAttempt` because it always belongs to the user
 * who is logging in.
 */

/// only visible by the user it belongs to
export interface Email {
  address: string;
  verified: boolean;
  verificationCodeActive: boolean;
  verificationCodeSentOn: Date;
  primary: boolean;
}

export enum PermissionLevel {
  HIDDEN = "HIDDEN",
  READ = "READ",
  WRITE = "WRITE",
  ADMIN = "ADMIN",
  OWNER = "OWNER",
}

export interface ExplicitPermission {
  id: string; // admins
  path: string; // admins and recipients of the permission
  appliesToEntityId: string; // admins and recipients of the permission
  permissionLevel: PermissionLevel; // admins and recipients of the permission
  createdOn: Date; // admins
  createdByUserId: string; // admins
}

/// only visible by the user it belongs to
export interface LoginAttempt {
  ip: string;
  userAgent: string;
  headers: string;
  timestamp: Date;
  email: string;
  success: boolean;
}

/// see subtypes for visibility rules
export interface Entity {
  name: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
  memberOfGroupIds: string[];
  explicitlyGrantedPermissions: ExplicitPermission[];
}

export interface LiteUser {
  name: string;
  email: string;
  image: string;
}

export interface User extends Entity {
  id: string; // public
  name: string; // public
  picture: string; // public
  createdAt: Date; // private
  updatedAt: Date; // private
  memberOfGroupIds: string[]; // public
  explicitlyGrantedPermissions?: ExplicitPermission[]; // private
  emails?: Email[]; // private
  loginAttempts?: LoginAttempt[]; // private
  ownerOfGroups?: Group[]; // private
  groupJoinDates?: Map<Date, Group>; // private
  explicitPermissionsCreated?: ExplicitPermission[]; // private
}

export interface Group extends Entity {
  id: string; // public
  ownerId: string; // public
  memberIds: string[]; // public
  name: string; // public
  picture: string; // public
  createdAt: Date; // members
  updatedAt: Date; // members
  memberOfGroupIds: string[]; // public
  explicitlyGrantedPermissions: ExplicitPermission[]; // members
}
