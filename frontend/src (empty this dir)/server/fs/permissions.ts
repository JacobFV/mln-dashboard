import fs from "fs";
import pathlib from "path";

import {resolve} from "./paths"
import prisma from "../../prisma/prisma";
import { ExplicitPermission } from ".prisma/client";

export enum PermissionLevel {
  HIDDEN = "HIDDEN",
  READ = "READ",
  WRITE = "WRITE",
  ADMIN = "ADMIN",
  OWNER = "OWNER",
}

/** @description: This type is used to concretely represent
 * the permissions explicitly assigned to or inherited by
 * a file system resource.
 */
export type InheritedResourcePermissions = {
  explicitlyHiddenFromIds: string[] = []
  readerIds: string[] = [] // writers should be in here
  writerIds: string[] = [] // admins should be in here
  adminIds: string[] = [] // owner should be in here
  ownerId: string
};

const ROOT_STORAGE_PERMISSIONS = {
  explicitlyHiddenFromIds: [],
  readerIds: [],
  writerIds: [],
  adminIds: [],
  ownerId: "", // TODO: make this a constant and make sure it matches with the actual fs schema
} as InheritedResourcePermissions

/**
 * @description This function is used to get the permissions of a file system resource.
 *
 * @param path {string} Path of resource under /storage to get permissions for.
 * Path should be relative to /storage.
 *
 * @returns {InheritedResourcePermissions} The permissions that are inherited 
 * by the resource under `/stoage/${path}`.
 */
export function getPermissionsLevel(path: string): InheritedResourcePermissions|undefined {
  // see if path exists
  if (!fs.existsSync(resolve(path))) {
    return undefined;
  }
  // split path/to/resource into list of subpaths (e.g. ["path", "path/to", "path/to/resource"])
  // and iteratively check for permissions on each subpath
  // follow the rule of permission inheritance specified in /docs/permissions.md
  const explicitPermissionPromises = path.split(pathlib.sep)
    .reduce((subpaths: string[], _: string, idx: number, components: string[]): string[] => {
      subpaths.push(components.slice(0, idx+1).join(pathlib.sep))
      return subpaths
    }, [])
    .map(subpath => prisma.explicitPermission.findMany({
      where: { path: subpath },
    }))
  const explicitPermissions = await Promise.all(explicitPermissionPromises)
  return explicitPermissions.reduce(
    (inheritedPermissions: InheritedResourcePermissions, explicitPermissions: ExplicitPermission[]): InheritedResourcePermissions => {
      for(const permission of explicitPermissions) {
        switch(permission.permissionLevel) {
          case PermissionLevel.HIDDEN:
            inheritedPermissions.explicitlyHiddenFromIds.push(permission.appliesToEntityId);
            inheritedPermissions.readerIds = inheritedPermissions.readerIds.filter(
              readerId => readerId != permission.appliesToEntityId);
            inheritedPermissions.writerIds = inheritedPermissions.writerIds.filter(
              readerId => readerId != permission.appliesToEntityId);
            break;
          case PermissionLevel.OWNER:
            inheritedPermissions.ownerId = permission.appliesToEntityId;
            // don't break here; owners also have admin, write, and read permissions
          case PermissionLevel.ADMIN:
            inheritedPermissions.adminIds.push(permission.appliesToEntityId);
            // don't break here; admins also have write and read permissions
          case PermissionLevel.WRITE:
            inheritedPermissions.writerIds.push(permission.appliesToEntityId);
            // don't break here; writers also have read permissions
          case PermissionLevel.READ:
            inheritedPermissions.readerIds.push(permission.appliesToEntityId);
            inheritedPermissions.explicitlyHiddenFromIds =
              inheritedPermissions.explicitlyHiddenFromIds.filter(
                explicitlyHiddenFromId => explicitlyHiddenFromId != permission.appliesToEntityId);
            break;
          default:
            throw new Error(`Invalid permission level: ${permission.permissionLevel}`);
        }
      }
      return inheritedPermissions;
    }, ROOT_STORAGE_PERMISSIONS) as InheritedResourcePermissions;
}


export function changePermissions(
  path: string,
  creatorEntityId: string,
  appliesToEntityIds: string[],
  permissionLevel: PermissionLevel,
  limitRecursively: boolean = true
) {
  // see if resource exists
  if (!fs.existsSync(resolve(path))) {
    throw new Error(`Resource ${path} does not exist`);
  }
  /* prisma will throw an error if the entityIds are not valid
    * so we don't need to check if they are valid here
  // see if creatorEntityId exists
  if(!prisma.entity.findOne({ where: { id: creatorEntityId } })) {
    throw new Error(`Entity with id ${creatorEntityId} does not exist`);
  }
  // see if appliesToEntityIds exists
  for(const entityId of appliesToEntityIds) {
    if(!prisma.entity.findOne({ where: { id: entityId } })) {
      throw new Error(`Entity with id ${entityId} does not exist`);
    }
  }*/
  // TODO I stopped off here
  // see if creatorEntity has admin rights on the resource at path
  const creatorEntity = prisma.entity.findOne({ where: { id: creatorEntityId } });
  const creatorEntityPermissions = creatorEntity.permissionsAssignedToMe;
  const creatorEntityPermission = creatorEntityPermissions.find(
    (permission) => permission.path === path
  );
  // TODO apply changes in database

  if (limitRecursively) {
    // TOOD iterate for all descendant inodes of `path`
    if(fs.lstatSync(dirPath).isDirectory())
  }
}
