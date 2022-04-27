import { mkdirSync } from "fs";
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
async function createUser(createUserInput: {
  name: string;
  email: string;
  picture?: string;
  password?: string;
}) {
  const [nameValid, nameInvalidReason] = isValidName(createUserInput.name);
  const [emailValid, emailInvalidReason] = isValidEmail(createUserInput.email);
  const [passwordValid, passwordInvalidReason] =
    createUserInput.password != null
      ? isValidPassword(createUserInput.password)
      : [true, ""];
  if (!nameValid || !emailValid || !passwordValid) {
    throw new Error(
      `Invalid user input: ${nameInvalidReason}, ${emailInvalidReason}, ${passwordInvalidReason}`
    );
  }

  if (createUserInput.picture == null) {
    createUserInput.picture = "/public/default_avatar.png"; // TODO: make this asset
  }

  // create user in database
  prisma.user.create({
    data: {
      entityRef: {
        create: {
          name: createUserInput.name,
          picture: createUserInput.picture,
          memberOfGroups: {},
          explicitlyAssignedPermissions: {},
        },
      },
      emails: {
        create: [
          {
            email: createUserInput.email,
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
      name: createUserInput.name,
    },
  });
  if (entity == null) {
    throw new Error("Failed to create user");
  }

  // Create directory for user in `/storage`
  mkdirSync(`storage/${entity.id}`);

  // Send email verification code
  await sendVerfCode(createUserInput.email, createUserInput.name);
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
