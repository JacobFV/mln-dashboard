# Authorization

Authorization is the process of establishing what privileges and permissions a user has. Currently, all functionality that requires authorization is implemented on the GraphQL resolver functions. See the [schema description](/docs/backend.md) for details. We currently use authorization for the following purposes:

**Restricting access to privileged information on the graphql api**: For example, a user cannot see another user's alternative emails, their own login attempts, or anybody's password hash. Users must belong to a given group to see that group's information.

**Restricting access to files**: See [file_permissions.md](/docs/file_permissions.md) for more information.

Authentication is not necessary to have authorization in every case. Clients are authenticated as `Anonymous` users by default.
