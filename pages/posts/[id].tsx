import { AppInfo, getAppInfo } from "lib/appInfo";
import { GetStaticPaths, GetStaticProps } from "next";
import { SerializedPost, serializePost } from "lib/postUtils";

import { CommonHead } from "components/CommonHead";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import assert from "assert";
import { createUseStyles } from "react-jss";
import { useHighlight } from "lib/highlight";

type Props = {
  post: SerializedPost;
  appInfo: AppInfo;
};
type Params = { id: string };

const useStyles = createUseStyles((theme) => ({
  markdown: {
    maxWidth: 800,
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "& p": {
      marginTop: 8,
    },
    "& h1": {
      color: theme.palette.secondary,
    },
    "& h2": {
      color: theme.palette.secondary,
      marginTop: 16,
      borderBottom: "3px solid",
    },
    "& h3": {
      color: theme.palette.secondary,
      marginTop: 16,
    },
    "& ul,ol": {
      marginTop: 8,
      paddingLeft: 24,
    },
    "& blockquote": {
      background: theme.palette.paper,
      boxShadow: theme.shadow,
      padding: "0.5rem",
      margin: "0.75rem 0",
      "& p": {
        margin: 0,
      },
    },
    "& pre": {
      margin: "0.75rem 0",
      overflowX: "auto",
      background: theme.palette.paper,
      boxShadow: theme.shadow,
    },
  },
}));

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const prisma = new PrismaClient();
  return {
    paths: (await prisma.post.findMany({ select: { id: true } })).map(
      (post) => ({
        params: {
          id: post.id,
        },
      })
    ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const prisma = new PrismaClient();
  assert(params?.id, "Missing id url parameter.");
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });
  assert(post, `Cannot find post ${params.id}`);
  const appInfo = getAppInfo();

  return { props: { post: serializePost(post), appInfo } };
};
const Article = ({ post, appInfo }: Props) => {
  const classes = useStyles();
  useHighlight();
  return (
    <>
      <CommonHead appInfo={appInfo} />
      <Head>
        <title>{post.title}</title>
      </Head>
      <ReactMarkdown className={classes.markdown}>{post.content}</ReactMarkdown>
    </>
  );
};

export default Article;
