/**
 * @fileoverview View or modify the permissions of a file or directory
 * under /storage.
 *
 * Permissions are represented by:
 * {read: [[uid: number]: bool], write: [[uid: number]: bool], owner: number}
 * where uid is the id of the user. Use /api/user/meta to get the names, emails,
 * etc. for a list of user ids.
 *
 * Permissions waterfall down (i.e.: are inherited) with the following precedence:
 * - explicitly set permissions for that file or directory for the given user
 * - inherited from the parent directory for the given user
 * - explicitly set permissions for that file or directory for the `public` user
 * - inherited from the parent directory for the `public` user
 * This precedence is applied recursively, so if a file or directory with no explicit permissions
 * is deep inside a directory, it will inherit the containing directory's permissions.
 *
 * The presence chain above also allows the strange situation where a file or directory
 * is visible to the public but explicitly hidden from a given user. This is not a bug.
 *
 * No explicit read or write permissions are set on the root directory. `nobody` is the owner.
 * Each user has read and write (but not owner) permissions over their own directory.
 * Users can be owners for files and directories that are not under their personal directory.
 * Users must have write permission on a directory to upload files and create folders in it.
 * When a client is not logged in, they are the `public` user.
 * A user cannot be the explicit owner without explicit read and write permission.
 * A user cannot have explicit write permission without explicit read permission.
 *
 * @method GET
 * @param {string} req.query.path The path to the file or directory to
 * view or modify permissions for.
 * @returns {Response<object>} The permissions for that file or directory
 * (if the user has permission to know it exists). Otherwise, an error.
 *
 * NOTE: The permissions returned include all inherited permissions. This means
 * they are not necessarily the permissions that the user has explicitly set.
 *
 * @example
 * GET /api/fs/permissions?path=/jacob/proj1/test.txt
 * Response:
 * {
 *   "read": {
 *     0: true,  // visible to pulic
 *     76555345: true, // visible to jacob
 *     76555344: false  // hidden from nile (even if nile has permission to view the parent directory)
 *   },
 *   "write": {
 *    76555345: true, // jacob can edit
 *   },
 *   "owner": 76555345  // jacob's uid
 * }
 *
 *
 * @method PUT
 * @param {string} req.query.path The path to the file or directory to
 * modify permissions for.
 * @param {Permission} req.body The permissions to add or remove (does NOT override existing permissions).
 *    Set a "read" or "write" key to `null` to remove the entry. For "owner", `null` means no change.
 * @returns {Response} A response indicating success or failure.
 *
 * This endpoint is atomic and idempotent. (i.e.: if one of the permissions is invalid, none of the permissions are changed.)
 *
 * @example
 * PUT /api/fs/permissions?path=/jacob/proj1/test.txt
 * Body:
 * {
 *   "read": {
 *     76555344: false  // allow nile to also view the file
 *   },
 *   "write": { }  // no change to existing write permissions
 *   "owner": null // no ownership change
 * }
 *
 * @example
 * PUT /api/fs/permissions?path=/jacob/proj1/test.txt
 * Body:
 * {
 *   "read": { },  // no change to existing read permissions
 *   "write": {
 *     76555343: false  // jacob can no longer edit the file (this will throw an error since jacob is the owner)
 *     76555344: null, // remove explicit permissions for nile on the file. If nile has write permissions on /jacob/proj1, they will now be inherited.
 *   },
 *   "owner": 76555344  // nile is now the owner of the file (this will also throw an error since nile doesn't have explicit write permissions)
 * }
 *
 */