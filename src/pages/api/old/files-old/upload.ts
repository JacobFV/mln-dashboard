const fs = require('fs')
const path = require('path')
import jwt from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { fileAuthorizationHelper } from '../../../../db/file_auth_helper'
import usersHelper from '../../../../db/users_helper'

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
