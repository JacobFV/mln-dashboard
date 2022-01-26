# Apps

App are the building blocks of the server's application layer. Right now, all apps are black box programs. However, explicit interfaces are specified for each application, leaving the room open to make a block-programming editor in the future or even directly invoke transparent javascript or python functions.

Apps are listed in the `/src/apps` directory. Each app has a `manifest.ts` file in its root with a default export function that specifies the app's name, description, and other metadata like so:

```ts
default export (): AppManifest => {
  return new {
    name: 'My App',
    description: 'A description of my app',
    ...
  }
}
```

The returned object should conform to the `AppManifest` type. This manifest object allows the server to automatically index, display, and build user interfaces for each app. It contains `inputs` and `outputs` which determine the editable and viewable UI components presented to the user before and after application execution respectively. Under the hood, these type specifications are represented using instances of `AnyType` and subclasses which allows overriding where necessary but simplicity when convenient. See `/src/common/apps/[...appTypes].ts` for more details.

In the future block-based programming editor, this input and output type metadata will be used to color or shape the input and output ports of nodes which represent app executions in a workflow.
