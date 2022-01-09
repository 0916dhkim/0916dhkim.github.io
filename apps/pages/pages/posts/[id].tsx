import * as z from "zod";

import { GetStaticPaths, GetStaticProps } from "next";

import { CommonHead } from "components/CommonHead";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import assert from "assert";
import { createUseStyles } from "react-jss";
import { prisma } from "@0916dhkim/prisma";
import { useHighlight } from "@0916dhkim/core";

const propsSchema = z.object({
  post: z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
  }),
});
type Props = z.infer<typeof propsSchema>;
type Params = { id: string };

const useStyles = createUseStyles((theme) => ({
  title: {
    fontSize: "3rem",
    color: theme.palette.secondary,
    textAlign: "center",
  },
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
  assert(params?.id, "Missing id url parameter.");
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });
  if (post === null) {
    return { notFound: true };
  }

  return { props: propsSchema.parse({ post }) };
};
const Article = ({ post }: Props) => {
  const classes = useStyles();
  useHighlight();
  return (
    <>
      <CommonHead />
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1 className={classes.title}>{post.title}</h1>
      <ReactMarkdown className={classes.markdown}>{post.content}</ReactMarkdown>
    </>
  );
};

export default Article;
