import Head from "next/head";
import type { NextPage } from "next";
import { createUseStyles } from "react-jss";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useSupabase } from "@0916dhkim/core";
const Editor = dynamic(() => import("../components/Editor"), { ssr: false });

const useStyles = createUseStyles((theme) => ({
  main: {
    minWidth: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: "4rem",
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

const Home: NextPage = () => {
  const classes = useStyles();
  const supabase = useSupabase();
  const router = useRouter();

  const handleContentChange = useCallback((value: string) => {}, []);

  if (supabase.auth.session() === null) {
    router.replace("/login");
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.main}>
        <h1>New Post</h1>
        <div className={classes.formgrid}>
          <span>Title</span>
          <input type="text" />
          <span>Language</span>
          <select>
            <option value="EN">EN</option>
            <option value="KR">KR</option>
          </select>
          <span>Summary</span>
          <input type="text" />
        </div>
        <Editor onChange={handleContentChange} />
        <button className={classes.submit}>Publish</button>
      </main>
    </>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });