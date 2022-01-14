# Apps

App are the building blocks of the server's application layer. Right now, all apps are black box programs, but in the future, they might be transparent javascript or python functions.

Apps are listed in the `/src/apps` directory. Each app has a `manifest.json` file structured like this:

```ts
{
  name: string,
  description: string,
  version: string,
  invocation_template: string, // eg. `node ./index.js $arg1 --arg2 $arg3`
  inputs: {
    [name: string]: {
      type: Type,
      description: string,
      required: boolean,
      default: any,
    },
  },
  outputs: {
    [name: string]: {
      type: Type,
      description: string,
    },
  },
}
```

The `Type` field can be any of the following:

```ts
string;
number;
boolean;
array<Type>;
// for file types, the value is supplied as a filepath (not the actual contents)
PlainTextFile;
CSVFile;
JSONFile;
LayerFile;
InterlayerFile;
ImageFile;
// object<{ [name: string]: Type }>
// I don't think struct types should be used because the value needs to be serialized in the process invocation template string.
```

By providing explicit interfaces for the inputs and outputs, I leave the room open to make a block-programming editor in the future.
