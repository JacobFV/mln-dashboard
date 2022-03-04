/* @fileoverview Type definitions for types that the client needs to know about.
 *
 * This file should be kept in sync with `src/prisma/schema.prisma`
 * However client-side types intentionally possess only a subset of the
 * attributes defined in the database schema. For example, there is no reason
 * that the client should view `User.password_hash` so it is not defined on the
 * client side `User` type. Also, many of the types are ego-centric. For example,
 * there is no `user_id` on `LoginAttempt` because it always belongs to the user
 * who is logging in.
*/

import 'reflect-metadata'
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql'
import { IsDate, IsEmail } from 'class-validator'

/// only visible by the user it belongs to
@ObjectType()
export class Email {
  @Field() email: string
  @Field() verified: boolean
  @Field() verificationCodeActive: boolean
  @Field((type) => [Date], { nullable: true }) verificationCodeSentOn: Date | null
  @Field() primary: boolean
}

export enum PermissionLevel {
  Hidden = "HIDDEN",
  Read = 'READ',
  Write = 'WRITE',
  Admin = 'ADMIN',
}
registerEnumType(PermissionLevel, {
  name: 'PermissionLevel',
  description: 'The level of permission a user has on a filesystem entity.',
}

@ObjectType()
export class ExplicitPermission {
  @Field(() => ID) id: string  // admins
  @Field() path: string  // admins and recipients of the permission
  @Field((type) => User) appliesToEntity: User  // admins and recipients of the permission
  @Field((type) => PermissionLevel) permissionLevel: PermissionLevel  // admins and recipients of the permission
  @Field() @IsDate() createdOn: Date  // admins
  @Field((type) => User) createdByUser: User  // admins
}

/// only visible by the user it belongs to
export class LoginAttempt {
  @Field() ip: string
  @Field() userAgent: string
  @Field() headers: string
  @Field() @IsDate() timestamp: Date
  @Field() email: string
  @Field() success: boolean
}

/// see subtypes for visibility rules
@ObjectType()
export class Entity {
  @Field() name: string
  @Field() picture: string
  @Field() @IsDate() createdAt: Date
  @Field() @IsDate() updatedAt: Date
  @Field((type) => Group) memberOfGroup: Group[]
  @Field((type) => [ExplicitPermission]) explicitlyGrantedPermissions: ExplicitPermission[]
}

export class User implements Entity {
  @Field(() => ID) id: string  // public
  @Field() name: string  // public
  @Field() picture: string  // public
  @Field() @IsDate() createdAt: Date  // private
  @Field() @IsDate() updatedAt: Date  // private
  @Field((type) => [Group]) memberOfGroup: Group[]  // public
  @Field((type) => [ExplicitPermission]) explicitlyGrantedPermissions: ExplicitPermission[]  // private
  @Field((type) => [Email]) emails: Email[]  // private
  @Field((type) => [LoginAttempt]) loginAttempts: LoginAttempt[]  // private
  @Field((type) => [Group]) ownerOfGroups: Group[]  // public
  @Field((type) => [ExplicitPermission]) explicitPermissionsCreated: ExplicitPermission[]  // private
}

export class Group implements Entity {
  @Field(() => ID) id: string  // public
  @Field((type) => User) owner: User  // public
  @Field((type) => [Entity]) members: Entity[]  // public
  @Field() @IsDate() groupJoinDate: Date // only visible to the nearest ancestor user in the query
  @Field() name: string  // public
  @Field() picture: string  // public
  @Field() @IsDate() createdAt: Date  // members
  @Field() @IsDate() updatedAt: Date  // members
  @Field((type) => [Group]) memberOfGroup: Group[]  // public
  @Field((type) => [ExplicitPermission]) explicitlyGrantedPermissions: ExplicitPermission[]  // members
}