/**
 * @fileoverview Helper functions for file authorization
 * See /pages/api/fs/permissions for more details
 */

import fs from 'fs'
import pathLib from 'path'
import Permissions from '../common/types/permissions'

// TODO: create instance of json_db
// TODO: keep all functions here

class FileAuthorizationHelper {

  private table: {[path: string]: Permissions} = this.load()

  /**
   * Indicates if a filepath is not malicious. For our purposes, this means the path
   * - doesn't go up a directory (doesn't contain '..')
   * - is an absolute path (starts with '/')
   * - doesn't contain non-printable characters (/[^\x20-\x7E]/)
   *
   * @param path The path to check.
   * @returns True if the path is not malicious, false otherwise.
   */
  isSanitized(path: string): boolean {
    return path.startsWith('/') && 
          !path.split('/').includes('..') &&
          !/[^\x20-\x7E]/.test(path)
  }

  /**
   * Returns the explicit AND inherited permissions for a file or directory.
   *
   * @param {string} path - The path to the file or directory.
   *
   * @returns {Permissions} - The explicit and inherited permissions for the file or directory.
   */
  getPermissions(path: string): Permissions {
    let readPermissions: {[uid: string]: boolean} = {}
    let writePermissions: {[uid: string]: boolean} = {}
    let editPermissionsPermissions: {[uid: string]: boolean} = {}
    let owner: string|undefined = undefined

    // going from least to most specific path
    // this means I can simply override permissions going up the tree to its leaves
    const pathList: string[] = path.split('/')
    for(let i = 0; i < pathList.length; i++) {
      let currentPath = pathList.slice(0, i + 1).join('/')
      if(this.table[currentPath] !== undefined) {
        let permissions = this.table[currentPath]!
        owner = this.table[currentPath].owner !== undefined ? permissions.owner : owner
        Object.entries(permissions.read).forEach(([uid, read]) => {
          readPermissions[uid] = read !== undefined ? read : readPermissions[uid]
        })
        Object.entries(permissions.write).forEach(([uid, write]) => {
          writePermissions[uid] = write !== undefined ? write : writePermissions[uid]
        })
        Object.entries(permissions.editPermissions).forEach(([uid, editPermissions]) => {
          editPermissionsPermissions[uid] = editPermissions !== undefined ? editPermissions : editPermissionsPermissions[uid]
        })
      }
    }

    return {
      read: readPermissions,
      write: writePermissions,
      editPermissions: editPermissionsPermissions,
      owner: owner
    }
  }

  /**
  * Set explicit permissions for a user on a file or directory.
  * This function assumes that you have have permissions to edit the permissions of the file or directory.
  *
  * @param {string} path - The path to the file or directory.
  * @param {Permissions} permissionsChange - Permissions to change. Set undefined on a property
  *                                                   to make it get inherited.
  * @returns {boolean} - True if the operation succeeded, raises an error otherwise.
  */
  setExplicitPermissions(path: string, permissionsChange: Permissions): boolean {

    if(this.table[path] !== undefined) {
      this.table[path] = {
        read: {},
        write: {},
        editPermissions: {},
        owner: undefined
      }
    }

    // add explicit read, write, and editPermissions permissions
    this.table[path]!.read = {...this.table[path]!.read, ...permissionsChange.read}
    this.table[path]!.write = {...this.table[path]!.write, ...permissionsChange.write}
    this.table[path]!.editPermissions = {...this.table[path]!.editPermissions, ...permissionsChange.editPermissions}

    // assign owner
    this.table[path]!.owner = permissionsChange.owner
    // maybe let owner be inherited?
    let inheritedOwner = this.getPermissions(path).owner
    if(this.table[path]!.owner === inheritedOwner) {
      this.table[path]!.owner = undefined
    }

    this.pruneSinglePermissions(path)
    this.save()

    return true
  }

  /**
  * Removes all explicit permissions for a file or directory.
  * If the path leads to a directory, all permissions for child files and dirs in the directory are also removed.
  * Used after deleting the file or directory at `path`.
  *
  * @param {string} path - The path to the file or directory.
  * @returns {boolean} - True if the operation succeeded, raises an error otherwise.
  */
  removeAllPermissionsForPath(path: string): boolean {
    delete this.table[path]
    if(path.endsWith('/')) {
      // remove permissions for all children
      for(let key in this.table) {
        if(key.startsWith(path)) {
          delete this.table[key]
        }
      }
      this.save()
    }

    return true
  }


  /**
   * Removes all permissions on all files and directories for a user.
   * This method is used when a user is deleted since we don't want to
   * keep permissions for deleted users around.
   *
   * @param uid - The user id to remove permissions for.
   * @returns {boolean} - True if the operation succeeded, raises an error otherwise.
   */
  removeAllPermissionsForUser(uid: string): boolean {
    for(let key in this.table) {
      // early exit: the deleted user is the owner of the file
      // in this case, nobody should have access anymore
      if(this.table[key].owner === uid) {
        delete this.table[key]
        continue
      }
      delete this.table[key].read[uid]
      delete this.table[key].write[uid]
      delete this.table[key].editPermissions[uid]
    }

    this.save()
    return true
  }

  /**
   * delete permissions record if completely undefined (i.e.: inherited)
   */
  private pruneSinglePermissions(path: string): void {
    if(Object.keys(this.table[path]!.read).length === 0 &&
      Object.keys(this.table[path]!.write).length === 0 &&
      Object.keys(this.table[path]!.editPermissions).length === 0 &&
      this.table[path]!.owner === undefined) {
      delete this.table[path]
    }
  }

  private load() {
    const data = fs.readFileSync(pathLib.resolve('db/file_authorization.json'), 'utf-8')
    return JSON.parse(data)
  }

  private save() {
    fs.writeFileSync(pathLib.resolve('db/file_authorization.json'),
      JSON.stringify(this.table, null, 4))
  }
}

export const fileAuthorizationHelper = new FileAuthorizationHelper()