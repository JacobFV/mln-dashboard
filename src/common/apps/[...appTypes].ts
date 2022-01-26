import { MenuList } from "@mui/material"

type AppManifest = {
  name: string
  description: string
  version: string
  inputs: AnyType[]
  outputs: AnyType[]
  fn: (AnyType[]) => AnyType[]
};

abstract class AnyType {
  readonly typeName: string = "Any"
  public value: any
  getInputUIComponent(): React.Component
  getOutputUIComponent(): React.Component
}

StringType
BooleanType
NumberType

LayerType
InterlayerType
MLNType
TableType

FileType

