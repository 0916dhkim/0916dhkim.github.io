import { AppInfo, getAppInfo } from "lib/appInfo";
import { FormEventHandler, useState } from "react";

import { CommonHead } from "components/CommonHead";
import { GetStaticProps } from "next";
import { supabase } from "lib/supabase";
import { useRouter } from "next/router";

type Props = {
  appInfo: AppInfo;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      appInfo: getAppInfo(),
    },
  };
};

type FetchState = "ready" | "loading" | "success" | "error";

const ResetPassword = ({ appInfo }: Props) => {
  const router = useRouter();
  const { access_token: accessToken } = router.query;
  const [password, setPassword] = useState("");
  const [fetchState, setFetchState] = useState<FetchState>("ready");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (typeof accessToken !== "string") {
      console.error("Missing access token.");
    } else {
      setFetchState("loading");
      supabase.auth.api
        .updateUser(accessToken, {
          password,
        })
        .then(
          () => {
            setFetchState("success");
          },
          () => {
            setFetchState("error");
          }
        );
    }
  };

  return (
    <>
      <CommonHead appInfo={appInfo} />
      {fetchState === "ready" && (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </form>
      )}
      {fetchState === "loading" && <p>Loading...</p>}
      {fetchState === "error" && <p>Failed to reset password.</p>}
      {fetchState === "success" && <p>Password reset successful.</p>}
    </>
  );
};

export default ResetPassword;
