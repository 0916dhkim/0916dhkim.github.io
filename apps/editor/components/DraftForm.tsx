import { Language, Post } from "@0916dhkim/prisma";
import React, { useCallback, useEffect, useState } from "react";

import { createUseStyles } from "react-jss";
import dynamic from "next/dynamic";
import { languageSchema } from "@0916dhkim/core";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

const useStyles = createUseStyles(() => ({
  formgrid: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "1rem",
  },
  publish: {
    alignSelf: "flex-end",
  },
}));

type DraftFormProps = {
  values: {
    id: string;
    title: string;
    language: Language;
    summary?: string | null | undefined;
    content: string;
  };
  publishDraft: (draftId: string) => void;
  updateDraft: (
    draftId: string,
    data: Omit<Post, "id" | "createdAt" | "updatedAt">
  ) => void;
};

const DraftForm = ({
  values,
  publishDraft,
  updateDraft,
}: DraftFormProps): React.ReactElement => {
  const classes = useStyles();
  const [title, setTitle] = useState(values.title);
  const [language, setLanguage] = useState(values.language);
  const [summary, setSummary] = useState(values.summary);
  const [content, setContent] = useState(values.content);

  const handleContentChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  useEffect(() => {
    updateDraft(values.id, {
      title,
      language,
      summary: summary ?? null,
      content,
    });
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
      <Editor initialValue={values.content} onChange={handleContentChange} />
      <button
        className={classes.publish}
        onClick={() => publishDraft(values.id)}
      >
        Publish
      </button>
    </>
  );
};

export default DraftForm;
