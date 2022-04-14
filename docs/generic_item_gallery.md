# Generic Item Gallery

Update: :news: Files are different from projects
Projects are auto-detected. The gallery view can switch between either projects or files.

This will be used for

- my files
- shared with me
- org 1 files

Problem:

dynamically generate gallery for items for

- files from different people
- apps
- robots
- other item categories

Constraints:

- in every case, the items values are not known at compile time
- in most cases, the item interface types are not known at compile time
- the server should not render item html code since that is costly

Solution:

- `Item`s are JSON objects
- `GalleryItem` is a JSX component
- `Gallery` is a JSX component
- `NestedGallery` is a JSX component

Actually the sidebar is a separate component and is already accessible as
<https://github.com/minop1205/react-dnd-treeview>

--------------------------------------------------------------------------------

LHS "search", "me" (open by default, "my files", "shared with me", "recent", "favorites", "trash"), "organization A", (closed by default, "Org A's files", "shared with Org A", "Recent", ...) "organization B" (...), "trending". This sidebar expands into the files tree view. However the top level icons are  formatted a bit larger. This is a special case of the dynamic Gallery view. "Gallaries" (like "My Files" and "Shared with Me") are specific to each user. Items have properties like:

  ```ts
  type Item = {
    id: string,
    name: string,
    type: string,
    size: number,
    dateCreated: string,
    lastModified: string,
    owner: LiteUser,
    sharedWith: LiteUser[],
    stars: number,
    tags: string[],
    // files will definitely have more properties attached to them
  }
  class GalleryItem : React.ReactNode {
    draggable?: boolean,
    droppable?: boolean,
    onDrop?: (droppedOn: Item, droppedItem: File|Item) => void,
    render: (item: Item) => React.ReactNode,
    actionItems: ActionItem[],
    contextMenuItems?: ContextMenuItem[],
    thumbnail: React.ReactNode,
    showOwner?: boolean = true,
    showSharedWith?: boolean = true,
    showLastModified?: boolean = true,
    showSize?: boolean = true,
    showType?: boolean = true,
    showTags?: boolean = true,
    showDescription?: boolean = true,
    showActions?: boolean = true,
    showStars?: boolean = true,
  }
  type Gallery = {
    galleryItemTypes: Map<string, GalleryItem>
    defaultGalleryItemType: GalleryItem
  }
  type NestedGallery = Map<string, Gallery|NestedGallery>
  partial type User includes {
    galleries: NestedGallery
  }
  ```

  On each user, I store stuff like:

  ```yml
  content_galleries_order: ["my_files", "shared_with_me", "recent", "favorites", "trash"]
  default_openers:
    - MLN: mln viewer
    - json: json editor
    - default: text viewer
  show_stars: true
  gallery_specific_overrides:
    - my files:
      show_stars: false
  ```

  Then the client dynamically generates the gallery layout and item content based on all this information and the raw item data. Note: I need a word to indicate "justTheItemMetaWithoutContent".

  The server should take care of handling everything from end-to-end (item-specific actions, item-specific context menus, etc). This will be used to make content galleries for:

- personal and shared files
- public files
- All Apps view: MLN, Bard-Bot, etc
- App Dashboards
- Robot view (zookeeper)
- add "Content" table in database and make tagging functions that update the content meta after app execution, upload, save, etc. or make an automated filesystem traversal script on every hour.
