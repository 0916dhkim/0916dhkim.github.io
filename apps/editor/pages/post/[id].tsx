import * as styles from "../../styles/postpage.css";
import * as z from "zod";

import React, { useCallback, useEffect, useState } from "react";

import DraftForm from "../../components/DraftForm";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { languageSchema } from "@0916dhkim/core/types";
import { useRouter } from "next/router";
import { useSupabase } from "@0916dhkim/core/supabase";

const getPostResponse = z.object({
  post: z.object({
    id: z.string(),
    title: z.string(),
    language: languageSchema,
    summary: z.string().nullish(),
    content: z.string(),
  }),
});

type GetPostResponse = z.infer<typeof getPostResponse>;

const PostPage: NextPage = () => {
  const router = useRouter();
  const supabase = useSupabase();

  const [post, setPost] = useState<GetPostResponse["post"] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const id = router.query.id;
        if (typeof id !== "string") {
          throw new Error("Missing post ID.");
        }
        const response = await fetch(`/api/post/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${supabase.auth.session()?.access_token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to get post.");
        }
        const parsed = getPostResponse.parse(await response.json());
        setPost(parsed.post);
      } catch (e) {
        console.error(e);
      }
    })(); // Async IIFE
  }, [router, supabase]);

  const updatePost = useCallback(
    async (postId: string, data) => {
      try {
        const response = await fetch(`/api/post/${postId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${supabase.auth.session()?.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Failed to update post.");
        }
        router.replace("/");
      } catch (e) {
        console.error(e);
      }
    },
    [router, supabase]
  );

  return (
    <main className={styles.main}>
      <h1>Edit Post</h1>
      {post ? (
        <DraftForm initialValues={post} onSubmit={updatePost} />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default dynamic(() => Promise.resolve(PostPage), { ssr: false });
