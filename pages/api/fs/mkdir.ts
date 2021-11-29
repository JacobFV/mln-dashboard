/**
 * @fileoverview Makes a directory in the file system tree under /storage/
 *
 * @method POST
 *
 * @param {string} req.query.name The name of the directory to create.
 * @param {string} req.query.parent The parent directory to create the directory in.
 *
 * @returns {Response} A response indicating success or failure.
 *
 * @example
 * POST /api/fs/mkdir?name=foo&parent=/storage/jacob/  (send by jacob)
 * Response: 200 "ok" (as long as the operation was actually successful)
 *
 * @example
 * POST /api/fs/mkdir?name=foo&parent=/storage/jacob/  (send by nile)
 * Response: 400 "bad request" (nile does not have permission to create
 * directories under /storage/jacob/)
 *
 * @example
 * POST /api/fs/mkdir?name=foo&parent=/storage/
 * Response: 400 "bad request" (nobody is allowed to create directories
 * at the top-level)
 */