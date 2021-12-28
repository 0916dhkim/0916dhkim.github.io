import { NextApiHandler, NextApiRequest } from "next";

import { supabase } from "lib/supabase";

export function buildHandler(
  handlers: Record<string, NextApiHandler>
): NextApiHandler {
  return async (req, res) => {
    const { method } = req;
    if (method === undefined) {
      return res.status(400).send("Missing request method.");
    }
    const handler = handlers[method];
    if (handler === undefined) {
      return res.status(405).send(`Method ${method} not allowed.`);
    }

    return handler(req, res);
  };
}

export async function isAuth(req: NextApiRequest): Promise<boolean> {
  const token = req.headers.authorization?.replace(/^Bearer /, "");
  if (!token) {
    return false;
  }
  if (!(await supabase.auth.api.getUser(token))) {
    return false;
  }
  return true;
}
