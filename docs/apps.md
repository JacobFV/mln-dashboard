# Apps

App are the building blocks of the server's application layer. Right now, all apps are black box programs. However, explicit interfaces are specified for each application, leaving the room open to make a block-programming editor in the future or even directly invoke transparent javascript or python functions.

Apps are listed in the `/src/apps` directory. Each app has a `manifest.json` file structured like this:

```ts
{
  name: string,
  description: string,
  version: string,
  invocation_template: string, // eg. `node ./index.js $arg1 --arg2 $arg3`
  inputs: [
    {
      name: string,
      description: string,
      type: string,
      required: boolean,
      default: any,
    }
  ],
  outputs: [
    {
      name: string,
      description: string,
      type: string,
    }
  ]
}
```

Metadata in the manifest file is used to generate the user interface for each application. The `invocation_template` is used to generate the command line invokation for running the app. $Variables are replaced with the corresponding input's `value.toString()` (except for file types; see table below). The `type` of an input determines which editable UI component is presented to the user. The `type` of an output determines which viewable UI component is presented to the user. Types can be one of the following:

<br>
| Type | Description |
| ---- | ----------- |
| `string` | string. Use this type if your want the user to be able to enter either a string, boolean, or number |
| `options(options: string[])` | string. Use this type if your want the user to be able to select from a list of options |
| `number` | number |
| `boolean` | boolean |
| `array(allowed_types)` | array of values. `allowed_types` can include arrays. |
| `File(allowed_extensions: string[])` | file. serialized using the file's name. |
