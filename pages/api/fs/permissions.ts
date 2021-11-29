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
 * GET /api/fs/permissions?path=/storage/jacob/test.txt
 * Response:
 * {
 *   "path": "/storage/jacob/test.txt",
 *   "owner": {
 *     "username": "jacob",
 *     "name": "Jacob",
 *     "email": "jacobfv@msn.com"
 *    },
 *   "read": {
 * },
 *   "write": true,
 *
 *
 * @method POST
 * @param {string} req.query.path The path to the file or directory to
 * modify permissions for.
 * @param {object} req.body The permissions to set.
 * @returns {Response} A response indicating success or failure.
 */