# Users and Groups

An Entity is a user or group. Each entity has:

- metadata: unique ID, name, dateCreated, etc.
- top-level storage directory. This directory is located at `/storage/<entityID>`.

There are two special users:

- `Anonymous` user: the user who is not logged in. This psuedo-user exists for the purpose of being able to assign public read and write permissions to files.
- `System` user: the system user is used in cases where nobody should have control of a resource. For example, each user's top-level directory is owned by the `System` user to prevent them from doing something stupid like giving away all their access rights. The `SYStem` useer also owns the root storage direcoy
