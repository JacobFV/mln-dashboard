import pathlib from "path";

export function resolve(path: string): string {
  if (pathlib.isAbsolute(path)) {
    return path;
  }
  return pathlib.resolve("storage", path);
}
