const fs = require('fs');
const path = require('path');

import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'

import { sanityCheck } from '../../../common/account/sanity_check'
import { fileAuthorizationHelper } from '../../../db/file_auth_helper';
import usersHelper from '../../../db/users_helper'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const { username, email, password } = req.body

  // sanitize input
  let [error, clean] = sanityCheck({ username, email, password })
  if (!clean) {
    throw new Error(error) // nextjs forwards errors to the client
    //res.status(400).json({message: error })
  }

  // validate user uniqueness
  if (usersHelper.getByUsername(username) || usersHelper.getByEmail(email)) {
    // I combined both uniqueness checks to reveal as little information as possible
    throw new Error(`User with name: ${username} or ${email} already exists`);
  }

  // enter user into database
  const user = usersHelper.create({
    username: username,
    email: email,
    password: password,
  })

  if (!user) {
    throw new Error(`Failed to create user: ${username}`)
  }

  // make directory in /storage for user
  const storageDir = path.resolve(`storage/${user.id}`)
  if (fs.existsSync(storageDir)) {
    console.log(`Directory for user ${user.id} already exists: ${storageDir}`)
  } else {
    fs.mkdirSync(storageDir)
  }

  // enter read write admin permissions for user personal directory
  fileAuthorizationHelper.setExplicitPermissions(`/${user.id}`, user.id, { read: true, write: true, admin: true })

  // send the user to the client
  let msg = `Created new user: ${username}`
  res.status(200).json({ message: msg })
  console.log(msg)
}