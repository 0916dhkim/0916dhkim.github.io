import { AppInfo, getAppInfo } from "lib/appInfo";
import { SerializedPost, serializePost } from "lib/postUtils";

import { CommonHead } from "components/CommonHead";
import type { GetStaticProps } from "next";
import { PostList } from "components/home/PostList";
import { PrismaClient } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { type, access_token: accessToken } = router.query;

  useEffect(() => {
    if (type === "recovery") {
      router.push(`/reset-password?access_token=${accessToken}`);
    }
  }, [type, accessToken, router]);

  return (
    <>
      <CommonHead appInfo={appInfo} />
      <PostList posts={posts} />
    </>
  );
};

export default Home;
