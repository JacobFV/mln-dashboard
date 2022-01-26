const fs = require('fs')
const path = require('path')
import jwt from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import usersHelper from '../../../db/users_helper'
import {fileAuthorizationHelper} from '../../../db/file_auth_helper'

const secret = process.env.SECRET

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await jwt.getToken({ req, secret })
  if (!token || token.expires < Date.now() || !token.user) {
    return res.status(401).json({ message: 'You are not signed in.' })
  } 
  // delete user
  let user = usersHelper.getByUsername(token.user.username)

  if (!user) {
    return res.status(400).json({ message: `User ${token.user.name} does not exist` })
  }

  // delete user's directory
  fileAuthorizationHelper.removeAllPermissionsForPath(`/${user!.id}`)
  const storageDir = path.resolve(`/storage/${user!.id}`)
  if (fs.existsSync(storageDir)) {
    fs.rmdirSync(storageDir, { recursive: true })
  }

  // delete any other file permissions for user
  fileAuthorizationHelper.removeAllPermissionsForUser(user!.id)

  // mark user as deleted
  usersHelper.delete(user!.id)

  console.log('account deleted', req.headers)
}