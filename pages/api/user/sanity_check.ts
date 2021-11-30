import type { NextApiRequest, NextApiResponse } from 'next'
import { UserInput, UserOutput, sanityCheck } from '../../../common/auth/sanity_check'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserOutput>
) {
  const { username, email, password } = req.body
  const input: UserInput = { username, email, password }
  const output = sanityCheck(input)
  res.status(200).json(output)
}