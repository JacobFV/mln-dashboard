import { Prisma } from "@prisma/client";
import { User as ClientUser } from "../../common/types/[...frontendTypes]";
import { User as ServerUser } from "../graphql/User";
import prisma from "../../prisma/prisma";
Prisma.EntityUnionScalarFieldEnum;

/*
 * @overview Get user data from the database, format in a client-understandable way, and federate field access based on the requesting user.
 *
 * @param {string} userId - The user ID of the user to get data for.
 * @param {string} requestingUserId - The user ID of the user requesting the data.
 */
export default (userId: string, requestingUserId: string): ClientUser => {
  const fullUserObject = prisma.user.findFirst({
    where: {
      id: userId,
    },
  }) as ServerUser | null;
};
