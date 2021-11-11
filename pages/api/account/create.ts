const fs = require('fs');
const path = require('path');

import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'

import {sanityCheck} from '../../../common/auth/sanity_check'
import usersHelper from '../../../db/users_helper'

type Response = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {

  const { username, email, password } = req.body

  // sanitize input
  let [error, clean] = sanityCheck({ username, email, password })
  if (!clean) {
    throw new Error(error) // nextjs forwards errors to the client
    //res.status(400).json({message: error })
  }

  // validate user uniqueness
  if (usersHelper.getByUsername(username) || usersHelper.getByEmail(email)) {
    // TODO: explain why I combined username and email uniqueness in the same check
    throw new Error(`User with name: ${username} or ${email} already exists`);
  }

  // hash password
  const hash = NextAuth.hash(password)

  // store the user in the database
  const user = {
    username: username,
    email: email,
    password: hash,
  }
  const success = usersHelper.create(user)

  if (!success) {
    throw new Error(`Failed to create user: ${username}`)
  }

  // make directory in /storage for user
  const storageDir = path.resolve(`/storage/${username}`)
  if (fs.existsSync(storageDir)) {
    console.log(`Directory for user ${user.username} already exists: ${storageDir}`)
  } else {
    fs.mkdirSync(storageDir)
  }

  // send the user to the client
  let msg = `Created new user: ${user.username}`
  res.status(200).json({ message: msg })
  console.log(msg)
}