# Users and Groups

Resources are owned by either a *user* or a *group*. Users and groups are both a type of *entity*. Groups contain users and groups and are useful for managing organizations or establishing hierarchial permissions for a collection of entities. Every entity has:

- metadata, including a unique ID, name, dateCreated, etc.
- a top-level storage directory. This directory is located at `/storage/<entityID>`.

The `<entityID>` field is `u{<user.ID>}` for users and `g{<group.ID>}` for groups. This allows us to take advantage of prisma's `unique` ID auto-generation while avoiding namespace collisions between users and groups.

**"Users" and "groups" in this context are not the same as linux users and groups.** The server can run under any linux user. This application only modifies files under its own repository root directory. See [security > containerization](/docs/authentication_verification_and_security.md) for information about the impact this server makes on its host system.

Users are created by authenticating with a new third party identity or by creating a new credential-authenticated account. Groups are created by users.

There are two special users:

- `Anonymous` user: the user who is not logged in. This psuedo-user exists for the purpose of being able to assign public read and write permissions to files.
- `System` user: the system user is used in cases where nobody should have control of a resource. For example, each user's top-level directory is owned by the `System` user to prevent them from doing something stupid like giving away ownership rights on their own top-level directory. The `System` user also owns the root storage directory. See [authorization](/docs/authorization.md) for more information.
