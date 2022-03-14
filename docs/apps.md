# Apps

**App** are the building blocks of the server's application layer. Right now, all apps are treated as black box programs. (Actually, right now, I don't have any apps.) However, explicit interfaces are specified for each application, leaving the room open to make a block-programming editor in the future or even directly invoke transparent javascript or python functions.

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

It's not recommended to develop apps directly inside this repository. Instead, work on your app in its own repository and then use [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) to clone them into the /apps directory. Once your app is ready, run `git add-submodule https://github.com/user/repo.git apps/my-submodule` to add it to the server. If you don't want the AppManifest to be included in your main remote, create a new branch with the AppManifest included. Remember, contents inside git submodules don't get versioned along with the main repository. The main repo merely points to the most recent local commit of that submodule.

In the future block-based programming editor, this input and output type metadata will be used to annotate input and output ports of nodes (which represent app executions in a workflow) with a specific color or shape. Users will be able to drag and drop these nodes into the workflow editor to create a multi-app workflow. See [https://github.com/JacobFV/EasyMLN](https://github.com/JacobFV/EasyMLN) for a longer description of this idea.
