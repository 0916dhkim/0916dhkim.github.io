import * as z from "zod";

import type { GetServerSideProps, NextPage } from "next";
import { draftSchema, postSchema } from "@blog-monorepo/types";
import { prisma } from "@blog-monorepo/prisma";

import Link from "next/link";
import { supabase } from "@blog-monorepo/supabase";
import { useRouter } from "next/router";

const createDraftResponse = z.object({
  draft: z.object({
    id: z.string(),
  }),
});

const propsSchema = z.object({
  posts: postSchema.pick({ id: true, title: true }).array(),
  drafts: draftSchema.pick({ id: true, title: true }).array(),
});

type Props = z.infer<typeof propsSchema>;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const posts = await prisma.post.findMany();
  const drafts = await prisma.draft.findMany();
  return {
    props: propsSchema.parse({ posts, drafts }),
  };
};

const Home: NextPage<Props> = ({ posts, drafts }) => {
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
          language: "EN",
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
    <main>
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
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
