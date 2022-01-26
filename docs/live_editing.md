# Live Editing

Collaborative editing and viewing is a really cool yet increasingly essential feature of the web. Here more than ever, we developers need to rely on existing conventions and modules to minimize essential and accidental complexities. GraphQL subscriptions coupled with declarative react data fetching and rendering is a great way to make this happen. Here's a quick and dirty example:

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

Currently, the server does not feature applications that would utilize collaborative editing. However, in the future, users may be able to write reports, create block-based workflows, and comment on other users' reports and outputs in close to real-time.
