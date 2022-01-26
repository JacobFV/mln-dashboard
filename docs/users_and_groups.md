# Users and Groups

An Entity is a user or group. Each entity has:

- metadata: globally unique ID, name, dateCreated, etc.
- top-level storage directory. This directory is located at `/storage/<entityID>`.

"Users" and "groups" in this context are not the same as linux users and groups. The server can run under any linux user. It only modifies files under its own repository root directory. See [security > containerization](/docs/authentication_verification_and_security.md) for information about the impact this server makes on its host system.

Groups contain users and groups and are useful for establishing hierarchial permissions to a collection of entities.

Users are created by authenticating with a new third party identity or by creating a new credential-authenticated account. Groups are created by users.

There are two special users:

- `Anonymous` user: the user who is not logged in. This psuedo-user exists for the purpose of being able to assign public read and write permissions to files.
- `System` user: the system user is used in cases where nobody should have control of a resource. For example, each user's top-level directory is owned by the `System` user to prevent them from doing something stupid like giving away ownership rights on their own top-level directory. The `System` user also owns the root storage directory. See [authorization](/docs/authorization.md) for more information.
