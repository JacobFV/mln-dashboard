import { NextApiRequest, NextApiResponse } from "next";
import createUser from "../../../server/account/createUser";

export default(req: NextApiRequest, res: NextApiResponse) => {
  const {
    name,
    email,
    password,
    picture,
  } = req.body;

  createUser({
    name: name,
    email: email,
    password: password,
    picture: picture,
  })
    .then(() => {
      res.status(200).send({
        message: "Successfully created user",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Failed to create user",
      });
    });
}