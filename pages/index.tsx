import { AppInfo, getAppInfo } from "lib/appInfo";
import { Post, PrismaClient } from "@prisma/client";
import { SerializedPost, serializePost } from "lib/postUtils";

import { CommonHead } from "components/CommonHead";
import type { GetStaticProps } from "next";
import { PostList } from "components/home/PostList";

type Props = {
  appInfo: AppInfo;
  posts: SerializedPost[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const prisma = new PrismaClient();
  return {
    props: {
      appInfo: getAppInfo(),
      posts: (
        await prisma.post.findMany({
          where: {
            published: false,
          },
        })
      ).map(serializePost),
    },
  };
};

const Home = ({ appInfo, posts }: Props) => {
  return (
    <>
      <CommonHead appInfo={appInfo} />
      <PostList posts={posts} />
    </>
  );
};

export default Home;
