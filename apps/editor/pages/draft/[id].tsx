import * as z from "zod";

import React, { useCallback, useEffect, useState } from "react";
import {
  draftSchema,
  languageSchema,
  postSchema,
  useSupabase,
} from "@0916dhkim/core";

import { NextPage } from "next";
import { createUseStyles } from "react-jss";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const getDraftResponse = z.object({
  draft: z.object({
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

const draftFormPropsSchema = z.object({
  draft: draftSchema.pick({
    id: true,
    title: true,
    language: true,
    summary: true,
    content: true,
  }),
});

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
  publish: {
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

type DraftFormProps = z.infer<typeof draftFormPropsSchema>;

const DraftForm = ({ draft }: DraftFormProps): React.ReactElement => {
  const classes = useStyles();
  const supabase = useSupabase();
  const router = useRouter();
  const [title, setTitle] = useState(draft.title);
  const [language, setLanguage] = useState(draft.language);
  const [summary, setSummary] = useState(draft.summary);
  const [content, setContent] = useState(draft.content);

  const handleContentChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const publishDraft = async () => {
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${supabase.auth.session()?.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          draftId: draft.id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to publish draft.");
      }
      router.replace("/");
    } catch (e) {
      console.error(e);
    }
  };

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
  }, [title, language, summary, content]);

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
        <span>Language</span>
        <select
          value={language}
          onChange={(e) => {
            const parsed = languageSchema.safeParse(e.target.value);
            if (parsed.success) {
              setLanguage(parsed.data);
            }
          }}
        >
          <option value="EN">English</option>
          <option value="KR">한국어</option>
        </select>
        <span>Summary</span>
        <input
          type="text"
          value={summary ?? ""}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <Editor initialValue={draft.content} onChange={handleContentChange} />
      <button className={classes.publish} onClick={publishDraft}>
        Publish
      </button>
    </>
  );
};

const Draft: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const supabase = useSupabase();

  const [draft, setDraft] = useState<DraftFormProps["draft"] | null>(null);

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
          language: parsed.draft.language,
          summary: parsed.draft.summary,
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
