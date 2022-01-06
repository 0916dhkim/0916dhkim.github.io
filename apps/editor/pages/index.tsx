import * as z from "zod";

import type { GetServerSideProps, NextPage } from "next";

import Link from "next/link";
import { PrismaClient } from "@0916dhkim/prisma";
import { createUseStyles } from "react-jss";
import { useRouter } from "next/router";
import { useSupabase } from "@0916dhkim/core";

const useStyles = createUseStyles(() => ({
  home: {},
}));

const postSchema = z.object({
  id: z.string(),
  title: z.string(),
});

const createDraftResponse = z.object({
  draft: z.object({
    id: z.string(),
  }),
});

type Props = {
  posts: { title: string; id: string }[];
  drafts: { title: string; id: string }[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const prisma = new PrismaClient();
  const posts = postSchema.array().parse(await prisma.post.findMany());
  const drafts = postSchema.array().parse(await prisma.draft.findMany());
  return {
    props: {
      posts,
      drafts,
    },
  };
};

const Home: NextPage<Props> = ({ posts, drafts }) => {
  const classes = useStyles();
  const supabase = useSupabase();
  const router = useRouter();

  const createDraft = async () => {
    try {
      const response = await fetch("/api/draft", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${supabase.auth.session()?.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "",
          content: "",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create draft.");
      }
      const parsed = createDraftResponse.parse(await response.json());
      router.push(`/draft/${parsed.draft.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className={classes.home}>
      <button onClick={createDraft}>New draft</button>
      <h1>Drafts</h1>
      <ul>
        {drafts.map((draft) => (
          <li key={draft.id}>
            <Link href={`/draft/${draft.id}`}>
              <a>{draft.title || "Untitled"}</a>
            </Link>
          </li>
        ))}
      </ul>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
