import { AppInfo, getAppInfo } from "lib/appInfo";
import { GetStaticPaths, GetStaticProps } from "next";
import { MetaData, getAllMetadata, getArticleBySlug } from "lib/articles";

import { CommonHead } from "components/CommonHead";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import assert from "assert";

type Props = {
  article: MetaData;
  appInfo: AppInfo;
};
type Params = { slug: string };

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
  return (
    <>
      <CommonHead appInfo={appInfo} />
      <Head>
        <title>{article.title}</title>
      </Head>
      <ReactMarkdown>{article.content}</ReactMarkdown>
    </>
  );
};

export default Article;
