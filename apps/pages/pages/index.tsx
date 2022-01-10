import * as z from "zod";

import { CommonHead } from "components/CommonHead";
import type { GetStaticProps } from "next";
import { PostList } from "components/home/PostList";
import { postSchema } from "@0916dhkim/core/types";
import { prisma } from "@0916dhkim/prisma";
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
      <CommonHead />
      <PostList posts={posts} />
    </>
  );
};

export default Home;
