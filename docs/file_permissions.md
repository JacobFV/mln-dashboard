# File Permissions

Ideally, we want to implement a Google-Drive-kind-of sharing architecture where **users and groups can own and share files and directories with fine-tuned permission levels (hidden, read, write, admin, owner)**. For brevity, this document refers to both files and directories as "resources". A resource can only have one owner. The current *owner* can change the owner and administrate files; all users with an *admin* permission level can delete, move, rename, and share, and they also have write permissions; all users with *write* permissions can edit files, and they also have read permissions; and all users with *read* permissions can read, copy, and download files. A resource can also be explicitly marked as 'hidden' for some particular entity. Users inherit the permissions of the group(s) they belong to with conflicts determined by a least restrictive union.

Initially, a newly created or uploaded file is owned by the user or group who created or uploaded it. That owner can then share the file with other users or groups, giving them read-only access.

In many cases, file access permissions are inherited from the parent directory. For example, if a user creates a new file in a directory, the file's owner is the user who owns the directory. Inherited permissions can also override the parent directory's permissions. For example, UserA could be given reader permissions on `/storage/userB/sharedFolder` but also hidden permissions on `/storage/userB/sharedFolder/file.txt`. This would make UserA able to read everything in `/storage/userB/sharedFolder/` except for `file.txt`.

The Anonymous and System users are special users that are used on the backend to implement some of sharing architecture features.

- The System user owns the storage root directory and each entity's top-level directory. Users and groups have admin permissions on their own top-level directory.
- The Anonymous user has hidden permissions on the root storage directory.

See [users and groups](/docs/users_and_groups.md) for more information.

**Inherited vs explicit permissions**. Explicit permissions are explicitly assigned to a resource while inherited permissions are implicitly acquired from the parent directory of a resource. Whenver an admin views permissions on a file or directory, they want to see both inherited and explicit permissions set on that resource. On the other hand, when permissions are assigned to a resource, these are assigned to become explicit permissions.

Removing explicit permissions is not the same as revoking inherited permissions. The sharing dialog presents a list of entities that the resource is shared with. Users can select `hidden` to explicitly revoke access to a resource. They can also click a delete icon to simply revert access permissions for that resource to its parent directory.

Whenever an explicit permission to read, write, administrate, or own a resource is assigned to an entity, the path to that resource is stored on the entity's list of shared resources. This list allows the user interface to make a "shared with me" type of sidebar menu for resources which would otherwise be buried under hidden parent directories. This list is updated whenever explicit permissions are revoked, changed to hidden, or the filesystem resource is deleted. This list is also updated every time the server restarts, which should be nightly.

**There is a potential security exploit** with this approach: assume I have a file system like this:

```
├── jacob
├── org1 (admin: Jacob)
|  ├── file 1
|  └── folder 1
|     ├── folder 1.1
|     └── folder 1.2
...
```

By giving Jacob admin rights to `org1`, he inherently has admin rights on all its subdirectories. Therefore, Jacob could explicitly grant himself access like so:

```
├── jacob
├── org1 (admin: Jacob)
|  ├── file 1 (admin: Jacob)
|  └── folder 1 (admin: Jacob)
|     ├── folder 1.1 (admin: Jacob)
|     └── folder 1.2 (admin: Jacob)
...
```

Then, even if the `org1` owner removes Jacob from the group, he will still have control over the group's resources that he has explicitly assigned admin permissions for himself.

```
├── jacob
├── org1
|  ├── file 1 (admin: Jacob; Jacob can still see this folder)
|  ├── file 2 (Jacob can't see this newly created file)
|  └── folder 1 (admin: Jacob; Jacob can still see this folder)
|     ├── folder 1.1 (admin: Jacob; Jacob can still see this folder)
|     └── folder 1.2 (admin: Jacob; Jacob can still see this folder)
...
```

To prevent attacks like this from happening unintentionally, when a user is revoking explicit permissions on a directory, they should receive a request like "Do you want to revoke permissions for all child directories as well?". If the user clicks "yes", then the system should recursively remove permissions for all child directories as well.

**Navigation**. Users navigate to resources by selecting one of: "My files", "Shared with me", "GroupA's files", "Shared with GroupA", and etc. for all groups that the user belongs to. Then the main content panel is filled with a list or tile of resources which they can click through to arrive a a resource. There is also a top-level search bar / breadcrumbs display which allows users to search for resources by name, by tag (future), or by path. For security reasons, the server treats hidden resources as if they didn't exist and responds with a not found error.

Explicit permissions are shaped as follows:

```ts
type Permission {
  path: string!
  entity: ID!
  permission: PermissionLevel!
}
```

They are stored in the Prisma-connected database.

Note: the `owner` of a resource does not have to be the user who created the resource or the entity under whose top-level directory the rersource is located in.

**Groups**. When a user is added to a group, the UI asks the inviter whether they would like to assign `reader`, `writer`, or `admin` permissions to that new user for that group's root directory. The group owner has admin permissions. (The system user is the owner of all entity top-level directories). Conversely, the UI asks if the group owner would like to revoke those permissions when removing a user from the group.
