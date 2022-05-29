import * as z from "zod";

import React, { useCallback, useEffect, useState } from "react";

import { DraftForm } from "@blog-monorepo/ui";
import { Post } from "@blog-monorepo/prisma";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { languageSchema } from "@blog-monorepo/types";
import { supabase } from "@blog-monorepo/supabase";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const Main = styled.main({
  alignSelf: "stretch",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: "1rem",
});

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
  }, [router]);

  const updatePost = useCallback(
    async (
      postId: string,
      data: Omit<Post, "id" | "createdAt" | "updatedAt">
    ) => {
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
    [router]
  );

  return (
    <Main>
      <h1>Edit Post</h1>
      {post ? (
        <DraftForm initialValues={post} onSubmit={updatePost} />
      ) : (
        <p>Loading...</p>
      )}
    </Main>
  );
};

export default dynamic(() => Promise.resolve(PostPage), { ssr: false });
