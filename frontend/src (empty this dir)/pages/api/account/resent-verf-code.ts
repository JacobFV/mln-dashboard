import { NextApiRequest, NextApiResponse } from "next";
import sendVerfCode from "../../../server/account/sendVerfCode";
import prisma from "../../../prisma/prisma";
import assert from "assert";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    name,
    email,
  } = req.body;

  // ensure name-email match exists in database
  const entity = await prisma.email.findFirst({
    where: {
      email: email,
      user: {
        name: name,
      }
    },
  });
  assert (entity, "entity not found"); 
  // this prevent hackers from exploiting our server to just spam emails that are not in the database

  await sendVerfCode({
    name: name,
    email: email,
  })

  res.status(200).send({
    message: "Successfully sent verification code",
  });
}