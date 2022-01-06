import type { GetServerSideProps, NextPage } from "next";

import Link from "next/link";
import { PrismaClient } from "@0916dhkim/prisma";

type Props = {
  posts: { title: string; id: string }[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany();
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
