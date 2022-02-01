import * as styles from "../../styles/draftpage.css";
import * as z from "zod";

import React, {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import DraftForm from "../../components/DraftForm";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { languageSchema } from "@0916dhkim/core/types";
import { supabase } from "@0916dhkim/core/supabase";
import { useRouter } from "next/router";

const getDraftResponse = z.object({
  draft: z.object({
    id: z.string(),
    title: z.string(),
    language: languageSchema,
    summary: z.string().nullish(),
    versions: z
      .object({
        content: z.string(),
      })
      .array(),
  }),
});

type GetDraftResponse = z.infer<typeof getDraftResponse>;

function useDebounceQueue(waitFor: number) {
  const [state, setState] = useState<NodeJS.Timeout | null>(null);

  const enqueueCallback = useCallback(
    (callback: () => void | Promise<void>) => {
      if (state !== null) {
        clearTimeout(state);
      }
      setState(setTimeout(callback, waitFor));
    },
    [state, waitFor]
  );

  return enqueueCallback;
}

const Draft: NextPage = () => {
  const router = useRouter();
  const enqueueCallback = useDebounceQueue(500);

  const [draft, setDraft] = useState<GetDraftResponse["draft"] | null>(null);
  const draftFormValues = useMemo(
    () =>
      draft
        ? {
            ...draft,
            content: draft.versions[0].content,
          }
        : null,
    [draft]
  );

  useEffect(() => {
    (async () => {
      try {
        const id = router.query.id;
        if (typeof id !== "string") {
          throw new Error("Missing draft ID.");
        }
        const response = await fetch(`/api/draft/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${supabase.auth.session()?.access_token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to get draft.");
        }
        const parsed = getDraftResponse.parse(await response.json());
        setDraft(parsed.draft);
      } catch (e) {
        console.error(e);
      }
    })(); // Async IIFE
  }, [router]);

  const publishDraft = useCallback(
    async (draftId: string) => {
      try {
        const response = await fetch("/api/post", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${supabase.auth.session()?.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            draftId,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to publish draft.");
        }
        router.replace("/");
      } catch (e) {
        console.error(e);
      }
    },
    [router]
  );

  const updateDraft: ComponentProps<typeof DraftForm>["onChange"] = useCallback(
    (draftId, data) => {
      enqueueCallback(async () => {
        try {
          const response = await fetch(`/api/draft/${draftId}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${supabase.auth.session()?.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (!response.ok) {
            throw new Error("Failed to create draft.");
          }
        } catch (e) {
          console.error(e);
        }
      });
    },
    [enqueueCallback]
  );

  return (
    <main className={styles.main}>
      <h1>Edit Draft</h1>
      {draftFormValues ? (
        <DraftForm
          initialValues={draftFormValues}
          onSubmit={publishDraft}
          onChange={updateDraft}
        />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default dynamic(() => Promise.resolve(Draft), { ssr: false });
