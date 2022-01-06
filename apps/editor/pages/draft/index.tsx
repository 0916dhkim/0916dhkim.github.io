import { useRef, useState } from "react";

import { NextPage } from "next";
import { createUseStyles } from "react-jss";
import dynamic from "next/dynamic";
import { useSupabase } from "@0916dhkim/core";

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

const Draft: NextPage = () => {
  const classes = useStyles();
  const supabase = useSupabase();

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("EN");
  const [summary, setSummary] = useState("");
  const contentRef = useRef("");

  const handleSubmit = async () => {
    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabase.auth.session()?.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        language,
        summary,
        content: contentRef.current,
      }),
    });
  };

  return (
    <main className={classes.main}>
      <h1>New Post</h1>
      <div className={classes.formgrid}>
        <span>Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span>Language</span>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="EN">EN</option>
          <option value="KR">KR</option>
        </select>
        <span>Summary</span>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <Editor valueRef={contentRef} />
    </main>
  );
};

export default dynamic(() => Promise.resolve(Draft), { ssr: false });
