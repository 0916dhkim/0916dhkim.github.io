import { getAssetUrl } from "./assets";

export type AppInfo = {
  favicon: string;
};

export function getAppInfo(): AppInfo {
  return {
    favicon: getAssetUrl("favicon.ico"),
  };
}
