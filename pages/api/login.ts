import { NextApiHandler } from "next";
import { buildHandler } from "lib/apiUtils";
import { supabase } from "lib/supabase";

const loginHandler: NextApiHandler = buildHandler({
  POST: async (req, res) => {
    const email: unknown = req.body.email;
    const password: unknown = req.body.password;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).send("Invalid request body.");
    }

    const { user } = await supabase.auth.signIn({ email, password });

    res.send({
      user,
      access_token: supabase.auth.session()?.access_token,
    });
  },
});

export default loginHandler;
