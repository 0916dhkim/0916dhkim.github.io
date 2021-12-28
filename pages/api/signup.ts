import { NextApiHandler } from "next";
import { buildHandler } from "lib/apiUtils";
import { supabase } from "lib/supabase";

const signupHandler: NextApiHandler = buildHandler({
  POST: async (req, res) => {
    const email: unknown = req.body.email;
    const password: unknown = req.body.password;
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).send("Invalid request body.");
    }

    const result = await supabase.auth.signUp({
      email,
      password,
    });

    res.send(result);
  },
});

export default signupHandler;
