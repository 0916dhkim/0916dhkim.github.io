import * as v from "@mojotech/json-type-validation";

import { ARTICLES_FOLDER } from "lib/projectPaths";
import { Decoded } from "./typeutils";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const languageDecoder = v.union(v.constant<"en">("en"), v.constant<"kr">("kr"));

const metadataDecoder = v.object({
  slug: v.string(),
  title: v.string(),
  language: languageDecoder,
  content: v.string(),
  summary: v.string(),
  date: v.string(),
});

export type Language = Decoded<typeof languageDecoder>;

export type Metadata = Decoded<typeof metadataDecoder>;

async function readFile(filename: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function toSlug(filename: string): string {
  return path.basename(filename).replace(/\.md$/, "");
}

async function fileToMetadata(filename: string): Promise<Metadata> {
  const filecontent = await readFile(filename);
  const parsed = matter(filecontent);
  const metaData = metadataDecoder.runWithException({
    ...parsed.data,
    content: parsed.content,
    slug: toSlug(filename),
  });
  return metaData;
}

export async function getAllMetadata(): Promise<Metadata[]> {
  const articleFiles = fs
    .readdirSync(ARTICLES_FOLDER)
    .map((relativepath) => path.join(ARTICLES_FOLDER, relativepath));

  return Promise.all(articleFiles.map(fileToMetadata));
}

export async function getAllMetadataGroupedByLanguage(): Promise<{
  [k in Language]?: Metadata[];
}> {
  const ret: { [k in Language]?: Metadata[] } & Object = {};
  for (const metadata of await getAllMetadata()) {
    const language = metadata.language;
    if (!ret.hasOwnProperty(language)) {
      ret[language] = [];
    }
    ret[language]?.push(metadata);
  }

  return ret;
}

export async function getArticleBySlug(slug: string): Promise<Metadata> {
  const filename = path.join(ARTICLES_FOLDER, slug + ".md");
  return fileToMetadata(filename);
}
