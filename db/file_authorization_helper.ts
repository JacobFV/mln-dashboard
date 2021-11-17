const fs = require('fs')
const path = require('path')

import { User } from "../common/types/user";


export interface Permission {
  read: boolean,
  write: boolean,
  admin: boolean  // admin means rename, delete, manage sharing, etc.
}


class FileAuthorizationHelper {

  private table: Map<string, Map<number, Permission>> = this.load()

  isSanitized(path: string): boolean {
    return true // TODO: implement
    // copilot recommended path.replace(/\/+/g, '/') but I don't know what that does
    // it may be better to raise an error if the path is invalid that way we can detect hackers easier
  }

  getPermissions(path: string, id: string): Permission {
    // TODO: implement
    // This function shouldn't just look for exact path matches, but
    // it should look for the closest parent directory that has a
    // permissions entry.
    return {
      read: true,
      write: true,
      admin: true
    }
  }

  /*
  * Set permissions for a user on a file or directory.
  * This function assumes that you have already checked to make sure
  * that the user has the permissions to set the permissions.
  *
  * @param {string} path - The path to the file or directory.
  * @param {string} id - The id of the user. Use Anonymous.id for anonymous users.
  * @param {Permission|undefined} permissions - The permissions to set. undefined means remove permissions.
  * @returns {boolean} - True if the operation succeeded, raises an error otherwise.
  */
  setPermissions(path: string, id: number, permissions: Permission|undefined): boolean {
    
    if(!this.table.has(path)) {
      this.table.set(path, new Map())
    }

    if(permissions) {
      this.table.get(path)!.set(id, permissions)
    } else {
      this.table.get(path)!.delete(id)
    }

    if(this.table.get(path)!.size === 0) {
      this.table.delete(path)
    }

    this.save()

    return true
  }

  /*
  * Remoevs all permissions for a file or directory.
  *
  * @param {string} path - The path to the file or directory.
  * @returns {boolean} - True if the oepration succeeded, raises an error otherwise.
  */
  removeAllPermissionsForPath(path: string): boolean {
    if(this.table.has(path)) {
      this.table.delete(path)
    }

    this.save()
    return true
  }


  removeAllPermissionsForUser(id: number): boolean {
    for(let [path, permissionsMap] of this.table) {
      permissionsMap.delete(id)
    }

    this.save()
    return true
  }

  private load() {
    return JSON.parse(fs.readFileSync(path.resolve('db/file_authorization.json')).toString())
  }

  private save() {
    fs.writeFileSync(path.resolve('db/file_authorization.json'), 
      JSON.stringify(this.table, null, 4))
  }
}

export const fileAuthorizationHelper = new FileAuthorizationHelper()