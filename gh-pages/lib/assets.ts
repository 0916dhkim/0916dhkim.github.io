import { PUBLIC_FOLDER } from "./projectPaths";
import fs from "fs";
import path from "path";

function assetExists(assetName: string): boolean {
  return fs.existsSync(path.join(PUBLIC_FOLDER, assetName));
}

export function getAssetUrl(assetName: string): string {
  if (!assetExists(assetName)) {
    throw new Error(`Asset ${assetName} does not exist in public directory.`);
  }
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${prefix}/${assetName}`;
}
