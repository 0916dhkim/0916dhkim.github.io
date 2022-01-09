import React, { useState } from "react";

import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSupabase } from "@0916dhkim/core";

const Login: NextPage = () => {
  const supabase = useSupabase();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const response = await supabase?.auth.signIn({ email, password });
    if (response.session) {
      router.replace("/");
    }
    if (response.error) {
      console.error(response.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};

export default dynamic(() => Promise.resolve(Login), { ssr: false });