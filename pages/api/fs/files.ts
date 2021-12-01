/**
 * @fileoverview Download, upload, and delete files and directories in the
 * file system tree under /storage/
 *
 * @method GET
 * @param {string} req.query.path The path to download a file or
 * directory from.
 * NOTE: Returns a zip if a directory is given as the path.
 * @returns {Response<file>} The file at the given path.
 *
 * @method POST
 * @param {string} req.query.path The path to upload the file to.
 * NOTE: Unzips the file after uploading if it is a zip.
 * @returns {Response} A response indicating success or failure.
 *
 * @method DELETE
 * @param {string} req.query.path Path to the file or directory to delete.
 * @returns {Response} A response indicating success or failure.
 */

const fs = require('fs')
const path = require('path')
import jwt from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import { fileAuthorizationHelper } from '../../../db/file_authorization_helper'
import usersHelper from '../../../db/users_helper'

const secret = process.env.SECRET

async function upload(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await jwt.getToken({ req, secret })
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const { file } = req
  if (!file) {
    res.status(400).json({ message: 'No file uploaded' })
    return
  }

  const { dirPath, fileName } = req.body
  if (!dirPath || !fileName) {
    res.status(400).json({ message: 'Missing required parameters' })
    return
  }

  const finalPath = path.resolve(`/storage/${dirPath}/${fileName}`)
  if (!fileAuthorizationHelper.isSanitized(dirPath)) {
    res.status(400).json({ message: `Path ${dirPath} is not a valid directory` })
    return
  }

  const userId = user.id
  const permissions = fileAuthorizationHelper.getPermissions(finalPath, userId)
  if (!permissions.write) {
    res.status(400).json({ message: `User ${user.username} does not have write permissions for ${dirPath}` })
    return
  }

  if (!fs.existsSync(dirPath)) {
    res.status(400).json({ message: `Path ${dirPath} does not exist` })
    return
  }

  if (fs.existsSync(finalPath)) {
    res.status(400).json({ message: `File ${fileName} already exists` })
    return
  }

  // write file to disk
  fs.writeFileSync(finalPath, file)

  res.status(200).json({ message: 'File uploaded' })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  const { user } = await jwt({ secret })(req, res)

  if (method === 'POST') {
    const { file, fileName } = body
    const filePath = path.join(__dirname, '../../../public/files', fileName)
    fs.writeFileSync(filePath, file)

    const fileAuthorization = await fileAuthorizationHelper.create({
      userId: user.id,
      fileName,
    })

    const userWithFileAuthorization = await usersHelper.findById(user.id)
    userWithFileAuthorization.fileAuthorizations.push(fileAuthorization)
    await usersHelper.update(userWithFileAuthorization)

    res.status(200).json({
      fileName,
      fileAuthorization,
    })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}