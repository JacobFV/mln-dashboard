# Live Editing

Collaborative editing and viewing is a really cool yet increasingly essential feature of the web. Here more than ever, we developers need to rely on existing conventions and modules to minimize essential and accidental complexities. Here are some modules I found useful for this purpose:

## Dirty way

- React: binds the DOM to the state of the application, so that changes to the DOM are automatically reflected in the state.
- Redux: allows us to manage the state of the application in a single place, and provides undo/redo functionality.
- yjs: a JavaScript library for collaborative editing.
- GraphQL: a highly flexible query language.

yjs may provide the entire functionality needed for collaborative editing, but if it doesn't, here's an algorithm we might use:

```js
setInterval(() => {
  const last_updates = Object.fromEntries(
    active_clients_on_document
    .filter(client => client != this.client_id) // we don't need updates from the local client
    .map(client => {
    [client_id, this.changes.reverse().find(change => change.from == client_id]})) // tell the server what changes we've seen for each client actively editing the document
  )
  const data = await gql`
  changes(last_updates: ${last_updates}) {
    id
    type
    data
  }`
  data.changes.forEach(change => {
    this.changes.add(change);
    this.apply(change);
  })
}, 1000)
```

## Clean approach

Actually forget about the above algorithm and just use GraphQL subscriptions.

Make declarative data components that automatically get updates from graphQl subscription pushes.

gql subscription --> apply change to state --> automatically update render with react

```js
// copilot generated this as an example
const { useSubscription } = require("@apollo/react-hooks");
const { gql } = require("apollo-boost");

function useDocumentChanges(document_id) {
  const { data, loading, error } = useSubscription(
    gql`subscription {
      document_changes(document_id: ${document_id}) {
        id
        type
        data
      }
    }`
  );
  if (loading) return null;
  if (error) return null;
  return data.document_changes;
}

function useDocument(document_id) {
  const changes = useDocumentChanges(document_id);
  if (!changes) return null;
  const [state, setState] = useState(changes[0].data);
  changes.forEach((change) => {
    setState(change.data);
  });
  return state;
}
```
