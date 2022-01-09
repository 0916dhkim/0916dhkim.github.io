import * as classes from "styles/postpage.css";
import * as z from "zod";

import { GetStaticPaths, GetStaticProps } from "next";

import { CommonHead } from "components/CommonHead";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import assert from "assert";
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
