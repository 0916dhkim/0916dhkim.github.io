import * as z from "zod";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { NextPage } from "next";
import { createUseStyles } from "react-jss";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSupabase } from "@0916dhkim/core";

const getDraftResponse = z.object({
  draft: z.object({
    title: z.string(),
    versions: z
      .object({
        content: z.string(),
      })
      .array(),
  }),
});

type Draft = {
  id: string;
  title: string;
  content: string;
};

const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

const useStyles = createUseStyles(() => ({
  main: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "1rem",
  },
  formgrid: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "1rem",
  },
  submit: {
    alignSelf: "flex-end",
  },
}));

function useDebounce(f: () => {}, timeout: number) {
  const [timeoutState, setTimeoutState] = useState<NodeJS.Timeout>();

  const debounced = useCallback(() => {
    if (timeoutState !== undefined) {
      clearTimeout(timeoutState);
    }
    setTimeoutState(setTimeout(f, timeout));
  }, [f, timeout, timeoutState]);

  return debounced;
}

type DraftFormProps = {
  draft: Draft;
};

const DraftForm = ({ draft }: DraftFormProps): React.ReactElement => {
  const classes = useStyles();
  const supabase = useSupabase();
  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);

  const handleContentChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const updateDraft = useDebounce(async () => {
    try {
      const response = await fetch(`/api/draft/${draft.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${supabase.auth.session()?.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create draft.");
      }
    } catch (e) {
      console.error(e);
    }
  }, 500);

  useEffect(() => {
    updateDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, title]);

  return (
    <>
      <h1>Edit Draft</h1>
      <div className={classes.formgrid}>
        <span>Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <Editor initialValue={draft.content} onChange={handleContentChange} />
    </>
  );
};

const Draft: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const supabase = useSupabase();

  const [draft, setDraft] = useState<Draft | null>(null);

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
        setDraft({
          id,
          title: parsed.draft.title,
          content: parsed.draft.versions[0].content,
        });
      } catch (e) {
        console.error(e);
      }
    })(); // Async IIFE
  }, [router, supabase]);

  return (
    <main className={classes.main}>
      {draft ? <DraftForm draft={draft} /> : <p>Loading...</p>}
    </main>
  );
};

export default dynamic(() => Promise.resolve(Draft), { ssr: false });
