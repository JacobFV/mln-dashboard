import { mkdir, mkdirSync } from "fs";
import {
  isValidName,
  isValidEmail,
  isValidPassword,
} from "../../common/utils/sanityCheck";
import prisma from "../../prisma/prisma";
import sendVerfCode from "./sendVerfCode";

/**
 * @description Creates a new user in the database.
 *
 * @note This function is used for both credential-authenticated and third-party authenticated users.
 *
 * @param {string} name The name of the user.
 * @param {string} email The email of the user.
 * @param {string|null} picture: The picture of the user.
 * @param {string|null} password The password of the user.
 */
async function createUser(userInput: {
  name: string;
  email: string;
  picture?: string;
  password?: string;
}) {
  const [nameValid, nameInvalidReason] = isValidName(userInput.name);
  const [emailValid, emailInvalidReason] = isValidEmail(userInput.email);
  const [passwordValid, passwordInvalidReason] =
    userInput.password != null
      ? isValidPassword(userInput.password)
      : [true, ""];
  if (!nameValid || !emailValid || !passwordValid) {
    throw new Error(
      `Invalid user input: ${nameInvalidReason}, ${emailInvalidReason}, ${passwordInvalidReason}`
    );
  }

  if (userInput.picture == null) {
    userInput.picture = "/public/default_avatar.png"; // TODO: make this asset
  }

  // create user in database
  prisma.user.create({
    data: {
      entityRef: {
        create: {
          name: userInput.name,
          picture: userInput.picture,
          memberOfGroups: {},
          explicitlyAssignedPermissions: {},
        },
      },
      emails: {
        create: [
          {
            email: userInput.email,
            primary: true,
          },
        ],
      },
      loginAttempts: {},
      ownerOfGroups: {},
      explicitPermissionsCreated: {},
    },
  });
  // now get the created entityUnion
  let entity = await prisma.entityUnion.findUnique({
    where: {
      name: userInput.name,
    },
  });
  if (entity == null) {
    throw new Error("Failed to create user");
  }

  // Create directory for user in `/storage`
  mkdirSync(`storage/${entity.id}`);

  // Send email verification code
  await sendVerfCode(userInput.email, userInput.name);
}

export default createUser;

async function test() {
  console.log("Testing createUser");
  createUser({
    name: "Jacob",
    email: "jacobfv@msn.com",
    password: "12345678",
  });
}

//test();
