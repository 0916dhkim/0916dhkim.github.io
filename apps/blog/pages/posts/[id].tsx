import * as z from "zod";

import { GetStaticPaths, GetStaticProps } from "next";

import { BlogHead } from "@blog-monorepo/ui";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import assert from "assert";
import { prisma } from "@blog-monorepo/prisma";
import { useHighlight } from "@blog-monorepo/highlight";

import styled from "@emotion/styled";

const StyledTitle = styled.h1(({ theme }) => ({
  fontSize: "3rem",
  color: theme.palette.primary.background,
  textAlign: "center",
}));

const StyledMarkdown = styled(ReactMarkdown)(({ theme }) => ({
  maxWidth: 800,
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  width: "100%",

  "& p": {
    marginTop: 8,
  },

  "& h1": {
    color: theme.palette.secondary.background,
    marginTop: 32,
  },

  "& h2": {
    color: theme.palette.secondary.background,
    marginTop: 16,
    borderBottom: "3px solid",
  },
  "& h3": {
    color: theme.palette.secondary.background,
    marginTop: 16,
  },
  "& ul,ol": {
    marginTop: 8,
    paddingLeft: 24,
  },
  "& blockquote": {
    color: theme.palette.paper.text,
    background: theme.palette.paper.background,
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
    boxShadow: theme.shadow,
  },
  "& img": {
    width: "100%",
  },
}));

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
      <BlogHead />
      <Head>
        <title>{post.title}</title>
      </Head>
      <StyledTitle>{post.title}</StyledTitle>
      <StyledMarkdown>{post.content}</StyledMarkdown>
    </>
  );
};

export default Article;
