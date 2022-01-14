# Database

GraphQL provides an ecosystem of modules that can be used to directly get and post typed objects between the client and server. The client can package multiple requests into a single query and receive a single response with all the data needed. The graphql endpoint can also invoke functions on the server but that is not implemented.

The user is already authenticated before reaching this endpoint (yes, they are email-verified too). Authorization to view and edit resources is performed in waterfall fashion.

The `database` is just a single singleton object that any server module can access. I'm starting to plan what the schema will look like:

- live_updates: action sequences for active documents
  - users can only read the live_updates action sequences for documents they have permissions to read
  - users can only edit the live_updates action sequences for documents they have permissions to edit
- user_info: info for every user
  - users can only view the names and pictures of other users
  - users can only edit their own info
  - users cannot read their password_hash
  - users cannot edit their `last_login`, `needs_verification`, TODO fields
- file_permissions: waterfalling permissions for files in `/storage`
  - users can only read the file_permissions for files they have permissions to read
  - users can only edit the file_permissions for files they have admin permissions on
- apps: view and run apps that are installed on the server
  - users can only interface with apps that their account tier has permissions to interface with
