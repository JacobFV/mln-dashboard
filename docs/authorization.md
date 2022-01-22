# Authorization

Authorization is the process of establishing what privileges and permissions a user has. Currently, all functionality that requires authorization is implemented on the GraphQL resolver functions. See the [schema description](/docs/backend.md) for details. We currently use authorization for the following purposes:

**Restricting access to priveleged information**. For example, a user can only see their own email. Users must belong to a given group to see that group's information.

**Restricting access to files**. Ok, I know this looks like a subset of the above, but file permissiosn are actually a bit more complex. Ideally, we want to implement a Google Drive type sharing architeture where users and organization can own and share files with fine-tuned permission levels (READER, WRITER, ADMIN, OWNER). All owners can administrate files; all admins can delete, move, rename, and share files, and they are also writers; all writers can edit files, and they are also readers; and all readers can read, copy, and download files.

You see, the client can only query `ImplicitFilePermissions` but the database stores `ExplicitFilePermission`. I'm making this distinction explicitly to avoid confusion because it's not a

Sometimes, access restrictions are inherited. For instance, users can only see file information for files that they have `READER` permissions for, but this does not mean that `READER` permissions must be explicitly assigned to every file; they 'waterfall down' from higher level directories. So, if I gave another user `READER` permissions to my root directory, that user could see all the files in my root directory recursively, unless I had explicitly marked individual files to give

Another note: when a user is added to an organization, the UI asks the inviter whether they would like to assign `READER`, `WRITER`, or `ADMIN` permissions to that new user for all files under the group's root directory. Conversely, the UI also asks if the group owner would like to revoke those permissiosns when removing a user from the group.
