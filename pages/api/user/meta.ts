/**
 * @fileoverview Gets metadata for a list of users.
 *
 * In many cases, it's simpler to just pass user-ids around.
 * This endpoint is useful for getting metadata (e.g. name, email)
 * from a list of users.
 *
 * @method GET
 *
 * @param {string[]} req.query.userIds The list of user-ids to get metadata for.
 *
 * @returns {Response<Partial<User>[]>} A list of user objects (without the password field).
 *
 * See /common/types/user.ts for the shape of the user object.
 */