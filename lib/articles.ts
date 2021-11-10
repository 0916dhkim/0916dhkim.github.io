import { ARTICLES_FOLDER } from "lib/projectPaths";
import fs from "fs";
import { hasStringProperty } from "./typeutils";
import matter from "gray-matter";
import path from "path";

export type Metadata = {
  slug: string;
  title: string;
  content: string;
  summary: string;
  date: string;
};

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
  const metaData = validateMetaData({
    ...parsed.data,
    content: parsed.content,
    slug: toSlug(filename),
  });
  return metaData;
}

function validateMetaData(metaData: unknown): Metadata {
  if (!hasStringProperty(metaData, "title")) {
    throw new Error("Metadata does not have title key.");
  }
  if (!hasStringProperty(metaData, "date")) {
    throw new Error("Metadata does not have date key.");
  }
  if (!hasStringProperty(metaData, "slug")) {
    throw new Error("Metadata does not have path key.");
  }
  if (!hasStringProperty(metaData, "content")) {
    throw new Error("Metadata does not have content key.");
  }
  if (!hasStringProperty(metaData, "summary")) {
    throw new Error("Metadata does not have content key.");
  }
  return metaData;
}

export async function getAllMetadata(): Promise<Metadata[]> {
  const articleFiles = fs
    .readdirSync(ARTICLES_FOLDER)
    .map((relativepath) => path.join(ARTICLES_FOLDER, relativepath));

  return Promise.all(articleFiles.map(fileToMetadata));
}

export async function getArticleBySlug(slug: string): Promise<Metadata> {
  const filename = path.join(ARTICLES_FOLDER, slug + ".md");
  return fileToMetadata(filename);
}
