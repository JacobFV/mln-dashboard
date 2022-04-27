import fs from "fs";

async function deleteUser() {
  // delete user in database

  if (!user) {
    return res
      .status(400)
      .json({ message: `User ${token.user.name} does not exist` });
  }

  // delete user's directory
  fileAuthorizationHelper.removeAllPermissionsForPath(`/${user!.id}`);
  const storageDir = path.resolve(`/storage/${user!.id}`);
  if (fs.existsSync(storageDir)) {
    fs.rmdirSync(storageDir, { recursive: true });
  }

  // delete any other file permissions for user
  fileAuthorizationHelper.removeAllPermissionsForUser(user!.id);

  // mark user as deleted
  usersHelper.delete(user!.id);

  console.log(`${user.name} deleted`);
}

export default deleteUser;

async function test() {
  const jacob = TODO;
  deleteUser(jacob.id);
}

test();
