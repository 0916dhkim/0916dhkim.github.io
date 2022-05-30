import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { User } from "@supabase/supabase-js";
import { supabase } from "@blog-monorepo/supabase";

export function withUser(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    user: User
  ) => Promise<void> | void
): NextApiHandler {
  return async (req, res) => {
    const auth = req.headers.authorization;

    if (auth === undefined) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing." });
    }

    const token = auth.replace(/^Bearer /, "");
    const { user } = await supabase.auth.api.getUser(token);

    if (user === null) {
      return res.status(403).json({ message: "Authentication failed.", user });
    }

    return handler(req, res, user);
  };
}

export function mapHandler(
  methodToHandler: Record<string, NextApiHandler>
): NextApiHandler {
  return (req, res) => {
    const { method } = req;
    if (method === undefined) {
      return res.status(405).json({ message: "Missing HTTP method." });
    }
    const handler = methodToHandler[method];
    if (!handler) {
      return res.status(405).json({
        message: `Method ${method} is not allowed.`,
      });
    }
    return handler(req, res);
  };
}
