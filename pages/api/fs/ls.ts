/**
 * @fileoverview Lists files and directories in the file system tree under 
 * /storage that the requesting user has permission to view.
 * 
 * NOTE: Returns an empty response if the given path does not exist or if user
 * does not have permission to view anything at the given path.
 * 
 * @method GET
 * 
 * @param {string} req.query.path The path to list files and directories under.
 * @param {boolean} req.query.recursive Whether to list files and directories recursively. 
 *  false by default. If false,, folders do not have a "children" property.
 * 
 * @returns {Response<object>} Children below the given path.
 * 
 * @example GET /api/fs/ls?path=/nile&recursive=true (sent by nile)
 * Returns a json object with the following structure:
 * [
 *   {
 *     "name": <file name>,
 *     "type": "file"
 *     "size": <file size in bytes>
 *     "lastModified": <last modified date in ISO 8601 format>
 *     ...other metadata...
 *   },
 *   {
 *     "name": <folder name>,
 *     "type": "folder"
 *     ...other metadata...
 *     "children": [
 *       { ... },
 *       { ... },
 *       ...
 *     ]
 *   }
 * ]
 * 
 * @example GET /api/fs/ls?path=/nile&recursive=true (sent by jacob)
 * Returns an empty json response (if jacob does not have permission to view any filess under /nile))):
 * [ ]
 * 
 * @example GET /api/fs/ls?path=/&recursive=true (sent by a user that is not signed in)
 * Returns a json response showing all files and directories that are publicly accessible:
 * [
 *   {
 *     "name": "jacob",
 *     "type": "folder"
 *     ...other metadata...
 *     "children": [
 *       {
 *         "name": "my_public_project",
 *         ...other metadata...
 *         "children": [
 *           { ... },
 *           { ... },
 *           ...
 *           // jacob has a private file at 
 *           // /storage/jacob/my_public_project/private_file.txt
 *           // This file is not included in the response
 *         ]
 *       }
 *       // this is jacob's only public project
 *     ]
 *   },
 *   // no other users have public files
 * ]
 * 
 */



const fs = require('fs')
const path = require('path')
import jwt from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { fileAuthorizationHelper } from '../../../db/file_authorization_helper'
import usersHelper from '../../../db/users_helper'

const secret = process.env.SECRET

export default async (req: NextApiRequest, res: NextApiResponse) => {

  // authenticate user
  const token = await jwt.getToken({ req, secret })
  if (!token || token.expires < Date.now() || !token.user) {
    return res.status(401).json({ message: 'You are not signed in.' })
  }
  let user = usersHelper.getByUsername(token.user.username)!

  // get request body
  let dirPath = req.body.path
  let fileName = req.body.fileName
  let file = req.body.file
  let finalPath = path.resolve(`/storage/${dirPath}/${fileName}`)

  // more validation
  if (!fileAuthorizationHelper.isSanitized(dirPath)) {
    return res.status(400).json({ message: `Path ${dirPath} is not a valid directory` })
  }
  if (!fileAuthorizationHelper.getPermissions(path, user.id).write) {
    return res.status(400).json({ message: `User ${user.username} does not have write permissions for ${dirPath}` })
  }
  if (!fs.existsDirSync(dirPath)) {
    return res.status(400).json({ message: `Path ${dirPath} does not exist` })
  }
  if (fs.existsSync(finalPath)) {
    return res.status(400).json({ message: `File ${fileName} already exists` })
  }

  // write file to disk
  fs.writeFileSync(finalPath, file)

  // this assumes all files are javascript objects (never true)
  // I should use upload forms for better performance with more MIME types

  return res.status(200).json({ message: 'Uploaded' })
}