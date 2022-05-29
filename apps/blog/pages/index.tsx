import * as z from "zod";

import type { GetStaticProps } from "next";
import { BlogHead, PostList } from "@blog-monorepo/ui";
import { postSchema } from "@blog-monorepo/types";
import { prisma } from "@blog-monorepo/prisma";
import { useEffect } from "react";
import { useRouter } from "next/router";

const propsSchema = z.object({
  posts: postSchema
    .transform((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }))
    .array(),
});

type Props = z.infer<typeof propsSchema>;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: propsSchema.parse({
      posts: await prisma.post.findMany(),
    }),
  };
};

const Home = ({ posts }: Props) => {
  const router = useRouter();
  const { type, access_token: accessToken } = router.query;

  useEffect(() => {
    if (type === "recovery") {
      router.push(`/reset-password?access_token=${accessToken}`);
    }
  }, [type, accessToken, router]);

  return (
    <>
      <BlogHead />
      <PostList posts={posts} />
    </>
  );
};

export default Home;
