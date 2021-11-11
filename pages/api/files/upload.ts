import jwt from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'

const secret = process.env.SECRET

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await jwt.getToken({ req, secret })
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  } else {

    // Uploads file attached in req to `./storage`
    const file = req.files.file
    const fileName = file.name
    const filePath = `./storage/${fileName}`
    file.mv(filePath)

    return res.status(200).json({ message: 'Authorized' })
  }