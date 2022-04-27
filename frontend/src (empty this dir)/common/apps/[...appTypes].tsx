import { TextInput, THEME_ICON_SIZES } from "@mantine/core";
import React from "react";
import { ReactElement, useState } from "react";

export type AppManifest = {
  name: string;
  description: string;
  version: string;
  inputs: Map<string, ObjectType>; // <port label, type>
  outputs: Map<string, ObjectType>; // <port label, type>
  fn(args: Map<string, object>): Map<string, object>; // <port label, value>
};

export abstract class ObjectType extends React.Component {
  readonly typeName: string = "Object";

  constructor(props: { initialValue: any, canEdit: boolean }) {
    super(props);
    this.setState({
      value: props.initialValue,
      canEdit: props.canEdit
    });
  }

  abstract render(): React.ReactNode;
};

export class StringType extends ObjectType {
  readonly typeName: "String"

  constructor(props?: { initialValue?: string, canEdit?: boolean }) {
    super({ initialValue: "", canEdit: true, ...props });
  }

  render() {
    return <input
      type="text"
      checked={this.context.value}
      disabled={!this.context.canEdit}
    />
  }
}
export class BooleanType extends ObjectType {
  readonly typeName: "Boolean"

  constructor(props?: { initialValue?: boolean, canEdit?: boolean }) {
    super({ initialValue: false, canEdit: true, ...props });
  }

  render() {
    return <input
      type="checkbox"
      checked={this.context.value}
      disabled={!this.context.canEdit}
    />
  }
}
export class NumberType extends ObjectType {
  readonly typeName: "Number"

  constructor(props?: { initialValue?: number, canEdit?: boolean }) {
    super({ initialValue: 0, canEdit: true, ...props });
  }

  render() {
    return <input
      type="number"
      value={Object(this.context.value).toString()}
      disabled={!this.context.canEdit}
    />
  }
}

/* TODO: Add support for other types
export class LayerType extends ObjectType {
  readonly typeName: "Layer"
}
export class InterlayerType extends ObjectType {
  readonly typeName: "Interlayer"
}
export class MLNType extends ObjectType {
  readonly typeName: "MLN"
}
export class TableType extends ObjectType {
  readonly typeName: "Table"
}
export class FileType extends ObjectType {
  readonly typeName: "File"
}

*/