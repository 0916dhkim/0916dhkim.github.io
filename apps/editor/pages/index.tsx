import * as z from "zod";

import type { GetServerSideProps, NextPage } from "next";

import Link from "next/link";
import { PrismaClient } from "@0916dhkim/prisma";

const postSchema = z.object({
  id: z.string(),
  title: z.string(),
});

type Props = {
  posts: { title: string; id: string }[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const prisma = new PrismaClient();
  const posts = postSchema.array().parse(await prisma.post.findMany());
  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
      <li>
        <Link href="/draft">
          <a>New draft</a>
        </Link>
      </li>
    </ul>
  );
};

export default Home;
