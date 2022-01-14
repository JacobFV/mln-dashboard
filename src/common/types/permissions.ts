/**
 * @fileoverview Type definition for file permissions
 * See /pages/api/fs/permissions for more details
 */

export default interface Permissions {
  read: {[uid: string]: boolean},
  write: {[uid: string]: boolean},
  editPermissions: {[uid: string]: boolean},
  owner: string|undefined,
}