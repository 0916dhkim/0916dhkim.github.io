import { AppInfo, getAppInfo } from "lib/appInfo";
import { Metadata, getAllMetadata } from "lib/articles";

import { ArticleList } from "components/home/ArticleList";
import { CommonHead } from "components/CommonHead";
import type { GetStaticProps } from "next";

type Props = {
  appInfo: AppInfo;
  metadataList: Metadata[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      appInfo: getAppInfo(),
      metadataList: await getAllMetadata(),
    },
  };
};

const Home = ({ appInfo, metadataList }: Props) => {
  return (
    <>
      <CommonHead appInfo={appInfo} />
      <ArticleList metadatList={metadataList} />
    </>
  );
};

export default Home;
