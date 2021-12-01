import { Post } from "@prisma/client";

export type SerializedPost = Pick<
  Post,
  "id" | "title" | "language" | "summary" | "content" | "published"
> & {
  createdAt: string;
  updatedAt: string;
};

export function serializePost(post: Post): SerializedPost {
  return {
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}
