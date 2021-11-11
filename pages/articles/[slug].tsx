import { AppInfo, getAppInfo } from "lib/appInfo";
import { GetStaticPaths, GetStaticProps } from "next";
import { Metadata, getAllMetadata, getArticleBySlug } from "lib/articles";

import { CommonHead } from "components/CommonHead";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import assert from "assert";
import { createUseStyles } from "react-jss";
import { useHighlight } from "lib/highlight";

type Props = {
  article: Metadata;
  appInfo: AppInfo;
};
type Params = { slug: string };

const useStyles = createUseStyles((theme) => ({
  markdown: {
    maxWidth: 800,
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "& p": {
      marginTop: 8,
    },
    "& h1": {
      color: theme.palette.secondary,
    },
    "& h2": {
      color: theme.palette.secondary,
      marginTop: 16,
      borderBottom: "3px solid",
    },
    "& h3": {
      color: theme.palette.secondary,
      marginTop: 16,
    },
    "& ul,ol": {
      marginTop: 8,
      paddingLeft: 24,
    },
    "& blockquote": {
      background: theme.palette.paper,
      boxShadow: theme.shadow,
      padding: "0.5rem",
      margin: "0.75rem 0",
      "& p": {
        margin: 0,
      },
    },
    "& pre": {
      margin: "0.75rem 0",
      overflowX: "auto",
      background: theme.palette.paper,
      boxShadow: theme.shadow,
    },
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
  useHighlight();
  return (
    <>
      <CommonHead appInfo={appInfo} />
      <Head>
        <title>{article.title}</title>
      </Head>
      <ReactMarkdown className={classes.markdown}>
        {article.content}
      </ReactMarkdown>
    </>
  );
};

export default Article;
