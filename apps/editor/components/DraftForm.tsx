import * as styles from "./DraftForm.css";

import { Language, Post } from "@0916dhkim/prisma";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import dynamic from "next/dynamic";
import { languageSchema } from "@0916dhkim/core";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

type CombinedValues = Omit<Post, "id" | "createdAt" | "updatedAt">;

type DraftFormProps = {
  initialValues: {
    id: string;
    title: string;
    language: Language;
    summary?: string | null | undefined;
    content: string;
  };
  onSubmit?: (id: string, data: CombinedValues) => void;
  onChange?: (id: string, data: CombinedValues) => void;
};

const DraftForm = ({
  initialValues,
  onSubmit,
  onChange,
}: DraftFormProps): React.ReactElement => {
  const [title, setTitle] = useState(initialValues.title);
  const [language, setLanguage] = useState(initialValues.language);
  const [summary, setSummary] = useState(initialValues.summary);
  const [content, setContent] = useState(initialValues.content);
  const combinedValues: CombinedValues = useMemo(
    () => ({
      title,
      language,
      summary: summary ?? null,
      content,
    }),
    [content, language, summary, title]
  );

  const handleContentChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  useEffect(() => {
    onChange?.(initialValues.id, combinedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combinedValues]);

  return (
    <>
      <h1>Edit Draft</h1>
      <div className={styles.formgrid}>
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
      <Editor
        initialValue={initialValues.content}
        onChange={handleContentChange}
      />
      <button
        className={styles.publish}
        onClick={() => onSubmit?.(initialValues.id, combinedValues)}
      >
        Publish
      </button>
    </>
  );
};

export default DraftForm;
