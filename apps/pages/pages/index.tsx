import * as z from "zod";

import { CommonHead } from "components/CommonHead";
import type { GetStaticProps } from "next";
import { PostList } from "components/home/PostList";
import { PrismaClient } from "@0916dhkim/prisma";
import { useEffect } from "react";
import { useRouter } from "next/router";

const propsSchema = z.object({
  posts: z
    .object({
      id: z.string(),
      title: z.string(),
      content: z.string(),
      summary: z.string().optional(),
      createdAt: z.date(),
    })
    .transform((post) => ({ ...post, createdAt: post.createdAt.toISOString() }))
    .array(),
});

type Props = z.infer<typeof propsSchema>;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const prisma = new PrismaClient();
  return {
    props: propsSchema.parse({
      posts: await prisma.post.findMany({
        where: {
          published: false,
        },
      }),
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
