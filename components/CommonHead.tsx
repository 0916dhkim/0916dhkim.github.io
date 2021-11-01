import { AppInfo } from "lib/appInfo";
import Head from "next/head";

type Props = {
  appInfo: AppInfo;
};
export const CommonHead = ({ appInfo }: Props): React.ReactElement => {
  return (
    <Head>
      <title>{"Danny's Blog"}</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href={appInfo.favicon} />
    </Head>
  );
};
