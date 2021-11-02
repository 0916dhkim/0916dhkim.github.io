import { AppInfo, getAppInfo } from "lib/appInfo";
import { GetStaticPaths, GetStaticProps } from "next";
import { MetaData, getAllMetadata, getArticleBySlug } from "lib/articles";

import { CommonHead } from "components/CommonHead";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import assert from "assert";
import { createUseStyles } from "react-jss";

type Props = {
  article: MetaData;
  appInfo: AppInfo;
};
type Params = { slug: string };

const useStyles = createUseStyles((theme) => ({
  container: {
    minWidth: "100vw",
    height: "100vh",
    backgroundColor: theme.palette.background,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
}));

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: (await getAllMetadata()).map((metaData) => ({
      params: {
        slug: metaData.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const slug = params?.slug;
  assert(slug, "No slug params.");
  const article = await getArticleBySlug(slug);
  const appInfo = getAppInfo();

  return { props: { article, appInfo } };
};
const Article = ({ article, appInfo }: Props) => {
  const classes = useStyles();
  return (
    <>
      <CommonHead appInfo={appInfo} />
      <Head>
        <title>{article.title}</title>
      </Head>
      <main>
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </main>
    </>
  );
};

export default Article;
